<template>
  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">查看结算记录</span>
  </el-page-header>


  <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">

    <div style="height: 60px;display: flex;flex-direction: column;justify-content: center;">
      <span style="font-size: 16px;">
        流水号: {{getsysSerialNumber}}
      </span>

      <div style="display: flex;flex-direction: row;margin-top: 20px;align-items: center;">
        <span style="color: #9b9b9b;font-size: 13px;">
          交易时间:
        </span>
        <span style="font-size: 13px;margin-left: 5px;color: black;">
         {{data.createTime}}
        </span>
      </div>

    </div>

    <el-divider></el-divider>

    <div style="display: flex;flex-direction: column;height: 60px;">
      <span style="font-size: 13px;font-weight: bold;">结算信息</span>

      <div style="display: flex;flex-direction: row;">

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 1;align-items: center;">
          <span style="color: #9b9b9b;font-size: 13px;">
            收款账户:
          </span>
          <div style="display: flex;flex-direction: row;align-items: center;">
            <span style="font-size: 13px;margin-left: 5px;color: black;">
            {{getBankNumber}}
            </span>
            <el-tooltip content="根据当时设置的收款银行卡进行结算" placement="top">
              <i class="el-self-iconQuestion" style="font-size: 14px;color: #ccc;margin-left: 3px;"></i>
            </el-tooltip>
          </div>


        </div>

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 3;align-items: center;">
          <span style="color: #9b9b9b;font-size: 13px;">
            结算金额:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: black;">
           {{getsettlementAmount}}
          </span>
        </div>


      </div>

    </div>

     <el-divider></el-divider>



      <span style="font-size: 13px;font-weight: bold;">结算订单信息</span>

     <el-table  v-loading="loading" :data="orderInfoList" style="margin-top: 20px;" :cell-style="cellStyle">
       <el-table-column label="交易时间" align="left" prop="orderTimeFormat" width="200" />
       <el-table-column label="订单编号" align="left" prop="orderNum" width="260" />
       <el-table-column label="原价" align="center" prop="originalPrice" width="180"  :formatter="priceFormate"/>
       <el-table-column label="优惠金额" align="right" prop="preferentialPrice" width="180"  :formatter="priceFormate2">
       </el-table-column>
       <el-table-column label="成交金额" align="right" prop="transactionPrice" width="180"  :formatter="priceFormate3">
         <template slot="header" slot-scope="scope">
                 <span>成交金额</span>
                 <el-tooltip content="成交金额=原价-优惠金额" placement="top" style="margin-left: 5px;">
                   <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                 </el-tooltip>
               </template>
        </el-table-column>
       <el-table-column label="平台服务费" align="right" prop="platformServicePrice" width="180"   :formatter="priceFormate4">
         <template slot="header" slot-scope="scope">
                 <span>平台服务费</span>
                 <el-tooltip content="成交时，根据约定的比例收取的费用" placement="top" style="margin-left: 5px;">
                   <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                 </el-tooltip>
               </template>
       </el-table-column>
       <el-table-column label="结算金额" align="right" prop="actualPaymentPrice" width="180"  fixed-width  :formatter="priceFormate5">
          <template slot="header" slot-scope="scope">
                  <span>结算金额</span>
                  <el-tooltip content="最终该笔订单结算的金额" placement="top" style="margin-left: 5px;">
                    <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                  </el-tooltip>
                </template>
       </el-table-column>

     </el-table>


  </el-card>

  </div>
</template>

<script>
  import {settlementDetails} from "@/api/manage/money";
  export default {
    name: "index",

    components: {

    },

    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        data:null,
        orderInfoList:[],
      };
    },

    computed:{
      getBankNumber(){
        return this.hidden(this.data.bankCardNumber,4,4)
      },

      getsysSerialNumber(){
        return "#${"+this.data.sysSerialNumber+"}"
      },

      getsettlementAmount(){
       return ("￥"+(parseInt(this.data.settlementAmount)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
      }
    },

    created() {
     this.data = this.$route.query.data
     this.getData(this.data);
    },

    methods: {
      
      // 修改列表字体颜色
      cellStyle(row){
        if(row.column.label==="订单编号"){
              return 'color: #19AA29;'
          }
      },


      // 显示隐藏
      hidden(str,frontLen,endLen) {
            var len = str.length-frontLen-endLen;
            var xing = '';
            for (var i=0;i<len;i++) {
            xing+='*';
           }
            return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
      },


      getData(id){
        let data={
          settlementId:id,
        }

        settlementDetails(data).then(response => {
          console.log(response)
          this.data=response.data.settlement
          this.orderInfoList=response.data.list
        });


      },


      priceFormate(row, column){
         if(row.originalPrice!=null){
           return ("￥"+(parseInt(row.originalPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }


       },

      priceFormate2(row, column){
        if(row.preferentialPrice!=null){
          return ("￥"+(parseInt(row.preferentialPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
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

      priceFormate5(row, column){
        if(row.actualPaymentPrice!=null){
          return ("￥"+(parseInt(row.actualPaymentPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }

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

</style>
