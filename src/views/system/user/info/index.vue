<template>
<div class="app-container" style="padding: 20px;">

  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">个人资料</span>
  </el-page-header>

   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">
  <el-form ref="form" :model="form"  label-width="120px">
    <h5 style="font-weight: bold;">基础信息</h5>
    <el-row>
      <el-col :span="14">

        <el-form-item label="昵称" prop="nickName" class="lable-text">
          <el-input v-model="form.nickName" placeholder="请输入" class="my-input" />
        </el-form-item>

        <el-form-item label="头像" prop="avatar" class="lable-text">
          <div slot="label">
           <span>头像</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
           <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false" @preViewImage="preViewImage"></imgUpload>
          <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
        </el-form-item>



      </el-col>

    </el-row>


    <div class="dialog-footer" style="margin-left: 120px;">
      <el-button type="primary" @click="submitForm">提 交</el-button>
    </div>


  </el-form>

   </el-card>


   <el-dialog :visible.sync="dialogVisible">
     <img width="100%" :src="dialogImageUrl" alt="">
   </el-dialog>

</div>



</template>

<script>
  import imgUpload from '@/components/imgUpload'
  import {updateNickName,getUserData} from "@/api/system/user";



  export default {
    components: {
      imgUpload
    },

     data() {
       return {
         imgList:[],
         form:{},
         dialogVisible: false,
         dialogImageUrl:null
       };
     },

     created() {
       this.getData()
     },

      methods: {

        getData(){
          getUserData().then(response => {
             console.log(response)
             this.form=response.data
             let data = {
                 url: response.data.fullAvatar,
                 relative_url: response.data.avatar
               }
             this.imgList.push(data)
          });
        },


        goBack(){
         this.$router.go(-1);
        },

        submitForm(){
          if(this.imgList.length!=0){
           this.form.avatar= this.imgList[0].relative_url
          }
          else{
            this.form.avatar= ''
          }
          updateNickName(this.form).then(response => {
            console.log(response)
            this.$nextTick(() => {
              this.$refs.imageupload.syncElUpload();
            })

             this.$router.go(-1);

          });
        },

        preViewImage(img){
          console.log(img)
          this.dialogImageUrl = img.image.url;
          this.dialogVisible = true;
        }

      }
    }
</script>

<style scoped>
  .my-input {
    width: 80% !important;
  }

  .my-input/deep/.el-input__inner{
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


</style>
