<template>
  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">修改活动方案</span>
  </el-page-header>

   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 70%;margin-bottom: 20px;">
     <el-form ref="form" :model="form" label-width="140px">
       <el-row>
         <el-col :span="20">
           <h5 style="font-weight: bold;">基础信息</h5>
           <el-form-item label="活动方案名称" prop="activityProgramName" class="lable-text">
             <el-input v-model="form.activityProgramName" placeholder="请输入1-24个字的活动方案名称" class="my-input" maxlength="24" @input="getName"/>
           </el-form-item>

           <el-form-item label="分类" prop="city" style="width: 100%;" class="lable-text">
             <div style="display: flex;flex-direction: column;">
               <el-select v-model="form.classificationId" placeholder="请选择一个合适的分类" style="width: 80%;" class="my-input">
                 <el-option v-for="(item, index) in ActivityProgramClassificationList" :key="item.classificationId" :label="item.classificationName" :value="item.classificationId"/>
               </el-select>
               <div style="display: flex;flex-direction: row;color: #6c9bfe;font-size: 12px;align-items: center;cursor: pointer;">
                 <span>如何选择合适的分类?</span>
                 <i class="el-icon-document-copy" style="margin-left: 5px;"></i>
               </div>
             </div>

           </el-form-item>


           <el-form-item label="价格" prop="price" class="lable-text ">
             <div slot="label">
              <span>价格</span>
              <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                 <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
              </el-tooltip>
             </div>
             <el-input v-model="form.price" placeholder="请输入不超过一万元的价格" class="my-input">
                <template slot="append">元</template>
              </el-input>
           </el-form-item>


            <el-form-item label="方案文件" prop="activityProgramName" class="lable-text ">
              <div slot="label">
               <span>方案文件</span>
               <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                  <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
               </el-tooltip>
              </div>

              <el-upload class="upload-demo upload-file" :action="uploadUrl" :on-remove="handleRemoveFile"
                :before-upload="beforeUploadFile" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList"
                :on-success="handleSuccess">
                <el-button size="small" style="border: 1px solid #19AA29; color: #19AA29;">
                  <i class="el-icon-document-add"></i>
                  上传
                  </el-button>
              </el-upload>

            </el-form-item>


            <el-form-item label="宣传图" prop="logoImgUrl" class="lable-text">
              <div slot="label" style="display: flex;flex-direction: column;">
                <div style="display: flex;flex-direction: row;">
                  <span>宣传图</span>
                  <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                     <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                  </el-tooltip>
                </div>
                 <!-- <span style="margin-top: -10px;color: #9d9d9d;">{{imgList.length}}/8</span> -->
              </div>
              <imgUpload ref="imageupload" v-model="imgList" :limit="1"  :width="200" :height="120" @preViewImage="preViewImage"></imgUpload>
              <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
            </el-form-item>


            <el-form-item label="适用场景" prop="applyScene" class="lable-text ">
              <div slot="label">
               <span>适用场景</span>
               <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
              </div>
              <el-input v-model="form.applyScene" placeholder="请输入不超过200个字的适用场景介绍" class="my-input" type="textarea":rows="5" @input="getScen"/>
            </el-form-item>

            <el-form-item label="目标人群" prop="applyCrowd" class="lable-text ">
              <div slot="label">
               <span>目标人群</span>
               <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
               <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                  <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
               </el-tooltip>
              </div>
              <el-input v-model="form.applyCrowd" placeholder="请输入不超过200个字的目标人群介绍" class="my-input" type="textarea":rows="5" @input="getPeople"/>
            </el-form-item>

         </el-col>

       </el-row>


         <el-divider></el-divider>

        <h5 style="font-weight: bold;">方案介绍</h5>
        <el-form-item label="器材介绍" prop="logoImgUrl" class="lable-text">
          <div slot="label" style="display: flex;flex-direction: column;">
            <div style="display: flex;flex-direction: row;">
              <span>方案介绍</span>
              <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                 <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
              </el-tooltip>
            </div>
          </div>

          <div v-loading="loading" style="width: 50%;">
              <quill-editor
               class="my-editor"
               v-model="form.programIntroduce"
               ref="myQuillEditor"
               :options="editorOption"
               @change="onEditorChange($event)"
               >
               </quill-editor>
               <el-upload class="avatar-uploader" :action="serverUrl" name="file" accept=".jpg,.jpeg,.png" :show-file-list="false"
                 :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
               </el-upload>

               <el-upload class="video-uploader" :action="serverUrl" name="file" :auto-upload="true" accept="video/mp4" :show-file-list="false"
                :before-upload="beforeUpload" :on-change="onChange3" :on-success="uploadVideoSuccess">
               </el-upload>
          </div>

        </el-form-item>

         <el-divider></el-divider>

         <div style="display: flex;flex-direction: row;align-items: center;">
           <H5 style="font-weight: bold;display: inline-block;">
             推荐内容
           </H5>
           <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
              <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
           </el-tooltip>
         </div>

         <el-form-item label="海报" prop="logoImgUrl" class="lable-text">
           <div slot="label" style="display: flex;flex-direction: column;">
             <div style="display: flex;flex-direction: row;">
               <span>海报</span>
               <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                  <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
               </el-tooltip>
             </div>
              <span style="margin-top: -10px;color: #9d9d9d;">{{imgList2.length}}/9</span>
           </div>

         <!--  <div>
             <img :src="item.fullImgUrl" style="height: 160px;width: 180px;border-radius: 4px;object-fit: cover;"
             v-for="(item,index) in selectImageList" :key="index">
           </div> -->



            <imgUpload  ref="imageupload2" v-model="imgList2" :limit="9" :isShow="true" :uploadText="uploadText"
            :uploadIcon="uploadIcon" @delIndex="delIndex"
            :isDisabled="true"  :width="120" :height="160" @preViewImage="preViewImage" @click.native="chooseImage"></imgUpload>
            <!-- <div style="border: 1px dotted rgb(192, 204, 218);width: 120px;height: 160px;display: flex;flex-direction: column;align-items: center;justify-content: center;" @click="chooseImage">
              <i class="el-icon-picture-outline" style="font-size: 20px;color: rgb(153, 153, 153);"></i>
              <span style="font-size: 13px;color: rgb(153, 153, 153);">选择海报</span>
             </div> -->
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
      <img :src="selectImg" style="width: 253px;height: 130px;">
    </div>

    <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">{{activityName}}</h6>
    <div style="margin-left: 24px; display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
      <div>
        <i class="el-icon-view" style="font-size: 12px;color: #bfbdc0;">99万</i>
        <i class="el-icon-edit" style="font-size: 12px;margin-left: 10px;color: #bfbdc0;">99万</i>
      </div>

      <span style="font-size: 14px;color: black;margin-right: 24px;">19.00</span>

    </div>


    <h6 style="margin-top: 10px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">适用场景</h6>
    <span style="margin-left: 24px;font-size: 13px;color: #bfbdc0;">{{activityscen}}</span>

    <h6 style="margin-top: 10px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">适用人群</h6>
    <span style="margin-left: 24px;font-size: 13px;color: #bfbdc0;">{{activityPeople}}</span>

    <h6 style="margin-top: 10px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">方案介绍</h6>

     <div class="view-pd" v-html="form.programIntroduce" style="margin-left: 24px;font-size: 13px;color: #bfbdc0;width: 240px">

     </div>

    <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">推荐海报</h6>
    <div style="display: flex;flex-direction: row;width: 240px;margin-left: 22px;">
      <img src="../../../assets/images/avater.jpg" style="display: flex;flex: 1;width: 60px;height: 80px;">
      <img src="../../../assets/images/avater.jpg" style="display: flex;flex: 1;width: 60px;margin-left: 5px;height: 80px;">
      <img src="../../../assets/images/avater.jpg" style="display: flex;flex: 1;width: 60px;margin-left: 5px;height: 80px;">
    </div>

    </div>
  </div>





   <el-dialog :visible.sync="dialogVisible" >
     <img width="100%" :src="dialogImageUrl" alt="">
   </el-dialog>


   <el-dialog :visible.sync="imageDialog" width="900px">
     <div slot="title">
       <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
         选择海报
       </H4 >

     </div>

       <div style="display: flex;flex-direction: row;margin-top: -40px;">
         <el-select v-model="queryParams.classificationId" placeholder="请选择" clearable  style="width: 200px" class="my-input2" @change="queryStatus">
           <el-option v-for="(item, index) in posterClassificationList" :key="item.classificationId" :label="item.classificationName" :value="item.classificationId"/>
         </el-select>
         <el-input
         class="my-input2"
           style="width: 200px;margin-left: 10px;"
           v-model="queryParams.posterName"
           placeholder="可输入名称进行搜索"
           clearable
           size="medium"
           @keyup.enter.native="handleQuery"
           @change="queryName"
         />

        </div>

        <div style="margin-top: 20px;" v-loading="loading">
          <el-row :gutter="10">
            <el-col :span="4" v-for="(item, index) in providersPosterList" :key="index" >
              <el-card :body-style="{ padding: '0px' }" style="height: 200px;margin-top: 20px;" :class="item.checked?'chooseImg':''">

                <!-- 信息 -->
                <div @click="choose(item,index)">
                  <img :src="item.fullImgUrl" style="height: 160px;width: 180px;border-radius: 4px;object-fit: cover;" >
                </div>

                <!-- 描述 -->
                <div  style="font-size: 14px;padding: 10px; ">
                  <span class="my-des">{{item.posterName}}</span>
                </div>

              </el-card>
            </el-col>


          </el-row>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />



        </div>

       <el-divider></el-divider>


       <div slot="footer" class="dialog-footer" style="margin-top: -40px;  display: flex;flex-direction: row;align-items: center; justify-content: space-between;">

         <div style="display: flex;flex-direction: row;align-items: center;">
           <span>可点击列表选择图片,</span>
           <div style="display: flex;flex-direction: row;align-items: center;">
             <span>已选择</span>
             <el-tag type="success" style="float: right; height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">{{selectImageList.length}}</el-tag>
             <span>个海报</span>
           </div>
         </div>

         <div style="display: flex;flex-direction: row;">
           <el-button type="primary" @click="submitSelectImage">确 定</el-button>
           <el-button @click="cancelSelectImage">取 消</el-button>
         </div>

       </div>


   </el-dialog>





   <bottom-card moduleName="内容" pagesName="新增活动" style="margin-top: 20px;"></bottom-card>


   </div>

