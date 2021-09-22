<template>
  <div class="app-container home">
    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">查看活动方案</span>
    </el-page-header>





    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="update-log" style="height: 100%;">

          <div style="width: 100%; height: 120px; margin-top: 10px;display: flex; justify-content: space-between;">

            <div style="width: 50%;height: 100px; display: flex;">
              <img :src="CourseImgUrl" style="height: 100px;width: 140px;">
              <div style="display: flex;flex-direction: column; margin-left: 15px;margin-right: 10px;">
                <span style="margin-top: 5px;font-weight: 450;font-size: 14px; ">{{activityProgramName}}</span>
                <div style=" height: 30px; margin-top: 20px; display: flex;justify-content: space-between;">
                  <div style=" color: darkgray; font-size: 12px;">
                    分类:


                    <span style="color: #000000; font-weight: 400;"> {{classificationName}}</span>
                  </div>
                  <div style="margin-left: 140px; color: darkgray; font-size: 12px;">
                    评分:
                    <span style="color: #000000; font-weight: 400;"> 2.6</span>
                  </div>
                </div>

                <div style="margin-top: 2px;font-size: 12px;color: darkgray;">
                  创建时间:


                  <span style="color: #000000; font-weight: 400;"> {{createTime}}</span>
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
                      <el-dropdown-item style="width: 100px;" v-if="statusNum==0"  @click.native="pushLine">提交上线</el-dropdown-item>
                       <!-- <router-link :to="{name:'editTools',path: '/content/editTools',query:{ data: scope.row }}" >
                      <el-dropdown-item>修改</el-dropdown-item>
                       </router-link> -->
                      <el-dropdown-item v-if="statusNum==1"  @click.native="downLine">下线</el-dropdown-item>
                      <el-dropdown-item v-if="statusNum!=-1" @click.native="reExemine">撤回审核</el-dropdown-item>
                       <el-dropdown-item @click.native="delPro">删除</el-dropdown-item>
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
                    订单总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                     {{actualOrderNum}}
                  </div>

                </div>


                <div style="height: 100%;width: 80px; ">
                  <div
                    style=" height: 20px;align-items: center;font-size: 12px;line-height: 20px;display: flex;justify-content: center;">
                    浏览总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                     {{actualViewNum}}
                  </div>

                </div>



              </div>




            </div>

          </div>
          <div style="">


            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="数据概览" name="first">
                <el-date-picker :style="{width:'240px'}" v-model="selectTime" type="daterange" range-separator="至"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>


                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;" @click="orderDay2(1)">昨天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay2(2)">本周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay2(3)">上周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay2(4)">本月</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay2(5)">最近30天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="orderDay2(6)">最近60天</span>

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

              <el-date-picker :style="{width:'240px'}" v-model="selectTime2" type="daterange" range-separator="至"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>


              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;" @click="orderDay(1)">昨天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay(2)">本周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay(3)">上周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay(4)">本月</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;" @click="orderDay(5)">最近30天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;" @click="orderDay(6)">最近60天</span>





<el-table :data="orderList" style="width: 100%;height: 50%;margin-top: 20px;">
  <el-table-column prop="orderTimeFormat" width="140" label="创建时间" sortable >
  </el-table-column>
  <el-table-column prop="orderNum" label="订单号" width="180"  >
    <template slot="header" slot-scope="scope">
      <span>订单号</span>
       <el-popover placement='bottom' width='160'v-model="visible">
           <span slot="reference" style="margin-left:3px;margin-top:5px">
               <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
           </span>
           <el-input size='small' v-model="searcOrderNum" placeholder='请输入订单号'></el-input>
            <div class='el-table-filter__bottom'>
                <button :class="searcOrderNum?'':'is-disabled'" @click="SearchOrderNum">筛选</button>
                <button @click="clearSearchOrderNum">重置</button>
            </div>
       </el-popover>
    </template>
  </el-table-column>

  </el-table-column>
  <el-table-column prop="originalPrice" label="原价" width="180" sortable :formatter="priceFormate">
  </el-table-column>
  <el-table-column prop="preferentialPrice" label="优惠额" width="180" sortable :formatter="priceFormate2">
  </el-table-column>
  <el-table-column prop="transactionPrice" label="成交价" width="180" sortable :formatter="priceFormate3">
  </el-table-column>
