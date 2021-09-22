<template>

  <div class="app-container home">
  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">修改厂商</span>
  </el-page-header>




  <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 72%;">
    <el-form ref="form" :model="form"  label-width="100px">
      <el-row>
        <el-col :span="20">
          <h5 style="font-weight: bold;">基础信息</h5>
          <el-form-item label="厂商名称" prop="manufactorName" class="lable-text">
            <el-input v-model="form.manufactorName" placeholder="请输入1-24个字的厂商名称" class="my-input" maxlength="24"/>
          </el-form-item>

          <el-form-item label="所在城市" prop="city" style="width: 100%;" class="lable-text">
            <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
             <span>所在城市</span>
             <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
             </el-tooltip>
            </div>
            <el-cascader
            style="width: 100%;"
            class="my-input"
            filterable
              ref="cascaderAddr"
            	:props="props"
            	 @change="locationsChange2"
            	 placeholder="省/市/区"
            	 size="small"
            	 v-model="form.cityId"
            	 clearable
            ></el-cascader>
          </el-form-item>

          <el-form-item label="LOGO" prop="logoImgUrl" class="lable-text">
              <imgUpload v-model="imgList" :limit="1" :isSingle="false" :width="200" :height="120"></imgUpload>
            <div class="el-upload__tip">建议上传164px × 52px或等比例的jpg图片</div>
            <div style="flex-direction: row;font-size: 12px;color: #f56c6c;">
              <span>文件不合规</span>
              <span>活动规格不符合规范</span>
            </div>
          </el-form-item>


          <el-form-item label="简介" prop="activityProgramName" class="lable-text ">
            <div slot="label">
             <span>简介</span>
             <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
            </div>
            <el-input v-model="form.introduction" placeholder="请输入不超过500个字的厂商简介" class="my-input" type="textarea":rows="5" />
          </el-form-item>






        </el-col>

      </el-row>

       <el-divider></el-divider>

       <h5 style="font-weight: bold;">联系方式</h5>
        <el-form-item label="联系电话" prop="label" class="lable-text">
         <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
          <span>联系方式</span>
          <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
             <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
          </el-tooltip>
         </div>
         <div id="rowform" >
           <div class="contact" v-for="(item, index) in manufactorContactss" :key="index" style=" 80%;height: 40px; display: flex; align-items: center; margin-top: 5px;">

              <div style="width: 64%;display: flex;flex-direction: row;align-items: center;" class="contact-item">
                <div style="width: 20px;border: 1px solid rgba(0,0,0,.125);background-color: #f7f7f7;">
                  <i class="el-icon-s-operation handle" style="background-color: #f7f7f7;color: #9d9d9d;"></i>
                </div>
                <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                  <span style="margin-left: 10px;" >{{item.contactsName}}</span>
                  <el-tag style="background-color: #19AA29;color: white; height: 18px;padding: 0 4px;line-height: 18px;margin-right: 10px;">{{item.contactsMobile}}</el-tag>
                </div>

              </div>
             <div style="flex-direction: row;margin-left: 5px;" class="contact-operation">
                <i class="el-icon-edit" @click="editContact(index)"></i>
                <i class="el-icon-delete" style="margin-left: 5px;" @click="deleteContact(index)"></i>
              </div>
               <!-- <div style="flex-direction: row;margin-left: 5px;" class="contact-operation">
                 <span>文件不合规</span>
                 <span>活动规格不符合规范</span>
               </div> -->

           </div>
         </div>


          <div style="width: 80%;margin-top: 5px;" v-if="this.manufactorContactss.length<10">
            <el-button size="medium" style="border: 1px dotted #19AA29; color: #19AA29;width: 80%;height: 40px;font-size: 13px;"
              @click="addContact()">
              <i class="el-icon-document-add"></i>
              添加联系方式
              </el-button>
          </div>



        </el-form-item>





      <div class="dialog-footer" style="margin-left: 100px;">
        <el-button type="primary" @click="submitForm">提交上线</el-button>
        <el-button  @click="save" style="color: #19AA29;border: #19AA29 solid 1px;">仅保存</el-button>
      </div>


    </el-form>
  </el-card>


