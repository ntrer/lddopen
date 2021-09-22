<template>
  <div class="app-container home">
    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">查看导师</span>
    </el-page-header>





    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="update-log" style="height: 100%;">

          <div style="width: 100%; height: 140px; margin-top: 10px;display: flex; justify-content: space-between;">

            <div style="width: 50%;height: 120px; display: flex;">
              <img :src="teacherPic" style="height: 120px;width: 100px;">
              <div style="display: flex;flex-direction: column; margin-left: 15px;margin-right: 10px;">
                <span style="margin-top: 5px;font-weight: 450;font-size: 14px; ">{{teacherName}}</span>


                <div style="margin-top: 20px;font-size: 12px;color: darkgray;">
                  创建时间:


                  <span style="color: #000000; font-weight: 400;">{{createTime}}</span>
                </div>



              </div>


            </div>

            <div style="width: 50%;height: 120px; ">
              <div style="height: 20px;width: 100%;display: flex; flex-direction: row-reverse;">


                <div style="display: flex; width: 26px;height: 26px; border-radius: 5px;border: 1px solid #19AA29;align-items: center;justify-content: center;cursor: pointer;">
              <!--    <div
                    style="width: 65%;height: 100%;display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;border-right: 1px solid #19AA29;">
                    预览
                  </div> -->
                  <el-dropdown style="justify-content: center;color: black;">
                    <div
                      style=" font-size: 20px; display: flex;justify-content: center;align-items: center;font-size: 12px; color: #19AA29;">
                      ‧‧‧
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item style="width: 100px;" v-if="data.sysAuditStatus==0"  @click.native="pushLine(data)">提交上线</el-dropdown-item>
                      <el-dropdown-item v-if="data.sysAuditStatus==1"  @click.native="downLine(data)">下线</el-dropdown-item>
                      <router-link :to="{name:'editTeacher',path: '/content/editTeacher' ,query:{ dataId: data}}" >
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
                    订单总量
                  </div>
                  <div
                    style="display: flex;align-items: center;height: 40px;justify-content: center;font-family:Helvetica, Tahoma, Arial ;">
                    {{orderNum}}
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
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>


                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;">昨天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">上周</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本月</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">最近30天</span>
                <span class="my-title"
                  style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;">最近60天</span>

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
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;margin-left: 20px;">昨天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">上周</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">本月</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 10px;">最近30天</span>
              <span class="my-title"
                style="font-size: 1px;cursor: pointer;color: #19AA29;margin-right: 20px;">最近60天</span>





<el-table :data="orderData" style="margin-top: 20px;" :cell-style="cellStyle">
  <el-table-column prop="orderTimeFormat" width="140" label="创建时间" sortable >
  </el-table-column>
  <el-table-column prop="orderNum" label="订单号" width="180" :render-header="renderFilter" >
  </el-table-column>
  <el-table-column prop="bizName" label="课程名称" width="140">
    <template slot-scope="scope">
      <router-link :to="{name:'companyDetail',path: '/content/companyDetail' ,query:{ dataId: scope.row.bizId}}">
        {{scope.row.bizName}}
      </router-link>
    </template>
  </el-table-column>
  <el-table-column prop="originalPrice" label="原价" width="140" sortable :formatter="priceFormate">
  </el-table-column>
  <el-table-column prop="shopPreferentialPrice" label="优惠额" width="140" sortable :formatter="priceFormate2">
  </el-table-column>
  <el-table-column prop="transactionPrice" label="成交价" width="140" sortable :formatter="priceFormate3">
  </el-table-column>
  <el-table-column label="状态" align="left" prop="payType" width="160">
    <template slot-scope="scope">
      <div style="font-size: 12px;color: #13CE66;display: flex;align-items: center;" v-if="scope.row.payType == 1">
        <div style="width: 10px; height: 10px;background-color: #13CE66;border-radius: 5px;margin-right: 2px;">

        </div>
        交易成功</div>
      <!-- <img height="60px" width="60px" :src="scope.row.headPortrait" alt="" v-if="scope.row.headPortrait"> -->
    </template>

     </el-table-column>

