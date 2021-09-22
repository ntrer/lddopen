<template>
  <div class="app-container home">
     <el-row :gutter="20" style="padding-top: 30px;display: flex;">
           <el-col :span="6">
             <el-card class="update-log" style="height: 100px;">
               <div style="display: flex; flex-direction: row; justify-content: space-between;align-items: center;margin-top: 5px;">
                 <div style="display: flex;flex-direction: column;">
                   <div style="display: flex;flex-direction: row;align-items: center;">
                     <span class="my-title" style="font-size: 14px;">内容总量</span>
                     <el-tooltip content="已录入的内容总量，实时更新" placement="top" style="margin-left: 5px;">
                       <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                     </el-tooltip>
                   </div>

                   <span style="font-size: 26px; margin-top: 12px;">{{getContentTotalNum}}</span>
                 </div>

                 <div>
                   <img src="../assets/logo/logo.png" style="width: 50px;height: 50px;">
                 </div>
               </div>
             </el-card>
           </el-col>
           <el-col :span="6">
             <el-card class="update-log" style="height: 100px;">
               <div style="display: flex; flex-direction: row; justify-content: space-between;margin-top: 5px;">
                 <div style="display: flex;flex-direction: column;">

                   <div style="display: flex;flex-direction: row;align-items: center;">
                     <span class="my-title" style="font-size: 14px;">浏览总量</span>
                     <el-tooltip content="浏览内容的总次数，每日更新" placement="top" style="margin-left: 5px;">
                       <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                     </el-tooltip>
                   </div>
                   <span style="font-size: 26px; margin-top: 12px;">{{getBrowseTotalNum}}</span>
                 </div>

                 <div>
                    <img src="../assets/logo/logo.png" style="width: 50px;height: 50px;">
                 </div>
               </div>
             </el-card>
           </el-col>

          <el-col :span="6">
             <el-card class="update-log" style="height: 100px;">
               <div style="display: flex; flex-direction: row; justify-content: space-between;margin-top: 5px;">
                 <div style="display: flex;flex-direction: column;">

                   <div style="display: flex;flex-direction: row;align-items: center;">
                     <span class="my-title" style="font-size: 14px;">订单总量</span>
                     <el-tooltip content="购买内容的订单总量，实时更新" placement="top" style="margin-left: 5px;">
                       <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                     </el-tooltip>
                   </div>
                   <span style="font-size: 26px; margin-top: 12px;">{{getOrderTotalNum}}</span>
                 </div>

                 <div>
                   <img src="../assets/logo/logo.png" style="width: 50px;height: 50px;">
                 </div>
               </div>
             </el-card>
           </el-col>

          <el-col :span="6">
             <el-card class="update-log" style="height: 100px;">
               <div style="display: flex; flex-direction: row; justify-content: space-between;margin-top: 5px;">
                 <div style="display: flex;flex-direction: column;">
                   <div style="display: flex;flex-direction: row;align-items: center;">
                     <span class="my-title" style="font-size: 14px;">评价总次数</span>
                     <el-tooltip content="用户评价内容的总次数，实时更新" placement="top" style="margin-left: 5px;">
                       <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                     </el-tooltip>
                   </div>
                   <span style="font-size: 26px; margin-top: 12px;">{{getEvaluateTotalNum}}</span>
                 </div>

                 <div>
                    <img src="../assets/logo/logo.png" style="width: 50px;height: 50px;">
                 </div>
               </div>
             </el-card>
           </el-col>

         </el-row>


    <el-row>
      <el-col :span="24">
        <el-card class="update-log" style="height: 400px;">

         <el-tabs v-model="activeName" @tab-click="handleClick" >
           <el-tab-pane label="内容量" name="first" >
               <div id="map" style="width: 100%;height:326px;"></div>
            </el-tab-pane>
            <el-tab-pane label="浏览量" name="second" >
               <div id="map2" style="width: 100%;height:326px;"></div>
            </el-tab-pane>
            <el-tab-pane label="订单量" name="third" >
              <div id="map3" style="width: 100%;height:326px;"></div>
            </el-tab-pane>
            <el-tab-pane label="评价量" name="fourth" >
              <div id="map4" style="width: 100%;height:326px;"></div>
            </el-tab-pane>
          </el-tabs>

         <div style="position: absolute;right: 30px; top:10px; flex;flex-direction: row;">
           <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getweek(1)">本周</span>
           <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getshangweek(1)">上周</span>
           <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getmob(1)">本月</span>
           <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getY30Time(1)">最近30天</span>
           <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="getY60Time(1)">最近60天</span>

             <el-date-picker
                  :style="{width:'240px'}"
                  v-model="selectTime"
                  @change="queryTime"
                  type="daterange"
                  range-separator="至"
                   format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>

          </div>


        </el-card>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="24">
        <el-card class="update-log">
           <div style="height: 40px;display: flex;align-items: center;">
             <span style="font-size: 14px;">近期编辑</span>
           </div>

           <div v-for="(item,index) in editList" :key="index" style="margin-top: 5px;">
             <el-card class="my-card" shadow="hover">
                   <div style="display: flex;flex-direction: row;align-items: center;height: 80px;">
                     <span style="display: flex;margin-left: 20px;">{{item.latelyEditStr}}</span>

                     <div style="display: flex;flex: 1;flex-direction: row;align-items: center;height: 80px;margin-left: 50px;">
                       <img :src="item.fullImgUrl" width="80px" height="50px">
                       <div style="display: flex;justify-content: space-between;flex-direction: column;">
                         <div style="margin-bottom: 5px;">
                           <el-tag type="info" size="mini" style="margin-left: 10px;">{{getType(item.businessType)}}</el-tag>
                           <span style="margin-left: 10px;font-size: 14px;">{{item.title}}</span>
                         </div>

                         <div style="margin-top: 10px;">
                           <span style="margin-left: 10px;margin-right: 20px;font-size: 12px;">
                             <i class="el-icon-view">{{item.showViewNum}}</i>
                           </span>
                           <span style="margin-right: 20px;font-size: 12px;">
                             <i class="el-icon-edit">{{item.actualOrderNum}}</i>
                           </span>
                           <span style="font-size: 12px;">
                             <i class="el-icon-chat-dot-square">{{item.commentNum}}</i>
                           </span>
                         </div>
                       </div>
                     </div>

                   </div>
              </el-card>
           </div>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />


        </el-card>
      </el-col>
    </el-row>

    <bottom-card moduleName="概览" pagesName="概览"></bottom-card>


  </div>
