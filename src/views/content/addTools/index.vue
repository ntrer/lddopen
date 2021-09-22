<template>

  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">新增器材</span>
  </el-page-header>

  <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 70%;margin-bottom: 20px;">
    <el-form ref="form" :model="form" label-width="140px">
      <el-row>
        <el-col :span="18">
          <h5 style="font-weight: bold;">基础信息</h5>
          <el-form-item label="器材名称" prop="productName" class="lable-text">
            <el-input v-model="form.productName" placeholder="请输入1-24个字的厂商名称" class="my-input" maxlength="24" @input="getName"/>
          </el-form-item>


          <el-form-item label="厂商" prop="providersManufactorId" style="width: 100%;" class="lable-text">
            <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
             <span>厂商</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
            </div>
            <el-select v-model="form.manufactorId" placeholder="请选择一个器材厂商" style="width: 80%;" class="my-input">
              <el-option v-for="(item, index) in ManufactorList" :key="item.manufactorId" :label="item.manufactorName" :value="item.manufactorId"/>
            </el-select>
          </el-form-item>

          <el-form-item label="分类" prop="classificationId" style="width: 100%;" class="lable-text">
            <div style="display: flex;flex-direction: column;">
              <el-select v-model="form.classificationId" placeholder="请选择一个合适的分类" style="width: 80%;" class="my-input">
                <el-option v-for="(item, index) in industryClassificationList" :key="item.classificationId" :label="item.classificationName" :value="item.classificationId"/>
              </el-select>
              <div style="display: flex;flex-direction: row;color: #6c9bfe;font-size: 12px;align-items: center;cursor: pointer;">
                <span>如何选择合适的分类?</span>
                <i class="el-icon-document-copy" style="margin-left: 5px;"></i>
              </div>
            </div>

          </el-form-item>


          <el-form-item label="市场价" prop="price" class="lable-text ">
            <div slot="label">
             <span>市场价</span>
             <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
            </div>
            <el-input v-model="form.price" placeholder="请输入不超过一亿元的价格" class="my-input" @input="getPrice">
               <template slot="append">元</template>
             </el-input>
          </el-form-item>

          <el-form-item label="是否置顶显示" prop="topMark" class="lable-text ">
            <div slot="label">
             <span>是否置顶显示</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
            </div>

            <div style="width: 60%;display: flex;flex-direction: row;">
              <div style="display: flex;flex: 1;align-items: center;justify-content: center;border-top-left-radius:5px;border-bottom-left-radius:5px;" :class="isTop==0?'selected-rate':'unselect-rate'" @click="switchTop(0)">
                <span>不置顶</span>
              </div>
              <div style="display: flex;flex: 1;align-items: center;justify-content: center;border-top-right-radius:5px;border-bottom-right-radius:5px;" :class="isTop==1?'selected-rate':'unselect-rate'" @click="switchTop(1)">
                <span>置顶</span>
              </div>
            </div>

          </el-form-item>


        </el-col>

      </el-row>

       <el-divider style="background-color: #e3e3e3;"></el-divider>

       <h5 style="font-weight: bold;">宣传图</h5>
       <el-form-item label="宣传图" prop="logoImgUrl" class="lable-text">
         <div slot="label" style="display: flex;flex-direction: column;">
           <div style="display: flex;flex-direction: row;">
             <span>宣传图</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
           </div>
            <span style="margin-top: -10px;color: #9d9d9d;">{{imgList.length}}/8</span>
         </div>
         <imgUpload ref="imageupload" v-model="imgList" :limit="8" :isSingle="false" :width="160" :height="100" @preViewImage="preViewImage"></imgUpload>
         <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
       </el-form-item>

        <el-divider></el-divider>

       <h5 style="font-weight: bold;">器材介绍</h5>
       <el-form-item label="器材介绍" prop="logoImgUrl" class="lable-text">
         <div slot="label" style="display: flex;flex-direction: column;">
           <div style="display: flex;flex-direction: row;">
             <span>器材介绍</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
           </div>
         </div>

         <div v-loading="loading" style="width: 56%;">
             <quill-editor
              class="my-editor"
              v-model="form.productIntroduce"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              >
              </quill-editor>
              <el-upload class="avatar-uploader" :action="uploadUrl" name="file" accept=".jpg,.jpeg,.png" :show-file-list="false"
                :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
              </el-upload>

              <el-upload class="video-uploader" :action="uploadUrl" name="file" :auto-upload="false" accept="video/mp4" :show-file-list="false"
               :on-change="onChange" >
              </el-upload>
         </div>

       </el-form-item>







      <div class="dialog-footer" style="margin-left: 140px;">
        <el-button type="primary" @click="submitForm">提交上线</el-button>
        <el-button  @click="save" style="color: #19AA29;border: #19AA29 solid 1px;">仅保存</el-button>
      </div>


    </el-form>
  </el-card>



  <div style="position: absolute;right: 50px;top: 20%;width: 280px;height: 550px; " class="view-bg" >
    <div style="width: 100%;height: 520px;overflow-y: scroll;margin-top: 20px;">


    <div style="width: 252px;display: flex;flex-direction: row;margin-top: 30px;margin-left: 16px;">
      <img :src="selectImg" style="width: 253px;height: 120px;">
    </div>

    <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">{{toolsName}}</h6>
    <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
      <span style="margin-left: 24px;font-size: 13px;color: #bfbdc0;">{{price}}</span>
      <div style="border: 1px solid #19AA29;border-radius: 10px;color: #19AA29;font-size: 12px;margin-right: 20px;padding: 2px;">
        获取联系电话
      </div>
    </div>


    <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">产品详情</h6>
    <div class="view-pd" v-html="form.productIntroduce" style="margin-left: 24px;font-size: 13px;color: #bfbdc0;width: 240px">

    </div>

    </div>
  </div>





   <div style="display: flex;align-items: center;justify-content: center;height: 40px;flex-direction: column;">
     <div style="display: flex;flex-direction: row; align-items: center;font-size: 12px;color: #b4b4b5;">
       <span >关于我们</span>
       <span style="margin-left: 5px;margin-right: 5px;">|</span>
       <span >服务协议</span>
       <span style="margin-left: 5px;margin-right: 5px;">|</span>
       <span >意见反馈</span>
     </div>
     <span style="color: #b4b4b5;font-size: 12px;margin-top: 10px;">Copyright © 2021北京中体联合数据科技有限公司</span>
   </div>


   <el-dialog :visible.sync="dialogVisible">
     <img width="100%" :src="dialogImageUrl" alt="">
   </el-dialog>

   <bottom-card moduleName="内容" pagesName="新增器材" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>

  import imgUpload from '@/components/imgUpload'
  import bottomCard from '@/components/bottomCard'
  import {addProduct,industryClassification,productList,ManufactorList} from "@/api/content/tools";
  import {manufactorList} from "@/api/content/manufactor";

