<template>
  <div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      用户分析
      <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >



        <div style="display: flex;flex-direction: row; align-items: center;">

          <el-date-picker
               :style="{width:'240px'}"
               v-model="selectTime"
               type="daterange"
               range-separator="至"
                format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>


          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;">昨天</span>
          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本周</span>
          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">上周</span>
          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本月</span>
          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">最近30天</span>
          <span class="my-title" style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;">最近60天</span>



         </div>


         <div >

           <el-row :gutter="20" style="padding-top: 30px;display: flex;">
                 <el-col :span="12">
                   <el-card class="update-log" style="height: 330px;">
                     <span class="my-title" style="font-size: 14px;">浏览次数</span>
                     <div id="map" style="width: 100%;height:326px;"></div>
                   </el-card>
                 </el-col>
                 <el-col :span="12">
                   <el-card class="update-log" style="height: 330px;">
                     <span class="my-title" style="font-size: 14px;">浏览用户数</span>
                     <div id="map2" style="width: 100%;height:326px;"></div>
                   </el-card>
                 </el-col>


             </el-row>

             <el-row :gutter="20" style="padding-top: 30px;display: flex;">
                   <el-col :span="8">
                     <el-card class="update-log" style="height: 330px;">
                       <span class="my-title" style="font-size: 14px;">性别</span>
                       <div id="map3" style="width: 100%;height:326px;"></div>
                     </el-card>
                   </el-col>



               </el-row>





         </div>







  </div>



</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
      };
    },

    mounted() {
          this.$nextTick(() => {
           this.getMap(0)
           this.getMap(1)
           this.getSexMap()
          })
        },


    methods: {


      goTarget(href) {
        window.open(href, "_blank");
      },



      getMap(index) {
            if(index==0){
              var myChart = this.$echarts.init(document.getElementById('map'))
            }
            else if(index==1){
               var myChart = this.$echarts.init(document.getElementById('map2'))
            }


            let option = {
              tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow"
                  }
                },
              xAxis: {
                type: 'category',
                // data: this.dataX,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                boundaryGap: false, //控制日期是否在中间显示
                axisLabel: {
                  show: true, //是否显示日期
                  interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
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
              series: [
                {
                  // data: this.dataY,
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                  symbol: 'circle', //是否显示实心的折线圆点
                  smooth: false, //让折线有弧度
                  symbolSize: 7, //折线圆点的大小
                  itemStyle: {
                    normal: {

                      color: '#7294ea', //折线点的颜色
                      lineStyle: {
                        color: '#7294ea' //折线的颜色
                      },
                      label: { show: true } //是否在折线点上显示数字
                    }
                  }
                }
              ]
            }
            myChart.setOption(option)
          },


      getSexMap(){
        var myChart = this.$echarts.init(document.getElementById('map3'))

        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '性别',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    // emphasis: {
                    //     label: {
                    //         show: true,
                    //         fontSize: '40',
                    //         fontWeight: 'bold'
                    //     }
                    // },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 1048, name: '男'},
                        {value: 735, name: '女'},
                        {value: 580, name: '未知'},

                    ]
                }
            ]
        };

        myChart.setOption(option)

      }



    },
  };




</script>

<style>



</style>