<el-table-column label="操作">
          <template slot-scope="scope">
             <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row.orderId}}" >
            <el-button type="text">查看订单</el-button>
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
              <el-tab-pane label="方案文件" name="third">
                 <el-table
                    :data="FileList"
                    border
                    show-summary
                    style="width: 100%">

                    <el-table-column
                      prop="fileFormat"
                      label="文件类型">
                    </el-table-column>

                    <el-table-column prop="states" label="状态"  >

                     <template slot-scope="scope">

                       <div style="font-size: 12px;color: #13CE66;display: flex;align-items: center;" v-if="scope.row.del == 1">
                         <div style="width: 10px; height: 10px;background-color: #13CE66;border-radius: 5px;margin-right: 2px;">

                         </div>
                         已上线</div>
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
                      prop="orderNum"
                      sortable
                      label="订单量">
                    </el-table-column>

                    <el-table-column
                      prop="orderDealTotalPrice"
                      sortable
                      label="成交总金额">
                    </el-table-column>
                    <el-table-column
                      prop="orderPreTotalPrice"
                      sortable
                      label="优惠总金额">
                    </el-table-column>
                    <el-table-column label="操作">
                              <template slot-scope="scope">
                                 <!-- <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row }}" > -->
                                <el-button type="text" @click="handleDowload(scope.row)">下载文件</el-button>

                                  <!-- </router-link> -->


                              </template>
                            </el-table-column>
                  </el-table>

              </el-tab-pane>



             <!-- <el-tab-pane label="评价" name="fourth" style="height: 400px;overflow-y: scroll; scroll-behavior: smooth;overscroll-behavior: contain;">
<div v-for="index in 4" :key='index' style="" > -->


             <!-- <el-card style="border: 1px solid #e5e5e5;margin-top: 20px;height: 120px;">

                <div style="display: flex;flex-direction: row;">

                  <div style="display: flex;flex: 1;">
                    <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
                  </div>


                  <div style="display: flex;flex-direction: column;flex: 15;">
                    <span style="font-size: 13px;color: black;">**浩</span>
                    <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
                      2020年08月08日 14:23:00
                    </span>
                    <span style="font-size: 13px;margin-top: 10px;color: black;">
                      这是评论这是评论这是评论
                    </span>
                  </div>

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

              </el-card> -->
<!-- </div> -->

<!--         <pagination
           style=""
           v-show="total1>0"
           :total="total1"
           :page.sync="pageNum1"
           :limit.sync="pageSize1"
           @pagination="getList1"
         /> -->
              <!-- </el-tab-pane> -->
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


 <bottom-card moduleName="内容" pagesName="活动方案详情" style="margin-top: 20px;"></bottom-card>



  </div>


</template>

