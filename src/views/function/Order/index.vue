<template>

<div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      订单
      <el-tooltip content="用于查询用户购买商品的支付订单" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >


    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
      <div>

        <el-date-picker
             :style="{width:'240px'}"
             v-model="selectTime"
             type="daterange"
             range-separator="至"
             unlink-panels
              format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
             :picker-options="pickerOptions"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             @change="queryTime"
             >
           </el-date-picker>


        <el-input
          style="width: 200px;margin-left: 10px;"
          v-model="queryParams.orderNum"
          placeholder="可输入订单编号进行搜索"
          clearable
          size="medium"
          @keyup.enter.native="handleQuery"
          @change="queryOrderNum"
        />

        <el-button
          style="background-color: white;color:#19AA29;float: right;border: #19AA29 solid 1px;"
          plain
          icon="el-icon-download"
          size="small"
          @click="exportOrder"
        >导出</el-button>



      </div>



      <el-table  v-loading="loading" :data="orderList" style="margin-top: 20px;" :cell-style="cellStyle">
        <el-table-column label="下单时间" align="center" prop="orderTimeFormat" width="200" sortable/>
        <el-table-column label="订单编号" align="center" prop="orderNum" width="180"/>
        <el-table-column label="商品类型" align="center" prop="orderType" width="140"
      >

      <template slot="header" slot-scope="scope">
        <span>商品类型</span>
         <el-popover placement='bottom' width='160'v-model="visible2">
             <span slot="reference" style="margin-left:3px;margin-top:5px">
                 <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
             </span>
             <el-checkbox-group v-model="TypeList" style="display: flex;flex-direction: column;align-items: flex-start;height: 160px;overflow-y: scroll;">
                 <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.classificationId" v-for="(item,index) in ActivityProgramClassificationList" :key="index">{{item.classificationName}}</el-checkbox>
               </el-checkbox-group>
              <div class='el-table-filter__bottom'>
                  <!-- <button :class="TypeList.length>0?'':'is-disabled'" @click="SearchTypehName">筛选</button> -->
                  <button @click="clearSearchTypeName">重置</button>
              </div>
         </el-popover>
      </template>


       <template slot-scope="scope">
            <div>
                 <span>{{getType(scope.row.orderType)}}</span>
            </div>

            <div v-if="scope.row.orderType==1">
              <span>{{scope.row.formatName}}</span>
            </div>
      </template>

       </el-table-column>

        <el-table-column label="商品名称" align="center" prop="bizName" width="180" >
          <template slot="header" slot-scope="scope">
            <span>商品名称</span>
             <el-popover placement='bottom' width='160'v-model="visible">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-input size='small' v-model="searcGoodsName" placeholder='请输入商品名称'></el-input>
                  <div class='el-table-filter__bottom'>
                      <button :class="searcGoodsName?'':'is-disabled'" @click="SearchGoodsName">筛选</button>
                      <button @click="clearSearchGoodsName">重置</button>
                  </div>
             </el-popover>
          </template>

        </el-table-column>
        <el-table-column label="原价" align="center" prop="originalPrice" width="120" sortable :formatter="priceFormate"/>
        <el-table-column label="优惠额" align="center" prop="shopPreferentialPrice" width="120" sortable :formatter="priceFormate2"/>
        <el-table-column label="成交金额" align="center" prop="transactionPrice" width="120" sortable :formatter="priceFormate3"/>

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row.orderId }}" >
            <el-button
              size="mini"
              type="text"
            >查看详情</el-button>
             </router-link>
          </template>
        </el-table-column>
      </el-table>




        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />


    </el-card>

  <bottom-card moduleName="功能" pagesName="订单" style="margin-top: 20px;"></bottom-card>

 </div>
</template>

