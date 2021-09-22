<template>
   <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">修改海报</span>
  </el-page-header>

  <div style="display: flex;flex-direction: row;">
    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 72%;margin-bottom: 20px;">
      <el-form ref="form" :model="form"  label-width="100px">
        <el-row>
          <el-col :span="20">
            <h5 style="font-weight: bold;">基础信息</h5>
            <el-form-item label="海报名称" prop="posterName" class="lable-text">
              <el-input v-model="form.posterName" placeholder="请输入4-24个字的海报名称" class="my-input" maxlength="24" @input="getName"/>
            </el-form-item>


 <el-form-item label="分类"  prop="classificationId" class="lable-text">
    <el-select v-model="form.classificationId" placeholder="请选择合适的分类" style="width: 80%;" class="my-input">
      <el-option v-for="(item, index) in posterClassificationList" :key="item.classificationId" :label="item.classificationName" :value="item.classificationId"/>
    </el-select>
  </el-form-item>



            <el-form-item label="头像" prop="logoImgUrl" class="lable-text">
              <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
               <span>宣传图</span>
               <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                 <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
               </el-tooltip>
              </div>
               <imgUpload ref="imageupload" v-model="imgList" :limit="1"  :width="120" :height="160" @preViewImage="preViewImage"></imgUpload>
              <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
            </el-form-item>

            <el-form-item label="适用场景" prop="applyScene" class="lable-text ">
              <el-input v-model="form.applyScene" placeholder="请输入不超过200个字的适用场景信息" class="my-input" type="textarea":rows="5" @input="getapplyScene"/>
            </el-form-item>





          </el-col>

        </el-row>

          <el-divider></el-divider>

        <h5 style="font-weight: bold;display: flex; flex-direction: row;align-items: center;">
          海报格式
          <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
            <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
          </el-tooltip>
        </h5>
       <el-form-item label="格式列表" prop="label" class="lable-text">
        <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
         <span>格式列表</span>

        </div>
        <div id="rowform" >
         <div class="contact" v-for="(item, index) in formatList" :key="index" style=" width: 74%;height: 40px; display: flex; align-items: center; margin-top: 5px;">

             <div style="width: 64%;display: flex;flex-direction: row;align-items: center;" class="contact-item">
               <div style="width: 20px;border: 1px solid rgba(0,0,0,.125);background-color: #f7f7f7;">
                 <i class="el-icon-s-operation handle" style="background-color: #f7f7f7;color: #9d9d9d;"></i>
               </div>
               <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">

                 <div style="display: flex;flex-direction: row;align-items: center;margin-left: 10px;">
                   <i class="el-icon-document-remove"></i>
                   <span style="margin-left: 5px;" >{{item.formatName}}</span>
                 </div>

                 <span style="color: #da393f;font-size: 13px;margin-right: 10px;">￥{{item.price}}</span>
               </div>

             </div>
            <div style="flex-direction: row;margin-left: 5px;" class="contact-operation">
               <i class="el-icon-edit" @click="editFormat(item.qId,index)"></i>
               <i class="el-icon-delete" style="margin-left: 5px;" @click="deleteFormat(index)"></i>
             </div>


          </div>
        </div>


         <div style="width: 60%;margin-top: 5px;" >
           <el-button size="medium" style="border: 1px dotted #19AA29; color: #19AA29;width: 80%;height: 40px;font-size: 13px;"
             @click="addFormat()">
             <i class="el-icon-document-add"></i>
             添加格式
             </el-button>
         </div>



       </el-form-item>


        <div class="dialog-footer" style="margin-left: 86px;">
          <el-button type="primary" @click="submitForm">提交上线</el-button>
          <el-button  @click="save" style="color: #19AA29;border: #19AA29 solid 1px;">仅保存</el-button>
        </div>


      </el-form>
    </el-card>

    <div style="position: absolute;right: 50px;top: 20%;width: 280px;height: 550px; " class="view-bg" >
      <div style="width: 100%;height: 520px;overflow-y: scroll;margin-top: 20px;">


      <div style="width: 252px;display: flex;flex-direction: row;margin-top: 30px;margin-left: 16px;">
        <img :src="selectImg" style="width: 253px;height: 320px;">
      </div>

      <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">{{PosterName}}</h6>
      <div style="margin-left: 24px; display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
        <div>
          <i class="el-icon-view" style="font-size: 12px;color: #bfbdc0;">99万</i>
          <i class="el-icon-edit" style="font-size: 12px;margin-left: 10px;color: #bfbdc0;">99万</i>
        </div>

        <span style="font-size: 14px;color: black;margin-right: 24px;">19.00</span>

      </div>


      <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">适用场景</h6>
      <span style="margin-left: 24px;font-size: 13px;color: #bfbdc0;">{{productIntroduce}}</span>

      </div>
    </div>



  </div>


  <el-dialog :title="title" :visible.sync="openFormat" width="500px" append-to-body>
    <el-form ref="contactForm" :model="formatForm"  label-width="100px">

      <el-form-item label="格式名称" prop="formatName" class="lable-text">
        <el-input v-model="formatForm.formatName" placeholder="请输入4-24个字的格式名称" maxlength="24"  class="my-input2"/>
      </el-form-item>
      <el-form-item label="价格" prop="contactsMobile" class="lable-text">
        <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
         <span>价格</span>
         <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
            <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
         </el-tooltip>
        </div>
        <el-input v-model="formatForm.price" placeholder="请输入不超过一万元的价格" class="my-input2">
           <template slot="append">元</template>
         </el-input>
      </el-form-item>

      <el-form-item label="文件" prop="contactsMobile" class="lable-text">
        <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
         <span>文件</span>
         <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
            <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
         </el-tooltip>
        </div>
        <el-upload class="upload-demo" :action="uploadUrl" :on-remove="handleRemoveFile"
          :on-exceed="onExceed" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-success="handleSuccess"
          :limit="1" :file-list="fileList">
          <el-button size="small" style="border: 1px dotted #19AA29; color: #19AA29;height: 36px;font-size: 13px;background-color: white;">
             <i class="el-icon-document-add"></i>
            点击上传
            </el-button>
        </el-upload>
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFormat">提 交</el-button>
      <el-button @click="cancelFormat">关 闭</el-button>
    </div>
  </el-dialog>




  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>

    <bottom-card moduleName="内容" pagesName="新增海报" style="margin-top: 20px;"></bottom-card>

   </div>
