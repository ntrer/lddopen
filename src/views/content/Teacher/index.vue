<template>

  <div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      导师
      <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >

    <div style="display: flex;flex-direction: row;">

      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px; display: flex; align-items: center; justify-content: center;" :class="state1 === false?'color2':'color1'" @click="switchData(1)">
        所有导师
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state2 === false?'color2':'color1'" @click="switchData(2)">
        已上线
        <el-tag v-if="onlineCount!=null&&onlineCount>0" style="background-color: #19AA29;color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{onlineCount}}</el-tag>
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state3 === false?'color2':'color1'" @click="switchData(3)">
        审核中
        <el-tag v-if="beExamineCount!=null&&beExamineCount>0" style="background-color: #3b7afc; color: white;height: 15px;padding: 0 4px;line-height: 15px;margin-left: 4px;">{{beExamineCount}}</el-tag>
      </div>
      <div class="button-border" style="font-size: 12px;width: 100px;height: 40px;margin-left: 2px;display: flex; align-items: center; justify-content: center;" :class="state4 === false?'color2':'color1'" @click="switchData(4)">
          <span style="margin-left: -6px;">
            审核失败
          </span>
        <el-tag v-if="examineFailCount!=null&&examineFailCount>0" style="background-color: #da4646;color: white;height: 15px;padding: 0 4px;line-height: 15px;">{{examineFailCount}}</el-tag>
      </div>
    </div>


      <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
        <div>
          <el-select v-model="selectStatus" placeholder="请选择" multiple clearable style="width: 200px" class="my-input" @change="queryStatus">
            <el-option v-for="(item, index) in selectStatusList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictLabel"/>
          </el-select>
          <el-input
          class="my-input"
            style="width: 200px;margin-left: 10px;"
            v-model="queryParams.tutorName"
            placeholder="可输入名称进行搜索"
            clearable
            size="medium"
            @keyup.enter.native="handleQuery"
             @change="queryName"
             maxlength="24"
          />

          <router-link :to="{name:'addTeacher',path: '/content/addTeacher'}">
          <el-button
            style="background-color: #19AA29;color: white;float: right;"
            plain
            icon="el-icon-plus"
            size="small"
          >新增</el-button>
           </router-link>


        </div>

        <div style="margin-top: 20px;" v-loading="loading">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in teacherList" :key="index" >
              <el-card :body-style="{ padding: '0px' }" style="height: 360px;margin-top: 20px;">
                <!-- 标签 -->
                <div style="width: 100%;height: 50px;" v-if="item.sysAuditStatus==1">
                  <el-tag style="float: right; background-color: #19AA29;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">已上线</el-tag>
                </div>

                <div style="width: 100%;height: 50px;" v-if="item.sysAuditStatus==0">
                  <el-tag style="float: right; background-color: #909399;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">未上线</el-tag>
                </div>

                <div style="width: 100%;height: 50px;" v-if="item.sysAuditStatus==2">
                  <el-tag style="float: right; background-color: #e6a23c;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">审核中</el-tag>
                </div>

                <div style="width: 100%;height: 50px;" v-if="item.sysAuditStatus==-1">
                  <el-tag style="float: right; background-color: #f56c6c;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">审核失败</el-tag>
                </div>

                <!-- 信息 -->
                <div style="display: flex;flex-direction: column;justify-content: center; align-items: center;">
                  <img :src="item.fullTutorImgUrl" style="height: 120px;width: 120px;border-radius: 4px;" >
                  <span style="margin-top: 10px;">{{item.tutorName}}</span>
                </div>

                <!-- 描述 -->
                <div style=" padding: 10px; margin-left: 10px; margin-top: 20px; margin-right: 10px;border-radius: 4px;background-color: #f7f7f7;height: 80px;">
                  <span class="my-des">{{item.introduction}}</span>
                </div>


                <!-- 底部操作 -->
                <div style=" margin-top: 18px; background-color: #f7f7f7;height: 40px;display: flex;flex-direction: row; align-items: center;">
                     <router-link :to="{name:'teacherDetail',path: '/content/teacherDetail',query:{ dataId: item.providersTutorId}}" style="display: flex;flex: 1;justify-content: center;color: black;">
                    <el-button
                      style="color: black;"
                      size="mini"
                      type="text"
                      icon="el-icon-view"


                    >查看</el-button>
                     </router-link>

                     <router-link :to="{name:'editTeacher',path: '/content/editTeacher',query:{ dataId: item.providersTutorId}}" style="display: flex;flex: 1;justify-content: center;color: black;">
                    <el-button
                     style="color: black;"
                      size="mini"
                      type="text"
                      icon="el-icon-edit"


                    >修改</el-button>
                     </router-link>
                     <el-dropdown  style="display: flex;flex: 1;justify-content: center;color: black;width: 80px;">
                       <el-button
                         style="color: black;"
                         size="mini"
                         type="text"

                       >更多</el-button>
                       <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item style="width: 100px;" v-if="item.sysAuditStatus==0"  @click.native="pushLine(item.providersTutorId)">提交上线</el-dropdown-item>
                         <el-dropdown-item v-if="item.sysAuditStatus==1"  @click.native="downLine(item.providersTutorId)">下线</el-dropdown-item>
                         <el-dropdown-item v-if="item.sysAuditStatus!=-1" @click.native="reExemine(item.providersTutorId)">撤回审核</el-dropdown-item>
                         <el-dropdown-item @click.native="delTutor(item.providersTutorId)">删除</el-dropdown-item>
                       </el-dropdown-menu>
                     </el-dropdown>

                </div>

              </el-card>
            </el-col>


          </el-row>
        </div>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />


      </el-card>


   <bottom-card moduleName="内容" pagesName="导师" style="margin-top: 20px;"></bottom-card>


  </div>
