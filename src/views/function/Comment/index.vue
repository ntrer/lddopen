<template>
  <div class="app-container home">
      <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
        评论
      </H4 >



   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;" class="card-body">
     <div style="display: flex;flex-direction: row;height: 100vh;">

       <!-- 左边 -->
       <div style="display: flex;flex: 1;border-right: 1px solid #f7f7f7;height: 100%;flex-direction: column;">

         <span style="color: black;font-weight: bold;margin-top: 20px;margin-left: 20px;">范围</span>

         <div style="display: flex;flex-direction: column;margin-top: 10px;">

           <div class="my-card" :class="selectedIndex==0?'selected-shop':''" @click="chooseComment(0)">
             <div style="display: flex;flex-direction: row;align-items: center;height: 40px; justify-content: space-between;padding-right: 20px;">
                <div style="display: flex;flex-direction: row;align-items: center;padding-left: 15px;" >
                  <img src="../../../assets/logo/logo.png" style="width: 30px;height: 30px;" >
                  <span style=" font-size: 14px;margin-left: 5px;">全部评论</span>
                </div>
             </div>

           </div>
           <div class="my-card"  :class="selectedIndex==1?'selected-shop':''" @click="chooseComment(1)">
             <div style="display: flex;flex-direction: row;align-items: center;height: 40px; justify-content: space-between;padding-right: 20px;">
                <div style="display: flex;flex-direction: row;align-items: center;padding-left: 15px;" >
                  <img src="../../../assets/logo/logo.png" style="width: 30px;height: 30px;" >
                  <span style=" font-size: 14px;margin-left: 5px;">新评论</span>
                </div>
                <el-tag v-if="newestNum>0" type="success" style="float: right; height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">{{newestNum}}</el-tag>
             </div>

           </div>
           <div class="my-card"  :class="selectedIndex==2?'selected-shop':''" @click="chooseComment(2)">
             <div style="display: flex;flex-direction: row;align-items: center;height: 40px; justify-content: space-between;padding-right: 20px;">
                <div style="display: flex;flex-direction: row;align-items: center;padding-left: 15px;" >
                  <img src="../../../assets/logo/logo.png" style="width: 30px;height: 30px;" >
                  <span style=" font-size: 14px;margin-left: 5px;">未回复</span>
                </div>
                <el-tag  v-if="notReplyNum>0" type="warning"  style="float: right; height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">{{notReplyNum}}</el-tag>
             </div>

           </div>
           <div class="my-card" :class="selectedIndex==3?'selected-shop':''" @click="chooseComment(3)">
             <div style="display: flex;flex-direction: row;align-items: center;height: 40px; justify-content: space-between;padding-right: 20px;">
                <div style="display: flex;flex-direction: row;align-items: center;padding-left: 15px;" >
                  <img src="../../../assets/logo/logo.png" style="width: 30px;height: 30px;" >
                  <span style=" font-size: 14px;margin-left: 5px;">已回复</span>
                </div>
                <el-tag  v-if="replyNum>0" style="background-color: #ecf5ff; color: #88c6ff; float: right;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">{{replyNum}}</el-tag>
             </div>

           </div>



         </div>


           <div class="my-divder" style="margin-left: 20px; margin-right: 20px;">
              <el-divider></el-divider>
           </div>


           <span style="color: black;font-weight: bold;margin-left: 20px;">日期</span>


               <el-date-picker
                     style="width: 300px;margin-left: 20px;margin-right: 20px;margin-top: 20px;"
                    v-model="selectTime"
                    type="daterange"
                    range-separator="至"
                    unlink-panels
                     format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="queryTime"
                    >
                  </el-date-picker>


             <span style="color: black;font-weight: bold;margin-left: 20px;margin-top: 20px;">商品</span>
             <el-select v-model="queryParams.businessType" placeholder="请选择" style="width: 300px;margin-left: 20px;margin-right: 20px;margin-top: 20px;" @change="querybusinessType">
               <el-option v-for="(item, index) in goodsTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
             </el-select>

             <el-select v-model="queryParams.bizId" placeholder="请选择" style="width: 300px;margin-left: 20px;margin-right: 20px;margin-top: 10px;" @change="queryGood" @focus="isSelectbusinessType">
               <el-option v-for="(item, index) in goodsList" :key="item.courseId" :label="item.courseName" :value="item.courseId"/>
             </el-select>

             <span style="color: black;font-weight: bold;margin-left: 20px;margin-top: 20px;">评分</span>

             <div style="width: 300px;margin-left: 20px;margin-right: 20px;margin-top: 20px;display: flex;flex-direction: row;align-items: center;">

               <div v-for="(item,index) in rateList" :key="index" style="display: flex;flex: 1;height: 40px;align-items: center;justify-content: center;cursor: pointer;" :class="rateIndex==index?'selected-rate':'unselect-rate'" @click="chooseRate(index)">
                 {{item}}
               </div>
             </div>

             <el-button   @click="refresh" style="color: #19AA29;  width: 300px;margin-left: 20px;margin-right: 20px;margin-top: 20px;border: 1px solid #19AA29;">
               <i class="el-icon-refresh" style="color: #19AA29;"></i>
               刷新
             </el-button>

       </div>



       <!-- 右边 -->
       <div style="display: flex; flex: 5;height: 100%;flex-direction: column;padding: 20px;overflow-y: scroll;">

         <div v-for="(item,index) in commentList" :key='index'>
           <el-card shadow="hover" style="border-radius: 0 4px 4px 4px;margin-top: 20px;height: 140px;padding: 20px;">

             <div style="display: flex;flex-direction: row;">
               <!-- 头像 -->
               <div style="display: flex;flex: 1;">
                 <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
               </div>

               <!-- 信息 -->
               <div style="display: flex;flex-direction: column;flex: 15;margin-left: 8px;">
                 <span style="font-size: 13px;color: black;">{{item.nickNameDese}}</span>
                 <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
                   {{item.commentTimeFormat}}
                 </span>
                 <span style="font-size: 13px;margin-top: 10px;color: black;">
                   {{item.comment}}
                 </span>

                 <div style="display: flex;flex-direction: row;font-size: 13px;margin-top: 10px;">
                   <span style="color: #9b9b9b;">来自商品</span>
                   <span style="color: #19AA29;">{{item.bizName}}</span>
                 </div>

               </div>


               <!-- 评分回复 -->
               <div style="display: flex;flex-direction: column;justify-content: space-around;height: 100px;align-items: flex-end;">
                 <el-rate v-model="item.grade"  disabled></el-rate>
                 <div style="display: flex;flex-direction: row;align-items: center;margin-top: 40px;color: #19AA29;cursor: pointer;" v-if="item.isReply==0" @click="toComment(item)">
                   <i class="el-icon-chat-dot-square" style="margin-top: 5px;margin-right: 3px;"></i>
                   <span style="font-size: 13px">回复</span>
                 </div>

                 <div style="margin-top: 40px;display: flex;flex-direction: row;align-items: center;" v-if="item.isReply==1">
                   <div style="display: flex;flex-direction: row;align-items: center;color: #19AA29;cursor: pointer;" @click="viewComment(item)">
                     <i class="el-icon-view" style="margin-top: 5px;margin-right: 3px;"></i>
                     <span style="font-size: 13px">查看回复</span>
                   </div>

                   <span style="font-size: 13px;margin-left: 10px;color: #9b9b9b;">已回复</span>
                 </div>


               </div>
             </div>

           </el-card>
         </div>


         <pagination
           style=""
           v-show="total>10"
           :total="total"
           :page.sync="queryParams.pageNum"
           :limit.sync="queryParams.pageSize"
           @pagination="getCommentList"
         />


       </div>


     </div>


   </el-card>


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
         <span style="font-size: 13px;color: black;">{{commentData.nickNameDese}}</span>
         <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
          {{commentData.commentTimeFormat}}
         </span>
         <span style="font-size: 13px;margin-top: 10px;color: black;">
          {{commentData.comment}}
         </span>

       </div>


       <!-- 评分回复 -->
       <div style="display: flex;flex-direction: column;justify-content: space-around;height: 60px;align-items: flex-end;">
         <el-rate v-model="commentData.grade"  disabled></el-rate>
         <span style="font-size: 13px;margin-top: 40px;color: black;">

         </span>
       </div>
     </div>

      <div style="margin-left: 60px;margin-right: 10px;">
        <el-divider></el-divider>

         <el-card style="height: 90px;border-radius: 0 4px 4px 4px;margin-top: 20px;background-color: #dfeaff;padding: 0;" class="card-body">
           <div style="display: flex;flex-direction: column;padding: 10px;">
             <span style="font-size: 13px;color: #2b70ff;font-weight: bold;">您的回复: </span>
             <span style="font-size: 13px;margin-top: 10px;color: #2b70ff;">{{replyData.comment}}</span>
             <span style="font-size: 12px;margin-top: 10px;color: #8caeff;">
                {{replyData.replyTime}}
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
           <span style="font-size: 13px;color: black;">{{commentData.nickNameDese}}</span>
           <span style="font-size: 13px;margin-top: 10px;color: #9b9b9b;">
             {{commentData.commentTimeFormat}}
           </span>
           <span style="font-size: 13px;margin-top: 10px;color: black;">
             {{commentData.comment}}
           </span>

         </div>


         <!-- 评分回复 -->
         <div style="display: flex;flex-direction: column;justify-content: space-around;height: 60px;align-items: flex-end;">
           <el-rate v-model="commentData.rate"  disabled></el-rate>
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

   <bottom-card moduleName="功能" pagesName="评论" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>

    import {commentCount,commentList,commentReply,submitReply,providersList} from "@/api/function/comment";
    import bottomCard from '@/components/bottomCard'

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

        // 版本号
        version: "3.6.0",
        activeName: 'first',
        type:null,
        newestNum:0,
        notReplyNum:0,
        replyNum:0,
        data:null,
        selectedIndex:0,
        rateIndex:0,
        selectTime:null,
        goodsType:null,
        goods:null,
        total:10,
        drawer: false,
        openComment:false,
        comment:null,
        commentData:{},
        replyData:{},
        title:null,
        goodsTypeList:[{
          dictValue:1003,
          dictLabel:"课程"
        }],
        commentList:[],
        goodsList:[],
        rateList:["全部","1分","2分","3分","4分","5分"],
        queryParams:{
          pageNum:1,
          pageSize:10,
          isReply:null,
          searchNewest:0,
          searchStartTime:null,
          searchEndTime:null,
          grade:null,
          businessType:null,
          bizId:null
        }
      };
    },

    created() {
      this.getCommentCount()
      this.getCommentList(0)

    },

    methods: {

      // 时间搜索
      queryTime(){
        console.log(this.selectTime)
        if(this.selectTime!=null){
          this.queryParams.searchStartTime=this.selectTime[0]
          this.queryParams.searchEndTime=this.selectTime[1]
        }
        else{
          this.queryParams.searchStartTime=null
          this.queryParams.searchEndTime=null
        }

        this.getCommentList()
      },

      // 获取评论数量
      getCommentCount(){
        commentCount().then(response => {
          console.log(response)
          this.newestNum=response.data.newestNum
          this.notReplyNum=response.data.notReplyNum
          this.replyNum=response.data.replyNum
        });
      },

      getProvidersList(){
        providersList().then(response => {
          console.log(response)
           this.goodsList=response.rows
        });
      },

      querybusinessType(type){
        if(type!=null){
          this.type=type
          this.getProvidersList()
        }
        else{
          this.type=null
        }
      },

      isSelectbusinessType(){
        if(this.type==null){
          this.msgInfo("请先选择商品类型")
        }
      },

      queryGood(data){
        if(data!=null){
           this.getCommentList()
        }

      },

      getCommentList(){
        commentList(this.queryParams).then(response => {
          console.log(response)
          for (var i = 0; i < response.rows.length; i++) {
              response.rows[i].grade=parseInt(response.rows[i].grade)
          }
          this.commentList=response.rows
        });
      },

     chooseComment(index){
       this.selectedIndex=index
       if(index==1){
         this.queryParams.searchNewest=1
         this.queryParams.isReply=null
       }
       else if(index==2){
         this.queryParams.searchNewest=0
         this.queryParams.isReply=0
       }
       else if(index==3){
         this.queryParams.searchNewest=0
         this.queryParams.isReply=1
       }
       else{
         this.queryParams.searchNewest=null
         this.queryParams.isReply=null
       }
       this.getCommentList()
     },

     chooseRate(index){
       this.rateIndex=index
       if(index==0){
          this.queryParams.grade=null
       }
       else{
        this.queryParams.grade=index
       }

       this.getCommentList()

     },

     refresh(){
      this.queryParams={
        pageNum:1,
        pageSize:10,
        isReply:null,
        searchNewest:0,
        searchStartTime:null,
        searchEndTime:null,
        grade:null,
        businessType:null,
        bizId:null
      }
      this.selectedIndex=0
      this.rateIndex=0
      this.selectTime=[]
      this.getCommentList()
     },

     viewComment(item){
       let data={
         id:item.id
       }
       commentReply(data).then(response => {
         console.log(response)
          this.commentData=item
          this.replyData=response.data
          this.drawer=true
       });


     },

     closeDrawer(){
       this.drawer=false
     },

     toComment(item){
       this.openComment=true
       this.title="回复评论"
       this.commentData=item

     },

     submitComment(){
       let data={
         commentId:this.commentData.id,
         comment:this.comment
       }
      submitReply(data).then(response => {
          this.openComment=false
          this.msgSuccess("回复成功")
          this.getCommentList()
          this.getCommentCount()
      });
     },

     cancelComment(){
       this.openComment=false
     }

    },
  };




</script>

<style scoped>

  .my-input/deep/.el-textarea__inner{
      background-color: #f7f7f7;
   }

  .card-body/deep/.el-card__body{
    padding: 0;
  }

  .my-dialog/deep/.el-dialog__body{
    padding-top: 10px;
  }

::-webkit-scrollbar {
/*隐藏滚轮*/
display: none;
}

.my-input/deep/.el-input__inner{
     background-color: #f7f7f7;
  }

 .card-body/deep/.el-card__body{
   padding: 0;
 }

 .selected-shop{
   background-color: #19AA29;
   color: white;
 }

 .selected-rate{
   background-color: #19AA29;
   color: white;
 }

 .unselect-rate{
   background-color: #f7f7f7;
   color: #a7a2a9;
 }


</style>
