<template>

  <div class="app-container home">


    <H4 style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px; align-items: center;">
      活动方案
      <el-tooltip content="用于管理营销活动方案，供用户购买和使用" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;">
        <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
      </el-tooltip>
    </H4>


    <div style="height: 70%;background-color: #FFFFFF;">

      <div style="width: 100%;height: 40px; background-color: #f0f2f4;display: flex;">
<div style="width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state1 === false?'color2':'color1'" @click="switchData(1)">
  所有活动方案
</div>



<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state2 === false?'color2':'color1'" @click="switchData(2)">
  已上线
  <label style="background-color: #19AA29;color: #FFFFFF;padding-left: 1.5px;font-size: 11px;margin-left: 3px;padding-right: 1.5px;border-radius: 3px;">{{onlineCount}}</label>
</div>
<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state3 === false?'color2':'color1'" @click="switchData(3)">
  审核中
  <label style="background-color: #3175FB;color: #FFFFFF;padding-left: 1.5px;font-size: 11px;margin-left: 3px;padding-right: 1.5px;border-radius: 3px;">{{underReviewCount}}</label>
</div>
<div style="margin-left: 5px; width: 100px; height: 40px; display: flex; justify-content: center;align-items: center;border-top-left-radius: 4px;border-top-right-radius: 4px; font-size: 13px;" :class="state4 === false?'color2':'color1'" @click="switchData(4)">
  审核失败
  <label style="background-color: red;color: #FFFFFF;padding-left: 1.5px;font-size: 11px;margin-left: 3px;padding-right: 1.5px;border-radius: 3px;">{{auditFailedCount}}</label>
</div>


      </div>


      <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">

     <div class="flex" style="height: 60px;">

       <el-input
         style="width: 200px;margin-left: 10px;margin-top: 10px;"
         v-model="queryParams.activityProgramName"
         placeholder="可输入名称进行搜索"
         clearable
         size="medium"
        @change="queryName"

       />

       <router-link :to="{name:'addActivity',path: '/content/addActivity'}">
       <el-button
         style="background-color: #19AA29;color: white;float: right;height: 30px;margin-top: 15px;margin-right: 10px;"
         plain
         icon="el-icon-plus"
         size="small"
         @click="handleAdd"
       >新增</el-button>
        </router-link>


     </div>
      <el-table :data="activityList" style="width: 100%;height: 70%;">
        <el-table-column prop="activityProgramName" label="活动方案名称" width="150">
        </el-table-column>
        <el-table-column prop="classificationName" label="分类" width="100">

          <template slot="header" slot-scope="scope">
            <span>分类</span>
             <el-popover placement='bottom' width='160'v-model="visible2">
                 <span slot="reference" style="margin-left:3px;margin-top:5px">
                     <i class="el-self-iconfilter1" style="color:#9b9b9b;"></i>
                 </span>
                 <el-checkbox-group v-model="TypeList" style="display: flex;flex-direction: column;align-items: flex-start;height: 160px;overflow-y: scroll;">
                     <el-checkbox style="margin-top:5px;margin-bottom:5px" :label="item.classificationId" v-for="(item,index) in ActivityProgramClassificationList" :key="index">{{item.classificationName}}</el-checkbox>
                    <!-- <el-checkbox label="审核中" style="margin-top:5px"></el-checkbox>
                     <el-checkbox label="已上线" style="margin-top:5px"></el-checkbox>
                     <el-checkbox label="审核失败" style="margin-top:5px;margin-bottom:5px"></el-checkbox> -->
                   </el-checkbox-group>
                  <div class='el-table-filter__bottom'>
                      <button :class="TypeList.length>0?'':'is-disabled'" @click="SearchTypehName">筛选</button>
                      <button @click="clearSearchTypeName">重置</button>
                  </div>
             </el-popover>
          </template>
        </el-table-column>

        <el-table-column prop="price" label="价格" sortable  :formatter="priceFormate"/>

        <el-table-column prop="showViewNum" label="浏览量" width="100" sortable >
        </el-table-column>
        <el-table-column prop="actualOrderNum" label="订单量" width="100" sortable >
        </el-table-column>

        <el-table-column prop="sysAuditStatus" label="状态"  :render-header=" renderFilter1">

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
           <el-tooltip  placement="bottom" style="margin-left: 5px;">
             <div slot="content">
               <div v-for="(item,index) in scope.row.failReasonList" :key="index">
                 <div>
                   {{item.reasonName}}
                 </div>
               </div>

             </div>
             <img src="../../../assets/images/warnMini.png" style="width: 10px;height: 10px;">
             <!-- < img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" /> -->
           </el-tooltip>
           </div>
           <!-- <img height="60px" width="60px" :src="scope.row.headPortrait" alt="" v-if="scope.row.headPortrait"> -->
         </template>
        </el-table-column>




        <el-table-column prop="createTime" label="创建时间" sortable >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'activityDetail',path: '/content/activityDetail',query:{ dataId: scope.row.providersActivityProgramId}}">
            <el-button type="text" >查看</el-button>

              </router-link>

             <el-dropdown  style="justify-content: center;color: black;width: 80px;" >
            <el-button style="width: 70px;"  type="text" >更多</el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="width: 100px;" v-if="scope.row.sysAuditStatus != 1" @click.native="tijiaosx(scope.row)" >提交上线</el-dropdown-item>
                <el-dropdown-item @click.native="xiaxian(scope.row)" >下线</el-dropdown-item>
                <router-link :to="{name:'editActivity',path: '/content/editActivity',query:{ dataId: scope.row.providersActivityProgramId}}">
                 <el-dropdown-item >修改</el-dropdown-item>
                 </router-link>
                <el-dropdown-item @click.native="chehuish(scope.row)" v-if="scope.row.sysAuditStatus == 2" >撤回审核</el-dropdown-item>
                <el-dropdown-item @click.native="shanchu(scope.row)">删除</el-dropdown-item>
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


   <bottom-card moduleName="内容" pagesName="活动方案" style="margin-top: 20px;"></bottom-card>


  </div>