</template>

<script>
  import {PosterClassification,addPoster,getPoster,editPoster} from "@/api/content/content";
  import imgUpload from '@/components/imgUpload'
   import bottomCard from '@/components/bottomCard'
     import Sortable from 'sortablejs'
   import {
     validImgUpload
   } from '@/utils/validate'
  export default {
    name: "index",

    components: {
      imgUpload,
      bottomCard
    },

    data() {
      return {
         uploadUrl:this.UPLOADURL.uploadUrlAddress,
        isEdit:false,
        editIndex:0,
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        imgList:[],
        selectImg:'',
        formatList:[],
        form:{},
        openFormat:false,
        title:'',
        formatForm:{},
        fileList:[],
        dialogVisible: false,
        dialogImageUrl:null,
        posterClassificationList:[],
        PosterName:"请在左侧输入内容",
        productIntroduce:"请在左侧输入内容",
        providersPosterId:null
      };
    },


    mounted() {
     this.$nextTick(() => {
        this.rowDrop()
     })

    },

    created() {
      this.providersPosterId = this.$route.query.dataId
      this.getPosterClassification()
      this.getPosterDetail(this.providersPosterId)

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


      getPosterDetail(id){
       getPoster(id).then(response => {
         console.log(response)
         this.form=response.data.providersPoster
         this.formatList=response.data.providersPosterFormatList
         this.PosterName=this.form.posterName
         this.productIntroduce=this.form.applyScene
         this.selectImg=this.form.fullCourseImgUrl
         let data = {
             url: response.data.providersPoster.fullCourseImgUrl,
             relative_url: response.data.providersPoster.courseImgUrl
           }
         this.imgList.push(data)
       });
      },

      rowDrop() {

        const _this = this
        Sortable.create(rowform, {
          handle: '.handle',
          onEnd({
            newIndex,
            oldIndex
          }) {

            _this.formatList.splice(newIndex, 0, _this.formatList.splice(oldIndex, 1)[0]);
            var newArray = _this.formatList.slice(0);
            _this.formatList = [];
            _this.$nextTick(function () {
                _this.formatList = newArray;
                console.log(_this.formatList)
            });

            // _this.temManufactorContactss= _this.manufactorContactss

            // const currRow = _this.temManufactorContactss.splice(oldIndex, 1)[0]
            // _this.temManufactorContactss.splice(newIndex, 0, currRow)


          }
        })
      },



      getapplyScene(value){
        this.productIntroduce=value
      },

      getName(value){
        this.PosterName=value
      },



      getPosterClassification(){

        PosterClassification().then(response => {
          console.log(response)
          this.posterClassificationList=response.rows
        });
      },

      // 添加格式
      addFormat(){
        this.isEdit=false
        this.openFormat=true;
        this.title="添加海报格式"
        this.formatForm={}

      },

       goBack(){
        this.$router.go(-1);
       },

       preViewImage(img){
         console.log(img)
         this.dialogImageUrl = img.image.url;
         this.dialogVisible = true;
       },

       //拿到文件地址
       handleSuccess(res, file, fileList) {
         console.log("上传下载")
         console.log(fileList)

         this.formatForm.fileUrl = fileList[0].response.relative_url
         this.formatForm.fileFormat = fileList[0].response.fileName.split('.')[1]
         this.formatForm.fileName = fileList[0].response.fileName
         let data = {
           name: fileList[0].response.fileName,
           url: fileList[0].response.relative_url
         }
         this.fileList.push(data)

       },

       //删除文件
       handleRemoveFile(file, fileList) {
         console.log(fileList);
         this.fileList = fileList
       },

       beforeRemove(file, fileList) {
         return this.$confirm(`确定移除 ${ file.name }？`);
       },

       onExceed() {
         this.$message.warning("请先删除已上传的文件")
       },

       beforeUpload(file) {
         // this.fileList=[]

         if (validImgUpload(file, this.size)) {

           return true
         } else {

           return false
         }
       },

       // 添加格式
       submitFormat(){
         console.log(this.formatForm)
         if(this.formatForm.formatName==null||this.formatForm.price==null||this.formatForm.fileUrl==null||
         this.formatForm.formatName==''||this.formatForm.price==''||this.formatForm.fileUrl==''){
           this.$message({
             message: "请填写完整",
             type: 'warning'
           })
           return
         }
         // if(this.isEdit){
         //    this.formatList[this.editIndex]=this.formatForm
         // }
         // else{
         //    this.formatForm.qId=this.formatList.length
         //    this.formatList.push(this.formatForm)
         // }


         if (this.formatForm.qId != null) {
           this.formatList[this.editIndex].qId = this.formatForm.qId
           this.formatList[this.editIndex].formatName = this.formatForm.formatName
           this.formatList[this.editIndex].fileFormat = this.formatForm.fileFormat
           this.formatList[this.editIndex].fileName = this.formatForm.fileName
           this.formatList[this.editIndex].price = this.formatForm.price
           this.formatList[this.editIndex].fileUrl = this.formatForm.fileUrl
           this.fileList = [];
           this.msgSuccess("修改成功");

            this.openFormat=false;
         } else {
           this.formatForm.qId = this.formatList.length
           this.formatList.push(this.formatForm)

           this.msgSuccess("新增成功");
           this.fileList = [];
            this.openFormat=false;
           console.log(this.formatList);
         }







         this.openFormat=false;
         this.fileList=[]
       },

       cancelFormat(){
         this.formatForm={}
          this.openFormat=false;
       },


       editFormat(qId,index){
         // this.isEdit=true
         // this.editIndex=index
         // this.formatForm=this.formatList[index]
         // this.fileList = [];
         // let data = {
         //   name: this.formatForm.fileName
         // }
         // this.fileList.push(data)
         // this.openFormat=true;
         // this.title="修改海报格式"


         this.editIndex=index
         let tempForm = {

         };

         for (var i = 0; i < this.formatList.length; i++) {
           if (this.formatList[i].qId == qId) {
             tempForm = this.formatList[i]
           }
         }
         console.log(tempForm)

         this.fileList = [];
         let data = {
           name: tempForm.fileName
         }
         this.fileList.push(data)
         this.formatForm = tempForm;
        this.openFormat=true;
        this.title="修改海报格式"



       },

       deleteFormat(index){
        //  console.log(index)
        // this.formatList.splice(index,1)

        this.$confirm('是否确认删除改格式', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {

        }).then(() => {
          this.formatList.some((item, i) => {
            if (item.qId == row.qId) {
              this.formatList.splice(i, 1);
              return true
            }
          })
          console.log(this.formatList)
          this.msgSuccess("删除成功");
        })



       },


       // 提交上线
       submitForm(){
         if(this.imgList.length!=0){
          this.form.courseImgUrl= this.imgList[0].relative_url
         }
         else{
           this.form.courseImgUrl= ''
         }

         this.form.formatJson=JSON.stringify(this.formatList)
         this.form.providersPosterId=this.providersPosterId
         this.form.sysAuditStatus=2
         console.log(this.form)

         editPoster(this.form).then(response => {
           console.log(response)
           this.msgSuccess("新增成功");
           this.$router.go(-1);
         });
       },

       // 仅保存
       save(){
         if(this.imgList.length!=0){
          this.form.courseImgUrl= this.imgList[0].relative_url
         }
         else{
           this.form.courseImgUrl= ''
         }

         this.form.formatJson=JSON.stringify(this.formatList)
         this.form.providersPosterId=this.providersPosterId
         this.form.sysAuditStatus=0
         console.log(this.form)

         editPoster(this.form).then(response => {
           console.log(response)
           this.msgSuccess("新增成功");
           this.$router.go(-1);
         });
       },

    },
  };



</script>

<style scoped>

   .my-input {
     width: 60% !important;
   }

   .contact-item{
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.125);
    }

    .contact:hover .contact-item{
      background-color: #f7f7f7;
    }

   /* .contact-item:hover{
      background-color: #f7f7f7;
    } */

    .contact:hover .contact-operation{
      display: flex;
    }

    .contact-operation{
      display: none;
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