</template>

<script>


  import bottomCard from '@/components/bottomCard'
  import {TrainTutorList,TrainTutorCount,trainTutorOppreate} from "@/api/content/teacher";
  import Cookies from "js-cookie";
  export default {
    name: "index",
    components: {
     bottomCard
    },
    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        state1: true,
        state2: false,
        state3: false,
        state4: false,
        onlineCount:null,
        beExamineCount:null,
        examineFailCount:null,
        queryParams:{
          sysAuditStatuss:null,
          tutorName:null,
          pageNum:1,
          pageSize:10
        },
        selectStatus:["全部状态"],
        teacherList:[],
        total:10,
        loading:false,
        teacherDes:"啊沙发沙发沙发沙发",
        selectName:null,
       selectStatusList: [{
         "dictLabel": "全部状态",
         "dictValue": 3
       }, {
         "dictLabel": "已上线",
         "dictValue": 1
       },
       {
         "dictLabel": "未上线",
         "dictValue": 0
       },
       {
         "dictLabel": "审核中",
         "dictValue": 2
       },
       {
         "dictLabel": "审核失败",
         "dictValue": -1
       }
       ],
      };
    },

    created() {
     this.getList()
     this.getCount()
    },


    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },


    methods: {



      queryStatus(){
        if(this.selectStatus.length>0){
          let param=[]
          for (var i = 0; i < this.selectStatus.length; i++) {
           if(this.selectStatus[i]=='已上线'){
             param.push("1")
           }else if(this.selectStatus[i]=='审核中'){
             param.push("2")
           }
           else if(this.selectStatus[i]=='未上线'){
             param.push("0")
           }
           else if(this.selectStatus[i]=='审核失败'){
             param.push("-1")
           }
           else if(this.selectStatus[i]=='全部状态'){

           }
          }
          // param.splice(0, 0, ",");
          // param.push(",")
          if(param.length==0){
            this.queryParams.sysAuditStatuss=null
          }
          else{
             this.queryParams.sysAuditStatuss=param.toString()
          }

        }
        else{
           this.queryParams.sysAuditStatuss=null
        }

        this.getList()
      },

      queryName(){
        this.getList()
      },

      getList(){
        TrainTutorList(this.queryParams).then(response => {
            console.log(response)
            this.teacherList=response.data.rows
            this.total=response.data.total
        });
      },

      getCount(){
        TrainTutorCount().then(response => {
            console.log(response)
            this.onlineCount=response.data.onlineCount
            this.beExamineCount=response.data.beExamineCount
            this.examineFailCount=response.data.examineFailCount
        });
      },


      switchData(index){
                if(index==1){
                  this.state1 = true
                  this.state2 = false
                  this.state3 = false
                  this.state4 = false
                }
                else if(index==2){
                  this.state1 = false
                  this.state2 = true
                  this.state3 = false
                  this.state4 = false
                }
                else if(index==3){
                  this.state1 = false
                  this.state2 = false
                  this.state3 = true
                  this.state4 = false
                }
                else if(index==4){
                  this.state1 = false
                  this.state2 = false
                  this.state3 = false
                  this.state4 = true
                }

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
            this.getList();
            this.getCount()
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
           this.getList();
           this.getCount()
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
           this.getList();
           this.getCount()
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
            this.getList();
            this.getCount()
            this.msgSuccess("删除成功");
          })
      }



    },
  };



</script>

<style scoped>

  .el-button--goon.is-active,
  .el-button--goon:active {
    background: #fff;
    color: #000;
  }

  .el-button--goon:focus,
  .el-button--goon:hover {
    background: #fff;
    color: #000;
  }

  .el-button--goon {
    color: #000;
    background-color: #e1e1e1;
  }


  .color1{
    color: #000;
    background-color: #fff;
  }
  .color2{
    color: #000;
    background-color: #e1e1e1;
  }


  .button-border{
    border-radius: 4px 4px 0 0;
  }


  .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .my-input/deep/.el-input__inner{
      background-color: #f7f7f7;
    }

    .my-des{
     display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 3;
       overflow: hidden;

    }

</style>
