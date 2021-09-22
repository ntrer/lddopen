<template>
  <div class="app-container home">
    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">查看厂商</span>
    </el-page-header>





    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="update-log" style="height: 100%;">

          <div style="width: 100%; height: 140px; margin-top: 10px;display: flex; justify-content: space-between;">

            <div style="width: 50%;height: 120px; display: flex;">
              <img :src="imgUrl" style="height: 120px;width: 100px;object-fit: cover;">
              <div style="display: flex;flex-direction: column; margin-left: 15px;margin-right: 10px;">
                <span style="margin-top: 5px;font-weight: 450;font-size: 14px; ">{{ManufactorName}}</span>

                <div style="margin-top: 20px;font-size: 12px;color: darkgray;">
                  创建时间:
                  <span style="color: #000000; font-weight: 400;">{{createTime}}</span>
                </div>



              </div>


            </div>

            <div >
              <div style="display: flex; flex-direction: row-reverse;">


                <div style="display: flex; width: 26px;height: 26px; border-radius: 5px;border: 1px solid #19AA29;align-items: center;justify-content: center;cursor: pointer;">
              <!--    <div
                    style="width: 65%;height: 100%;display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;border-right: 1px solid #19AA29;">
                    预览
                  </div> -->
                  <el-dropdown style="justify-content: center;color: black;" >
                    <div
                      style=" font-size: 20px; display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;">
                      ‧‧‧
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item style="width: 100px;" v-if="data.sysAuditStatus==0"  @click.native="pushLine(data)">提交上线</el-dropdown-item>
                      <el-dropdown-item v-if="data.sysAuditStatus==1"  @click.native="downLine(data)">下线</el-dropdown-item>
                      <router-link :to="{name:'editCompany',path: '/content/editCompany' ,query:{ dataId: data}}" >
                        <el-dropdown-item >修改</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item v-if="data.sysAuditStatus!=-1" @click.native="reExemine(data)">撤回审核</el-dropdown-item>
                      <el-dropdown-item @click.native="delPro(data)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>



                </div>
              </div>

              <div style="margin-top: 26px;width: 100%;height: 60px;display: flex;flex-direction: row-reverse;">

                <div style="height: 100%;width: 80px; ">
                  <div style=" height: 20px;text-align: right;align-items: center;font-size: 12px;line-height: 20px;">
                    状态
                  </div>
                  <div
                    style="display: flex;align-items: center;flex-direction: row-reverse;height: 40px;color: black;">
                     {{Status}}
                  </div>

                </div>

                <div style="height: 100%;width: 80px; ">
                  <div
                    style=" height: 20px;align-items: center;font-size: 12px;line-height: 20px;display: flex;justify-content: center;">
                    浏览总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                    {{viewNum}}
                  </div>

                </div>



              </div>




            </div>

          </div>
          <div style="">


            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="数据概览" name="first">
                <el-date-picker :style="{width:'240px'}" v-model="selectTime" type="daterange" range-separator="至"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期"  @change="queryTime">
                </el-date-picker>


                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;" @click="getYESTime(1)">昨天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getweek(1)">本周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getshangweek(1)">上周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getmob(1)">本月</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getY30Time(1)">最近30天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="getY60Time(1)">最近60天</span>

                <H6
                  style="font-weight: bold;  display: flex; flex-direction: row; align-items: center;font-size: 14px;margin: 0px;margin-top: 20px;">
                  浏览趋势
                  <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                    <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;">
                    <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
                  </el-tooltip>
                </H6>

                <div id="mapposterD" style="width: 100%;height:326px;"></div>

                <H6
                  style="font-weight: bold;  display: flex; flex-direction: row; align-items: center;font-size: 14px;margin: 0px;margin-top: 20px;">
                  获取电话趋势
                  <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                    <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;">
                    <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
                  </el-tooltip>
                </H6>

                <div id="zztposterD" style="width: 100%;height:326px;"></div>





              </el-tab-pane>

            </el-tabs>

          </div>

        </el-card>
      </el-col>
    </el-row>





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


  <bottom-card moduleName="内容" pagesName="厂商详情" style="margin-top: 20px;"></bottom-card>



  </div>