<el-table-column label="操作">
          <template slot-scope="scope">
             <router-link :to="{name:'OrderDetail',path: '/function/OrderDetail',query:{ data: scope.row.orderId }}" >
            <el-button type="text">查看订单</el-button>
              </router-link>
          </template>
        </el-table-column>
      </el-table>
 <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getTutororderList"
    />

              </el-tab-pane>
              <el-tab-pane label="课程列表" name="third">
                 <el-table   :data="classData" style="margin-top: 20px;">
                   <el-table-column label="课程名称" align="left" prop="courseName" width="200" :render-header="renderFilterClassName"/>
                   <el-table-column label="分类" align="center" prop="classificationName" width="160" :render-header="renderFilterType"
                 />

                   <el-table-column label="课时节数" align="right" prop="classHourNum" width="160" sortable :formatter="classHourNumFormat"/>
                   <el-table-column label="价格" align="right" prop="price" width="160" sortable :formatter="priceFormate"/>
                   <el-table-column label="浏览量" align="right" prop="showViewNum" width="140" sortable :formatter="viewNumFormate3"/>
                   <el-table-column label="订单量" align="right" prop="actualOrderNum" width="140" sortable :formatter="viewNumFormate4"/>
                   <el-table-column label="观看总次数" align="right" prop="playViewTotalPageNum" width="140" sortable :formatter="viewNumFormate"/>
                   <el-table-column label="完整观看总次数" align="right" prop="playendViewTotalUserNum" width="140" sortable :formatter="viewNumFormate2"/>
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

                       >查看课程</el-button>
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


  <bottom-card moduleName="内容" pagesName="导师详情" style="margin-top: 20px;"></bottom-card>



  </div>


</template>

