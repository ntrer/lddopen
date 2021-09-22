<template>
  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">订单详情</span>
  </el-page-header>

  <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">

    <div style="height: 60px;display: flex;flex-direction: column;justify-content: center;">
      <span style="font-size: 16px;">
        订单编号:{{this.orderDetail.orderNum}}
      </span>

      <div style="display: flex;flex-direction: row;margin-top: 20px;">
        <span style="color: #9b9b9b;font-size: 13px;">
          下单时间:
        </span>
        <span style="font-size: 13px;margin-left: 5px;color: black;">
         {{this.orderDetail.orderTimeFormat}}
        </span>
      </div>

    </div>

    <el-divider></el-divider>

    <div style="display: flex;flex-direction: column;height: 60px;">
      <span style="font-size: 13px;font-weight: bold;">支付信息</span>

      <div style="display: flex;flex-direction: row;">

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 1;">
          <span style="color: #9b9b9b;font-size: 13px;">
            交易状态:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: #19AA29;">
          {{statusFormat}}
          </span>
        </div>

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 3;">
          <span style="color: #9b9b9b;font-size: 13px;">
            支付时间:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: black;">
           {{this.orderDetail.payTime}}
          </span>
        </div>

      </div>

    </div>

     <el-divider></el-divider>

   <div style="display: flex;flex-direction: column;height: 60px;">
     <span style="font-size: 13px;font-weight: bold;">买家信息</span>

     <div style="display: flex;flex-direction: row;">

       <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 1;">
         <span style="color: #9b9b9b;font-size: 13px;">
           买家姓名:
         </span>
         <span style="font-size: 13px;margin-left: 5px;color: black;">
         {{nameFormat}}
         </span>
       </div>

       <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 3;">
         <span style="color: #9b9b9b;font-size: 13px;">
           联系电话:
         </span>
         <span style="font-size: 13px;margin-left: 5px;color: black;">
          {{phoneFormat}}
         </span>
       </div>

     </div>

   </div>

    <el-divider></el-divider>

      <span style="font-size: 13px;font-weight: bold;">商品清单</span>


     <el-table  v-loading="loading" :data="orderList" style="margin-top: 20px;" :cell-style="cellStyle">
       <el-table-column label="商品类型" align="center" prop="orderType" width="140" :formatter="getType"/>
       <el-table-column label="商品名称" align="center" prop="bizName" width="180"/>
       <el-table-column label="商品规格" align="center" prop="formatName" width="260"/>
       <el-table-column label="原价" align="center" prop="originalPrice" width="120"  :formatter="priceFormate"/>
       <el-table-column label="优惠额" align="center" prop="shopPreferentialPrice" width="120"  :formatter="priceFormate2"/>
       <el-table-column label="成交金额" align="center" prop="transactionPrice" width="120"  :formatter="priceFormate3"/>
       <el-table-column label="平台服务费" align="center" prop="platformServicePrice"  fixed-width  :formatter="priceFormate4"/>

     </el-table>

      <el-divider></el-divider>



     <span style="font-size: 13px;font-weight: bold;">订单评价</span>

    <div v-for="(item,index) in commentList" :key='index'>
      <el-card shadow="hover" style="border-radius: 0 4px 4px 4px;margin-top: 20px;height: 140px;padding: 20px;">

        <div style="display: flex;flex-direction: row;">
          <!-- 头像 -->
          <div style="display: flex;flex: 1;">
            <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
          </div>

          <!-- 信息 -->
          <div style="display: flex;flex-direction: column;flex: 15;margin-left: 8px;">
            <span style="font-size: 13px;color: black;">**浩</span>
            <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
              {{item.createTime}}
            </span>
            <span style="font-size: 13px;margin-top: 10px;color: black;">
              {{item.comment}}
            </span>

            <div style="display: flex;flex-direction: row;font-size: 13px;margin-top: 10px;">
              <span style="color: #9b9b9b;">来自商品</span>
              <span style="color: #19AA29;">{{item.goodName}}</span>
            </div>

          </div>


          <!-- 评分回复 -->
          <div style="display: flex;flex-direction: column;justify-content: space-around;height: 100px;align-items: flex-end;">
            <el-rate v-model="rate" :colors="colors" disabled></el-rate>
            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 40px;color: #19AA29;cursor: pointer;" v-if="index!=3" @click="toComment">
              <i class="el-icon-chat-dot-square" style="margin-top: 5px;margin-right: 3px;"></i>
              <span style="font-size: 13px">回复</span>
            </div>

            <div style="margin-top: 40px;display: flex;flex-direction: row;align-items: center;" v-if="index==3">
              <div style="display: flex;flex-direction: row;align-items: center;color: #19AA29;cursor: pointer;" @click="viewComment()">
                <i class="el-icon-view" style="margin-top: 5px;margin-right: 3px;"></i>
                <span style="font-size: 13px">查看回复</span>
              </div>

              <span style="font-size: 13px;margin-left: 10px;color: #9b9b9b;">已回复</span>
            </div>


          </div>
        </div>

      </el-card>
    </div>

     <pagination
       style=""
       v-show="total>0"
       :total="total"
       :page.sync="pageNum"
       :limit.sync="pageSize"
       @pagination="getData"
     />


    <!-- 评论框 -->
    <el-dialog :title="title" :visible.sync="openComment" width="600px" append-to-body class="my-dialog">

     <span style="font-size: 14px;">评论内容</span>
      <el-card shadow="never" style="border-radius: 0 4px 4px 4px;margin-top: 10px;height: 120px;padding: 20px;"class="card-body">

        <div style="display: flex;flex-direction: row;">
          <!-- 头像 -->
          <div style="display: flex;flex: 1;">
            <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
          </div>

          <!-- 信息 -->
          <div style="display: flex;flex-direction: column;flex: 15;margin-left: 8px;">
            <span style="font-size: 13px;color: black;">**浩</span>
            <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
              2020年08月08日 14:23:00
            </span>
            <span style="font-size: 13px;margin-top: 10px;color: black;">
              这是评论这是评论这是评论
            </span>

          </div>


          <!-- 评分回复 -->
          <div style="display: flex;flex-direction: column;justify-content: space-around;height: 60px;align-items: flex-end;">
            <el-rate v-model="rate" :colors="colors" disabled></el-rate>
             <span style="font-size: 13px;margin-top: 40px;color: black;">

             </span>
          </div>

        </div>

      </el-card>

      <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
        <span style="font-size: 14px;">
          回复内容
        </span>
        <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 5px;">
          <img src="../../../assets/images/lablepng.png" style="width: 14px;height: 14px;" />
        </el-tooltip>
      </div>

      <el-input
        class="my-input"
        style="margin-top: 10px;"
        type="textarea"
        :rows="8"
        placeholder="请输入1-500字的回复内容"
        v-model="comment">
      </el-input>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitComment">提 交</el-button>
        <el-button @click="cancelComment">关 闭</el-button>
      </div>
    </el-dialog>



   <el-drawer
     :visible.sync="drawer"
     :with-header="false"
     direction="rtl"
     size="25%">
     <template>
       <slot name="=title">
         <div style="margin: 20px;color: black;display: flex;flex-direction: row;align-items: center;font-weight: bold;">
           <i class="el-icon-close" style="color: black;font-size: 18px;font-weight: bold;margin-top: 3px;" @click="closeDrawer"></i>
           <span style="margin-left: 5px;">查看评论</span>
         </div>

       </slot>
     </template>


     <div style="display: flex;flex-direction: row;padding-left: 10px;padding-right: 10px;">
       <!-- 头像 -->
       <div style="display: flex;flex: 1;">
         <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
       </div>

       <!-- 信息 -->
       <div style="display: flex;flex-direction: column;flex: 15;margin-left: 8px;">
         <span style="font-size: 13px;color: black;">**浩</span>
         <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
           2020年08月08日 14:23:00
         </span>
         <span style="font-size: 13px;margin-top: 10px;color: black;">
           这是评论这是评论这是评论
         </span>

       </div>


       <!-- 评分回复 -->
       <div style="display: flex;flex-direction: column;justify-content: space-around;height: 60px;align-items: flex-end;">
         <el-rate v-model="rate" :colors="colors" disabled></el-rate>
         <span style="font-size: 13px;margin-top: 40px;color: black;">

         </span>
       </div>
     </div>

      <div style="margin-left: 60px;margin-right: 10px;">
        <el-divider></el-divider>

         <el-card style="height: 90px;border-radius: 0 4px 4px 4px;margin-top: 20px;background-color: #dfeaff;padding: 0;" class="card-body">
           <div style="display: flex;flex-direction: column;padding: 10px;">
             <span style="font-size: 13px;color: #2b70ff;font-weight: bold;">您的回复: </span>
             <span style="font-size: 13px;margin-top: 10px;color: #2b70ff;">感谢您的意见，我们会积极改善</span>
             <span style="font-size: 12px;margin-top: 10px;color: #8caeff;">
                2020年08月08日 14:23:00
             </span>

           </div>

         </el-card>

      </div>


   </el-drawer>


  </el-card>

   <bottom-card moduleName="功能" pagesName="订单详情" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>

    import {orderDetail,commentList} from "@/api/function/function";
     import bottomCard from '@/components/bottomCard'

  export default {
    name: "OrderDetail",

    components: {
     bottomCard
    },

    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        data:null,
        orderList:[],
        rate:1,
        colors: ['#19AA29'],
        loading:false,
        total:null,
        drawer: false,
        openComment:false,
        comment:null,
        orderDetail:{},
        goodsTypeList:[],
        goodsList:[],
        commentList:[],
        rateList:["全部","1分","2分","3分","4分","5分"],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          orderId:null
        },
      };
    },

    activated() {

    },

    created() {
     this.data = this.$route.query.data
     console.log(this.data)
     // let item={
     //   orderType:this.data.orderType,
     //   bizName:this.data.bizName,
     //   formatName:this.data.formatName,
     //   originalPrice:this.data.originalPrice,
     //   shopPreferentialPrice:this.data.shopPreferentialPrice,
     //   transactionPrice:this.data.transactionPrice,
     //   platformServicePrice:this.data.platformServicePrice
     // }
     // this.orderList.push(item)

     // 从前页过来
     if(this.data!=undefined){
       this.getDetail(this.data)
       this.getData(this.data);
     }
     else{
       this.getDetail2(this.data)
     }


    },




    computed:{
      nameFormat(){
        return this.hidden(this.orderDetail.userName,0,1)
      },


      phoneFormat(){
        return this.hidden(this.orderDetail.userMobile,4,4)
      },

      statusFormat(){
        if(this.orderDetail.orderStatus==0){
          return "待支付"
        }
        else if(this.orderDetail.orderStatus==1){
          return "交易成功"
        }
        else if(this.orderDetail.orderStatus==-1){
          return "交易失败"
        }
        else if(this.orderDetail.orderStatus==-2){
          return "交易过期"
        }

      },




    },



    methods: {


      getDetail(orderId){
        let data={
          orderId:orderId
        }
        orderDetail(data).then(response => {
          this.orderDetail=response.data
          let item={
            orderType:this.orderDetail.orderType,
            bizName:this.orderDetail.bizName,
            formatName:this.orderDetail.formatName,
            originalPrice:this.orderDetail.originalPrice,
            shopPreferentialPrice:this.orderDetail.shopPreferentialPrice,
            transactionPrice:this.orderDetail.transactionPrice,
            platformServicePrice:this.orderDetail.platformServicePrice
          }
           this.orderList.push(item)

        });
      },

      getData(param){
        this.queryParams.orderId=param.orderId
        commentList(this.queryParams).then(response => {
           this.commentList=response.rows
        });

      },


      hidden(str,frontLen,endLen) {
            var len = str.length-frontLen-endLen;
            var xing = '';
            for (var i=0;i<len;i++) {
            xing+='*';
           }
            return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
      },



      // 修改列表字体颜色
      cellStyle(row){
        if(row.column.label==="商品名称"){
              return 'color: #19AA29;'
          }
      },

      getType(row, column) {
                if(row.orderType==1){
                  return "海报"
                }
                else if(row.orderType==2){
                  return "活动方案"
                }
                else if(row.orderType==3){
                  return "课程"
                }
              },



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

      priceFormate4(row, column){

        if(row.platformServicePrice!=null){
          return ("￥"+(parseInt(row.platformServicePrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }

      },


      chooseComment(index){
        this.selectedIndex=index
      },

      chooseRate(index){
        this.rateIndex=index
      },

      refresh(){

      },

      viewComment(){
       this.drawer=true
      },

      closeDrawer(){
        this.drawer=false
      },

      toComment(){
        this.openComment=true
        this.title="回复评论"
      },

      submitComment(){

      },

      cancelComment(){
        this.openComment=false
      },



       goBack(){
        this.$router.go(-1);
       }
    },
  };



</script>

<style scoped>

  .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }

  .my-header/deep/.el-icon-back{
    font-size: 20px;
    margin-right: -6px;
    -ms-flex-item-align: center;
    align-self: center;
  }

  .my-input/deep/.el-textarea__inner{
        background-color: #f7f7f7;
     }

    .card-body/deep/.el-card__body{
      padding: 0;
    }

    .my-dialog/deep/.el-dialog__body{
      padding-top: 10px;
    }

  ::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
  }

  .my-input/deep/.el-input__inner{
       background-color: #f7f7f7;
    }

   .card-body/deep/.el-card__body{
     padding: 0;
   }

   .selected-shop{
     background-color: #19AA29;
     color: white;
   }

   .selected-rate{
     background-color: #19AA29;
     color: white;
   }

   .unselect-rate{
     background-color: #f7f7f7;
     color: #a7a2a9;
   }
</style>