</template>

<script>

    import bottomCard from '@/components/bottomCard'
  import { statistics,latelyeditList,chartStatistics} from "@/api/index/index";
  import Cookies from "js-cookie";

export default {
  name: "index",
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
      // 版本号
      version: "3.6.0",
      activeName: 'first',
      selectTime:[],
      contentTotalNum:0,
      browseTotalNum:0,
      orderTotalNum:0,
      evaluateTotalNum:0,
      selectStartTime:null,
      selectEndTime:null,
      type:0,
      editList:[],
      queryParams: {
       pageNum:1,
       pageSize:10
      },
      total:null,
      fakeData:[
        {
          name:'hh',
          id:1
        },
        {
          name:'aa',
          id:2
        },
        {
          name:'bb',
          id:3
        },
        {
          name:'cc',
          id:4
        }
      ]
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
                  else if(item==4){
                    return "导师"
                  }
                  else if(item==5){
                    return "器材"
                  }
                  else if(item==6){
                    return "厂"
                  }

                }
            },


            getContentTotalNum(){
             return (parseInt(this.contentTotalNum)+"").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
            },

            getBrowseTotalNum(){

             return (parseInt(this.browseTotalNum)+"").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
            },

            getOrderTotalNum(){
             return (parseInt(this.orderTotalNum)+"").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
            },

            getEvaluateTotalNum(){
             return (parseInt(this.evaluateTotalNum)+"").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
            }



  },

  mounted() {



        if(Cookies.get("pageSize")!=null){
          this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
        }

      },

  created() {

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

    // 获取总览数据
    this.getStatistics()

    // 获取近期编辑
    this.getList()

    // 获取统计图数据
    this.getchartStatistics(0)


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

           this.getchartStatistics(this.type)

        }else{

          var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);

          console.log(this.formatDate(weekStartDate))
          this.selectTime = [],
          this.selectTime.push(this.formatDate(weekStartDate))
          this.GetDateStr(-1)

          this.getchartStatistics(this.type)

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
       this.getchartStatistics(this.type)
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

    this.getchartStatistics(this.type)

     }else{
       //这个月
       var monthStartDate = new Date(this.nowYear1, this.nowMonth1, 1);
       this.selectTime = []
       this.selectTime.push(this.formatDate(monthStartDate))
       this.GetDateStr(-1)
        this.getchartStatistics(this.type)
     }


     }

    },

   // 最近30天
   getY30Time(e){
      if(e==1){
     this.selectTime = [],
     this.GetDateStr(-31)
     this.GetDateStr(-1)
    this.getchartStatistics(this.type)
   }

   },

   // 最近60天
   getY60Time(e){
        if(e==1){
     this.selectTime = [],
     this.GetDateStr(-61)
     this.GetDateStr(-1)
  this.getchartStatistics(this.type)
   }
   },



    queryTime(){
      console.log(this.selectTime)
      this.getchartStatistics(this.type)
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



    getchartStatistics(type){
      let data={
        type:this.type,
        startDate:this.selectTime[0],
        endDate:this.selectTime[1]
      }
      chartStatistics(data).then(response => {
        console.log(response)
        this.getMap(type,response.data)
        // this.$nextTick(() => {
        //  this.getMap(type,response.data)
        // })

      });
    },

    getStatistics(){

      statistics().then(response => {
        console.log(response)
        this.contentTotalNum=response.data.contentTotalNum
        this.browseTotalNum=response.data.browseTotalNum
        this.orderTotalNum =response.data.orderTotalNum
        this.evaluateTotalNum=response.data.evaluateTotalNum
      });
    },

    getList(){
      this.queryParams.pageSize=Cookies.get("pageSize")
      latelyeditList(this.queryParams).then(response => {
        console.log(response)
        this.total=response.total
        this.editList=response.rows
      });
    },

    handleClick(tab, event) {
       console.log(tab.index);
       this.type=tab.index
       this.getchartStatistics(this.type)


    },


    goTarget(href) {
      window.open(href, "_blank");
    },



    getMap(index,data) {

          if(index==0){
            var myChart = this.$echarts.init(document.getElementById('map'))
          }
          else if(index==1){
             var myChart = this.$echarts.init(document.getElementById('map2'))
          }
          else if(index==2){
             var myChart = this.$echarts.init(document.getElementById('map3'))
          }
          else if(index==3){
             var myChart = this.$echarts.init(document.getElementById('map4'))
          }

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
            series: [
              {
                // data: this.dataY,
                data: yData,
                type: 'line',
                symbol: 'circle', //是否显示实心的折线圆点
                smooth: true, //让折线有弧度
                symbolSize: 7, //折线圆点的大小
                itemStyle: {
                  normal: {
    						areaStyle: {
    						                    type: 'default',
    						                    //渐变色实现===
    						                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
    						                      //三种由深及浅的颜色
    						                      [{
    						                        offset: 0,
    						                        color: '#879bd7'
    						                      }, {
    						                        offset: 1,
    						                        color: '#ffffff'
    						                      }]),
    						                  },
                    color: '#efc883', //折线点的颜色
                    lineStyle: {
                      color: '#efc883' //折线的颜色
                    },
                    label: { show: true } //是否在折线点上显示数字
                  }
                }
              }
            ]
          }
          myChart.setOption(option)
        }



  },
};
</script>

<style scoped >
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}


  .my-card/deep/.el-card__body{
    padding: 0;

  }

  .el-card{
    border: 0px;
  }


</style>