import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Quill from "quill";
import ImageResize from "quill-image-resize-module"; // 引用
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize); // 注册




const toolbarOptions = [
 ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
 [{'header': 1}, {'header': 2}],    // custom button values
 [{'list': 'ordered'}, {'list': 'bullet'}],
 [{'indent': '-1'}, {'indent': '+1'}],   // outdent/indent
 [{'direction': 'rtl'}],       // text direction
 [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
 [{'header': [1, 2, 3, 4, 5, 6, false]}],
 [{'color': []}, {'background': []}],   // dropdown with defaults from theme
 [{'font': []}],
 [{'align': []}],
 ['link', 'image','video'],
 ['clean']

 ]


  export default {
    name: "index",

    components: {
      imgUpload,
      quillEditor,
      bottomCard
    },

    data() {
      return {
        toolsName:"请在左侧输入名称",
        price:"暂无报价",
        selectImg:'',
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        imgList:[],
        ManufactorList:[],
        industryClassificationList:[],
        form:{},
        isTop:1,
        loading:false,
        dialogVisible: false,
        dialogImageUrl:null,
        uploadUrl:this.UPLOADURL.uploadUrlAddress,
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
          content: null,
          editorOption: {
           placeholder: '',
           theme: 'snow', // or 'bubble'
           modules: {
              imageDrop: true,
                     imageResize: {
                       displayStyles: {
                         backgroundColor: "black",
                         border: "none",
                         color: "white"
                       },
                       modules: ["Resize", "DisplaySize", "Toolbar"]
                     },

           toolbar: {
            container: toolbarOptions,
            handlers: {
            'image': function (value) {
             if (value) {
             // 触发input框选择图片文件
             document.querySelector('.avatar-uploader input').click()
             } else {
             this.quill.format('image', false);
             }
            },

            'video': function (value) {
             if (value) {
             // 触发input框选择图片文件
             document.querySelector('.video-uploader input').click()
             } else {
             this.quill.format('video', false);
             }
            },



            }
           }
           }
          },


      };
    },


    created() {
      // 获取厂商列表
      this.getManufactorList()
      this.getindustryClassificationList()
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

      getName(value){
        if(value==""){
           this.toolsName="请在左侧输入名称"
        }
        else{
          this.toolsName=value
        }

      },
      getPrice(value){
        if(value==""){
          this.price="暂无报价"
        }
        else{
          this.price=value
        }

      },

      // 获取厂商列表
      getManufactorList(){
        ManufactorList().then(response => {
          console.log(response)
          this.ManufactorList=response.rows
        });
      },

      getindustryClassificationList(){
        industryClassification().then(response => {
          console.log(response)
          this.industryClassificationList=response.rows
        });
      },



      onEditorChange({editor, html, text}) {//内容改变事件
        console.log("---内容改变事件---")
        this.content = html
        console.log(html)
        },
        // 富文本图片上传前
        beforeUpload() {
         this.loading=true;
        },

        uploadSuccess(res, file) {
          // res为图片服务器返回的数据
          // 获取富文本组件实例
          console.log(res);
          let quill = this.$refs.myQuillEditor.quill
          // 如果上传成功
          if (res.url) {
             this.loading=false;
           // 获取光标所在位置
           let length = quill.getSelection().index;
           // 插入图片 res.url为服务器返回的图片地址
           quill.insertEmbed(length, 'image', res.url)
           // 调整光标到最后
           quill.setSelection(length + 1)
          } else {
             this.loading=false;
            console.log("插入失败");
           this.$message.error('图片插入失败')
          }

          },
          // 富文本图片上传失败
          uploadError() {
             this.loading=false;
             console.log("上传失败");
          this.$message.error('图片插入失败')
          },


      preViewImage(img){
        console.log(img)
        this.dialogImageUrl = img.image.url;
        this.dialogVisible = true;
      },


      switchTop(index){
        this.isTop=index
        this.form.topMark=index
      },

       goBack(){
        this.$router.go(-1);
       },

       submitForm(){
          this.form.sysAuditStatus=2

         if(this.imgList.length!=0){
           let dataImage=[]
           for (var i = 0; i < this.imgList.length; i++) {
            dataImage.push(this.imgList[i].relative_url)
           }
           this.form.imgUrlsJson=JSON.stringify(dataImage)
         }
         else{
           this.form.imgUrlsJson=''
         }


       addProduct(this.form).then(response => {
         console.log(response)
         this.msgSuccess("器材已成功提交上线，请等待平台审核。");
          this.$router.go(-1);
       });


       },

       save(){
        this.form.sysAuditStatus=0

          if(this.imgList.length!=0){
            let dataImage=[]
            for (var i = 0; i < this.imgList.length; i++) {
             dataImage.push(this.imgList[i].relative_url)
            }
            this.form.imgUrlsJson=JSON.stringify(dataImage)
          }
          else{
            this.form.imgUrlsJson=''
          }


        addProduct(this.form).then(response => {
          console.log(response)
          this.msgSuccess("创建成功，如需上线请手动提交。");
           this.$router.go(-1);
        });
       }


    },
  };


</script>

<style scoped>


  .view-pd/deep/img{
   margin: 0; padding: 0; width: 100%; object-fit: cover;
  }

  .my-input {
    width: 80% !important;
  }

  .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }

  .my-input2/deep/.el-input__inner{
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

  .my-dialog/deep/.el-dialog__body{
    padding-top: 10px;
  }

  .lable-text/deep/.el-form-item__label {
    text-align: left;
    font-weight: 500;
  }


  .selected-rate{
    background-color: #19AA29;
    color: white;
  }

  .unselect-rate{
    background-color: #f7f7f7;
    color: #a7a2a9;
  }

  .my-editor/deep/.ql-editor { min-height: 260px; }

  .ql-editor.ql-blank, .ql-editor {
   height: 350px;
   }


   .my-editor/deep/video::-webkit-media-controls-fullscreen-button {
       display: none;
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