<div style="position: absolute;right: 50px;top: 20%;width: 280px;height: 550px;" class="view-bg" >
    <div style="width: 240px;display: flex;flex-direction: row;margin-top: 60px;margin-left: 24px;">
      <img  :src="selectImg" style="width: 80px;height: 56px;border-radius: 6px;">
      <div style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 10px;">
        <span>厂商名称</span>
         <span style="font-size: 13px;color: #bfbdc0;">{{selectCity}}</span>
      </div>
    </div>

    <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">厂商信息</h6>
    <span style="margin-left: 24px;font-size: 13px;color: #bfbdc0;">{{introduction}}</span>

    <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">热门商品</h6>

    <div style="width: 280px;">
      <div style="display: flex;flex-direction: row;">
        <div style="width: 115px;display: flex;flex-direction: column;margin-left: 24px;">
          <img src="../../../assets/images/avater.jpg" style="width: 100%;border-radius: 5px;">
          <div style="display: flex;flex-direction: column;font-size: 12px;margin-top: 3px;">
            <span>器材名称</span>
            <span>￥9999</span>
          </div>
        </div>
        <div style="width: 115px;display: flex;flex-direction: column;margin-left: 6px;">
          <img src="../../../assets/images/avater.jpg" style="width: 100%;border-radius: 5px;">
          <div style="display: flex;flex-direction: column;font-size: 12px;margin-top: 3px;">
            <span>器材名称</span>
            <span>￥9999</span>
          </div>
        </div>
      </div>

      <div style="display: flex;flex-direction: row;margin-top: 6px;">
        <div style="width: 115px;display: flex;flex-direction: column;margin-left: 24px;">
          <img src="../../../assets/images/avater.jpg" style="width: 100%;border-radius: 5px;">
          <div style="display: flex;flex-direction: column;font-size: 12px;margin-top: 3px;">
            <span>器材名称</span>
            <span>￥9999</span>
          </div>
        </div>
        <div style="width: 115px;display: flex;flex-direction: column;margin-left: 6px;">
          <img src="../../../assets/images/avater.jpg" style="width: 100%;border-radius: 5px;">
          <div style="display: flex;flex-direction: column;font-size: 12px;margin-top: 3px;">
            <span>器材名称</span>
            <span>￥9999</span>
          </div>
        </div>
      </div>

    </div>



  </div>





   <el-dialog :title="title" :visible.sync="openContact" width="500px" append-to-body>
     <el-form ref="contactForm" :model="contactForm"  label-width="100px">

       <el-form-item label="名称" prop="contactsName" class="lable-text">
         <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
          <span>名称</span>
          <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
             <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
          </el-tooltip>
         </div>
         <el-input v-model="contactForm.contactsName" placeholder="请输入2-8个字的联系方式名称" maxlength="8"  class="my-input2"/>
       </el-form-item>
       <el-form-item label="电话" prop="contactsMobile" class="lable-text">
         <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
          <span>电话</span>
          <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
             <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
          </el-tooltip>
         </div>
         <el-input v-model="contactForm.contactsMobile" placeholder="请输入11位手机号或带区号的座机号码" maxlength="11"  class="my-input2"/>
       </el-form-item>

     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitContact">提 交</el-button>
       <el-button @click="cancelContact">关 闭</el-button>
     </div>
   </el-dialog>

    <bottom-card moduleName="内容" pagesName="编辑厂商" style="margin-top: 20px;"></bottom-card>
   </div>


</template>

