<template>
  <div class="app-container home">
    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">查看海报</span>
    </el-page-header>





    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="update-log" style="height: 100%;">

          <div style="width: 100%; height: 140px; margin-top: 10px;display: flex; justify-content: space-between;">

            <div style="width: 50%;height: 120px; display: flex;">
              <img :src="providersPoster.fullCourseImgUrl" style="height: 120px;width: 100px;">
              <div style="display: flex;flex-direction: column; margin-left: 15px;margin-right: 10px;">
                <span style="margin-top: 5px;font-weight: 450;font-size: 14px; ">{{providersPoster.posterName}}</span>
                <div style=" height: 30px; margin-top: 20px; display: flex;justify-content: space-between;">
                  <div style=" color: darkgray; font-size: 12px;">
                    分类:


                    <span style="color: #000000; font-weight: 400;"> {{providersPoster.classificationName}}</span>
                  </div>
                  <!-- <div style="margin-left: 140px; color: darkgray; font-size: 12px;">
                    评分:
                    <span style="color: #000000; font-weight: 400;"> 2.6</span>
                  </div> -->
                </div>

                <div style="margin-top: 2px;font-size: 12px;color: darkgray;">
                  创建时间:


                  <span style="color: #000000; font-weight: 400;"> {{providersPoster.createTime}}</span>
                </div>



              </div>


            </div>

            <div style="width: 50%;height: 120px; ">
              <div style="height: 20px;width: 100%;display: flex; flex-direction: row-reverse;">


                <div style="display: flex; width: 90px;height: 26px; border-radius: 5px;border: 1px solid #19AA29;">
                  <div
                    style="width: 65%;height: 100%;display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;border-right: 1px solid #19AA29;">
                    预览
                  </div>
                  <el-dropdown style="justify-content: center;color: black;width: 35%;" @command="handleCommand">
                    <div
                      style=" font-size: 20px; width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;">
                      ‧‧‧
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item style="width: 100px;" command="1">提交上线</el-dropdown-item>
                      <el-dropdown-item command="2">下线</el-dropdown-item>
                      <router-link :to="{name:'editPoster',path: '/content/editPoster'}">
                        <el-dropdown-item command="3">修改</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item command="4">撤回审核</el-dropdown-item>
                      <el-dropdown-item command="5">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>



                </div>
              </div>

              <div style="margin-top: 26px;width: 100%;height: 60px;display: flex;flex-direction: row-reverse;">

                <div style="height: 100%;width: 80px; ">
                  <div style=" height: 20px;text-align: right;align-items: center;font-size: 12px;line-height: 20px;">
                    状态
                  </div>
                  <div v-if="providersPoster.sysAuditStatus == 2"
                    style="display: flex;align-items: center;flex-direction: row-reverse;height: 40px;color: #3175FB;">
                    审核中
                  </div>
                  <div v-if="providersPoster.sysAuditStatus == 0"
                    style="display: flex;align-items: center;flex-direction: row-reverse;height: 40px;color: #000000;">
                    审核中
                  </div>
                  <div v-if="providersPoster.sysAuditStatus == 1"
                    style="display: flex;align-items: center;flex-direction: row-reverse;height: 40px;color: #13CE66;">
                    已上线
                  </div>
                  <div v-if="providersPoster.sysAuditStatus == -1"
                    style="display: flex;align-items: center;flex-direction: row-reverse;height: 40px;color: #FF0000;">
                    审核失败
                  </div>

                </div>




                <div style="height: 100%;width: 80px; ">
                  <div
                    style=" height: 20px;align-items: center;font-size: 12px;line-height: 20px;display: flex;justify-content: center;">
                    订单总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                    {{providersPoster.actualOrderNum}}
                  </div>

                </div>


                <div style="height: 100%;width: 80px; ">
                  <div
                    style=" height: 20px;align-items: center;font-size: 12px;line-height: 20px;display: flex;justify-content: center;">
                    浏览总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                    {{providersPoster.showViewNum}}
                  </div>

                </div>



              </div>




            </div>

          </div>
          <div style="">


            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="数据概览" name="first">
                <el-date-picker :style="{width:'240px'}" v-model="selectTime" type="daterange" range-separator="至"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerTime" end-placeholder="结束日期">
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
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;"  @click="getY30Time(1)"  >最近30天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="getY60Time(1)" >最近60天</span>

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
                  订单趋势
                  <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                    <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;">
                    <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
                  </el-tooltip>
                </H6>

                <div id="zztposterD" style="width: 100%;height:326px;"></div>





              </el-tab-pane>
              <el-tab-pane label="订单列表" name="second">

              <el-date-picker :style="{width:'240px'}" v-model="selectTime1" type="daterange" range-separator="至"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" :picker-options="pickerTime" end-placeholder="结束日期">
              </el-date-picker>


              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;" @click="getYESTime(2)">昨天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getweek(2)">本周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getshangweek(2)">上周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="getmob(2)">本月</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;"  @click="getY30Time(2)"  >最近30天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="getY60Time(2)" >最近60天</span>