</template>

<script>
    import Cookies from "js-cookie";
  import bottomCard from '@/components/bottomCard'
  import {ActivityProgramClassification,activityProvidersActivityProgramList,posterDetail,activityProvidersActivityProgramcount,PosterClassification,activityProvidersActivityProgramoperation} from "@/api/content/content";
  export default {
    components: {
     bottomCard
    },
    data() {
      return {
        kindList:[],


          imgList:[],
          onlineCount:0,
          underReviewCount:0,
          auditFailedCount:0,
          sysAuditStatus:'',
          currentPage2: 5,
          selectName:null,
          state1: true,
          state2: false,
          state3: false,
          state4: false,
          visible: false,
          visible1: false,
          visible2:false,
          queryParams:{
            pageNum: 1,
            pageSize: 10,
            activityProgramName:null,
            sysAuditStatuss:null,
            classificationIds:null
          },
        activeName: 'first',

         total:0,
         activityList:[],
         TypeList:[],
         filterList:[],
         filterList1:[],
         ActivityProgramClassificationList:[]

      }
    },
    created() {
     this.getList()
     this.getactivityProvidersActivityProgramcount()
     this.getPosterClassification()
     this.getActivityProgramClassification();

    },
    
    
    mounted() {
     if(Cookies.get("pageSize")!=null){
       this.queryParams.pageSize=parseInt(Cookies.get("pageSize"))
     }
    },
    
    
    methods: {

yuyu(e){

  localStorage.setItem("pd",e.providersPosterId);

},


      priceFormate(row, column){
        if(row.price!=null){
          return ("￥"+(parseInt(row.price)).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
        }


      },




     getActivityProgramClassification(){
       ActivityProgramClassification().then(response => {
         console.log(response)
         this.ActivityProgramClassificationList=response.rows

       });
     },


     //分类筛选
     SearchTypehName(){
       console.log(this.TypeList)
       var typeArray=[]
       for (var i = 0; i < this.TypeList.length; i++) {
         typeArray.push(this.TypeList[i])
       }
       this.queryParams.classificationIds=typeArray.toString()
       this.visible2=false
       this.getList()
     },

     //重置分类筛选
     clearSearchTypeName(){
       this.TypeList=[]
       this.queryParams.classificationIds=null
       this.visible2=false
       this.getList()
     },

     queryName(){
       this.getList()
     },



      getList(){
       activityProvidersActivityProgramList(this.queryParams).then(response => {
         console.log(response)
         this.activityList=response.rows
         this.total=response.total

       });

      },
      getPosterClassification(){
      PosterClassification().then(response => {
         console.log('分类调取')
         console.log(response)

         this.kindList = response.rows


       });

      },



      getactivityProvidersActivityProgramcount(){
       activityProvidersActivityProgramcount().then(response => {
         console.log(response)

         this.onlineCount=response.data.onlineCount
         this.underReviewCount=response.data.beExamineCount
         this.auditFailedCount=response.data.examineFailCount


if(response.data.onlineCount >= 100) {
  this.onlineCount = '99+'
}
if(response.data.beExamineCount >= 100) {
  this.underReviewCount = '99+'
}
if(response.data.examineFailCount >= 100) {
  this.auditFailedCount = '99+'
}

       });

      },









      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);

      // this.$router.push('/content/posterDetail',qu{ data:row }})
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
            renderFilter1(h, {column, $index}, index) {

              if(this.state1 == true){

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
              }else{

                return (
                <span>
                    状态
                    </span>
                )

              }
},



    clearSearch1(){
      this.filterList1=[];
      this.queryParams.sysAuditStatus=null
      this.getList()
      this.visible1=false
    },



    filterSearch1(){

      var Statuss=[]
      for (var i = 0; i < this.filterList1.length; i++) {
        if(this.filterList1[i]=="未上线"){
          Statuss.push("0")
        }
        else if(this.filterList1[i]=="已上线"){
           Statuss.push("1")
        }
        else if(this.filterList1[i]=="审核失败"){
           Statuss.push("-1")
        }
        else if(this.filterList1[i]=="审核中"){
           Statuss.push("2")
        }
      }

      this.queryParams.sysAuditStatus=Statuss.toString()

      this.getList()
      this.visible1=false
    },




      switchData(index){
                if(index==1){
                  this.state1 = true
                  this.state2 = false
                  this.state3 = false
                  this.state4 = false
this.queryParams.sysAuditStatus=''

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


                 this.filterList1=[];
                 this.getList()

      },
xiaxian(e) {

  this.$confirm('下线后,客户将无法再购买此海报,且上线时需要重新审核.确定要继续吗?', '下线', {
    confirmButtonText: '确定',
     cancelButtonText: '关闭',



           type: 'none'
         }).then(() => {
          let dataq = {
               'operationType':'2',
               'providersActivityProgramId':e.providersActivityProgramId

             }
             activityProvidersActivityProgramoperation(dataq).then(response => {
                console.log('提交')
                console.log(response)

          this.$message({
            type: 'success',
            message: '下线成功!'
          });

          this.getList()
          this.getactivityProvidersActivityProgramcount()


              });
         }).catch(() => {
           // this.$message({
           //   type: 'info',
           //   message: '已取消下线'
           // });
         });









      },

shanchu(e) {
        this.$confirm('删除后,该海报信息将无法恢复.确定要继续吗?', '删除', {
          confirmButtonText: '确定',
           cancelButtonText: '关闭',


                 type: 'none'
               }).then(() => {
                 let dataq = {
                      'operationType':'4',
                      'providersActivityProgramId':e.providersActivityProgramId

                    }
                    activityProvidersActivityProgramoperation(dataq).then(response => {
                       console.log('提交')
                       console.log(response)

                 this.$message({
                   type: 'success',
                   message: '删除成功!'
                 });
                 this.getList()
                 this.getactivityProvidersActivityProgramcount()

                     });
               }).catch(() => {
                 // this.$message({
                 //   type: 'info',
                 //   message: '已取消下线'
                 // });
               });

      },
      tijiaosx(e) {
        console.log('123')
        let dataq = {
            'operationType':'1',
            'providersActivityProgramId':e.providersActivityProgramId

          }
          activityProvidersActivityProgramoperation(dataq).then(response => {
             console.log('提交')
             console.log(response)

        this.$message({
            type: 'success',
            message: '已成功提交上线,请等待系统审核!'
          });
          this.getList()
          this.getactivityProvidersActivityProgramcount()

           });
      },

chehuish(e) {
        console.log('123')
        let dataq = {
            'operationType':'3',
            'providersActivityProgramId':e.providersActivityProgramId

          }
          activityProvidersActivityProgramoperation(dataq).then(response => {
             console.log('提交')
             console.log(response)


        this.$message({
          type: 'success',
          message: '已撤回上线审核'
        });
        this.getList()
        this.getactivityProvidersActivityProgramcount()

           });
      },



       handleCommand(command) {},
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
