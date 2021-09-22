<template>

  <div class="app-container home">


    <H4 style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px; align-items: center;">
      在线微课
      <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;">
        <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
      </el-tooltip>
    </H4>


    <div style="background-color: #FFFFFF;">

      <div style="width: 100%;height: 40px; background-color: #f0f2f4;display: flex;">
<div style="width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state1 === false?'color2':'color1'" @click="switchData(1)">
  所有海报
</div>

<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state2 === false?'color2':'color1'" @click="switchData(2)">
  已上线
  <el-tag v-if="onlineCount!=null&&onlineCount>0" style="background-color: #19AA29;color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{onlineCount}}</el-tag>
</div>
<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state3 === false?'color2':'color1'" @click="switchData(3)">
  审核中
  <el-tag v-if="beExamineCount!=null&&beExamineCount>0" style="background-color: #3b7afc; color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{beExamineCount}}</el-tag>
</div>
<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state4 === false?'color2':'color1'" @click="switchData(4)">
  审核失败
  <el-tag v-if="examineFailCount!=null&&examineFailCount>0" style="background-color: #da4646;color: white;height: 15px;padding: 0 4px;line-height: 15px;">{{examineFailCount}}</el-tag>
</div>


      </div>



     <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
     <div>

       <el-input
         style="width: 200px;margin-left: 10px;margin-top: 10px;"
         v-model="queryParams.courseName"
         placeholder="可输入名称进行搜索"
         clearable
         size="medium"
         @keyup.enter.native="handleQuery"
          @change="queryName"
       />

       <router-link :to="{name:'addClass',path: '/content/addClass'}">
       <el-button
         style="background-color: #19AA29;color: white;float: right;height: 30px;margin-top: 15px;margin-right: 10px;"
         plain
         icon="el-icon-plus"
         size="small"
       >新增</el-button>
        </router-link>


     </div>



      <el-table :data="tableData" style="margin-top: 20px;">
        <el-table-column prop="courseName" label="课程名称" width="120">
        </el-table-column>
       <el-table-column prop="classificationName" label="分类" width="120">

          <template slot="header" slot-scope="scope">
            <span>分类</span>
             <el-popover placement='bottom' width='160'v-model="visible">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-checkbox-group v-model="TypeList" style="display: flex;flex-direction: column;align-items: flex-start;height: 160px;overflow-y: scroll;">
                     <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.classificationId" v-for="(item,index) in trainClassificationList" :key="index">{{item.classificationName}}</el-checkbox>
                   </el-checkbox-group>
                  <div class='el-table-filter__bottom'>
                      <button :class="TypeList.length>0?'':'is-disabled'" @click="SearchTypehName">筛选</button>
                      <button @click="clearSearchTypeName">重置</button>
                  </div>
             </el-popover>
          </template>


        </el-table-column>



        <el-table-column prop="tutorName" label="导师" width="120" >


          <template slot="header" slot-scope="scope">
            <span>导师</span>
             <el-popover placement='bottom' width='160'v-model="visible2">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-checkbox-group v-model="teacherList" style="display: flex;flex-direction: column;align-items: flex-start;height: 140px;overflow-y: scroll;">
                     <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.tutorId" v-for="(item,index) in trainTutorList" :key="index">{{item.tutorName}}</el-checkbox>
                   </el-checkbox-group>
                  <div class='el-table-filter__bottom'>
                      <button :class="teacherList.length>0?'':'is-disabled'" @click="filterteacher">筛选</button>
                      <button @click="clearFilterteacher">重置</button>
                  </div>
             </el-popover>
          </template>


         <template slot-scope="scope">

           <div style="font-size: 12px;color: #13CE66;display: flex;align-items: center;" >

             {{scope.row.tutorName}}</div>

           <!-- <img height="60px" width="60px" :src="scope.row.headPortrait" alt="" v-if="scope.row.headPortrait"> -->
         </template>

 </el-table-column>



        <el-table-column prop="classHourNum" label="课时节数" width="100" sortable >
        </el-table-column>
        <el-table-column prop="currentPrice" label="价格" sortable >
        </el-table-column>
        <el-table-column prop="showViewNum" label="浏览量" width="100" sortable >
        </el-table-column>
        <el-table-column prop="actualOrderNum" label="订单量" width="100" sortable >
        </el-table-column>
        <el-table-column prop="userGrade" label="用户评分" width="100" sortable >
        </el-table-column>
        <el-table-column prop="states" label="状态" width="130">


          <template slot="header" slot-scope="scope">
            <span>状态</span>
             <el-popover placement='bottom' width='160'v-model="visible1">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-checkbox-group v-model="statusList" style="display: flex;flex-direction: column;align-items: flex-start;height: 140px;overflow-y: scroll;">
                     <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.id" v-for="(item,index) in trainClassificationStatusListList" :key="index">{{item.lable}}</el-checkbox>
                   </el-checkbox-group>
                  <div class='el-table-filter__bottom'>
                      <button :class="statusList.length>0?'':'is-disabled'" @click="filterStatus">筛选</button>
                      <button @click="clearFilterStatus">重置</button>
                  </div>
             </el-popover>
          </template>




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
        <el-table-column prop="createTime" width="150" label="创建时间" sortable >
        </el-table-column>

        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
             <router-link :to="{name:'classDetail',path: '/content/classDetail',query:{ data: scope.row.providersCourseId}}">
            <el-button type="text" >查看</el-button>

              </router-link>

             <el-dropdown  style="justify-content: center;color: black;width: 80px;" @command="handleCommand">
            <el-button style="width: 70px;"  type="text" >更多</el-button>
          <el-dropdown-menu slot="dropdown">
           <el-dropdown-item style="width: 100px;" v-if="scope.row.sysAuditStatus==0"  @click.native="pushLine(scope.row.providersCourseId)">提交上线</el-dropdown-item>
            <router-link :to="{name:'editClass',path: '/content/editClass',query:{ data: scope.row.providersCourseId}}" >
           <el-dropdown-item>修改</el-dropdown-item>
            </router-link>
           <el-dropdown-item  v-if="scope.row.sysAuditStatus==1"  @click.native="downLine(scope.row.providersCourseId)">下线</el-dropdown-item>
           <el-dropdown-item v-if="scope.row.sysAuditStatus!=-1" @click.native="reExemine(scope.row.providersCourseId)">撤回审核</el-dropdown-item>
            <el-dropdown-item @click.native="delPro(scope.row.providersCourseId)">删除</el-dropdown-item>
          </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

 <pagination
    v-show="total>0"
    :total="total"
    :page.sync="queryParams.pageNum"
    :limit.sync="queryParams.pageSize"
    @pagination="getList"
  />


   </el-card>


    </div>



  <bottom-card moduleName="内容" pagesName="课程" style="margin-top: 20px;"></bottom-card>

  </div>


