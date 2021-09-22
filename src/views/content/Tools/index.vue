<template>
  <div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      器材
      <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >

    <div style="display: flex;flex-direction: row;">

      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px; display: flex; align-items: center; justify-content: center;" :class="state1 === false?'color2':'color1'" @click="switchData(1)">
        所有器材
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state2 === false?'color2':'color1'" @click="switchData(2)">
        已上线
        <el-tag v-if="onlineCount!=null&&onlineCount>0" style="background-color: #19AA29;color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{onlineCount}}</el-tag>
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state3 === false?'color2':'color1'" @click="switchData(3)">
        审核中
        <el-tag v-if="beExamineCount!=null&&beExamineCount>0" style="background-color: #3b7afc; color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{beExamineCount}}</el-tag>
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state4 === false?'color2':'color1'" @click="switchData(4)">
          <span style="margin-left: -6px;">
            审核失败
          </span>
        <el-tag v-if="examineFailCount!=null&&examineFailCount>0" style="background-color: #da4646;color: white;height: 15px;padding: 0 4px;line-height: 15px;">{{examineFailCount}}</el-tag>
      </div>
    </div>


      <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
        <div>
          <el-input
          class="my-input"
            style="width: 200px;margin-left: 10px;"
            v-model="queryParams.productName"
            placeholder="可输入名称进行搜索"
            clearable
            size="medium"
             @change="queryName"
            @keyup.enter.native="handleQuery"
          />

          <router-link :to="{name:'addTools',path: '/content/addTools'}">
          <el-button
            style="background-color: #19AA29;color: white;float: right;"
            plain
            icon="el-icon-plus"
            size="small"
            @click="handleAdd"
          >新增</el-button>
           </router-link>


        </div>

        <el-table  v-loading="loading" :data="toolsList" style="margin-top: 20px;" :cell-style="cellStyle">
          <el-table-column label="器材名称" align="left" prop="productName" width="200" />
          <el-table-column label="厂商" align="center" prop="manufactorName" width="160" :render-header="renderFiltercompany">
            <template slot-scope="scope">
              <router-link :to="{name:'companyDetail',path: '/content/companyDetail' ,query:{ dataId: scope.row.manufactorId}}">
                {{scope.row.manufactorName}}
              </router-link>
            </template>
          </el-table-column>

          <el-table-column label="分类" align="center" prop="classificationName" width="160">
              <template slot="header" slot-scope="scope">
                <span>分类</span>
                 <el-popover placement='bottom' width='160' height='240' v-model="visible2">
                     <span slot="reference" style="margin-left:3px;margin-top:5px">
                         <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                     </span>
                     <el-checkbox-group v-model="TypeList">
                         <el-checkbox :label="item.classificationId" v-for="(item,index) in industryClassificationList" :key="index">{{item.classificationName}}</el-checkbox>
                        <!-- <el-checkbox label="审核中" style="margin-top:5px"></el-checkbox>
                         <el-checkbox label="已上线" style="margin-top:5px"></el-checkbox>
                         <el-checkbox label="审核失败" style="margin-top:5px;margin-bottom:5px"></el-checkbox> -->
                       </el-checkbox-group>
                      <div class='el-table-filter__bottom'>
                          <button :class="TypeList.length>0?'':'is-disabled'" @click="SearchTypehName">筛选</button>
                          <button @click="clearSearchTypeName">重置</button>
                      </div>
                 </el-popover>
              </template>
         </el-table-column>

          <el-table-column label="市场价" align="right" prop="price" width="160" :formatter="priceFormate" sortable/>
           <el-table-column label="是否置顶" align="left" prop="topMark" width="140" :render-header="renderFilterTop"  :formatter="isTopFormate" />
           <el-table-column label="浏览量" align="right" prop="showViewNum" width="140" sortable :formatter="priceFormate2"/>
           <el-table-column label="状态" align="left" prop="sysAuditStatus" width="160"  :formatter="statusFormate" :render-header="renderFilterStatus">

           <template slot-scope="scope">
             <div style="font-size: 12px; color: #000000;display: flex;align-items: center;" v-if="scope.row.sysAuditStatus == 0||scope.row.sysAuditStatus == -2">
               <div style="width: 10px; height: 10px;background-color: #000000;border-radius: 5px;margin-right: 2px;">

               </div>
               未上线</div>
             <div style="font-size: 12px;color: #3175FB;display: flex;align-items: center;" v-if="scope.row.sysAuditStatus == 2">
               <div style="width: 10px; height: 10px;background-color: #3175FB;border-radius: 5px;margin-right: 2px;">

               </div>
               审核中</div>
             <div style="font-size: 12px;color: #13CE66;display: flex;align-items: center;" v-if="scope.row.sysAuditStatus == 1">
               <div style="width: 10px; height: 10px;background-color: #13CE66;border-radius: 5px;margin-right: 2px;">

               </div>
               已上线</div>
             <div  style=" font-size: 12px;display: flex;color: red;align-items: center;" v-if="scope.row.sysAuditStatus == -1">
               <div style="width: 10px; height: 10px;background-color: #FF0000;border-radius: 5px;margin-right: 2px;">

               </div>

               审核失败
             <el-tooltip content="后续版本通过标签推荐内容" placement="bottom" style="margin-left: 5px;">
               <img src="../../../assets/images/warnMini.png" style="width: 10px;height: 10px;">
               <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
             </el-tooltip>
             </div>
             <!-- <img height="60px" width="60px" :src="scope.row.headPortrait" alt="" v-if="scope.row.headPortrait"> -->
           </template>


           </el-table-column>
           <el-table-column label="创建时间" align="left" prop="createTime" width="200" sortable />

          <el-table-column label="操作" align="left" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <router-link :to="{name:'toolsDetail',path: '/content/toolsDetail',query:{ data: scope.row }}" >
              <el-button
                size="mini"
                type="text"

              >查看</el-button>
               </router-link>

               <el-dropdown style="margin-left: 10px;">
                 <el-button
                   size="mini"
                   type="text"
                 >更多</el-button>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item style="width: 100px;" v-if="scope.row.sysAuditStatus==0"  @click.native="pushLine(scope.row.providersProductId)">提交上线</el-dropdown-item>
                   <router-link :to="{name:'editTools',path: '/content/editTools',query:{ data: scope.row }}" >
                  <el-dropdown-item>修改</el-dropdown-item>
                   </router-link>
                  <el-dropdown-item  v-if="scope.row.sysAuditStatus==1"  @click.native="downLine(scope.row.providersProductId)">下线</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.sysAuditStatus!=-1" @click.native="reExemine(scope.row.providersProductId)">撤回审核</el-dropdown-item>
                   <el-dropdown-item @click.native="delPro(scope.row.providersProductId)">删除</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>

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



    <bottom-card moduleName="内容" pagesName="器材" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>

  import {productList,productCount,ProductOppreate,industryClassification} from "@/api/content/tools";
  import bottomCard from '@/components/bottomCard'
  import Cookies from "js-cookie";
  export default {
    name: "index",
    components: {
     bottomCard
    },
    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        state1: true,
        state2: false,
        state3: false,
        state4: false,
        visible:false,
        visible2:false,
        visible3:false,
        visible4:false,
        queryParams:{
          productName:null,
          pageNum:1,
          pageSize:10,
          sysAuditStatuss:null,
          classificationIds:null,
          manufactorIds:null,
          topMarkStatuss:null
        },
        total:10,
        loading:false,
        selectName:null,
        selectStatus:null,
        onlineCount:null,
        beExamineCount:null,
        examineFailCount:null,
        toolsList:[],
        TypeList:[],
        industryClassificationList:[],
        filterTopList:[],
        filterStatusList:[],
        searcCompanyhName:null,
        searcTypehName:null,
        isTopList: [{
          "dictLabel": "置顶",
          "dictValue": 1
        }, {
          "dictLabel": "不置顶",
          "dictValue": 0
        }
        ],


        selectStatusList: [{
          "dictLabel": "全部状态",
          "dictValue": 3
        }, {
          "dictLabel": "已上线",
          "dictValue": 1
        },
        {
          "dictLabel": "未上线",
          "dictValue": 0
        },
        {
          "dictLabel": "审核中",
          "dictValue": 2
        },
        {
          "dictLabel": "审核失败",
          "dictValue": -1
        }
        ],
      };
    },

    created() {
     this.getList()
     this.getCount()
     this.getindustryClassificationList()
    },
    
    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },


    methods: {

      queryName(){
        this.getList()
      },

      isTopFormate(row, column){
         return this.selectDictLabel(this.isTopList, row.topMark);
      },

      statusFormate(row, column){
         return this.selectDictLabel(this.selectStatusList, row.sysAuditStatus);
      },

      priceFormate(row, column){
         if(row.price!=null){
           return ("￥"+parseInt(row.price).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }


       },

      priceFormate2(row, column){
        if(row.showViewNum!=null){
          return ((row.showViewNum)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }


      },


      // 修改列表字体颜色
      cellStyle(row){
        if(row.column.label==="厂商"){
              return 'color: #19AA29;'
          }
      },


      getCount(){
        productCount().then(response => {
            console.log(response)
            this.onlineCount=response.data.onlineCount
            this.beExamineCount=response.data.beExamineCount
            this.examineFailCount=response.data.examineFailCount
        });
      },

      getList(){
        productList(this.queryParams).then(response => {
            console.log(response)
            this.toolsList=response.rows
        });
        // this.toolsList.push(data)

      },

      getindustryClassificationList(){
        industryClassification().then(response => {
          console.log(response)
          this.industryClassificationList=response.rows
        });
      },


      switchData(index){
                if(index==1){
                  this.state1 = true
                  this.state2 = false
                  this.state3 = false
                  this.state4 = false
                }
                else if(index==2){
                  this.state1 = false
                  this.state2 = true
                  this.state3 = false
                  this.state4 = false
                }
                else if(index==3){
                  this.state1 = false
                  this.state2 = false
                  this.state3 = true
                  this.state4 = false
                }
                else if(index==4){
                  this.state1 = false
                  this.state2 = false
                  this.state3 = false
                  this.state4 = true
                }

      },

      //分类筛选
      SearchTypehName(){
        console.log(this.TypeList)
        var typeArray=[]
        for (var i = 0; i < this.TypeList.length; i++) {
          typeArray.push(this.TypeList[i])
        }
        this.queryParams.classificationIds=typeArray.toString()
        this.visible2=false
        this.getList()
      },

      //重置分类筛选
      clearSearchTypeName(){
        this.TypeList=[]
        this.queryParams.classificationIds=null
        this.visible2=false
        this.getList()
      },






      renderFiltercompany(h, {column, $index}, index) {
            return (
                <span>
                    厂商
                    <el-popover placement='bottom' width='160' height='240' v-model={this.visible}>
                        <span slot="reference" style="margin-left:3px;margin-top:5px">
                            <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                        </span>
                        <el-input size='small' v-model={this.searcCompanyhName} placeholder='请输入内容'></el-input>
                        <div class='el-table-filter__bottom'>
                            <button class={this.searcCompanyhName ? '' : 'is-disabled'} on-click={this.SearchCompanyhName}>筛选</button>
                            <button on-click={this.clearSearchName}>重置</button>
                        </div>
                    </el-popover>
                </span>
            );
              },



      SearchCompanyhName(){

      },

       clearSearchName(){
          this.searcCompanyhName=''
       },


      // renderFilterType(h, {column, $index}, index){
      //   return (
      //       <span>
      //           分类
      //           <el-popover placement='bottom' width='160' height='240' v-model={this.visible2}>
      //               <span slot="reference" style="margin-left:3px;margin-top:5px">
      //                   <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
      //               </span>
      //               <el-checkbox-group v-model={this.TypeList}>
      //                 {
      //                   this.industryClassificationList.map(item => {
      //                         return <el-checkbox on-click={}>{item.classificationName}</el-checkbox>
      //                     })
      //                 }

      //                </el-checkbox-group>
      //               <div class='el-table-filter__bottom'>
      //                   <button class={this.TypeList.length>0 ? '' : 'is-disabled'} on-click={this.SearchTypehName}>筛选</button>
      //                   <button on-click={this.clearSearchTypeName}>重置</button>
      //               </div>
      //           </el-popover>
      //       </span>
      //   );
      // },




      renderFilterStatus(h, {column, $index}, index){
        return (
            <span>
                状态
                <el-popover placement='bottom' width='160' height='240' v-model={this.visible4}>
                    <span slot="reference" style="margin-left:3px;margin-top:5px">
                        <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                    </span>
                    <el-checkbox-group v-model={this.filterStatusList}>
                        <el-checkbox label="未上线" ></el-checkbox>
                        <el-checkbox label="审核中" style="margin-top:5px"></el-checkbox>
                        <el-checkbox label="已上线" style="margin-top:5px"></el-checkbox>
                        <el-checkbox label="审核失败" style="margin-top:5px;margin-bottom:5px"></el-checkbox>
                      </el-checkbox-group>
                     <div class='el-table-filter__bottom'>
                         <button class={this.filterStatusList.length>0? '' : 'is-disabled'} on-click={this.filterStatusSearch}>筛选</button>
                         <button on-click={this.clearStatusSearch}>重置</button>
                     </div>
                </el-popover>
            </span>
        );
      },

      filterStatusSearch(){
        console.log(this.filterStatusList)
        var Statuss=[]
        for (var i = 0; i < this.filterStatusList.length; i++) {
          if(this.filterStatusList[i]=="未上线"){
            Statuss.push("0")
          }
          else if(this.filterStatusList[i]=="已上线"){
             Statuss.push("1")
          }
          else if(this.filterStatusList[i]=="审核失败"){
             Statuss.push("-1")
          }
          else if(this.filterStatusList[i]=="审核中"){
             Statuss.push("2")
          }
        }

        this.queryParams.sysAuditStatuss=Statuss.toString()
        console.log(this.queryParams.sysAuditStatuss)
        this.visible4=false
         this.getList()

      },

      clearStatusSearch(){
          this.visible4=false
          this.filterStatusList=[];
          this.queryParams.sysAuditStatuss=null
          this.getList()
      },





      renderFilterTop(h, {column, $index}, index){
        return (
            <span>
                是否置顶
                <el-popover placement='bottom' width='160' height='240' v-model={this.visible3}>
                    <span slot="reference" style="margin-left:3px;margin-top:5px">
                        <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                    </span>
                    <el-checkbox-group v-model={this.filterTopList}>
                        <el-checkbox label="置顶" ></el-checkbox>
                        <el-checkbox label="不置顶" style="margin-top:5px;margin-bottom:5px"></el-checkbox>
                      </el-checkbox-group>
                     <div class='el-table-filter__bottom'>
                         <button class={this.filterTopList.length>0? '' : 'is-disabled'} on-click={this.filterTopSearch}>筛选</button>
                         <button on-click={this.clearTopSearch}>重置</button>
                     </div>
                </el-popover>
            </span>
        );
      },

      filterTopSearch(){
        var Statuss=[]
        for (var i = 0; i < this.filterTopList.length; i++) {
          if(this.filterTopList[i]=="不置顶"){
            Statuss.push("0")
          }
          else if(this.filterTopList[i]=="置顶"){
             Statuss.push("1")
          }

        }

        this.queryParams.topMarkStatuss=Statuss.toString()
        console.log(this.queryParams.topMarkStatuss)
        this.visible3=false
         this.getList()
      },

      clearTopSearch(){
          this.visible3=false
          this.filterTopList=[];
          this.queryParams.topMarkStatuss=null
          this.getList()
      },



      // 提交上线
      pushLine(id){
        this.$confirm("在提交上线后，将由平台审核，预计需要1~3个工作日。确定要继续吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              providersProductId:id,
              operationType:1
            }
            return ProductOppreate(data);
          }).then(() => {
            this.getList();
            this.msgSuccess("上线成功");
          })
      },

      // 下线
      downLine(id){
       this.$confirm("下线后，将不再允许用户购买此器材,且重新上线时需平台审核。确定要继续吗", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersProductId:id,
             operationType:2
           }
           return ProductOppreate(data);
         }).then(() => {
           this.getList();
           this.msgSuccess("下线成功");
         })
      },

      // 撤回审核
      reExemine(id){
       this.$confirm("撤回审核后，平台将不再处理此次审核。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersProductId:id,
             operationType:3
           }
           return ProductOppreate(data);
         }).then(() => {
           this.getList();
           this.msgSuccess("撤回成功");
         })
      },


      // 删除
      delPro(id){
       this.$confirm("删除后，该器材将无法恢复。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersProductId:id,
             operationType:4
           }
           return ProductOppreate(data);
         }).then(() => {
           this.getList();
           this.msgSuccess("删除成功");
         })
      },



    },
  };

</script>

<style scoped>

  .color1{
    color: #000;
    background-color: #fff;
  }
  .color2{
    color: #000;
    background-color: #e1e1e1;
  }

  .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }

</style>