<el-table :data="tableData" style="width: 100%;height: 50%;margin-top: 20px;">
  <el-table-column prop="createTime" width="140" label="创建时间" sortable >
  </el-table-column>
  <el-table-column prop="orderNum" label="订单号" width="180" :render-header="renderHeader" >
  </el-table-column>
  <el-table-column prop="formatName" label="海报格式" width="140" >

  </el-table-column>
  <el-table-column prop="originalPrice" label="原价" width="140" sortable >
  </el-table-column>
  <el-table-column prop="shopPreferentialPrice" label="优惠额" width="140" sortable >
  </el-table-column>
  <el-table-column prop="transactionPrice" label="成交价" width="140" sortable >
  </el-table-column>
<el-table-column label="操作">
          <template slot-scope="scope">

             <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row }}" >
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看订单</el-button>

            </router-link>

          </template>
        </el-table-column>
      </el-table>
<div class="block" style="height: 50px; width: 100%; display: flex;justify-content: center;align-items: center;">
      <!--  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="sizes, prev, pager, next" :total="1000">
        </el-pagination> -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
       <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
          @pagination="getList"
        /> -->
      </div>
              </el-tab-pane>
              <el-tab-pane label="海报格式" name="third">
                 <el-table
                    :data="tableDatahg"
                    border
                    show-summary
                    style="width: 100%">
                    <el-table-column
                      prop="formatName"
                      label="格式名称"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="fileFormat"
                      label="文件类型">
                    </el-table-column>

                    <el-table-column prop="del" label="状态" :render-header="renderFilter1" >

                     <template slot-scope="scope">

                       <div style="font-size: 12px;color: #13CE66;display: flex;align-items: center;" v-if="scope.row.del == 1">
                         <div style="width: 10px; height: 10px;background-color: #13CE66;border-radius: 5px;margin-right: 2px;">

                         </div>
                         正常</div>
                       <div  style=" font-size: 12px;display: flex;color: red;align-items: center;" v-if="scope.row.del == 0">
                         <div style="width: 10px; height: 10px;background-color: #FF0000;border-radius: 5px;margin-right: 2px;">

                         </div>

                         已删除

                       </div>
                       <!-- <img height="60px" width="60px" :src="scope.row.headPortrait" alt="" v-if="scope.row.headPortrait"> -->
                     </template>
                    </el-table-column>






                    <el-table-column
                      prop="fileSize"

                      label="文件大小">
                    </el-table-column>


                    <el-table-column
                      prop="price"
                      sortable
                      label="当前价格">
                    </el-table-column>

                    <el-table-column
                      prop="orderCount"
                      sortable
                      label="订单量">
                    </el-table-column>

                    <el-table-column
                      prop="orderTotalPrice"
                      sortable
                      label="成交总金额">
                    </el-table-column>
                    <el-table-column
                      prop="preferentialTotalPrice"
                      sortable
                      label="优惠总金额">
                    </el-table-column>
                    <el-table-column label="操作">
                              <template slot-scope="scope">
                                 <!-- <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row }}" > -->
                               <el-link :href="scope.row.fileDownloadUrl">
                                <el-button type="text" >下载文件</el-button>
 </el-link>
                                  <!-- </router-link> -->


                              </template>
                            </el-table-column>
                  </el-table>


