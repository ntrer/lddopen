<template>
  <div class="app-container home">
      <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
        消息
      </H4 >



   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;" class="card-body">
     <div style="display: flex;flex-direction: row;height: 100vh;">

       <!-- 左边 -->
       <div style="display: flex;flex: 1;border-right: 1px solid #f7f7f7;height: 100%;flex-direction: column;">

         <!-- 头部 -->
         <div style="border-bottom: 1px solid #f7f7f7;padding-bottom: 20px;height: 120px;">
           <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 20px;">
             <el-dropdown>
               <span class="el-dropdown-link" style="font-size: 13px;">
                 {{messageType}}<i class="el-icon-arrow-down el-icon--right"></i>
               </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item @click.native="switchType(2)">全部消息</el-dropdown-item>
                 <el-dropdown-item @click.native="switchType(0)">未读消息</el-dropdown-item>
                 <el-dropdown-item @click.native="switchType(1)">已读消息</el-dropdown-item>
                 <el-dropdown-item @click.native="switchType(-1)">已删除</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>

             <span style="color: #19AA29;font-size: 13px;cursor: pointer;" @click="allRead()">全部已读</span>

           </div>

           <el-input
             v-model="queryParams.searchMessageTitle"
             style="width: 300px; margin-left: 20px;margin-right: 20px;"
             class="my-input"
             placeholder="请输入关键词搜索"
             clearable
             size="medium"
             @change="queryMessage"
           />


         </div>

         <!-- 列表 -->

         <div v-infinite-scroll="load" :infinite-scroll-distance="500"  :infinite-scroll-disabled="isDisabled" style="overflow-y: scroll;">

           <div ref="chooseItem"  style="display: flex;flex-direction: row; padding: 15px;" v-for="(item,index) in messageList"
           :key="index" :class="activeClass==index?'checkedItem':''" @click="chooseMessage(index,item.id)">

             <img src="../../../assets/images/avater1.jpeg" style="width: 45px;height: 45px;border-radius: 50px;">
             <div style="display: flex;flex-direction: column;margin-left: 10px;width: 100%;">
               <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;font-size: 12px;">
                 <span>{{item.sendUserName}}</span>
                 <span>{{item.sendTimeFormat}}</span>
               </div>

               <span style="font-size: 14px;font-weight: bold;margin-top: 5px;">{{item.messageTitle}}</span>

               <span class="my-des" style="margin-top: 10px;font-size: 13px;">
                {{item.messageAbstract}}
               </span>


             </div>


           </div>



         </div>





       </div>



       <!-- 右边 -->
       <div style="display: flex;flex: 5; height: 100%;flex-direction: column;">

          <div style="height: 130px;display: flex; width: 100%;flex-direction: row;justify-content: space-between;padding: 20px;">
            <!-- 左边标题 -->
            <div style="display: flex;flex-direction: column;">
              <span style="font-size: 18px;font-weight: bold;">{{title}}</span>
              <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <img src="../../../assets/images/avater1.jpeg" style="width: 20px;height: 20px;border-radius: 50%;">
                <span style="font-size: 13px;margin-left: 5px;">{{sendUserName}}</span>
              </div>
            </div>

            <!-- 右边时间 -->
            <div style="display: flex;flex-direction: column;align-items: flex-end;">
               <span style="font-size: 13px;">{{messageTime}}</span>
               <!-- <span>{{messageTime}}</span> -->
               <img src="../../../assets/images/delete_light.png" style="width: 18px;height: 18px;margin-top: 30px;" @click="deleteMsg(chooseId)">
            </div>
          </div>


          <!-- 消息内容 -->
          <div class="messageContent" style="width: 100%;height: 100%;background-color: #f7f7f7;padding: 50px;overflow-y: scroll;" v-html="messageContent">

          </div>


       </div>


     </div>


   </el-card>


   <bottom-card moduleName="首页" pagesName="消息" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>

    import {allread,messageList,messageDetail,messageRemove} from "@/api/content/message";
    import bottomCard from '@/components/bottomCard'

  export default {
    name: "index",

    components: {
      bottomCard
    },

    data() {
      return {
        messageType:'全部消息',
        isDisabled:false,
        activeClass:0,
        title:"",
        messageTime:'',
        messageContent:'',
        sendUserName:'系统',
        chooseId:'',

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
        messageList:[],
        goodsList:[],
        rateList:["全部","1分","2分","3分","4分","5分"],
        queryParams:{
          pageNum:1,
          pageSize:20,
          searchStatus:2,
          searchMessageTitle:null,
        }
      };
    },

    created() {

     this.getMessage()
    },

    methods: {

      queryMessage(){
         this.queryParams.pageNum=1
        this.getMessage()
      },

      switchType(type){
        if(type==0){
          this.messageType="未读消息"
          this.queryParams.searchStatus=0
        }
        else if(type==1){
           this.messageType="已读消息"
           this.queryParams.searchStatus=1
        }
        else if(type==2){
           this.messageType="全部消息"
           this.queryParams.searchStatus=2
        }
        else if(type==-1){
           this.messageType="已删除"
           this.queryParams.searchStatus=-1
        }
         this.queryParams.pageNum=1
         this.getMessage()
      },

      allRead(){
       this.$confirm("确定全部已读吗？", "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {
           return allread();
         }).then(() => {
           this.msgSuccess("操作成功");
         })

      },

      getMessage(){
        messageList(this.queryParams).then(response => {
          console.log(response)

         if(this.queryParams.pageNum==1){
            this.messageList=response.rows
          }
          else{
            if(response.rows.length!=0){
              this.messageList=this.messageList.concat(response.rows)
            }
            else{
              this.isDisabled=true
            }

          }

          this.title=this.messageList[0].messageTitle
          this.messageTime=this.messageList[0].sendTimeFormat
          this.messageContent=this.messageList[0].messageContent
          this.sendUserName=this.messageList[0].sendUserName
          this.chooseId=this.messageList[0].id

          let data={
            id:this.messageList[0].id
          }
          messageDetail(data).then(response => {
            console.log(response)

          });

        });
      },


      load(){
        this.queryParams.pageNum++
        this.getMessage()
      },


      chooseMessage(index,id){


       let data={
         id:id
       }
       messageDetail(data).then(response => {
         console.log(response)

       });

       this.activeClass=index
       this.title=this.messageList[index].messageTitle
       this.messageTime=this.messageList[index].sendTimeFormat
       this.messageContent=this.messageList[index].messageContent
       this.sendUserName=this.messageList[index].sendUserName
       this.chooseId=this.messageList[index].id
      },

      deleteMsg(id){

        this.$confirm("确定删除改消息吗？", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {

            let data={
              id:id
            }
            return messageRemove(data);
          }).then(() => {
            this.activeClass=0
            this.msgSuccess("删除成功");
            this.queryParams.pageNum=1
            this.getMessage()

          })

      }


    },
  };




</script>

<style scoped>

  .checkedItem{
    background-color: #f7f7f7;
  }

  .messageContent/deep/img{
    width: 100%;
    height: 100%;
  }

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

 .my-des{
  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
 }


</style>
