<template>

  <div class="app-container home">
    <H4 style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      资金
    </H4>



    <el-row :gutter="20" style="padding-top: 10px;display: flex;">
      <el-col :span="8">
        <el-card class="update-log" style="height: 100px;">
          <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 5px;">
            <!-- 左边 -->
            <div>
              <div style="display: flex;flex-direction: row;align-items: center;">
                <span style="font-size: 12px;color: black;font-weight: bold;">
                  已结算金额
                </span>
                <el-tooltip content="平台已结算到指定收款银行卡的金额" placement="top" style="margin-left: 10px;">
                  <img src="../../../assets/images/lablepng.png" style="width: 14px;height: 14px;" />
                </el-tooltip>
              </div>

              <div style="display: flex;flex-direction: row;margin-top: 10px;">
                <span style="font-size: 12px; margin-top: 12px;margin-top: 22px;">￥</span>
                <span v-if="view1" style="font-size: 24px; margin-top: 12px;">{{moneyData.settledAccount}}</span>
                <span v-if="!view1" style="font-size: 24px; margin-top: 12px;">{{settledAccountFormat}}</span>
              </div>

            </div>

            <!-- 右边 -->
            <div>
              <i class="el-icon-view" @click="hideOrViewsettledAccount"></i>

            </div>

          </div>


        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="update-log" style="height: 100px;">
          <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 5px;">
            <!-- 左边 -->
            <div>
              <div style="display: flex;flex-direction: row;align-items: center;">
                <span style="font-size: 12px;color: black;font-weight: bold;">
                  待结算金额
                </span>
                <el-tooltip content="平台定期结算上一周期的资金" placement="top" style="margin-left: 10px;">
                  <img src="../../../assets/images/lablepng.png" style="width: 14px;height: 14px;" />
                </el-tooltip>
              </div>

              <div style="display: flex;flex-direction: row;margin-top: 10px;">
                <span style="font-size: 12px; margin-top: 12px;margin-top: 22px;">￥</span>
                <span v-if="view2" style="font-size: 24px; margin-top: 12px;">{{moneyData.beSettledAccount}}</span>
                <span v-if="!view2" style="font-size: 24px; margin-top: 12px;">{{beSettledAccountFormat}}</span>
              </div>

            </div>

            <!-- 右边 -->
            <div>
              <i class="el-icon-view" @click="hideOrViewbeSettledAccount"></i>

            </div>

          </div>


        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="update-log" style="height: 100px;">
          <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 5px;">
            <!-- 左边 -->
            <div>
              <div style="display: flex;flex-direction: row;align-items: center;">
                <span style="font-size: 12px;color: black;font-weight: bold;">
                  收款银行卡
                </span>
                <el-tooltip content="在结算时，平台将资金结算至设置的收款银行卡" placement="top" style="margin-left: 10px;">
                  <img src="../../../assets/images/lablepng.png" style="width: 14px;height: 14px;" />
                </el-tooltip>
              </div>

              <div style="display: flex;flex-direction: row;margin-top: 10px;">
                <span style="font-size: 24px; margin-top: 12px;">{{moneyData.bankCardNumber}}</span>
              </div>

            </div>

            <!-- 右边 -->
            <div>
              <el-button
                style="background-color: white;color:#19AA29;float: right;border: #19AA29 solid 1px;margin-top: 32px;"
                plain icon="el-icon-setting" size="small" @click="handleSetting">设置</el-button>

            </div>

          </div>


        </el-card>
      </el-col>

    </el-row>



    <!-- 资金列表 -->
    <div style="display: flex;flex-direction: row;margin-top: 20px;">

      <div class="button-border"
        style="font-size: 12px;width: 100px;height: 40px; display: flex; align-items: center; justify-content: center;"
        :class="state1 === false?'color2':'color1'" @click="switchData(1)">
        账户流水
      </div>
      <div class="button-border"
        style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;"
        :class="state2 === false?'color2':'color1'" @click="switchData(2)">
        结算记录
      </div>

    </div>

   <!-- 账户流水 -->

   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;" >

     <div v-show="state1">
      <div>
        <el-date-picker
             :style="{width:'240px'}"
             v-model="selectTime"
             type="daterange"
             range-separator="至"
              format="yyyy-MM-dd"
             value-format="yyyy-MM-dd"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
              @change="queryTime"
             >
           </el-date-picker>
        <el-input
          style="width: 200px;margin-left: 10px;"
          v-model="queryParams.orderNum"
          placeholder="可输入订单编号进行搜索"
          maxlength="30"
          clearable
          size="medium"
          @change="queryOrderNum"
        />

        <el-button
          style="background-color: white;color:#19AA29;float: right;border: #19AA29 solid 1px;"
          plain
          icon="el-icon-download"
          size="small"
          @click="handleExportMoney"
        >导出</el-button>



      </div>

      <el-table  v-loading="loading" :data="moneyList" style="margin-top: 20px;" :cell-style="cellStyle" id="table1">
        <el-table-column label="交易时间" align="left" prop="createTime" width="200" sortable/>
        <el-table-column label="流水号" align="left" prop="sysSerialNumber" width="200"/>
        <el-table-column label="业务类型" align="left" prop="businessType" width="180" :formatter="typeFormate">
          <template slot="header" slot-scope="scope">
            <span>业务类型</span>
             <el-popover placement='bottom' width='160'  v-model="visible">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-checkbox-group v-model="TypeList" style="display: flex;flex-direction: column;align-items: flex-start;height: 120px;">
                     <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.id" v-for="(item,index) in businessTypeList" :key="index">{{item.name}}</el-checkbox>
                   </el-checkbox-group>
                  <div class='el-table-filter__bottom'>
                      <button :class="TypeList.length>0?'':'is-disabled'" @click="SearchTypehName">筛选</button>
                      <button @click="clearSearchTypeName">重置</button>
                  </div>
             </el-popover>
          </template>

        </el-table-column>

        <el-table-column label="订单编号" align="left" prop="orderNum" width="280" :formatter="orderNumFormate"/>
        <el-table-column label="收支金额" align="center" prop="bookkeepingPrice" width="120"  :formatter="priceFormate"/>
        <el-table-column label="账户余额" align="center" prop="accountBalance" width="120"  :formatter="priceFormate2"/>

        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <router-link :to="{name:'ViewMoney',path: '/manage/ViewMoney',query:{ data: scope.row }}" >
            <el-button
              size="mini"
              type="text"

            >查看</el-button>
             </router-link>
          </template>
        </el-table-column>
      </el-table>



       <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getData"
        />
     </div>


        <div v-show="state2">

          <div >
            <el-date-picker
                 :style="{width:'240px'}"
                 v-model="selectTime2"
                 type="daterange"
                 range-separator="至"
                  format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                  @change="queryTime2"
                 >
               </el-date-picker>
            <el-input
              style="width: 200px;margin-left: 10px;"
              v-model="queryParams2.sysSerialNumber"
              placeholder="可输入流水号进行搜索"
              clearable
              size="medium"
              maxlength="30"
              @change="queryOrderNum2"
            />

            <el-button
              style="background-color: white;color:#19AA29;float: right;border: #19AA29 solid 1px;"
              plain
              icon="el-icon-download"
              size="small"
              @click="handleExportFinance"
            >导出</el-button>

          </div>

          <el-table  v-loading="loading" :data="recordList" style="margin-top: 20px;" id="table2">
            <el-table-column label="结算时间" align="left" prop="createTime" width="320" />
            <el-table-column label="流水号" align="left" prop="sysSerialNumber" width="360"/>
            <el-table-column label="结算金额" align="center" prop="settlementAmount" width="140" :formatter="priceFormate3"/>
            <el-table-column label="收款银行卡" align="left" prop="bankCardNumber" width="200" :formatter="bankFormate"/>

            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <router-link :to="{name:'ViewRecord',path: '/manage/ViewRecord',query:{ data: scope.row.id}}" >
                <el-button
                  size="mini"
                  type="text"

                >查看</el-button>
                 </router-link>
              </template>
            </el-table-column>
          </el-table>



           <pagination
              v-show="total2>0"
              :total="total2"
              :page.sync="queryParams2.pageNum"
              :limit.sync="queryParams2.pageSize"
              @pagination="getData"
            />

        </div>




    </el-card>



    <el-dialog :title="title" :visible.sync="opemSetting" width="500px" append-to-body>
      <el-form ref="cardform" :model="cardform" :rules="rules"  label-width="120px">

        <el-form-item label="开户行" prop="openAccountBank" class="lable-text">
          <el-input v-model="cardform.openAccountBank" placeholder="请输入银行卡的开户行" maxlength="24" class="my-input"/>
        </el-form-item>


        <el-form-item label="开户支行" prop="openAccountBranchBank" class="lable-text">
          <el-input v-model="cardform.openAccountBranchBank" placeholder="请输入银行卡的开户支行" maxlength="24" class="my-input"/>
        </el-form-item>

        <el-form-item label="银行卡号" prop="bankCardNumber" class="lable-text">
          <el-input v-model="cardform.bankCardNumber" placeholder="请输入银行卡号" maxlength="24" class="my-input"/>
        </el-form-item>


        <el-form-item label="短信验证码" prop="verificationCode" class="lable-text">
          <el-input v-model="cardform.verificationCode" placeholder="请输入6位验证码" maxlength="6" class="my-input">
            <template>
               <slot slot="suffix" class="input-slot">
                 <div style="cursor: pointer;" @click="sendYzm">
                   <i class="el-icon-message" style=" color: #19AA29;"></i>
                   <span style="margin-left: 5px;font-size: 13px; color: #19AA29;">{{yzm}}</span>
                 </div>

               </slot>
            </template>
          </el-input>
          <span style="font-size: 13px;">验证码将发送给18888888888</span>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBank()">提 交</el-button>
        <el-button @click="cancelBank()">关 闭</el-button>
      </div>
    </el-dialog>

    <bottom-card moduleName="管理" pagesName="资金" style="margin-top: 20px;"></bottom-card>

  </div>