</template>

<script>

  import {productList,productCount,ProductOppreate,getManufactor,dataOverview} from "@/api/content/manufactor";
  import bottomCard from '@/components/bottomCard'
  export default {
    components: {
     bottomCard
    },
    data() {
      return {
        Status:null,
        ManufactorName:null,
        createTime:null,
        viewNum:0,
        now1 :'',
        nowDayOfWeek1 :'',
        nowDay1 :'',
        nowMonth1 :'',
        nowYear1 :'',
        lastMonthDate1:'',
         lastYear1:'',
          lastMonth1:'',
        dayDateList:[],
        numList:[],

        dayDateList1:[],
        kindList1:[],
        nameList1:[],


       data:{
         sysAuditStatus:0
       },
        filterList:[],
        filterList1:[],
        // 版本号
        drawer: false,
        openComment:false,
        comment:null,
        activeName: 'first',
        selectTime: [],
        selectTime2:'',
        version: "3.6.0",
        activeName: 'first',
        imgUrl: '',
        imgList: [],
        form: {},
        pageNum: 1,
        pageSize: 10,
         total:10,

         pageNum1:1,
         pageSize1:10,
         total1:10,




         rate:1,
         colors: ['#19AA29'],
        tableData: [{


            date: '2016-05-02',
            geshiNum: 'A45465JREKRJ',
            states:1,
            yuanjia:100,
            youhuie:91.2,
            chengjiaojia:8.8,


          }, {
           date: '2018-07-02',
           geshiNum: 'A7658KDSKJD',
           states:2,
           yuanjia:200,
           youhuie:155,
           chengjiaojia:45,
          },],


           tableDatahg: [{
             geshimingchneg:'易拉宝(600*600)',
             wenjiankind:'zip',
             zhuangtai:'1',
             wenjiandaxiao:'16.4mb',
             dangqianjiange:'￥1.4',
             dingdanliang:'1345个',
             chengjiaozongjine:'4767.00',
             youhui:'8907.09',

                  }, {
                   geshimingchneg:'易拉宝(500*600)',
                   wenjiankind:'zip',
                   zhuangtai:'2',
                   wenjiandaxiao:'11.4mb',
                   dangqianjiange:'￥8.4',
                   dingdanliang:'1345个',
                   chengjiaozongjine:'4567.00',
                   youhui:'8907.09',
                  }, {
                   geshimingchneg:'易拉宝(400*600)',
                   wenjiankind:'zip',
                   zhuangtai:'2',
                   wenjiandaxiao:'10.4mb',
                   dangqianjiange:'￥10.4',
                   dingdanliang:'345个',
                   chengjiaozongjine:'445.00',
                   youhui:'8907.09',
                  }],

      };
    },
    mounted() {


    },

    activated() {



    },


    created(){
      this.data = this.$route.query.dataId
      console.log(this.data)
      this.now1 = new Date(); //当前日期
      this.nowDayOfWeek1 = this.now1.getDay(); //今天本周的第几天
      this.nowDay1 = this.now1.getDate(); //当前日
      this.nowMonth1 = this.now1.getMonth(); //当前月
      this.nowYear1 = this.now1.getFullYear(); //当前年

       var lastMonthDate = new Date(); //上月日期
       lastMonthDate.setDate(1);
       lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
       this.lastMonthDate1 = lastMonthDate


       this.lastYear1 = lastMonthDate.getYear();
       this.lastMonth1 = lastMonthDate.getMonth();

      this.GetDateStr(-30)
      this.dateFormat(new Date().getTime())
      this.selectStartTime=this.selectTime[0]
      this.selectEndTime=this.selectTime[1]
      // 从前页进来
      if(this.data!=undefined){

        this.handleDetail(this.data)
      }
      // 从后页返回
      else{

         this.handleDetail2( localStorage.getItem('providersManufactorId'))
      }

      this.getOverView()
    },



    methods: {


      formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
      },


      // 昨天
      getYESTime(e){
        if(e==1){
          this.selectTime = [],
            this.GetDateStr(-1)
            this.GetDateStr(-1)
          this.getOverView()

        }
      },


      // 本周
        getweek(e){
          if(e==1){
            if(this.nowDayOfWeek1 == 1){

              var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
               var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
                console.log(this.formatDate(weekStartDate))
              console.log(this.formatDate(weekEndDate))
              this.selectTime = [],
              this.selectTime.push(this.formatDate(weekStartDate))
              this.selectTime.push(this.formatDate(weekEndDate))

              this.getOverView()

            }else{

              var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);

              console.log(this.formatDate(weekStartDate))
              this.selectTime = [],
              this.selectTime.push(this.formatDate(weekStartDate))
              this.GetDateStr(-1)

             this.getOverView()

            }
          }
        },


        // 上周
        getshangweek(e){
         if(e==1){
          var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
         var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
          console.log(this.formatDate(weekStartDate))
        console.log(this.formatDate(weekEndDate))
        this.selectTime = [],
        this.selectTime.push(this.formatDate(weekStartDate))
        this.selectTime.push(this.formatDate(weekEndDate))
          this.getOverView()
         }
           // var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek -1);
        },



        // 本月
        getmob(e){

           if(e==1){
         if(this.nowDay1 == 1){
           //上个月
           this.selectTime = []
         var lastMonthStartDate = new Date(this.nowYear1, this.lastMonth1, 1);
        this.selectTime.push(this.formatDate(lastMonthStartDate))
        console.log(this.formatDate(lastMonthStartDate))
        this.GetDateStr(-1)

       this.getOverView()

         }else{
           //这个月
           var monthStartDate = new Date(this.nowYear1, this.nowMonth1, 1);
           this.selectTime = []
           this.selectTime.push(this.formatDate(monthStartDate))
           this.GetDateStr(-1)
           this.getOverView()
         }


         }

        },

       // 最近30天
       getY30Time(e){
          if(e==1){
         this.selectTime = [],
         this.GetDateStr(-31)
         this.GetDateStr(-1)
       this.getOverView()
       }

       },

       // 最近60天
       getY60Time(e){
            if(e==1){
         this.selectTime = [],
         this.GetDateStr(-61)
         this.GetDateStr(-1)
     this.getOverView()
       }
       },



        queryTime(){
          console.log(this.selectTime)
         this.getOverView()
        },


        dateFormat(time){
            var date = new Date(time);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            console.log(YY+MM+DD)
            this.selectTime.push(YY+MM+DD)

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



      // 显示详情
      handleDetail(providersManufactorId){

        // 获取上半部数据
        getManufactor(providersManufactorId).then(response => {
            console.log(response)
            this.imgUrl=response.data.fullLogoImgUrl
            this.ManufactorName=response.data.manufactorName
            this.createTime=response.data.createTime
            if(response.data.sysAuditStatus==0){
              this.Status="未上线"
            }
            else if(response.data.sysAuditStatus==1){
              this.Status="已上线"
            }
            else if(response.data.sysAuditStatus==2){
              this.Status="审核中"
            }
            else if(response.data.sysAuditStatus==-1){
              this.Status="审核失败"
            }
            else if(response.data.sysAuditStatus==-2){
              this.Status="未上线"
            }

            this.viewNum=response.data.showViewNum||0
        });


        localStorage.setItem('providersManufactorId',providersManufactorId);

      },


      getOverView(){
        let params={
          providersManufactorId:this.data||localStorage.getItem('providersManufactorId'),
          startDate:this.selectTime[0],
          endDate:this.selectTime[1]
        }
        dataOverview(params).then(response => {
            console.log(response)
            this.getMap(response.data.viewList)
            this.getjs(response.data.callnList)
        });
      },


      // 从下页返回
      handleDetail2(providersManufactorId){

        console.log("我从下页返回")


        // 获取上半部数据
        getManufactor(providersManufactorId).then(response => {
            console.log(response)
            this.data=response.data.providersManufactorId
            this.ManufactorName=response.data.manufactorName
          this.createTime=response.data.createTime
          if(response.data.sysAuditStatus==0){
            this.Status="未上线"
          }
          else if(response.data.sysAuditStatus==1){
            this.Status="已上线"
          }
          else if(response.data.sysAuditStatus==2){
            this.Status="审核中"
          }
          else if(response.data.sysAuditStatus==-1){
            this.Status="审核失败"
          }
          else if(response.data.sysAuditStatus==-2){
            this.Status="未上线"
          }

          this.viewNum=response.data.showViewNum||0
           });



          localStorage.setItem('providersManufactorId',providersManufactorId);

      },





      handleClick(tab, event) {
        console.log(tab, event);

      },
      getMap(data) {

         var myChart = this.$echarts.init(document.getElementById('mapposterD'))

        // var myChart = this.$echarts.init(document.getElementById('map'))
        var xData=[]
        var yData=[]
        for (var i = 0; i < data.length; i++) {
          xData.push(data[i].dayDate)
          yData.push(data[i].num)
        }
        let option = {
          xAxis: {
            type: 'category',
            // data: this.dataX,
            data: xData,
            boundaryGap: false, //控制日期是否在中间显示
            axisLabel: {
              show: true, //是否显示日期
              interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
              rotate: 45,
              textStyle: {
                color: '#000', //日期的颜色
                fontSize: 12 //字体的大小
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc' // x轴的颜色
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#000' //数字的颜色
              },
              inside: false //控制数据是否在内侧还是外侧显示
            },
            axisLine: {
              lineStyle: {
                color: '#ccc' // 折线的颜色
              }
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '10%',
            containLabel: true
          },
          series: [{
            // data: this.dataY,
            data: yData,
            type: 'line',
            // symbol: 'circle', //是否显示实心的折线圆点
            smooth: true, //让折线有弧度
            symbolSize: 5, //折线圆点的大小
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  //渐变色实现===
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                    //三种由深及浅的颜色
                    [{
                      offset: 0,
                      color: '#889CD5'
                    }, {
                      offset: 1,
                      color: '#889CD5'
                    }]),
                },
                color: '#6982CA', //折线点的颜色
                lineStyle: {
                  color: '#6982CA' //折线的颜色
                },
                label: {
                  show: false
                } //是否在折线点上显示数字
              }
            }
          }]
        }
        myChart.setOption(option)
      },




    getjs(data) {

      var myChart = this.$echarts.init(document.getElementById('zztposterD'))

      var xData=[]
      var yData=[]
      for (var i = 0; i < data.length; i++) {
        xData.push(data[i].dayDate)
        yData.push(data[i].num)
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          x: 'center', //距离x轴的距离
          // y: 280 ,//距离Y轴的距离

           y: "bottom",
          data: yData
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '15%',
          containLabel: true
        },

        xAxis: {

          type: 'category',
          data: xData,
          axisLabel: {
            show: true, //是否显示日期
            interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
           rotate: 45,
            textStyle: {
              color: '#000', //日期的颜色
              fontSize: 12 //字体的大小
            }
          },
        },
        yAxis: {
          type: 'value'
        },
        series: this.kindList1
      };

      myChart.setOption(option);



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


 clearSearch(){
        this.filterList=[];
      },

      clearSearchName(){
        this.searchName=''
      },

      filterSearch(){
        console.log(this.filterList)
      },

 renderFilter(h, {column, $index}, index) {
                  return (
                      <span>
                          订单号
                          <el-popover placement='bottom' width='160' height='240' v-model={this.visible}>
                              <span slot="reference" style="margin-left:3px;margin-top:5px">
                                  <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                              </span>
                              <el-checkbox-group v-model={this.filterList}>
                                  <el-checkbox label="语文" ></el-checkbox>
                                  <el-checkbox label="数学" style="margin-top:5px"></el-checkbox>
                                  <el-checkbox label="美学" style="margin-top:5px"></el-checkbox>
                                  <el-checkbox label="英语" style="margin-top:5px;margin-bottom:5px"></el-checkbox>
                                </el-checkbox-group>
                               <div class='el-table-filter__bottom'>
                                   <button class={this.filterList.length>0? '' : 'is-disabled'} on-click={this.filterSearch}>筛选</button>
                                   <button on-click={this.clearSearch}>重置</button>
                               </div>
                          </el-popover>
                      </span>
                  );
              },

            clearSearch1(){
              this.filterList1=[];
            },

            clearSearchName1(){
              this.searchName1=''
            },

            filterSearch1(){
              console.log(this.filterList1)
            },

            renderFilter1(h, {column, $index}, index) {
                             return (
                                 <span>
                                     海报格式
                                     <el-popover placement='bottom' width='160' height='240' v-model={this.visible1}>
                                         <span slot="reference" style="margin-left:3px;margin-top:5px">
                                             <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                                         </span>
                                         <el-checkbox-group v-model={this.filterList1}>
                                             <el-checkbox label="未上线" ></el-checkbox>
                                             <el-checkbox label="审核中" style="margin-top:5px"></el-checkbox>
                                             <el-checkbox label="已上线" style="margin-top:5px"></el-checkbox>
                                             <el-checkbox label="审核失败" style="margin-top:5px;margin-bottom:5px"></el-checkbox>
                                           </el-checkbox-group>
                                          <div class='el-table-filter__bottom'>
                                              <button class={this.filterList1.length>0? '' : 'is-disabled'} on-click={this.filterSearch1}>筛选</button>
                                              <button on-click={this.clearSearch1}>重置</button>
                                          </div>
                                     </el-popover>
                                 </span>
                             );
                         },





      goBack() {
        this.$router.go(-1);
      },


      // 提交上线
      pushLine(id){
        this.$confirm("在提交上线后，将由平台审核，预计需要1~3个工作日。确定要继续吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              providersManufactorId:id,
              operationType:1
            }
            return manufactorOppreate(data);
          }).then(() => {
           this.handleDetail2( localStorage.getItem('providersManufactorId'))
            this.msgSuccess("上线成功");
          })
      },

      // 下线
      downLine(id){
       this.$confirm("下线后，新增和修改器材时将无法选择该厂商，且重新上线时需平台审核。确定要继续吗", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersManufactorId:id,
             operationType:2
           }
           return manufactorOppreate(data);
         }).then(() => {
          this.handleDetail2( localStorage.getItem('providersManufactorId'))
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
             providersManufactorId:id,
             operationType:3
           }
           return manufactorOppreate(data);
         }).then(() => {
          this.handleDetail2( localStorage.getItem('providersManufactorId'))
           this.msgSuccess("撤回成功");
         })
      },

      // 删除
      delPro(id){
       this.$confirm("删除后，该厂商将无法恢复。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersManufactorId:id,
             operationType:4
           }
           return manufactorOppreate(data);
         }).then(() => {
           this.$router.go(-1);
           this.msgSuccess("删除成功");
         })
      },


    },
  };
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }


  .my-card/deep/.el-card__body {
    padding: 0;

  }

  .el-card {
    border: 0px;
  }


    .my-input/deep/.el-input__inner{
      background-color: #f7f7f7;
    }

    .my-header/deep/.el-icon-back{
      font-size: 20px;
      margin-right: -6px;
      -ms-flex-item-align: center;
      align-self: center;
    }
    .card-body/deep/.el-card__body{
      padding: 0;
    }

    .my-dialog/deep/.el-dialog__body{
      padding-top: 10px;
    }

</style>