<div class="block" style="height: 50px; width: 100%; display: flex;justify-content: center;align-items: center;">

      <!--  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="sizes, prev, pager, next" :total="1000">
        </el-pagination> -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
       <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
          @pagination="getList"
        /> -->



      </div>



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



 <bottom-card moduleName="内容" pagesName="海报详情" style="margin-top: 20px;"></bottom-card>


  </div>


</template>

<script>
  import bottomCard from '@/components/bottomCard'
  import {activityProvidersPoster,ProvidersPosterdataoverview,ProvidersPosteroperation,ProvidersPosterorderlist,
  ProvidersPosterposterformatlist,
  } from "@/api/content/content";

  export default {
 
     name: "posterDetail",
     components: {
      bottomCard
     },
    data() {
      return {
        pickerTime:{
                  disabledDate(time) {
                     return time.getTime() < new Date('2021-01-01').getTime() ||time.getTime() > new Date('2021-12-31').getTime() ;
                  },
              },


visible2:false,
        providersPosterFormatList:'',
        providersPoster:'',
        data:null,
        filterList:[],
        filterList1:[],
        // 版本号
        drawer: false,
        openComment:false,
        comment:null,
        activeName: 'first',
        selectTime: [],
        selectTime1:[],
        version: "3.6.0",
        activeName: 'first',
        imgUrl: 'https://img0.baidu.com/it/u=4086653970,2392878139&fm=26&fmt=auto&gp=0.jpg',
        imgList: [],
        form: {},
        pageNum: 1,
        pageSize: 10,
         total:10,

         pageNum1:1,
         pageSize1:10,
         total1:10,
searchName:'',



         rate:1,
         colors: ['#19AA29'],
        tableData: [],


           tableDatahg:[],

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
pd:'',

      };
    },
    created() {
      this.pd=this.$route.query.dataId
      localStorage.setItem("pd",this.pd);
      // this.pd = localStorage.getItem("pd")
      console.log("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊")
      console.log(this.$route.query.dataId)


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




         this.getY30Time(1)
         this.getY30Time(2)
         this.getData(this.pd)

this.getData3(this.pd)





    },

    mounted() {


      this.$nextTick(() => {





      })
    },

    methods: {




getYESTime(e){
  if(e==1){
    this.selectTime = [],
      this.GetDateStr(-1)
      this.GetDateStr(-1)
    this.getData1(this.pd)


  }
  if(e==2){
    this.selectTime1 = [],
      this.GetDateStr2(-1)
      this.GetDateStr2(-1)

this.getData2(this.pd)

  }

},
getY30Time(e){
   console.log('进来的值')
 console.log(e)
   if(e==1){
  this.selectTime = [],
  this.GetDateStr(-31)
  this.GetDateStr(-1)
this.getData1(this.pd)
}

if(e==2){
this.selectTime1 = [],
  this.GetDateStr2(-31)
  this.GetDateStr2(-1)
this.getData2(this.pd)
}
},
getY60Time(e){
     if(e==1){
  this.selectTime = [],
  this.GetDateStr(-61)
  this.GetDateStr(-1)
this.getData1(this.pd)
}
if(e==2){

  this.selectTime1 = [],
    this.GetDateStr2(-61)
    this.GetDateStr2(-1)
  this.getData2(this.pd)

}
},
getshangweek(e){
 if(e==1){
  var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
 var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
  console.log(this.formatDate(weekStartDate))
console.log(this.formatDate(weekEndDate))
this.selectTime = [],
this.selectTime.push(this.formatDate(weekStartDate))
this.selectTime.push(this.formatDate(weekEndDate))
 this.getData1(this.pd)
 }
  if(e==2){

    var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
     var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
      console.log(this.formatDate(weekStartDate))
    console.log(this.formatDate(weekEndDate))
    this.selectTime1 = [],
    this.selectTime1.push(this.formatDate(weekStartDate))
    this.selectTime1.push(this.formatDate(weekEndDate))
     this.getData2(this.pd)


  }



   // var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek -1);
},

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

this.getData1(this.pd)

  }else{

    var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);

    console.log(this.formatDate(weekStartDate))
    this.selectTime = [],
    this.selectTime.push(this.formatDate(weekStartDate))
    this.GetDateStr(-1)

 this.getData1(this.pd)

  }
}
 if(e==2){
if(this.nowDayOfWeek1 == 1){

    var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
     var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
      console.log(this.formatDate(weekStartDate))
    console.log(this.formatDate(weekEndDate))
    this.selectTime1 = [],
    this.selectTime1.push(this.formatDate(weekStartDate))
    this.selectTime1.push(this.formatDate(weekEndDate))

this.getData2(this.pd)

  }else{

    var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);

    console.log(this.formatDate(weekStartDate))
    this.selectTime1 = [],
    this.selectTime1.push(this.formatDate(weekStartDate))
    this.GetDateStr2(-1)

 this.getData2(this.pd)

  }
}




},

