<template>
   <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">新增导师</span>
  </el-page-header>

  <div style="display: flex;flex-direction: row;">
    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 70%;">
      <el-form ref="form" :model="form" :rules="rules" label-width="86px">
        <el-row>
          <el-col :span="20">

            <el-form-item label="导师名称" prop="tutorName" class="lable-text">
              <el-input v-model="form.tutorName" placeholder="请输入1-24个字的导师名称" class="my-input" maxlength="24" @input="getName"/>
            </el-form-item>

            <el-form-item label="头像" prop="logoImgUrl" class="lable-text">
              <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
               <span>宣传图</span>
               <el-tooltip content="展示在课程详情的导师图片" placement="top" style="margin-left: 10px;">
                 <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
               </el-tooltip>
              </div>
                <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false"></imgUpload>
              <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
            </el-form-item>

            <el-form-item label="简介" prop="introduction" class="lable-text ">
              <div slot="label">
               <span>简介</span>
               <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
              </div>
              <el-input v-model="form.introduction" placeholder="请输入不超过500个字的导师简介" class="my-input" type="textarea":rows="5" @input="getIntroduction"/>
            </el-form-item>

          </el-col>

        </el-row>


        <div class="dialog-footer" style="margin-left: 86px;">
          <el-button type="primary" @click="submitForm">提交上线</el-button>
          <el-button  @click="save" style="color: #19AA29;border: #19AA29 solid 1px;">仅保存</el-button>
        </div>


      </el-form>
    </el-card>


    <div style="position: absolute;right: 50px;top: 20%;width: 280px;height: 550px; " class="view-bg" >
      <div style="width: 100%;height: 520px;overflow-y: scroll;margin-top: 20px;">


      <div style="width: 252px;display: flex;flex-direction: row;margin-top: 30px;margin-left: 16px;">
        <img style="width: 253px;height: 120px;">
      </div>


      <div style="width: 100%;height: 50px;display: flex;flex-direction: row;justify-content: center; align-items: center;">
        <div style="display: flex;flex: 1;align-items: center;justify-content: center;font-size: 13px;margin-left: 20px;">
          <span style="border-bottom: 2px solid #bfbdc0;padding-bottom: 5px;">简介</span>
        </div>
        <div style="display: flex;flex: 1;align-items: center;justify-content: center;font-size: 13px;margin-right: 20px;">
          <span style="padding-bottom: 5px;">目录</span>
        </div>
      </div>

       <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">课程名称</h6>
       <div style="font-size: 13px; display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-left: 24px;margin-right: 16px;">
         <div style="display: flex;flex-direction: row;color:#bfbdc0 ;">
           <span>0课时</span>
           <span style="margin-left: 5px;">0人学过</span>
         </div>

         <span>￥19.00</span>
       </div>


      <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">讲师</h6>
       <div style="display: flex;flex-direction: row;margin-left: 24px;align-items: center;">
         <img :src="selectImg" style="height: 30px;width: 30px;border-radius: 20px;">
         <span style="font-size: 13px;color: #bfbdc0;margin-left: 10px;">{{teacherName}}</span>
       </div>


      <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">课程介绍</h6>
       <span style="font-size: 13px;color: #bfbdc0;margin-left: 24px;">{{classIntroduction}}</span>

      </div>
    </div>



  </div>

   <bottom-card moduleName="内容" pagesName="新增导师" style="margin-top: 20px;"></bottom-card>

   </div>
</template>

<script>
  import bottomCard from '@/components/bottomCard'
  import imgUpload from '@/components/imgUpload'
  import {addTrainTutor} from "@/api/content/teacher";
  export default {
    name: "index",

    components: {
      imgUpload,
      bottomCard
    },

    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        imgList:[],
        form:{},
        selectImg:null,
        teacherName:"请在左侧输入内容",
        courseName:"请在左侧输入内容",
        classIntroduction:"请在左侧输入内容",
        rules: {
          tutorName: [{
            required: true,
            message: '请输入1~24个字符的名称',
            trigger: 'change'
          }]
        },
      };
    },


    watch:{
       imgList(val){
         if(this.imgList.length>0){
            this.selectImg=this.imgList[0].url
         }else{
            this.selectImg=null
         }
       }
    },

    methods: {
       goBack(){
        this.$router.go(-1);
       },


       getName(value){
        this.teacherName=value
       },

       getIntroduction(value){
         this.classIntroduction=value
       },


       submitForm(){

         if(this.imgList.length!=0){
          this.form.tutorImgUrl= this.imgList[0].relative_url
         }
         else{
           this.form.tutorImgUrl= ''
         }

         this.form.sysAuditStatus=2




         addTrainTutor(this.form).then(response => {
           console.log(response)
           this.msgSuccess("导师已成功提交上线，请等待平台审核。");
            this.$router.go(-1);
         });
       },

       save(){
         if(this.imgList.length!=0){
          this.form.tutorImgUrl= this.imgList[0].relative_url
         }
         else{
           this.form.tutorImgUrl= ''
         }

         this.form.sysAuditStatus=0

         addTrainTutor(this.form).then(response => {
           console.log(response)
           this.msgSuccess("创建成功，如需上线请手动提交。");
            this.$router.go(-1);
         });
       }
    },
  };



</script>

<style scoped>

   .my-input {
     width: 80% !important;
   }

   .my-input/deep/.el-input__inner{
     background-color: #f7f7f7;
   }


   .my-input/deep/.el-textarea__inner{
      background-color: #f7f7f7;
   }


   .lable-text/deep/.el-form-item__label {
     text-align: left;
     font-weight: 500;
   }

  .my-header/deep/.el-icon-back{
    font-size: 20px;
    margin-right: -6px;
    -ms-flex-item-align: center;
    align-self: center;
  }

  .view-bg{
      background: url(../../../assets/images/yulan-bg.png)   no-repeat;
      background-size:100% 100%;
    }


  ::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
  }

</style>