</template>

<script>
    import bottomCard from '@/components/bottomCard'
  import {settlementList,serialNumberList,exportFinance,exportSerialNumber,accountInfo,sendBankSms,setbankCardInfo} from "@/api/manage/money";
    import Cookies from "js-cookie";
  export default {
    components: {
     bottomCard
    },

    data() {
      return {
        imgList: [],
        form: {},
        state1: true,
        state2: false,
        visible: false,
        opemSetting:false,
        exportLoading: false,
        total:10,
        total2:10,
        title:null,
        loading:false,
        selectTime:[],
        selectTime2:[],
        filterList:[],
        moneyList:[],
        recordList:[],
        cardform:{},
        searchName:'',
        yzmCode:null,
        yzm:"发送验证码",
        second: 60,
        view1:false,
        view2:false,

        moneyData:{
          bankCardNumber:'',
          beSettledAccount:'',
          settledAccount:''
        },

        queryParams:{
          searchStartTime:null,
          searchEndTime:null,
          orderNum:null,
          businessTypes:null,
          pageNum: 1,
          pageSize: 10
        },
        queryParams2:{
          searchStartTime:null,
          searchEndTime:null,
          sysSerialNumber:null,
          pageNum: 1,
          pageSize: 10
        },

        TypeList:[],
        businessTypeList:[
          {
            id:1300,
            name:"收款"
          },
          {
            id:1400,
            name:"退款"
          },
          {
            id:1500,
            name:"结算"
          }
        ],


        rules: {
          openAccountBank: [{
            required: true,
            message: '请输入2~24个字符的开户行',
            trigger: 'change'
          }],
          openAccountBranchBank: [{
            required: true,
            message: '请输入2~24个字符的开户支行',
            trigger: 'change'
          }],
          bankCardNumber: [{
            required: true,
            message: '请输入15~18位的银行卡号',
            trigger: 'change'
          },
          { type: 'number', message: '银行卡号必须为数字'}
          ],
          verificationCode: [{
            required: true,
            message: '请输入6位短信验证码',
            trigger: 'change'
          }]
        },


      };
    },

    computed:{
     settledAccountFormat(){
      return this.hidden(this.moneyData.settledAccount,0,0)
     },
     beSettledAccountFormat(){
      return this.hidden(this.moneyData.beSettledAccount,0,0)
     }

    },


    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
       this.queryParams2.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },


    created() {

      this.GetDateStr(-30)
      this.dateFormat(new Date().getTime())


      this.GetDateStr2(-30)
      this.dateFormat2(new Date().getTime())



      this.getserialNumberList();
      this.getsettlementList()
      this.getData();

    },

    methods:{

      // 获取今天的日期
      dateFormat(time){
          var date = new Date(time);
          var YY = date.getFullYear() + '-';
          var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

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


       // 获取今天的日期
      dateFormat2(time){
          var date = new Date(time);
          var YY = date.getFullYear() + '-';
          var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
          console.log(YY+MM+DD)
          this.selectTime2.push(YY+MM+DD)

          this.queryParams2.searchStartTime=this.selectTime2[0]
          this.queryParams2.searchEndTime=this.selectTime2[1]

      },
      // 获取今天之后的30天
      GetDateStr2(AddDayCount){
         var  dd =  new  Date();
         dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
         var  y = dd.getFullYear();
         var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
         var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
         this.selectTime2.push(y+ "-" +m+ "-" +d)
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


      hideOrViewsettledAccount(){
        this.view1=!this.view1
      },

      hideOrViewbeSettledAccount(){
        this.view2=!this.view2
      },




      // 流水时间搜索
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

        this.getserialNumberList();


      },

      // 流水订单号查询
      queryOrderNum(value){
        if(value==""||value==null){
          this.queryParams.orderNum=null
        }
        this.getserialNumberList();
      },


      // 结算时间搜索
      queryTime2(){
        console.log(this.selectTime2)
        if(this.selectTime2!=null){
          this.queryParams2.searchStartTime=this.selectTime2[0]
          this.queryParams2.searchEndTime=this.selectTime2[1]
        }
        else{
          this.queryParams2.searchStartTime=null
          this.queryParams2.searchEndTime=null
        }
        this.getsettlementList()

      },

      // 结算订单号查询
      queryOrderNum2(value){
       if(value==""||value==null){
         this.queryParams2.sysSerialNumber=null
       }
        this.getsettlementList()
      },






      getserialNumberList(){
        serialNumberList(this.queryParams).then(response => {
          this.moneyList=response.rows
        });
      },


      getsettlementList(){
        settlementList(this.queryParams2).then(response => {
          // this.moneyList=response.rows
          this.recordList=response.rows
        });
      },


      getData(){
        accountInfo(this.queryParams).then(response => {
          console.log(response)
          this.moneyData=response.data
        });
      },



      sendYzm(){
      if(this.yzm!="发送验证码"){
        return;
      }
       let data={
         mobileNumber:18912347777
       }
       sendBankSms(data).then(response => {
        console.log(response)
        this.cardform.uuid=response.data.uuid
        var interval = setInterval(() => {
          let times = --this.second
          this.second = times < 10 ? '0' + times : times ,//小于10秒补 0
          this.yzm=this.second+"秒后重新获取"
        }, 1000)
        setTimeout(() => {
          clearInterval(interval)
          this.second = 60
          this.yzm="发送验证码"
        }, 60000)
       });
      },


      switchData(index) {
        if (index == 1) {
          this.state1 = true
          this.state2 = false

        } else if (index == 2) {
          this.state1 = false
          this.state2 = true

        }


      },

      // 修改列表字体颜色
      cellStyle(row){
         if(row.column.label==="收支金额"){
                if(row.row.bookkeepingPrice.indexOf('-')==-1){
                  return 'color: #19AA29;'
                }
                else{
                  return 'color: #ea5150;'
                }

           }
      },


      orderNumFormate(row, column){
        if(row.orderNum==null){
          return "-"
        }
        else{
          return row.orderNum
        }
      },


      typeFormate(row, column){
        if(row.businessType==1300){
          return "收款"
        }
        else if(row.businessType==1400){
           return "退款"
        }
        else if(row.businessType==1500){
           return "结算"
        }
      },


      priceFormate(row, column){
         if(row.bookkeepingPrice!=null){
           return ("￥"+(parseInt(row.bookkeepingPrice)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }


       },

      priceFormate2(row, column){
        if(row.accountBalance!=null){
          return ("￥"+(parseInt(row.accountBalance)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }


      },


      priceFormate3(row, column){
        if(row.settlementAmount!=null){
          return ("￥"+(parseInt(row.settlementAmount)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }


      },


      bankFormate(row, column){
        if(row.bankCardNumber!=null){
           return (this.hidden(row.bankCardNumber,4,4))
        }
      },


      // 搜索类型
      SearchTypehName(){
        var typeArray=[]
        for (var i = 0; i < this.TypeList.length; i++) {
          typeArray.push(this.TypeList[i])
        }
        this.queryParams.businessTypes=typeArray.toString()
        this.visible=false
        this.getserialNumberList();
      },

      // 重置类型
      clearSearchTypeName(){
        this.TypeList=[]
        this.queryParams.businessTypes=null
        this.visible=false
        this.getserialNumberList();
      },




      // 导出流水
      handleExportMoney(){
        this.$confirm('是否确认导出所有流水数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.loading = true;
            return exportSerialNumber();
          }).then(response => {
            this.download(response.msg);
            this.loading = false;
          }).catch(() => {});
      },

      handleExportFinance(){
        this.$confirm('是否确认导出所有结算数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.loading = true;
            return exportFinance();
          }).then(response => {
            this.download(response.msg);
            this.loading = false;
          }).catch(() => {});
      },


      handleSetting() {
        this.opemSetting=true
        this.title="设置收款银行卡"
      },

      submitBank(){
       setbankCardInfo(this.cardform).then(response => {
         console.log(response)
         this.getData();
         this.opemSetting=false
         this.restBank()
       });
      },

      cancelBank(){
        this.opemSetting=false
        this.restBank()
      },

      restBank(){
        this.cardform={
          openAccountBank:null,
          openAccountBranchBank:null,
          bankCardNumber:null,
          verificationCode:null
        }
         this.resetForm("cardform");
      }

    }

  }


</script>

<style scoped>

 .el-row {
   margin-bottom: 20px;
 }

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


  .lable-text/deep/.el-form-item__label {
    text-align: left;
    font-weight: 500;
  }



</style>