</template>

<script>

  import {trainCourseList,trainClassificationList,trainTutorList,TrainCourseOppreate,trainCoursecount} from "@/api/content/class";
  import bottomCard from '@/components/bottomCard'
  import Cookies from "js-cookie";
  export default {
    components: {
     bottomCard
    },
    data() {
      return {

        onlineCount:0,
        examineFailCount:0,
        beExamineCount:0,



          imgList:[],
        currentPage2: 5,
         selectName:null,
          visible2: false,
        state1: true,
        state2: false,
        state3: false,
        state4: false,
         visible: false,
         visible1: false,
          visible2: false,
        activeName: 'first',
        queryParams:{
          pageNum: 1,
          pageSize: 10,
          classificationIds:null,
          tutorId:null,
          sysAuditStatus:null,
          courseName:null
        },

         total:10,
        tableData: [],
         TypeList:[],
         trainClassificationList:[],
         trainClassificationStatusListList:[
           {
             lable:"未上线",
             id:0
           },
           {
             lable:"已上线",
             id:1
           },
           {
             lable:"审核失败",
             id:-1
           },
           {
             lable:"审核中",
             id:2
           }
         ],
         statusList:[],
         teacherList:[],
         trainTutorList:[]
      }
    },

    created() {
     this.getList()
     this.gettrainClassificationList()
     this.gettrainTutorList()
     this.gettrainCoursecount()
    },
    
    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },

    methods: {

      queryName(value){
         this.getList()
      },

      // 获取列表
      getList(){
        trainCourseList(this.queryParams).then(response => {
          console.log(response)
          this.tableData=response.rows
        });
      },

      // 获取课程数量
      gettrainCoursecount(){
        trainCoursecount().then(response => {
          console.log(response)
          this.onlineCount=response.data.onlineCount
          this.beExamineCount=response.data.beExamineCount
          this.examineFailCount=response.data.examineFailCount
        });
      },


      // 获取课程分类
      gettrainClassificationList(){

        trainClassificationList().then(response => {
          console.log(response)
          this.trainClassificationList=response.rows
        });
      },

      // 获取导师列表
      gettrainTutorList(){
        trainTutorList().then(response => {
          console.log(response)
          this.trainTutorList=response.rows
        });
      },



      switchData(index){
                      if(index==1){
                        this.state1 = true
                        this.state2 = false
                        this.state3 = false
                        this.state4 = false
                    this.queryParams.sysAuditStatus=null

                      }
                      else if(index==2){
                        this.state1 = false
                        this.state2 = true
                        this.state3 = false
                        this.state4 = false
                        this.queryParams.sysAuditStatus='1'
                      }
                      else if(index==3){
                        this.state1 = false
                        this.state2 = false
                        this.state3 = true
                        this.state4 = false
                        this.queryParams.sysAuditStatus='2'
                      }
                      else if(index==4){
                        this.state1 = false
                        this.state2 = false
                        this.state3 = false
                        this.state4 = true
                        this.queryParams.sysAuditStatus='-1'
                      }

                       this.getList()

            },






      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);

      this.$router.push('/content/classDetail')
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },



      // 筛选分类
      SearchTypehName(){
        console.log(this.TypeList)
        var typeArray=[]
        for (var i = 0; i < this.TypeList.length; i++) {
          typeArray.push(this.TypeList[i])
        }
        this.queryParams.classificationIds=typeArray.toString()
        this.visible=false
        this.getList()
      },

      //重置分类筛选
      clearSearchTypeName(){
        this.TypeList=[]
        this.queryParams.classificationIds=null
        this.visible=false
        this.getList()
      },


      // 筛选状态
      filterStatus(){
        console.log(this.statusList)
        this.queryParams.sysAuditStatus=this.statusList.toString()

        this.getList()
        this.visible1=false
      },

      //重置筛选状态
      clearFilterStatus(){
        this.statusList=[];
        this.queryParams.sysAuditStatus=null
        this.getList()
        this.visible1=false
      } ,

      // 筛选导师
      filterteacher(){
        this.queryParams.tutorId=this.teacherList.toString()

        this.getList()
        this.visible2=false
      },

       //重置筛选状态
      clearFilterteacher(){
        this.teacherList=[];
        this.queryParams.tutorId=null
        this.getList()
        this.visible2=false
      },

      // 提交上线
      pushLine(id){
        this.$confirm("在提交上线后，将由平台审核，预计需要1~3个工作日。确定要继续吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            let data={
              providersTraincourseId:id,
              operationType:1
            }
            return TrainCourseOppreate(data);
          }).then(() => {
            this.getList();
            this.msgSuccess("上线成功");
          })
      },

      // 下线
      downLine(id){
       this.$confirm("下线后，将不再允许用户查看此课程,且重新上线时需平台审核。确定要继续吗", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersTraincourseId:id,
             operationType:2
           }
           return TrainCourseOppreate(data);
         }).then(() => {
           this.getList();
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
             providersTraincourseId:id,
             operationType:3
           }
           return TrainCourseOppreate(data);
         }).then(() => {
           this.getList();
           this.msgSuccess("撤回成功");
         })
      },


      // 删除
      delPro(id){
       this.$confirm("删除后，该课程将无法恢复。确定要继续吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           let data={
             providersTraincourseId:id,
             operationType:4
           }
           return TrainCourseOppreate(data);
         }).then(() => {
           this.getList();
           this.msgSuccess("删除成功");
         })
      },


    },
  }
</script>
<style>
  .color1{
    color: #000;
    background-color: #fff;
  }
  .color2{
    color: #000;
    background-color: #e1e1e1;
  }
</style>