</template>

<script>

  import {ActivityProgramClassification,providersPosterList,addActivityProgram,PosterClassification,editActivityProgram,getActivityProgram} from "@/api/content/content";

     import bottomCard from '@/components/bottomCard'
  import imgUpload from '@/components/imgUpload'
  import { quillEditor } from 'vue-quill-editor';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import Quill from "quill";
  import ImageResize from "quill-image-resize-module"; // 引用
  import { ImageDrop } from "quill-image-drop-module";
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/imageResize", ImageResize); // 注册

  import {
    validImgUpload
  } from '@/utils/validate'


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
          activityName:"请在左侧输入内容",
          activityscen:"请在左侧输入内容",
          activityPeople:"请在左侧输入内容",
          activityIntroduce:"请在左侧输入内容",
          dialogVisible: false,
          dialogImageUrl:null,
          imageDialog:false,
          selectImageList:[],
          chooseImageList:[],
          imgList2:[],
          ActivityProgramClassificationList:[],
          providersPosterList:[],
          posterClassificationList:[],
          posterIds:[],
          temList:[],
          selectImg:'',
          uploadIcon:'el-icon-picture-outline',
          queryParams:{
            posterName:null,
            pageNum:1,
            pageSize:10,
            classificationId:null
          },
          providersActivityProgramId:null,

          total:10,
          // 版本号
          version: "3.6.0",
          activeName: 'first',
          imgList:[],
          form:{},
          isTop:1,
          loading:false,
          uploadText:"选择海报",
          fileForm:{},
          // 上传文件列表
          fileList: [],
          fileLists: [],
          serverUrl: this.UPLOADURL.uploadUrlAddress,
          videoUpload:this.UPLOADURL.videoUpload,
          getVideoUrl:this.UPLOADURL.getVideo,
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


      watch:{
         imgList(val){
           if(this.imgList.length>0){
              this.selectImg=this.imgList[0].url
           }else{
              this.selectImg=null
           }

         }


      },

      created() {
        this.providersActivityProgramId = this.$route.query.dataId
        this.getActivityProgramClassification();
        this.getprovidersPosterList()
        this.getPosterClassification()
        this.geteditActivityProgram(this.providersActivityProgramId)

      },

      mounted() {
        this.$refs.myQuillEditor.quill.enable(false);
      },

      methods: {


        uploadVideoSuccess(res, file){
          console.log(res)
          this.videoUrl=res.url
           this.loading=false;

           if(this.videoUrl!=null&&this.videoUrl!=''){
             let quill = this.$refs.myQuillEditor.quill
             // 获取光标所在位置
             let length = quill.getSelection().index;




             const BlockEmbed = Quill.import('blots/block/embed')
             class VideoBlot extends BlockEmbed {
               static create (value) {
                 let node = super.create()
                 node.setAttribute('src', value.url)
                 node.setAttribute('controls', value.controls)
                 node.setAttribute('controlslist', value.controlslist)
                 node.setAttribute('disablePictureInPicture', value.disablePictureInPicture)
                 node.setAttribute('width', value.width)
                 node.setAttribute('height', value.height)
                 return node;
               }

               static value (node) {
                 return {
                   url: node.getAttribute('src'),
                   controls: node.getAttribute('controls'),
                   controlslist:node.getAttribute('controlslist'),
                   disablePictureInPicture:node.getAttribute('disablePictureInPicture'),
                   width: node.getAttribute('width'),
                   height: node.getAttribute('height')
                 };
               }
             }

             VideoBlot.blotName = 'simpleVideo'
             VideoBlot.tagName = 'video'
             Quill.register(VideoBlot)

             quill.insertEmbed(length, 'simpleVideo', {
               url:this.videoUrl,
               controls: 'controls',
               controlslist:'nodownload',
               disablePictureInPicture:'disablePictureInPicture',
               width: '100%',
               height: '100%'
             })

             quill.setSelection(length + 1)




             // // 插入图片 res.url为服务器返回的图片地址
             // quill.insertEmbed(length, 'video', self.videoUrl)
             // // 调整光标到最后
             // quill.setSelection(length + 1)
           }
        },

        onChange3(file){

        },



        delIndex(data){
          console.log(data)
          this.providersPosterList[data.index].checked=false
           this.selectImageList.splice(data.index,1)
        },

        queryStatus(value){
          if(value==''){
            this.queryParams.classificationId=null
          }
          else{
            this.queryParams.classificationId=value
          }

          this.getprovidersPosterList()
        },

        queryName(value){
          if(value==''){
            this.queryParams.posterName=null
          }
          else{
             this.queryParams.posterName=value
          }

           this.getprovidersPosterList()
        },


        geteditActivityProgram(id){
          getActivityProgram(id).then(response => {
            console.log(response)
            this.form=response.data.providersActivityProgram
            let data = {
                url: response.data.providersActivityProgram.fullCourseImgUrl,
                relative_url: response.data.providersActivityProgram.courseImgUrl
              }
              this.imgList.push(data)
              this.activityName=response.data.providersActivityProgram.activityProgramName
              this.activityscen=response.data.providersActivityProgram.applyScene
              this.activityPeople=response.data.providersActivityProgram.applyCrowd
              this.activityIntroduce=response.data.providersActivityProgram.programIntroduce


              for (var i = 0; i < response.data.providersActivityProgramFileList.length; i++) {
               let data={
                 name:response.data.providersActivityProgramFileList[i].fileName,
                 url:response.data.providersActivityProgramFileList[i].fileUrl,
               }
               this.fileList.push(data)

               let data2={
                 fileName:response.data.providersActivityProgramFileList[i].fileName,
                 fileUrl:response.data.providersActivityProgramFileList[i].url,
                 fileFormat:response.data.providersActivityProgramFileList[i].fileName.split('.')[1]
               }

               this.fileLists.push(data2)

              }


           for (var i = 0; i < response.data.posterList.length; i++) {
             let data={
               url: response.data.posterList[i].fullImgUrl,
               relative_url: response.data.posterList[i].courseImgUrl
             }
             this.imgList2.push(data)
           }

            for (var i = 0; i < response.data.posterList.length; i++) {

                 for (var j = 0; j < this.providersPosterList.length; j++) {

                      if(response.data.posterList[i].posterId==this.providersPosterList[j].posterId){

                        this.providersPosterList[j].checked=true
                        // this.temList.push(this.providersPosterList[j])
                        this.selectImageList.push(this.providersPosterList[j])
                      }
                 }
            }



            this.$nextTick(function() {
              this.$refs.myQuillEditor.quill.enable(true);
              this.$refs.myQuillEditor.quill.blur();
            });
            // this.posterClassificationList=response.rows
          });
        },


        getPosterClassification(){

          PosterClassification().then(response => {
            console.log(response)
            this.posterClassificationList=response.rows
          });
        },


        choose(item,index){

          if(this.providersPosterList[index].checked==undefined){
            this.providersPosterList[index].checked=true
            this.selectImageList.push(this.providersPosterList[index])
              console.log("aaaa",this.selectImageList)
          }
          else{
            this.providersPosterList[index].checked=!this.providersPosterList[index].checked
            console.log("aaaa",this.providersPosterList[index].checked)
            if(this.providersPosterList[index].checked){
              this.selectImageList.push(this.providersPosterList[index])

                console.log("aaaa",this.selectImageList)

            }
            else{
              this.selectImageList.splice(index,1)
               console.log("aaaa",this.selectImageList)
            }
          }

        },


        submitSelectImage(){
          this.imgList2=[]
          this.selectImageList=[]
          this.imageDialog=false

          for (var i = 0; i < this.providersPosterList.length; i++) {
              if(this.providersPosterList[i].checked){
                this.selectImageList.push(this.providersPosterList[i])
                let data = {
                    url: this.providersPosterList[i].fullImgUrl,
                    relative_url: this.providersPosterList[i].courseImgUrl,
                    posterId:this.providersPosterList[i].posterId
                  }
                  this.imgList2.push(data)
              }
          }


          console.log("aaaa",this.imgList2)

        },

        cancelSelectImage(){
          this.imageDialog=false
          this.selectImageList=[]
        },




        getName(value){
          this.activityName=value
        },

        getScen(value){
          this.activityscen=value
        },

        getPeople(value){
          this.activityPeople=value
        },



        getActivityProgramClassification(){
          ActivityProgramClassification().then(response => {
            console.log(response)
            this.ActivityProgramClassificationList=response.rows

          });
        },

        getprovidersPosterList(){
          providersPosterList(this.queryParams).then(response => {
            this.providersPosterList=response.rows
            this.total=response.total
            // for (var i = 0; i < this.posterIds.length; i++) {
            //      for (var j = 0; j < this.providersPosterList.length; j++) {
            //           if(this.posterIds[i].posterId==this.providersPosterList[j].posterId){
            //             this.providersPosterList[j].checked=true
            //             this.temList.push(this.providersPosterList[j])
            //           }
            //      }
            // }


            // for (var i = 0; i < this.temList.length; i++) {
            //   let data={
            //     url: this.temList[i].fullImgUrl,
            //     relative_url: this.temList[i].courseImgUrl
            //   }
            //   this.imgList2.push(data)
            // }
            // this.selectImageList=this.temList



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


         goBack(){
          this.$router.go(-1);
         },



         chooseImage(){
           this.imageDialog=true
         },


         // 提交上线
         submitForm(){
           this.form.sysAuditStatus=2
            if(this.imgList.length!=0){
             this.form.courseImgUrl= this.imgList[0].relative_url
            }
            else{
              this.form.courseImgUrl= ''
            }

           if(this.fileLists.length==0){
             this.$message.warning('请上传文件');
           }
           else{
             this.form.activityProgramFileJson=JSON.stringify(this.fileLists)
           }

           var posters=[]
           for (var i = 0; i < this.imgList2.length; i++) {
             posters.push(this.imgList2[i].posterId)
           }

            this.form.posterIdJson=JSON.stringify(posters)


            editActivityProgram(this.form).then(response => {
              console.log(response)
              this.msgSuccess("编辑成功");
              this.$router.go(-1);
            });


           console.log(this.form)

         },

         // 仅保存
         save(){

         },

         preViewImage(img){
           console.log(img)
           this.dialogImageUrl = img.image.url;
           this.dialogVisible = true;
         },



         //拿到文件地址
         handleSuccess(res, file, fileList) {
           console.log(fileList)
           this.fileForm.fileUrl = fileList[0].response.relative_url
           this.fileForm.fileFormat = fileList[0].response.fileName.split('.')[1]
           this.fileForm.fileName = fileList[0].response.fileName
           let data = {
             name: fileList[0].response.fileName,
             url: fileList[0].response.relative_url
           }
           this.fileList.push(data)
           this.fileLists.push(this.fileForm)
         },

         //删除文件
         handleRemoveFile(file, fileList) {
         console.log(fileList);
         this.fileList = fileList
         this.fileLists=fileList
         },

         handleExceed(files, fileList) {
           this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
         },
         beforeRemove(file, fileList) {
           return this.$confirm(`确定移除 ${ file.name }？`);
         },



         beforeUploadFile(file){
           // this.fileList=[]

           if (validImgUpload(file, this.size)) {

             return true
           } else {

             return false
           }
         },


      },
    };


</script>

<style scoped>

  .my-input {
    width: 60% !important;
  }

  .chooseImg{
    border: 2px solid #19AA29;
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


   .upload-file {
     width: 50% !important;
   }

   .view-bg{
       background: url(../../../assets/images/yulan-bg.png)   no-repeat;
       background-size:100% 100%;
     }

     .view-pd/deep/img{
      margin: 0; padding: 0; width: 100%; object-fit: cover;
     }


   ::-webkit-scrollbar {
   /*隐藏滚轮*/
   display: none;
   }


</style>
