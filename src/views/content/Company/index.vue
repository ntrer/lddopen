<template>

  <div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      厂商
      <el-tooltip content="用于管理器材厂商的信息" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >




    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
      <div>
        <el-select v-model="selectStatus" placeholder="请选择" clearable multiple style="width: 200px" class="my-input" @change="queryStatus">
          <el-option v-for="(item, index) in selectStatusList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictLabel"/>
        </el-select>
        <el-input
        class="my-input"
          style="width: 200px;margin-left: 10px;"
          v-model="queryParams.manufactorName"
          placeholder="可输入名称进行搜索"
          clearable
          size="medium"
          @keyup.enter.native="handleQuery"
          @change="queryName"
        />

        <router-link :to="{name:'addCompany',path: '/content/addCompany'}">
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
          <el-col :span="6" v-for="(item, index) in dataList" :key="index" >
            <el-card :body-style="{ padding: '0px' }" style="height: 370px;margin-top: 20px;">
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
                <img :src="item.fullLogoImgUrl" style="height: 120px;width: 200px;border-radius: 4px;object-fit: cover;" >
                <span style="margin-top: 20px;">{{item.manufactorName}}</span>
              </div>

              <!-- 描述 -->
              <div  style="font-size: 14px;padding: 10px; margin-left: 10px; margin-top: 20px; margin-right: 10px;border-radius: 4px;background-color: #f7f7f7;height: 80px;">
                <span class="my-des">{{item.introduction}}</span>
              </div>


              <!-- 底部操作 -->
              <div style=" margin-top: 18px; background-color: #f7f7f7;height: 40px;display: flex;flex-direction: row; align-items: center;">
                  <router-link :to="{name:'companyDetail',path: '/content/companyDetail' ,query:{ dataId: item.providersManufactorId}}"  style="display: flex;flex: 1;justify-content: center;color: black;">
                  <el-button
                     style="color: black;"
                    size="mini"
                    type="text"
                    icon="el-icon-view"
                  >查看</el-button>
                  </router-link>

                   <router-link :to="{name:'editCompany',path: '/content/editCompany' ,query:{ dataId: item.providersManufactorId}}"  style="display: flex;flex: 1;justify-content: center;color: black;">
                  <el-button
                     style="color: black;"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                  >修改</el-button>
                   </router-link>

                   <el-dropdown  style="display: flex;flex: 1;justify-content: center;color: black;width: 80px;width: 33.3%;">
                     <el-button
                       style="color: black;"
                       size="mini"
                       type="text"
                     >更多</el-button>
                     <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item style="width: 100px;" v-if="item.sysAuditStatus==0"  @click.native="pushLine(item.providersManufactorId)">提交上线</el-dropdown-item>
                       <el-dropdown-item  v-if="item.sysAuditStatus==1"  @click.native="downLine(item.providersManufactorId)">下线</el-dropdown-item>
                       <el-dropdown-item v-if="item.sysAuditStatus!=-1" @click.native="reExemine(item.providersManufactorId)">撤回审核</el-dropdown-item>
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
          @pagination="getData"
        />


    </el-card>


    <bottom-card moduleName="内容" pagesName="厂商" style="margin-top: 20px;"></bottom-card>



    </div>


</template>

<script>
   import bottomCard from '@/components/bottomCard'
  import {manufactorList,manufactorOppreate} from "@/api/content/manufactor";
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
        dataList:[],
        total:10,
        loading:false,
        companyDes:"企业的组织形式。以营利为目的的社团法人。在资本主义社会获得高度发展。我国在建国后对私营公司进行了社会主义改造,企业的组织形式",
        selectName:null,
        selectStatus:["全部状态"],
        queryParams:{
          pageNum:1,
          pageSize:10,
          sysAuditStatuss:null,
          manufactorName:null
        },
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
      this.getData()
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

        this.getData()
      },

      queryName(){
        this.getData()
      },


       getData(){
         manufactorList(this.queryParams).then(response => {
           console.log(response)
           this.dataList=response.rows
           this.total=response.total
         });
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
             this.getData();
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
            this.getData();
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
            this.getData();
            this.msgSuccess("撤回成功");
          })
       },


    },
  };




</script>

<style scoped>

  .my-des{
   display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 3;
     overflow: hidden;



  }


  .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }



</style>