<script>
   import bottomCard from '@/components/bottomCard'
  import imgUpload from '@/components/imgUpload'
  import {listArea,listcity} from "@/api/system/user";
  import {addManufactor,editManufactor,getManufactor} from "@/api/content/manufactor";
  import Sortable from 'sortablejs'


  export default {
    name: "index",

    components: {
      imgUpload,
      bottomCard
    },

    data() {
      return {

        props: {
        	        lazy: true,
        	        async lazyLoad(node, resolve) {
        	          const { level } = node;
        	          if (level == 0) {

                     let Provence=[]

                     let param={
                       areaLevel:1
                     }
                     listArea(param).then(response => {
                      console.log(response)
                      Provence=response.rows
                      var nodes = Provence.map(item => {
                        return {
                          value: item.id,
                          label: item.areaName,
                          leaf: false
                        };
                      });
                      resolve(nodes);
                     });


        	          } else if (level == 1) {

                      let cityData=[]
                       let param={
                         parentId:node.value,
                       }
                      listcity(param).then(response => {
                       console.log(response)
                       cityData=response.rows
                       var nodes = cityData.map(item => {
                         return {
                           value: item.id,
                           label: item.areaName,
                           leaf: true
                         };
                       });
                       resolve(nodes);
                      });

        	          }

        	        }
        	      },

        // 版本号
        version: "3.6.0",
        activeName: 'first',
        imgList:[],
        cityList:[],
        title:null,
        providersManufactorId:null,
        form:{},
        selectImg:'',
        selectCity:"请选择所在城市",
        introduction:"请在左侧输入简介",
        contactForm:{},
        openContact:false,
        manufactorContactss:[],
        temManufactorContactss:[]
      };
    },


    mounted() {
     this.$nextTick(() => {
        this.rowDrop()
     })

    },


    created() {
      this.providersManufactorId = this.$route.query.dataId
      this.getData(this.providersManufactorId)
    },

    methods: {


      rowDrop() {

        const _this = this
        Sortable.create(rowform, {
          handle: '.handle',
          onEnd({
            newIndex,
            oldIndex
          }) {

            _this.manufactorContactss.splice(newIndex, 0, _this.manufactorContactss.splice(oldIndex, 1)[0]);
            var newArray = _this.manufactorContactss.slice(0);
            _this.manufactorContactss = [];
            _this.$nextTick(function () {
                _this.manufactorContactss = newArray;
                console.log(_this.temManufactorContactss)
            });

            // _this.temManufactorContactss= _this.manufactorContactss

            // const currRow = _this.temManufactorContactss.splice(oldIndex, 1)[0]
            // _this.temManufactorContactss.splice(newIndex, 0, currRow)


          }
        })
      },
      
      getName(value){
        this.commpanyName=value
      },


      getData(id){
        getManufactor(id).then(response => {
          console.log(response)
          this.form=response.data
          let data = {
              url: response.data.fullLogoImgUrl,
              relative_url: response.data.logoImgUrl
            }
            this.manufactorContactss=this.form.contactsList
          this.imgList.push(data)
          this.$refs['cascaderAddr'].inputValue=response.data.provinceName+"/"+response.data.cityName
          this.selectCity=this.$refs['cascaderAddr'].inputValue
          this.introduction= this.form.introduction
          this.selectImg=response.data.fullLogoImgUrl
          // this.dataList=response.rows
        });
      },


      locationsChange2(value) {
         console.log(value)
        this.form.provinceId=value[0];
        this.form.cityId=value[1];
        this.selectCity=this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels[0]+"/"+this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels[1]

       },

      getIntroduction(value){
        this.introduction=value
      },



       goBack(){
        this.$router.go(-1);
       },

       addContact(){
          this.isEdit=false
         this.openContact=true;
         this.title="添加联系方式"
         this.contactForm={
           contactsName:null,
           contactsMobile:null
         }
       },

       submitContact(){
          console.log(this.contactForm)

         if(this.contactForm.contactsName==null||this.contactForm.contactsMobile==null||this.contactForm.contactsName==''||this.contactForm.contactsMobile==''){
           this.$message({
             message: "请填写完整",
             type: 'warning'
           })
           return
         }


         if(this.contactForm.contactsName!=null&&this.contactForm.contactsName!=''){
           if(this.contactForm.contactsMobile==null||this.contactForm.contactsMobile==''){
             this.$message({
               message: "请填写完整",
               type: 'warning'
             })
             return
           }
           else{
             if(!this.verifyPhone(this.contactForm.contactsMobile)){
               this.$message({
                 message: "请输入正确的手机号码",
                 type: 'warning'
               })
               return
             }

           }
         }

         if(this.contactForm.contactsMobile!=null&&this.contactForm.contactsMobile!=''){
           if(!this.verifyPhone(this.contactForm.contactsMobile)){
             this.$message({
               message: "请输入正确的手机号码",
               type: 'warning'
             })
             return
           }else{
             if(this.contactForm.contactsName==null||this.contactForm.contactsName==''){
               this.$message({
                 message: "请填写完整",
                 type: 'warning'
               })
               return
             }
           }

         }

         if(this.contactForm.providersContactsId!=null){
           for (var i = 0; i < this.manufactorContactss.length; i++) {
                if(this.contactForm.providersContactsId==this.manufactorContactss[i].providersContactsId){
                  this.manufactorContactss[i].contactsMobile=this.contactForm.contactsMobile
                  this.manufactorContactss[i].contactsName=this.contactForm.contactsName
                }
           }
         }
         else{
            this.manufactorContactss.push(this.contactForm)
         }



        this.openContact=false
        console.log(this.manufactorContactss)
       },

       cancelContact(){
         this.openContact=false
       },

       // 校验电话
       verifyPhone(val) {
               let rule = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
               return rule.test(val)
       	},


       submitForm(){
        this.form.sysAuditStatus=2
        this.form.providersManufactorId=this.providersManufactorId
        let label=this.$refs['cascaderAddr'].inputValue
        if(label!=null){
          this.form.provinceName=label.split("/")[0]
          this.form.cityName=label.split("/")[1].trim()
        }
        else{
           this.form.cityName=''

        }

        if(this.imgList.length!=0){
         this.form.logoImgUrl= this.imgList[0].relative_url
        }
        else{
          this.form.logoImgUrl= ''
        }




       this.form.contactsList = this.manufactorContactss
        console.log(this.form)

       editManufactor(this.form).then(response => {
         console.log(response)
         this.msgSuccess("新增成功");
         this.$router.go(-1);
       });

       },

       save(){
        this.form.sysAuditStatus=1
        this.form.providersManufactorId=this.providersManufactorId
        let label=this.$refs['cascaderAddr'].inputValue
        if(label!=null){
          this.form.provinceName=label.split("/")[0]
          this.form.cityName=label.split("/")[1].trim()
        }
        else{
           this.form.cityName=''

        }

        if(this.imgList.length!=0){
         this.form.logoImgUrl= this.imgList[0].relative_url
        }
        else{
          this.form.logoImgUrl= ''
        }

        this.form.contactsList = this.manufactorContactss

        editManufactor(this.form).then(response => {
          console.log(response)
          this.msgSuccess("新增成功");
          this.$router.go(-1);
        });

       },

       editContact(index){
         this.openContact=true;
         this.contactForm={
           contactsName:this.manufactorContactss[index].contactsName,
           contactsMobile:this.manufactorContactss[index].contactsMobile,
           providersContactsId:this.manufactorContactss[index].providersContactsId
         }
         this.title="修改联系方式"
       },

       deleteContact(index){
         console.log(index)
        this.manufactorContactss.splice(index,1)
       }




    },
  };


</script>

<style scoped>

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

  .view-bg{
    background: url(../../../assets/images/yulan-bg.png)   no-repeat;
    background-size:100% 100%;
  }

</style>