<script>
  import bottomCard from '@/components/bottomCard'
  import {orderList,exportOrder} from "@/api/function/function";
  import Cookies from "js-cookie";

  export default {
    name: "Order",
    components: {
     bottomCard
    },
    data() {
      return {

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < new Date('2021-01-01').getTime();
          }
        },


         selectTime:[],
        // 版本号
        version: "3.6.0",
        total:10,
        visible: false,
        visible2: false,
        loading:false,
        selectStatus:null,
        // filterList:[{text: '海报', value: '1'},{text: '活动方案', value: '2'},{text: '在线微课', value: '3'}],
        filterList:[],
        searchName:'',
        orderList:[],
        TypeList:[],
        queryParams:{
          searchStartTime:null,
          searchEndTime:null,
          orderNum:null,
          bizName:null,
          pageNum:1,
          pageSize:10
        },

        searcGoodsName:null,

        selectStatusList: [{
          "dictLabel": "全部状态",
          "dictValue": 1
        }, {
          "dictLabel": "已上线",
          "dictValue": 2
        },
        {
          "dictLabel": "审核中",
          "dictValue": 3
        },
        {
          "dictLabel": "审核失败",
          "dictValue": 4
        }
        ],
      };
    },


    computed:{
      getType() {
                  return (item) => {
                    if(item==1){
                      return "海报"
                    }
                    else if(item==2){
                      return "活动方案"
                    }
                    else if(item==3){
                      return "课程"
                    }

                  }
              }
    },

    created() {
     this.GetDateStr(-30)
     this.dateFormat(new Date().getTime())
     this.getList()

    },

    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },


    methods: {

      // 时间搜索
      queryTime(){
        console.log(this.selectTime)
        if(this.selectTime!=null){
          this.queryParams.searchStartTime=this.selectTime[0]
          this.queryParams.searchEndTime=this.selectTime[1]
        }
        else{
          this.queryParams.searchStartTime=null
          this.queryParams.searchEndTime=null
        }

        this.getList()
      },

      queryOrderNum(){
        this.getList()
      },



     dateFormat(time){
         var date = new Date(time);
         var YY = date.getFullYear() + '-';
         var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
         var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
         console.log(YY+MM+DD)
         this.selectTime.push(YY+MM+DD)
         this.queryParams.searchStartTime=this.selectTime[0]
         this.queryParams.searchEndTime=this.selectTime[1]

     },
     // 获取今天之后的30天
     GetDateStr(AddDayCount){
        var  dd =  new  Date();
        dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
        var  y = dd.getFullYear();
        var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
        var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
        this.selectTime.push(y+ "-" +m+ "-" +d)
     },


     // typeFormat(row, column){
     //   if(row.orderType==1){
     //      return
     //   }
     //   else{
     //      return
     //   }
     // },

      priceFormate(row, column){
        if(row.originalPrice!=null){
          return ("￥"+(parseInt(row.originalPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }


      },

     priceFormate2(row, column){
       if(row.shopPreferentialPrice!=null){
         return ("￥"+(parseInt(row.shopPreferentialPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
       }


     },

     priceFormate3(row, column){

       if(row.transactionPrice!=null){
         return ("￥"+(parseInt(row.transactionPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
       }

     },

      getList(){
       orderList(this.queryParams).then(response => {
         console.log(response)
         this.orderList=response.rows
       });

      },

      // 修改列表字体颜色
      cellStyle(row){
        if(row.column.label==="商品名称"){

              return 'color: #19AA29;'
          }
      },


      SearchGoodsName(){
        this.queryParams.bizName=this.searcGoodsName
        this.getList()
        this.visible=false
      },

      clearSearchGoodsName(){
        this.searcGoodsName=''
        this.visible=false
        this.queryParams.bizName=null
        this.getList()
      },




      renderFilter(h, {column, $index}, index) {
                  return (
                      <span>
                          商品类型
                          <el-popover placement='bottom' width='160' height='240' v-model={this.visible}>
                              <span slot="reference" style="margin-left:3px;margin-top:5px">
                                  <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                              </span>
                              <el-checkbox-group v-model={this.filterList}>
                                  <el-checkbox label="海报" ></el-checkbox>
                                  <el-checkbox label="活动方案" style="margin-top:5px"></el-checkbox>
                                  <el-checkbox label="在线微课" style="margin-top:5px;margin-bottom:5px"></el-checkbox>
                                </el-checkbox-group>
                               <div class='el-table-filter__bottom'>
                                   <button class={this.filterList.length>0? '' : 'is-disabled'} on-click={this.filterSearch}>筛选</button>
                                   <button on-click={this.clearSearch}>重置</button>
                               </div>
                          </el-popover>
                      </span>
                  );
              },

     renderHeader(h, {column, $index}, index) {
                 return (
                     <span>
                         商品名称
                         <el-popover placement='bottom' width='160' height='240' v-model={this.visible2}>
                             <span slot="reference" style="margin-left:3px;margin-top:5px">
                                 <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                             </span>
                             <el-input size='small' v-model={this.searchName} placeholder='请输入内容'></el-input>
                             <div class='el-table-filter__bottom'>
                                 <button class={this.searchName ? '' : 'is-disabled'} on-click={this.SearchName}>筛选</button>
                                 <button on-click={this.clearSearchName}>重置</button>
                             </div>
                         </el-popover>
                     </span>
                 );
             },

     clearSearch(){
       this.filterList=[];
     },




     SearchName(){

     },

     clearSearchName(){
       this.searchName=''
     },

     filterSearch(){
       console.log(this.filterList)
     },


     exportOrder(){
       this.$confirm('是否确认导出所有订单数据项?', "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(() => {
           this.loading = true;
           return exportOrder();
         }).then(response => {
           this.download(response.msg);
           this.loading = false;
         }).catch(() => {});
     },

     handleAdd(){

     },

     handleView(){

     }

     // filterChange(filters){
     // 	if(Object.keys(filters)[0] == "goodsFilter"){
     // 		// 判断当前是哪一列搜索条件发生变化
     // 		// 处理状态行
     // 		// console.log(filters);
     // 		// 下面的state是上面比较的值(最傻逼的地方)
     //    console.log(filters.goodsFilter[0]);
     // 	}
     // },

    },
  };
</script>

<style scoped>

 .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }

</style>
