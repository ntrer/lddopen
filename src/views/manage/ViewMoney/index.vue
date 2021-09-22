<template>
  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">查看流水</span>
  </el-page-header>


  <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">

    <div style="height: 60px;display: flex;flex-direction: column;justify-content: center;">
      <span style="font-size: 16px;">
        流水号:{{data.sysSerialNumber}}
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
      <span style="font-size: 13px;font-weight: bold;">流水信息</span>

      <div style="display: flex;flex-direction: row;">

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 1;align-items: center;">
          <span style="color: #9b9b9b;font-size: 13px;">
            业务类型:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: black;">
          {{typeFormat}}
          </span>
        </div>

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 1;align-items: center;">
          <span style="color: #9b9b9b;font-size: 13px;">
            收支金额:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: #ea5150;" v-if="data.bookkeepingPrice.indexOf('-')!=-1">
           ￥{{data.bookkeepingPrice}}
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: #19AA29;"v-if="data.bookkeepingPrice.indexOf('-')==-1">
           ￥{{data.bookkeepingPrice}}
          </span>
        </div>

        <div style="display: flex;flex-direction: row;margin-top: 20px;flex: 2;align-items: center;">
          <span style="color: #9b9b9b;font-size: 13px;">
            账户余额:
          </span>
          <span style="font-size: 13px;margin-left: 5px;color: black;">
           ￥{{data.accountBalance }}
          </span>
        </div>

      </div>

    </div>

     <el-divider></el-divider>



      <span style="font-size: 13px;font-weight: bold;">订单资金信息</span>

     <el-table  v-loading="loading" :data="orderInfoList" style="margin-top: 20px;" :cell-style="cellStyle">
       <el-table-column label="订单编号" align="left" prop="orderNum" width="260" />
       <el-table-column label="原价" align="center" prop="originalPrice" width="200"  :formatter="priceFormate"/>
       <el-table-column label="优惠金额" align="right" prop="shopPreferentialPrice" width="200"  :formatter="priceFormate2"/>
       <el-table-column label="成交金额" align="right" prop="transactionPrice" width="200"  :formatter="priceFormate3">
         <template slot="header" slot-scope="scope">
                 <span>成交金额</span>
                 <el-tooltip content="成交金额=原价-优惠金额" placement="top" style="margin-left: 5px;">
                   <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                 </el-tooltip>
               </template>
        </el-table-column>
       <el-table-column label="平台服务费" align="right" prop="platformServicePrice" width="200"   :formatter="priceFormate4">
         <template slot="header" slot-scope="scope">
                 <span>平台服务费</span>
                 <el-tooltip content="成交时，根据约定的比例收取的费用" placement="top" style="margin-left: 5px;">
                   <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                 </el-tooltip>
               </template>
       </el-table-column>
       <el-table-column label="实收净额" align="right" prop="actualPaymentPrice" width="200" fixed-width  :formatter="priceFormate5">
          <template slot="header" slot-scope="scope">
                  <span>实收净额</span>
                  <el-tooltip content="最终可结算的金额" placement="top" style="margin-left: 5px;">
                    <i class="el-self-iconQuestion" style="font-size: 13px;color: #ccc;"></i>
                  </el-tooltip>
                </template>
       </el-table-column>

     </el-table>


  </el-card>

  </div>
</template>

<script>

      import {serialNumberDetails} from "@/api/manage/money";

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

    created() {
     this.data = this.$route.query.data
     this.getData(this.data.id);
    },


    computed:{
      typeFormat(){
        if(this.data.businessType==1300){
          return "收款"
        }
        else if(this.data.businessType==1400){
           return "退款"
        }
        else if(this.data.businessType==1500){
           return "结算"
        }
      }
    },

    methods: {

      getData(id){
        let data={
          serialNumberId:id,
        }

        serialNumberDetails(data).then(response => {
          console.log(response)
          this.data=response.data.serialNumber
          this.orderInfoList=response.data.list
        });

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