getmob(e){

   if(e==1){
 if(this.nowDay1 == 1){
   //上个月
   this.selectTime = []
 var lastMonthStartDate = new Date(this.nowYear1, this.lastMonth1, 1);
this.selectTime.push(this.formatDate(lastMonthStartDate))
console.log(this.formatDate(lastMonthStartDate))
this.GetDateStr(-1)

this.getData1(this.pd)

 }else{
   //这个月
   var monthStartDate = new Date(this.nowYear1, this.nowMonth1, 1);
   this.selectTime = []
   this.selectTime.push(this.formatDate(monthStartDate))
   this.GetDateStr(-1)
   this.getData1(this.pd)
 }


 }

 if(e==2){

   if(this.nowDay1 == 1){
      //上个月
      this.selectTime1 = []
    var lastMonthStartDate = new Date(this.nowYear1, this.lastMonth1, 1);
   this.selectTime1.push(this.formatDate(lastMonthStartDate))
   console.log(this.formatDate(lastMonthStartDate))
   this.GetDateStr2(-1)

   this.getData2(this.pd)

    }else{
      //这个月
      var monthStartDate = new Date(this.nowYear1, this.nowMonth1, 1);
      this.selectTime1 = []
      this.selectTime1.push(this.formatDate(monthStartDate))
      this.GetDateStr2(-1)
      this.getData2(this.pd)
    }





 }
},



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