<script>
  import bottomCard from '@/components/bottomCard'
  import {getActivityProgram,dataOverviewTop,ActivityOppreate,ActivityProgramOrderList,ActivityProgramFileList} from "@/api/content/content";

  export default {
    components: {
     bottomCard
    },
    data() {
      return {

        providersActivityProgramId:null,
        now1:null,
        nowDayOfWeek1:null,
        nowDay1:null,
        nowMonth1:null,
        nowYear1:null,
        lastMonthDate1:null,
        lastYear1:null,
        lastMonth1:null,

        queryParams3:{
          pageNum: 1,
          pageSize: 10,
          startDate:null,
          endDate:null,
          providersActivityProgramId:null
        },

        queryParams:{
          pageNum: 1,
          pageSize: 10,
          providersActivityProgramId:null
        },
        searcOrderNum:null,


        queryParams2:{
          pageNum: 1,
          pageSize: 10,
         startDate:null,
         endDate:null,
         providersActivityProgramId:null,
         orderNum:null
        },
        Status:null,
        statusNum:null,
        createTime:null,
        CourseImgUrl:null,
        classificationName:null,
        activityProgramName:null,
        actualViewNum:null,
        actualOrderNum:null,
        orderList:[],
        FileList:[],



        filterList:[],
        filterList1:[],
        // 版本号
        drawer: false,
        openComment:false,
        comment:null,
        activeName: 'first',
        selectTime: [],
        selectTime2:[],
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


    created() {
      this.providersActivityProgramId = this.$route.query.dataId
      localStorage.setItem("providersActivityProgramId",this.providersActivityProgramId)

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

      this.GetDateStr2(-30)
      this.dateFormat2(new Date().getTime())

      this.handleDetail(localStorage.getItem('providersActivityProgramId'))

       this.getOverView()



    },

    methods: {


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


      handleDowload(row) { 
        var url = row.fileDownloadUrl;

        var link = document.createElement('a');
        try {
          link.href = url;
        } catch (error) {
          link.href = window.URL.createObjectURL(url);
        }
        link.click();
      },


      // 时间搜索
      queryTime(){
        console.log(this.selectTime)
        if(this.selectTime!=null){
          this.queryParams.startDate=this.selectTime[0]
          this.queryParams.endDate=this.selectTime[1]
        }
        else{
          this.queryParams.startDate=null
          this.queryParams.endDate=null
        }

          this.getOverView()


      },



      // 时间搜索
      queryTime2(){
        console.log(this.selectTime2)
        if(this.selectTime2!=null){
          this.queryParams2.startDate=this.selectTime2[0]
          this.queryParams2.endDate=this.selectTime2[1]
        }
        else{
          this.queryParams2.startDate=null
          this.queryParams2.endDate=null
        }

         this.getActivityProgramOrderList(this.queryParams2)
      },


      // 数据概览
      getOverView(){
        let params={
          providersActivityProgramId:this.providersActivityProgramId||localStorage.getItem('providersActivityProgramId'),
          startDate:this.selectTime[0],
          endDate:this.selectTime[1]
        }
        dataOverviewTop(params).then(response => {
            console.log(response)
            this.getMap(response.data.viewList)
            this.getjs(response.data.orderList)
        });
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



      dateFormat(time){
          var date = new Date(time);
          var YY = date.getFullYear() + '-';
          var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
          console.log(YY+MM+DD)
          this.selectTime.push(YY+MM+DD)
          if(this.selectTime!=null){
            this.queryParams3.startDate=this.selectTime[0]
            this.queryParams3.endDate=this.selectTime[1]
          }
          else{
            this.queryParams3.startDate=null
            this.queryParams3.endDate=null
          }

      },
      // 获取今天之后的30天
      GetDateStr(AddDayCount){
         var  dd =  new  Date();
         dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
         var  y = dd.getFullYear();
         var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
         var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
         this.selectTime.push(y+ "-" +m+ "-" +d)

         console.log(this.selectTime)

         if(this.selectTime!=null){

           this.queryParams3.startDate=this.selectTime[0]
           this.queryParams3.endDate=this.selectTime[1]

         }
         else{
           this.queryParams3.startDate=null
           this.queryParams3.endDate=null
         }





      },





      dateFormat2(time){
          var date = new Date(time);
          var YY = date.getFullYear() + '-';
          var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
          console.log(YY+MM+DD)
          this.selectTime2.push(YY+MM+DD)
          if(this.selectTime2!=null){
            this.queryParams2.startDate=this.selectTime2[0]
            this.queryParams2.endDate=this.selectTime2[1]
          }
          else{
            this.queryParams2.startDate=null
            this.queryParams2.endDate=null
          }

      },
      // 获取今天之后的30天
      GetDateStr2(AddDayCount){
         var  dd =  new  Date();
         dd.setDate(dd.getDate()+AddDayCount); //获取AddDayCount天后的日期
         var  y = dd.getFullYear();
         var  m = (dd.getMonth()+1)<10? "0" +(dd.getMonth()+1):(dd.getMonth()+1); //获取当前月份的日期，不足10补0
         var  d = dd.getDate()<10? "0" +dd.getDate():dd.getDate(); //获取当前几号，不足10补0
         this.selectTime2.push(y+ "-" +m+ "-" +d)

         console.log(this.selectTime2)

         if(this.selectTime2!=null){

           this.queryParams2.startDate=this.selectTime2[0]
           this.queryParams2.endDate=this.selectTime2[1]

         }
         else{
           this.queryParams2.startDate=null
           this.queryParams2.endDate=null
         }





      },


      orderDay2(index){
        if(index==1){
          this.selectTime = [],
          this.GetDateStr(-1)
           this.GetDateStr(-1)
           this.getOverView()
        }
        else if(index==2){
          if(this.nowDayOfWeek1 == 1){

            var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
             var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
            this.selectTime = [],
            this.selectTime.push(this.formatDate(weekStartDate))
            this.selectTime.push(this.formatDate(weekEndDate))
            this.getOverView()
          }
          else{

            var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);
            this.selectTime = [],
            this.selectTime.push(this.formatDate(weekStartDate))
            this.GetDateStr(-1)
             this.getOverView()
          }

        }
        else if(index==3){
          var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
           var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
            console.log(this.formatDate(weekStartDate))
          console.log(this.formatDate(weekEndDate))
          this.selectTime = [],
          this.selectTime.push(this.formatDate(weekStartDate))
          this.selectTime.push(this.formatDate(weekEndDate))
           this.getOverView()
        }
        else if(index==4){
          if(this.nowDay1 == 1){
              //上个月
              this.selectTime = []
            var lastMonthStartDate = new Date(this.nowYear1, this.lastMonth1, 1);
           this.selectTime.push(this.formatDate(lastMonthStartDate))


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
        else if(index==5){
            this.selectTime = [],
            this.GetDateStr(-31)
            this.GetDateStr(-1)

             this.getOverView()
        }
        else{
          this.selectTime = [],
          this.GetDateStr(-61)
          this.GetDateStr(-1)
            this.getOverView()
        }
      },




      orderDay(index){
        if(index==1){
          this.selectTime2 = [],
          this.GetDateStr2(-1)
           this.GetDateStr2(-1)
          this.getActivityProgramOrderList(this.queryParams2)
        }
        else if(index==2){
          if(this.nowDayOfWeek1 == 1){

            var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
             var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
            this.selectTime2 = [],
            this.selectTime2.push(this.formatDate(weekStartDate))
            this.selectTime2.push(this.formatDate(weekEndDate))
            this.queryParams2.startDate=this.selectTime2[0]
            this.queryParams2.endDate=this.selectTime2[1]
            this.getActivityProgramOrderList(this.queryParams2)
          }
          else{

            var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 +1);
            this.selectTime2 = [],
            this.selectTime2.push(this.formatDate(weekStartDate))
            this.queryParams2.startDate=this.selectTime2[0]
            this.queryParams2.endDate=this.selectTime2[0]
            this.GetDateStr2(-1)
            this.getActivityProgramOrderList(this.queryParams2)
          }

        }
        else if(index==3){
          var weekStartDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 - 6);
           var weekEndDate = new Date(this.nowYear1, this.nowMonth1, this.nowDay1 - this.nowDayOfWeek1 );
            console.log(this.formatDate(weekStartDate))
          console.log(this.formatDate(weekEndDate))
          this.selectTime2 = [],
          this.selectTime2.push(this.formatDate(weekStartDate))
          this.selectTime2.push(this.formatDate(weekEndDate))
          this.queryParams2.startDate=this.selectTime2[0]
          this.queryParams2.endDate=this.selectTime2[1]
          this.getActivityProgramOrderList(this.queryParams2)
        }
        else if(index==4){
          if(this.nowDay1 == 1){
              //上个月
              this.selectTime = []
            var lastMonthStartDate = new Date(this.nowYear1, this.lastMonth1, 1);
           this.selectTime2.push(this.formatDate(lastMonthStartDate))
           this.queryParams2.startDate=this.selectTime2[0]
           this.queryParams2.endDate=this.selectTime2[0]

           this.GetDateStr2(-1)

          this.getActivityProgramOrderList(this.queryParams2)

            }else{
              //这个月
              var monthStartDate = new Date(this.nowYear1, this.nowMonth1, 1);
              this.selectTime2 = []
              this.selectTime2.push(this.formatDate(monthStartDate))
              this.queryParams2.startDate=this.selectTime2[0]
              this.queryParams2.endDate=this.selectTime2[0]
              this.GetDateStr2(-1)
              this.getActivityProgramOrderList(this.queryParams2)

            }
        }
        else if(index==5){
            this.selectTime2 = [],
            this.GetDateStr2(-31)
            this.GetDateStr2(-1)

            this.getActivityProgramOrderList(this.queryParams2)
        }
        else{
          this.selectTime2 = [],
          this.GetDateStr2(-61)
          this.GetDateStr2(-1)
           this.getActivityProgramOrderList(this.queryParams2)
        }
      },



      // 获取课程详情
      handleDetail(providersActivityProgramId){
        // 获取上半部数据
        getActivityProgram(providersActivityProgramId).then(response => {
            console.log(response)
            this.activityProgramName=response.data.providersActivityProgram.activityProgramName
            this.classificationName=response.data.providersActivityProgram.classificationName
            this.actualOrderNum=response.data.providersActivityProgram.actualOrderNum
            this.createTime=response.data.providersActivityProgram.createTime
            this.CourseImgUrl=response.data.providersActivityProgram.fullCourseImgUrl
            this.actualViewNum=response.data.providersActivityProgram.actualViewNum

            if(response.data.providersActivityProgram.sysAuditStatus==0){
              this.Status="未上线"
              this.statusNum=0
            }
            else if(response.data.providersActivityProgram.sysAuditStatus==1){
              this.Status="已上线"
               this.statusNum=1
            }
            else if(response.data.providersActivityProgram.sysAuditStatus==2){
              this.Status="审核中"
               this.statusNum=2
            }
            else if(response.data.providersActivityProgram.sysAuditStatus==-1){
              this.Status="审核失败"
               this.statusNum=-1
            }
            else if(response.data.providersActivityProgram.sysAuditStatus==-2){
              this.Status="未上线"
               this.statusNum=-2
            }


            this.queryParams.providersActivityProgramId=providersActivityProgramId
            this.queryParams2.providersActivityProgramId=providersActivityProgramId
            this.getActivityProgramFileList(this.queryParams)
            this.getActivityProgramOrderList(this.queryParams2)


      })
      },

      getActivityProgramOrderList(data){
        ActivityProgramOrderList(data).then(response => {
            console.log(response)
            this.orderList=response.rows
             // this.classList=response.data.list
             // this.commentTotal=this.commentList.length
        });
      },

      getActivityProgramFileList(data){

        ActivityProgramFileList(data).then(response => {
            console.log(response)
           this.FileList=response.data.list
        });
      },


      handleClick(tab, event) {
        console.log(tab, event);

      },
      getMap(data) {

       var myChart = this.$echarts.init(document.getElementById('mapposterD'))

       // var myChart = thi s.$echarts.init(document.getElementById('map'))
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



    
     // 搜索订单号
    SearchOrderNum(){
      this.queryParams2.orderNum=this.searcOrderNum
       this.getActivityProgramOrderList(this.queryParams2)
      this.visible=false
    },
    
    // 重置搜索订单号
    clearSearchOrderNum(){
      this.searcOrderNum=''
      this.visible=false
      this.queryParams2.orderNum=null
       this.getActivityProgramOrderList(this.queryParams2)
    },




      // 提交上线
      pushLine(){
        const id=this.providersActivityProgramId||localStorage.getItem('providersActivityProgramId')
        this.$confirm("在提交上线后，将由平台审核，预计需要1~3个工作日。确定要继续吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              providersActivityProgramId:id,
              operationType:1
            }
            return ActivityOppreate(data);
          }).then(() => {
            this.Status="已上线"
            this.msgSuccess("上线成功");
          })
      },

      // 下线
      downLine(){
       const id=this.providersActivityProgramId||localStorage.getItem('providersActivityProgramId')
       this.$confirm("下线后，将不再允许用户查看此活动,且重新上线时需平台审核。确定要继续吗", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersActivityProgramId:id,
             operationType:2
           }
           return ActivityOppreate(data);
         }).then(() => {
           this.Status="未上线"
           this.msgSuccess("下线成功");
         })
      },

      // 撤回审核
      reExemine(){
       const id=this.providersActivityProgramId||localStorage.getItem('providersActivityProgramId')
       this.$confirm("撤回审核后，平台将不再处理此次审核。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersActivityProgramId:id,
             operationType:3
           }
           return ActivityOppreate(data);
         }).then(() => {
           this.Status="未审核"
           this.msgSuccess("撤回成功");
         })
      },


      // 删除
      delPro(){
       const id=this.providersActivityProgramId||localStorage.getItem('providersActivityProgramId')
       this.$confirm("删除后，该活动将无法恢复。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersActivityProgramId:id,
             operationType:4
           }
           return ActivityOppreate(data);
         }).then(() => {
           this.$router.go(-1);
           this.msgSuccess("删除成功");
         })
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