<script>
  import {TrainTutorList,TrainTutorCount,trainTutorOppreate,getTrainTutor,dataoverview,TutororderList,TutorcourseList} from "@/api/content/teacher";
   import bottomCard from '@/components/bottomCard'
  export default {
    components: {
     bottomCard
    },
    data() {
      return {

        teacherName:null,
        createTime:null,
        viewNum:0,
        orderNum:0,
        Status:null,
        teacherPic:null,
        data:{
          sysAuditStatus:0
        },
        searcOrderNum:'',
        searchClassName:'',
        visible:false,
        visible2:false,
        visible4:false,
        filterStatusList:[],
        filterList:[],
        filterList1:[],
        // 版本号
        drawer: false,
        openComment:false,
        comment:null,
        activeName: 'first',
        selectTime: '',
        selectTime2:'',
        version: "3.6.0",
        activeName: 'first',
        imgUrl: 'https://img0.baidu.com/it/u=4086653970,2392878139&fm=26&fmt=auto&gp=0.jpg',
        imgList: [],
        form: {},
        queryParams:{
          pageNum: 1,
          pageSize: 10,
          startDate:"2021-01-25",
          endDate:"2021-08-27",
          orderNum:null
        },
         total:10,
         queryParams2:{
           pageNum: 1,
           pageSize: 10,
           courseName:null,
           sysAuditStatuss:null
         },
         total1:10,
         rate:1,
         colors: ['#19AA29'],
        orderData:[],
        classData:[],

        statusList:[
          {
            itemValue:0,
            itemLable:"待支付"
          },
          {
            itemValue:0,
            itemLable:"交易成功"
          },
          {
            itemValue:0,
            itemLable:"交易失败"
          }
        ]

      };
    },
    mounted() {

    },



    created(){
      this.data = this.$route.query.dataId
      console.log(this.data)
      // 从前页进来
      if(this.data!=undefined){

        this.handleDetail(this.data)
      }
      // 从后页返回
      else{

         this.handleDetail2( localStorage.getItem('providersTutorId'))
      }
    },


    methods: {

      // 修改列表字体颜色
      cellStyle(row){
        if(row.column.label==="课程名称"){
              return 'color: #19AA29;'
          }
      },

      statusFormate(){

      },

      classHourNumFormat(row, column){
        if(row.classHourNum!=null){
          return row.classHourNum+"节"
        }
      },

      priceFormate(row, column){
         if(row.price!=null){
           return ("￥"+(parseInt(row.price)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }


       },


       viewNumFormate(row, column){
         if(row.playViewTotalPageNum!=null){
           return ((parseInt(row.playViewTotalPageNum))+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }
       },

       viewNumFormate2(row, column){
         if(row.playendViewTotalUserNum!=null){
           return ((parseInt(row.playendViewTotalUserNum))+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }
       },


       viewNumFormate3(row, column){
         if(row.showViewNum!=null){
           return ((parseInt(row.showViewNum))+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
         }
       },

       viewNumFormate4(row, column){
         if(row.actualOrderNum!=null){
           return ((parseInt(row.actualOrderNum))+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
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





      // 显示详情
      handleDetail(providersTutorId){

        // 获取上半部数据
        getTrainTutor(providersTutorId).then(response => {
            console.log(response)
            this.teacherPic=response.data.providersTrainTutor.fullTutorImgUrl
            this.teacherName=response.data.providersTrainTutor.tutorName
            this.createTime=response.data.providersTrainTutor.createTime
            if(response.data.providersTrainTutor.sysAuditStatus==0){
              this.Status="未上线"
            }
            else if(response.data.providersTrainTutor.sysAuditStatus==1){
              this.Status="已上线"
            }
            else if(response.data.providersTrainTutor.sysAuditStatus==2){
              this.Status="审核中"
            }
            else if(response.data.providersTrainTutor.sysAuditStatus==-1){
              this.Status="审核失败"
            }
            else if(response.data.providersTrainTutor.sysAuditStatus==-2){
              this.Status="未上线"
            }

            this.orderNum=response.data.providersTrainTutor.totalOrders||0
            this.viewNum=response.data.providersTrainTutor.otalScans||0
        });




        // 获取2个统计图数据
        this.$nextTick(() => {


         let params={
           providersTutorId:providersTutorId,
           startDate:"2021-08-25",
           endDate:"2021-08-27"
         }
         dataoverview(params).then(response => {
             console.log(response)
             this.getMap(response.data.viewList)
             this.getjs(response.data.callnList)
         });


          localStorage.setItem('providersTutorId',providersTutorId);

        })


       // 获取导师订单列表
       this.getTutororderList()
       // 获取课程列表
       this.getTutorcourseList()
      },


      // 从下页返回
      handleDetail2(providersTutorId){

        console.log("我从下页返回")


        // 获取上半部数据
        getTrainTutor(providersTutorId).then(response => {
        console.log(response)
        this.data=response.data.providersTrainTutor.providersTutorId
        this.teacherPic=response.data.providersTrainTutor.fullTutorImgUrl
        this.teacherName=response.data.providersTrainTutor.tutorName
        this.createTime=response.data.providersTrainTutor.createTime
        if(response.data.providersTrainTutor.sysAuditStatus==0){
          this.Status="未上线"
        }
        else if(response.data.providersTrainTutor.sysAuditStatus==1){
          this.Status="已上线"
        }
        else if(response.data.providersTrainTutor.sysAuditStatus==2){
          this.Status="审核中"
        }
        else if(response.data.providersTrainTutor.sysAuditStatus==-1){
          this.Status="审核失败"
        }
        else if(response.data.providersTrainTutor.sysAuditStatus==-2){
          this.Status="未上线"
        }

        this.orderNum=response.data.providersTrainTutor.totalOrders||0
        this.viewNum=response.data.providersTrainTutor.otalScans||0
        });



        // 获取2个统计图数据
        this.$nextTick(() => {

         let params={
           providersTutorId:providersTutorId,
           startDate:"2021-08-25",
           endDate:"2021-08-27"
         }
         dataoverview(params).then(response => {
             console.log(response)
             this.getMap(response.data.viewList)
             this.getjs(response.data.callnList)
         });


          localStorage.setItem('providersTutorId',providersTutorId);

        })


        // 获取导师订单列表
        this.getTutororderList()
        // 获取课程列表
        this.getTutorcourseList()
      },





      handleClick(tab, event) {
        console.log(tab, event);

      },



      // 获取导师订单列表
      getTutororderList(){
        var providersTutorId=this.data||localStorage.getItem('providersTutorId')
        this.queryParams.providersTutorId=providersTutorId
        TutororderList(this.queryParams).then(response => {
            console.log(response)
            this.orderData=response.data
        });
      },

      getTutorcourseList(){
        var providersTutorId=this.data||localStorage.getItem('providersTutorId')
        this.queryParams2.providersTutorId=providersTutorId
        TutorcourseList(this.queryParams2).then(response => {
            console.log(response)
            this.classData=response.data
        });
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
            data: ['格式A', '格式B', '格式C', '格式D']
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {

            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '格式A',
              type: 'bar',
              stack: 'total',
              color:'#155CB5',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '格式B',
               color:'#2077D8',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '格式C',
              color:'#2E99FC',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '格式D',
              color:'#50AFFC',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            }
          ]
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
                              <el-input size='small' v-model={this.searcOrderNum} placeholder='请输入内容'></el-input>
                              <div class='el-table-filter__bottom'>
                                  <button class={this.searcOrderNum ? '' : 'is-disabled'} on-click={this.SearchOrderNum}>筛选</button>
                                  <button on-click={this.clearSearchrderNum}>重置</button>
                              </div>
                          </el-popover>
                      </span>
                  );
              },



           // 搜索订单号
           SearchOrderNum(){
            this.queryParams.orderNum=this.searcOrderNum
            this.getTutororderList()
            this.visible=false
           },

              // 重置搜索订单号
           clearSearchrderNum(){
             this.searcOrderNum=''
             this.visible=false
             this.queryParams.orderNum=null
             this.getTutororderList()
           },







   renderFilterClassName(h, {column, $index}, index) {
                  return (
                      <span>
                          课程名称
                          <el-popover placement='bottom' width='160' height='240' v-model={this.visible2}>
                              <span slot="reference" style="margin-left:3px;margin-top:5px">
                                  <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                              </span>
                              <el-input size='small' v-model={this.searchClassName} placeholder='请输入内容'></el-input>
                              <div class='el-table-filter__bottom'>
                                  <button class={this.searchClassName ? '' : 'is-disabled'} on-click={this.SearchClassName}>筛选</button>
                                  <button on-click={this.clearSearchClassName}>重置</button>
                              </div>
                          </el-popover>
                      </span>
                  );
              },


              // 搜索课程名称
              SearchClassName(){
               this.queryParams2.courseName=this.searchClassName
               this.getTutorcourseList()
               this.visible2=false
              },

                 // 重置搜索课程名称
              clearSearchClassName(){
                this.searchClassName=''
                this.visible2=false
                this.queryParams2.courseName=null
                this.getTutorcourseList()
              },



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

     this.queryParams2.sysAuditStatuss=Statuss.toString()
     console.log(this.queryParams2.sysAuditStatuss)
     this.visible4=false
      this.getTutorcourseList()

   },

   clearStatusSearch(){
     this.visible4=false
       this.filterStatusList=[];
       this.queryParams2.sysAuditStatuss=null
       this.getTutorcourseList()
   },



            clearSearch1(){
              this.filterList1=[];
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
              providersTutorId:id,
              operationType:1
            }
            return trainTutorOppreate(data);
          }).then(() => {
            this.handleDetail2( localStorage.getItem('providersTutorId'))
            this.msgSuccess("上线成功");
          })
      },

      // 下线
      downLine(id){
       this.$confirm("下线后，新增和修改课程时将无法选择该导师，且重新上线时需平台审核。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersTutorId:id,
             operationType:2
           }
           return trainTutorOppreate(data);
         }).then(() => {
           this.handleDetail2( localStorage.getItem('providersTutorId'))
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
             providersTutorId:id,
             operationType:3
           }
           return trainTutorOppreate(data);
         }).then(() => {
           this.handleDetail2( localStorage.getItem('providersTutorId'))
           this.msgSuccess("撤回成功");
         })
      },

      delTutor(id){
        this.$confirm("删除后，该导师将无法恢复。确定要继续吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              providersTutorId:id,
              operationType:4
            }
            return trainTutorOppreate(data);
          }).then(() => {
            this.$router.go(-1);
            this.msgSuccess("删除成功");
          })
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