getMonthDays(myMonth) {
  var monthStartDate = new Date(this.nowYear1, this.myMonth1, 1);
  var monthEndDate = new Date(this.nowYear1, this.myMonth1 + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
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

// 获取今天之后的30天
      GetDateStr2(AddDayCount){
         var  dd =  new  Date();
         dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
         var  y = dd.getFullYear();
         var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
         var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
         this.selectTime1.push(y+ "-" +m+ "-" +d)
      },

    getData(e){
    console.log(e)
    let queryParams ={}
    activityProvidersPoster(queryParams,e).then(response => {
console.log(response)
    console.log(response)
this.providersPoster=response.data.providersPoster
this.providersPosterFormatList=response.data.providersPosterFormatList
  });

},
getData2(e){






  let queryParams ={


    'providersPosterId':e,
    'startDate':this.selectTime1[0],
    'endDate':this.selectTime1[1],
  }
  if(this.searchName != ''){

    queryParams = {


    'providersPosterId':e,
    'startDate':this.selectTime1[0],
    'endDate':this.selectTime1[1],
    'orderNum':this.searchName
  }

  }
  ProvidersPosterorderlist(queryParams,e).then(response => {

console.log(response)
this.tableData = response.rows

 });
},





getData3(e){






  let queryParams ={


    'providersPosterId':e,

  }

  ProvidersPosterposterformatlist(queryParams).then(response => {
console.log('232323')
console.log(response)
this.tableDatahg = response.rows

 });
},








getData1(e){
    console.log(e)
    let queryParams ={


      'providersPosterId':e,
      'startDate':this.selectTime[0],
      'endDate':this.selectTime[1],
    }
    ProvidersPosterdataoverview(queryParams,e).then(response => {


var dayDateList = [];
var numList = [];
    response.data.viewList.map((item,i)=>{
dayDateList.push(item.dayDate)
   numList.push(item.num)
    })

console.log(dayDateList)
console.log(numList)

this.dayDateList=dayDateList
this.numList=numList

this.dayDateList1 = response.data.dayList
var kindL = [];
var namelist = [];
response.data.posterOrderStatisticsVoList.map((item,i)=>{
let dic = {
  name: item.name,
    type: 'bar',
    stack: 'total',
    color:this.randomHexColor(),
    label: {
      show: true
    },
    emphasis: {
      focus: 'series'
    },
    data:item.list
  }
kindL.push(dic)
namelist.push(item.name)

    })
this.nameList1 = namelist
this.kindList1=kindL
this.getMap(0)
  this.getjs(0)
  });
},
randomHexColor() { //随机生成十六进制颜色
 return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
},
      handleClick(tab, event) {
        console.log(tab, event);
        if (tab.index == 0) {
          this.getMap(0)
           this.getjs(0)
        }



      },
      getMap(index) {

        if (index == 0) {
          var myChart = this.$echarts.init(document.getElementById('mapposterD'))
        } else if (index == 1) {
          var myChart = this.$echarts.init(document.getElementById('map2'))
        } else if (index == 2) {
          var myChart = this.$echarts.init(document.getElementById('map3'))
        } else if (index == 3) {
          var myChart = this.$echarts.init(document.getElementById('map4'))
        }

        // var myChart = this.$echarts.init(document.getElementById('map'))

        let option = {
          xAxis: {
            type: 'category',
            // data: this.dataX,
            data: this.dayDateList,
            boundaryGap: false, //控制日期是否在中间显示
            axisLabel: {
              show: true, //是否显示日期
              interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
             rotate: 40,
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
            data: this.numList,
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




      getjs(index) {

        var myChart = this.$echarts.init(document.getElementById('zztposterD'))


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
            data: this.nameList1
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            containLabel: true
          },

          xAxis: {

            type: 'category',
            data: this.dayDateList1,
            axisLabel: {
              show: true, //是否显示日期
              interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
             rotate: 40,
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



      filterSearch(){
        console.log(this.filterList)
      },

      clearSearchName(){
        this.searchName=''

        this.visible2=false
        this.getData2(this.pd)
      },
      SearchNamec(){
         this.visible2=false
        console.log(this.searchName)
        this.getData2(this.pd)
      },



renderHeader(h, {column, $index}, index) {
                 return (
                     <span>
                         订单号
                         <el-popover placement='bottom' width='160' height='240' v-model={this.visible2}>
                             <span slot="reference" style="margin-left:3px;margin-top:5px">
                                 <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                             </span>
                             <el-input size='small' v-model={this.searchName} placeholder='请输入内容'></el-input>
                             <div class='el-table-filter__bottom'>
                                 <button on-click={this.SearchNamec} class={this.searchName ? '' : 'is-disabled'}>筛选</button>
                                 <button on-click={this.clearSearchName}>重置</button>
                             </div>
                         </el-popover>
                     </span>
                 );
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
                                     状态
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
      }
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
