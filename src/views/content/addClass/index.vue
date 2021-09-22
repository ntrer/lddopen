<template>

  <div class="app-container home">
    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">新增课程</span>
    </el-page-header>

    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;width: 70%;margin-bottom: 20px;">
      <el-form ref="form" :model="form" label-width="140px">
        <el-row>
          <el-col :span="18">
            <h5 style="font-weight: bold;">基础信息</h5>
            <el-form-item label="课程名称" prop="courseName" class="lable-text">
              <el-input v-model="form.courseName" placeholder="请输入1-24个字的厂商名称" class="my-input" maxlength="24"
                @input="getName" />
            </el-form-item>



            <el-form-item label="分类" prop="classificationId" style="width: 100%;" class="lable-text">
              <div style="display: flex;flex-direction: column;">
                <el-select v-model="form.classificationId" placeholder="请选择一个合适的分类" style="width: 80%;"
                  class="my-input">
                  <el-option v-for="(item, index) in trainClassificationList" :key="item.classificationId"
                    :label="item.classificationName" :value="item.classificationId" />
                </el-select>
                <div
                  style="display: flex;flex-direction: row;color: #6c9bfe;font-size: 12px;align-items: center;cursor: pointer;">
                  <span>如何选择合适的分类?</span>
                  <i class="el-icon-document-copy" style="margin-left: 5px;"></i>
                </div>
              </div>

            </el-form-item>


            <el-form-item label="导师" prop="providersManufactorId" style="width: 100%;" class="lable-text">
              <div slot="label" style="display: flex;flex-direction: row;align-items: center;">
                <span>导师</span>
                <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                  <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                </el-tooltip>
              </div>
              <el-select v-model="form.tutorId" placeholder="请选择课程的导师" style="width: 80%;" class="my-input"
                @change="chooseTutor">
                <el-option v-for="(item, index) in trainTutorList" :key="item.tutorId" :label="item.tutorName"
                  :value="item" />
              </el-select>
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
              <imgUpload ref="imageupload" v-model="imgList" :limit="1" :isSingle="false" :width="160" :height="100"
                @preViewImage="preViewImage"></imgUpload>
              <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
            </el-form-item>


            <el-form-item label="简介" prop="activityProgramName" class="lable-text ">
              <div slot="label">
                <span>简介</span>
                <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
              </div>
              <el-input v-model="form.introduce" placeholder="请输入不超过500个字的厂商简介" class="my-input" type="textarea"
                :rows="5" @input="getIntroduction" />
            </el-form-item>


          </el-col>

        </el-row>

        <el-divider style="background-color: #e3e3e3;"></el-divider>

        <div style="display: flex;align-items: center; justify-content: space-between;margin-top: 50px;">
          <h5 style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
            章节与课时信息
            <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
              <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
            </el-tooltip>
          </h5>
          <div style="margin-right: 10px;">
            <el-button size="small" @click="addTab(editableTabsValue)">
              添加章节
            </el-button>
          </div>
        </div>





        <el-tabs v-model="editableTabsValue" type="border-card" closable  @tab-remove="removeTab" @tab-click="handleClick">
           <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
              <div style="width: 600px; margin-bottom: 20px;margin-top: 10px;display: flex;flex-direction: column;">
                <div style="display: flex;">
                  <div style="display: flex;flex-direction: row;align-items: center;">
                    <span class="name-before" style="font-size: 14px;margin-right: 10px;">
                      章节名称
                    </span>
                    <el-tooltip content="后续版本通过标签推荐内容" placement="top" >
                      <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                    </el-tooltip>
                  </div>

                  <el-input style="margin-left: 40px;" v-model="TrainCourseLists[index].chapterName" placeholder="请输入" class="my-input2"  maxlength="24">
                  </el-input>
                </div>



               <!-- <el-form-item label="课时" prop="label" class="lable-text" style="margin-top: 20px;"> -->
               <div style="display: flex;margin-top: 20px;">
                 <div style="display: flex;flex-direction: row;align-items: center;width: 100px;">
                   <span class="name-before" style="font-size: 14px;margin-right: 10px;">
                     课时
                   </span>
                   <el-tooltip content="后续版本通过标签推荐内容" placement="top" >
                     <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
                   </el-tooltip>
                 </div>
                 <div style="display: flex;flex-direction: column;width: 90%;margin-left: 30px;">
                   <div class="rowform" >
                     <div class="contact" v-for="(item, index) in TrainCourseLists[index].providersTrainClassHourList"
                     :key="index" style="height: 40px; display: flex; align-items: center; margin-top: 5px;">

                        <div style="width: 88%;height: 100%; display: flex;flex-direction: row;align-items: center;" class="contact-item">
                          <div style="display: flex;align-items: center; width: 20px;height: 100%; border: 1px solid rgba(0,0,0,.125);background-color: #f7f7f7;">
                            <i class="el-icon-s-operation handle" style="background-color: #f7f7f7;color: #9d9d9d;"></i>
                          </div>
                          <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
                            <span style="margin-left: 10px;" >{{item.classHourName}}</span>
                            <el-tag v-if="item.allowView==0"  style="background-color: #696869;color: white; height: 18px;padding: 0 4px;line-height: 18px;margin-right: 10px;">
                            不可试看
                            </el-tag>
                            <el-tag v-else-if="item.allowView==1" style="background-color: #19AA29;color: white; height: 18px;padding: 0 4px;line-height: 18px;margin-right: 10px;">
                            完整试看
                            </el-tag>
                            <el-tag v-else-if="item.allowView==2" style="background-color: #2b70ff;color: white; height: 18px;padding: 0 4px;line-height: 18px;margin-right: 10px;">
                            试看{{item.allowDuration}}秒
                            </el-tag>
                          </div>

                        </div>
                       <div style="flex-direction: row;margin-left: 5px;" class="contact-operation">
                          <i class="el-icon-edit" @click="editClass(item)"></i>
                          <i class="el-icon-delete" style="margin-left: 5px;" @click="deleteClass(item)"></i>
                        </div>
                         <!-- <div style="flex-direction: row;margin-left: 5px;" class="contact-operation">
                           <span>文件不合规</span>
                           <span>活动规格不符合规范</span>
                         </div> -->

                     </div>
                   </div>


                    <div style="margin-top: 5px;">
                      <el-button size="medium" style="border: 1px dotted #19AA29; color: #19AA29;width: 88%;height: 40px;font-size: 13px;"
                        @click="addClass()">
                        <i class="el-icon-document-add"></i>
                        添加课时
                        </el-button>
                    </div>
                 </div>

               </div>




               <!-- </el-form-item> -->



              </div>
           </el-tab-pane>
        </el-tabs>


        <el-divider style="background-color: #e3e3e3;"></el-divider>


        <h5 style="font-weight: bold;">课程介绍</h5>
        <el-form-item label="器材介绍" prop="logoImgUrl" class="lable-text">
          <div slot="label" style="display: flex;flex-direction: column;">
            <div style="display: flex;flex-direction: row;">
              <span>课程介绍</span>
              <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
                <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;"></i>
              </el-tooltip>
            </div>
          </div>

          <div v-loading="loading" style="width: 56%;">
            <quill-editor class="my-editor" v-model="form.courseIntroduce" ref="myQuillEditor" :options="editorOption"
              @change="onEditorChange($event)">
            </quill-editor>
            <el-upload class="avatar-uploader" :action="serverUrl" name="file" accept=".jpg,.jpeg,.png"
              :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
            </el-upload>

           <!-- <el-upload class="video-uploader" :action="serverUrl" name="file" :auto-upload="false" accept="video/mp4"
              :show-file-list="false" :on-change="onChange">
            </el-upload> -->


            <el-upload class="video-uploader" :action="serverUrl" name="file" :auto-upload="true" accept="video/mp4" :show-file-list="false"
             :before-upload="beforeUpload" :on-change="onChange3" :on-success="uploadVideoSuccess">
            </el-upload>

          </div>

        </el-form-item>







        <div class="dialog-footer" style="margin-left: 140px;">
          <el-button type="primary" @click="submitForm">提交上线</el-button>
          <el-button @click="save" style="color: #19AA29;border: #19AA29 solid 1px;">仅保存</el-button>
        </div>


      </el-form>
    </el-card>



    <div style="position: absolute;right: 50px;top: 20%;width: 280px;height: 550px; " class="view-bg">
      <div style="width: 100%;height: 520px;overflow-y: scroll;margin-top: 20px;">


        <div style="width: 252px;display: flex;flex-direction: row;margin-top: 30px;margin-left: 16px;">
          <img style="width: 253px;height: 120px;" :src="selectImg2">
        </div>


        <div
          style="width: 100%;height: 50px;display: flex;flex-direction: row;justify-content: center; align-items: center;">
          <div
            style="display: flex;flex: 1;align-items: center;justify-content: center;font-size: 13px;margin-left: 20px;">
            <span style="border-bottom: 2px solid #bfbdc0;padding-bottom: 5px;">简介</span>
          </div>
          <div
            style="display: flex;flex: 1;align-items: center;justify-content: center;font-size: 13px;margin-right: 20px;">
            <span style="padding-bottom: 5px;">目录</span>
          </div>
        </div>

        <h6 style="margin-top: 20px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">{{courseName}}</h6>
        <div
          style="font-size: 13px; display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-left: 24px;margin-right: 16px;">
          <div style="display: flex;flex-direction: row;color:#bfbdc0 ;">
            <span>0课时</span>
            <span style="margin-left: 5px;">0人学过</span>
          </div>

          <span>{{price}}</span>
        </div>


        <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">讲师</h6>
        <div style="display: flex;flex-direction: row;margin-left: 24px;align-items: center;">
          <img :src="selectImg" style="height: 30px;width: 30px;border-radius: 20px;">
          <span style="font-size: 13px;color: #bfbdc0;margin-left: 10px;">{{teacherName}}</span>
        </div>


        <h6 style="margin-top: 30px;margin-left: 24px;font-weight: bold;margin-bottom: 10px;">课程介绍</h6>
        <div class="view-pd" v-html="courseIntroduce"
          style="margin-left: 24px;font-size: 13px;color: #bfbdc0;width: 240px">

        </div>

      </div>
    </div>





    <div style="display: flex;align-items: center;justify-content: center;height: 40px;flex-direction: column;">
      <div style="display: flex;flex-direction: row; align-items: center;font-size: 12px;color: #b4b4b5;">
        <span>关于我们</span>
        <span style="margin-left: 5px;margin-right: 5px;">|</span>
        <span>服务协议</span>
        <span style="margin-left: 5px;margin-right: 5px;">|</span>
        <span>意见反馈</span>
      </div>
      <span style="color: #b4b4b5;font-size: 12px;margin-top: 10px;">Copyright © 2021北京中体联合数据科技有限公司</span>
    </div>


    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>




    <el-dialog :title="title" :visible.sync="openClass" width="550px" append-to-body >
      <el-form ref="form2" :model="form2" :rules="rules2" label-width="80px">
        <el-form-item label="课时名称" prop="classHourName">
          <el-input v-model="form2.classHourName" placeholder="请输入" maxlength="24" class="my-input3" style="margin-left: 60px;"/>
        </el-form-item>
        <el-form-item label="视频文件" prop="videoUrl">
          <div slot="label" style="display: flex;flex-direction: row;align-items: center;width: 100px;">
           <span style="margin-left: 10px;">视频文件</span>
           <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 5px;">
             <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;font-weight: 100;"></i>
           </el-tooltip>
          </div>

          <el-upload style="margin-left: 60px;" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="handleRemoveFile"
            :before-remove="beforeRemove" :on-success="handleSuccess" :limit="1" :file-list="fileList" :on-change="onChange" :auto-upload="false" accept="video/mp4">
            <el-button size="small"  style="border: 1px dotted #19AA29; color: #19AA29;">
              <i class="el-icon-document-add"></i>
              点击上传
              </el-button>
          </el-upload>

          <el-progress style="margin-left: 60px;"  :stroke-width="6" :percentage="authProgress" v-if="showLoading"></el-progress>

        </el-form-item>


        <el-form-item label="视频封面图" prop="coverUrl">
         <div slot="label" style="display: flex;flex-direction: row;align-items: center;width: 120px;">
          <span style="margin-left: 10px;">视频封面图</span>
          <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 5px;">
            <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;font-weight: 100;"></i>
          </el-tooltip>
         </div>
          <imgUpload ref="imageupload2" v-model="coverImgList" :limit="1" :isSingle="false" :width="160" :height="100"
            @preViewImage="preViewImage" style="margin-left: 60px;"></imgUpload>
          <div class="el-upload__tip" style="margin-left: 60px;">推荐尺寸694px*284px，只支持jpg/png格式</div>
        </el-form-item>



        <el-form-item label="是否可以试看" prop="allowView" >
          <div slot="label" style="display: flex;flex-direction: row;align-items: center;width: 120px;">
           <span style="margin-left: 10px;">是否可以试看</span>
           <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 5px;">
             <i class="el-self-iconQuestion" style="font-size: 16px;color: #ccc;font-weight: 100;"></i>
           </el-tooltip>
          </div>
          <div style="width: 80%;display: flex;flex-direction: row;margin-left: 60px;">
            <div style="display: flex;flex: 1;align-items: center;justify-content: center;border-top-left-radius:5px;border-bottom-left-radius:5px;" :class="isTop==0?'selected-rate':'unselect-rate'" @click="switchTop(0)">
              <span>不可试看</span>
            </div>
            <div style="display: flex;flex: 1;align-items: center;justify-content: center;border-top-right-radius:5px;border-bottom-right-radius:5px;" :class="isTop==1?'selected-rate':'unselect-rate'" @click="switchTop(1)">
              <span>完整试看</span>
            </div>
            <div style="display: flex;flex: 1;align-items: center;justify-content: center;border-top-right-radius:5px;border-bottom-right-radius:5px;" :class="isTop==2?'selected-rate':'unselect-rate'" @click="switchTop(2)">
              <span>部分试看</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="" prop="duration" v-if="form2.allowView==2">
          <el-input style="margin-left: 60px;" class="my-input3" placeholder="请输入时长" v-model="form2.allowDuration" oninput = "value=value.replace(/[^\d]/g,'')" @blur="valueChange4">
            <template slot="append">秒</template>
          </el-input>
           </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormNew">确 定</el-button>
        <el-button @click="cancelNew">取 消</el-button>
      </div>
    </el-dialog>






    <bottom-card moduleName="内容" pagesName="新增器材" style="margin-top: 20px;"></bottom-card>

  </div>
</template>

<script>
  import imgUpload from '@/components/imgUpload'
  import bottomCard from '@/components/bottomCard'
  import Sortable from 'sortablejs'
  import axios from 'axios'
  import {
    trainCourseList,
    trainClassificationList,
    trainTutorList,
    addTrainCourse
  } from "@/api/content/class";
  import {
    manufactorList
  } from "@/api/content/manufactor";

  import {
    quillEditor
  } from 'vue-quill-editor';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import Quill from "quill";
  import ImageResize from "quill-image-resize-module"; // 引用
  import {
    ImageDrop
  } from "quill-image-drop-module";
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/imageResize", ImageResize); // 注册




  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{
      'header': 1
    }, {
      'header': 2
    }], // custom button values
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }],
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], // outdent/indent
    [{
      'direction': 'rtl'
    }], // text direction
    [{
      'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }],
    [{
      'color': []
    }, {
      'background': []
    }], // dropdown with defaults from theme
    [{
      'font': []
    }],
    [{
      'align': []
    }],
    ['link', 'image', 'video'],
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

        editableTabsValue: '1',
        editableTabs: [{
          title: '第1章',
          name: '1',
        }],
       tabIndex:0,
       index: 0,
       TrainCourseLists:[],
       openClass:false,
       form2:{},
       showLoading:false,
       title:"",
       rules2:{},
       coverImgList:[],
       fileList:[],
       isEdit:false,
       authProgress: 0,

        courseName: "请在左侧输入名称",
        teacherName: "请在左侧选择导师",
        price: "暂无报价",
        introduce: "请在左侧输入简介",
        courseIntroduce: "请在左侧输入内容",
        selectImg: '',
        selectImg2: "",
        selectTutor: null,
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        imgList: [],
        trainTutorList: [],
        trainClassificationList: [],
        form: {},
        isTop: 0,
        loading: false,
        dialogVisible: false,
        dialogImageUrl: null,
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
                'image': function(value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                },

                'video': function(value) {
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


    mounted() {
     this.$nextTick(() => {
        this.rowDrop()
     })

    },


    created() {

      // 获取导师列表
      this.gettrainTutorList()
      // 获取分类
      this.gettrainClassificationList()

      // 初始化课程列表
      this.TrainCourseLists=[]
      let data={
        chapterName:null,
        providersTrainClassHourList: [],
      }
      this.TrainCourseLists.push(data)

    },

    watch: {
      imgList(val) {
        if (this.imgList.length > 0) {
          this.selectImg2 = this.imgList[0].url
        } else {
          this.selectImg2 = null
        }
      }
    },


    methods: {



      rowDrop() {

        const _this = this
        const tbody=document.querySelectorAll('.el-tabs__content')[0].querySelectorAll('.rowform')[this.index]
        Sortable.create(tbody, {
          handle: '.handle',
          onEnd({
            newIndex,
            oldIndex
          }) {

            _this.TrainCourseLists[_this.index].providersTrainClassHourList.splice(newIndex, 0, _this.TrainCourseLists[_this.index].providersTrainClassHourList.splice(oldIndex, 1)[0]);
            var newArray = _this.TrainCourseLists[_this.index].providersTrainClassHourList.slice(0);
            _this.TrainCourseLists[_this.index].providersTrainClassHourList = [];
            _this.$nextTick(function () {
                _this.TrainCourseLists[_this.index].providersTrainClassHourList = newArray;
                console.log(_this.TrainCourseLists[_this.index].providersTrainClassHourList)
            });

          }
        })
      },





      valueChange4(e){
        this.form2.allowDuration=e.target.value
      },


      handleTabsEdit() {
        if (action === 'add') {
          this.index++;
          this.tabIndex++;
          index++
          if(index>10){
            return
          }
          let newTabName = '第' + index + '章';
          this.editableTabs.push({
            title: newTabName,
            name: index.toString(),
          });

          this.editableTabsValue = index.toString();

        }
      },

      //添加章节
      addTab(index) {
        this.index++;
        this.tabIndex++;
        index++
        if(index>10){
          return
        }
        let newTabName = '第' + index + '章';
        this.editableTabs.push({
          title: newTabName,
          name: index.toString(),
        });

        let data={
            chapterName:null,
            providersTrainClassHourList: [],
          }
          this.TrainCourseLists.push(data)


        this.editableTabsValue = index.toString();

        this.$nextTick(() => {
           this.rowDrop()
        })


      },

      // 删除章节
      removeTab(index) {
        console.log(index)
        if(index==1){
          this.msgInfo("至少保留一章");
        }
        else{
           this.tabIndex--;
          this.index--
          this.editableTabs.splice(index-1,1);
          this.TrainCourseLists.splice(index-1,1)
          index--;
          this.editableTabsValue = index.toString();
        }

         console.log(this.TrainCourseLists)

      },

      // 切换tab,获取点击的index
      handleClick(tab, event){
        console.log(tab);
        this.tabIndex=tab.index

      },



      // 添加课时
      addClass(){
        this.form2={
          allowView:null,
          allowDuration:null,
          classHourName:null,
          coverUrl:null,
          videoId:null
        }
        this.$nextTick(() => {
          this.$refs.imageupload2.syncElUpload();
        })
        this.fileList=[]
        this.coverImgList=[]
        this.title="新增课时"
        this.isEdit=false
        this.form2.allowView=0
        this.isTop=0
        this.form2.allowDuration=null
        this.openClass = true;


      },





      onChange(file){
        console.log(file)
        this.file = file.raw
        if (!this.file) {
          alert("请先选择需要上传的文件!")
          return
        }
        var Title = this.file.name
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ""
        }
        this.uploader = this.createUploader()
        console.log(userData)
        this.uploader.addFile(this.file, null, null, null, userData)
        if (this.uploader !== null) {
          this.showLoading=true;
          this.uploader.startUpload()
        }
      },

      authUpload () {
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false
        }
      },
      // 暂停上传
      pauseUpload () {
        if (this.uploader !== null) {
          this.uploader.stopUpload()
          this.resumeDisabled = false
          this.pauseDisabled = true
        }
      },
      // 恢复上传
      resumeUpload () {
        if (this.uploader !== null) {
          this.uploader.startUpload()
          this.resumeDisabled = true
          this.pauseDisabled = false
        }
      },
      createUploader (type) {
        let self = this
        let uploader = new AliyunUpload.Vod({
          timeout: self.timeout || 60000,
          partSize: self.partSize || 1048576,
          parallel: self.parallel || 5,
          retryCount: self.retryCount || 3,
          retryDuration: self.retryDuration || 2,
          region: self.region,
          userId: self.userId,
          // 添加文件成功
          addFileSuccess: function (uploadInfo) {
            self.uploadDisabled = false
            self.resumeDisabled = false
            self.statusText = '添加文件成功, 等待上传...'
            self.videoName=uploadInfo.file.name
            console.log("addFileSuccess: " + uploadInfo.file.name)
          },
          // 开始上传
          onUploadstarted: function (uploadInfo) {
            // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
            // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
            // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)

            if (uploadInfo.videoId) {
              //如果uploadInfo.videoId存在，调用刷新视频上传凭证接口


            } else {

              //如果uploadInfo.videoId不存在，调用获取视频上传地址和凭证接口

                axios.get(self.videoUpload, {
                    params: {
                     title:self.videoName,
                     suffixName:".mp4"
                    }
                  })
                  .then(function (response) {
                    console.log(response);
                    self.videoId=response.data.uploadVideo.videoId
                    uploader.setUploadAuthAndAddress(uploadInfo, response.data.uploadVideo.uploadAuth, response.data.uploadVideo.uploadAddress,response.data.uploadVideo.videoId);

                  })
                  .catch(function (error) {
                    console.log(error);
                  });


            }
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            console.log(uploadInfo)
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
             self.showLoading=false;
                       },
          // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)

             self.$message.success("视频上传失败");
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)

          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            let progressPercent = Math.ceil(progress * 100)
            self.authProgress = progressPercent

          },
          // 上传凭证超时
          onUploadTokenExpired: function (uploadInfo) {
            console.log("asdasd",uploadInfo)
            // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
            // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
            // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
            let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
            axios.get(refreshUrl).then(({data}) => {
              let uploadAuth = data.UploadAuth
              uploader.resumeUploadWithAuth(uploadAuth)
              console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
            })
            self.statusText = '文件超时...'
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
            console.log("onUploadEnd: uploaded all the files")

           self.getVideo()

          }
        })
        return uploader
      },

       getVideo(id){
          const self=this
         axios.get(self.getVideoUrl, {
              params:{
               videoId:self.videoId
             }
           })
           .then(function (response) {
             if(response.code==200){
               self.$message.success("视频上传成功");
               self.form2.videoUrl=response.data.getPlayInfoResponse.playInfoList[0].playURL
               self.form2.videoId=self.videoId
               self.videoDuration=response.data.getPlayInfoResponse.playInfoList[0].duration.splice('.')[0]
                console.log(self.form2.videoUrl);
             }
             else{
               self.$message.success("视频上传失败");
                self.form2.videoId=self.videoId
             }

             // self.videoDuration=0

           })
           .catch(function (error) {

             console.log(error);
           });



       },


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





      //拿到文件地址
      handleSuccess(res, file, fileList) {

      },

      //删除文件
      handleRemoveFile(file, fileList) {

      },

      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },




     submitFormNew(){
       this.$refs["form2"].validate(valid => {
         if (valid) {
           if (this.isEdit) {

             console.log(this.selectIndex)
             console.log(this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex])
             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].classHourName=this.form2.classHourName
           if(this.form2.allowView==2){
             if(this.form2.allowDuration==null||this.form2.allowDuration==0){
               this.$message.warning("请输入试看时长，30~600秒")
               return
             }
             else{
                 if(this.form2.allowDuration<30||this.form2.allowDuration>600){
                   this.$message.warning("请输入试看时长，30~600秒")
                   return
                 }
               }
           }

         if(this.coverImgList.length!=0){
          this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].coverUrl=this.coverImgList[0].relative_url
          this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].fullCoverUrl=this.coverImgList[0].url
         }
         else{
           this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].coverUrl= ''
           this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].fullCoverUrl=''
         }


             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].allowView=this.form2.allowView
             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].allowDuration=this.form2.allowDuration
             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].videoUrl=this.form2.videoUrl

             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[this.selectIndex].videoId=this.form2.videoId
             this.totals[this.tabIndex].total = this.TrainCourseLists[this.tabIndex].providersTrainClassHourList.length
             this.msgSuccess("修改成功");
             this.open = false;
           } else {

           if(this.form2.allowView==2){
             if(this.form2.allowDuration==null||this.form2.allowDuration==0){
               this.$message.warning("请输入试看时长，30~600秒")
               return
             }
             else{
                 if(this.form2.allowDuration<30||this.form2.allowDuration>600){
                   this.$message.warning("请输入试看时长，30~600秒")
                   return
                 }
               }
           }

           if(this.coverImgList.length!=0){
            this.form2.coverUrl= this.coverImgList[0].relative_url
           }
           else{
             this.form2.coverUrl= ''
           }


             let data={
               classHourName:this.form2.classHourName,
               allowView:this.form2.allowView,
               allowDuration:this.form2.allowDuration,
               videoUrl:this.form2.videoUrl,
               coverUrl:this.form2.coverUrl,
               videoId:this.form2.videoId
             }
             this.TrainCourseLists[this.tabIndex].providersTrainClassHourList.push(data)
             this.openClass = false;
             console.log("==================");
             console.log(this.TrainCourseLists)
           }
         }
       });
     },

     cancelNew(){
        this.form2={
          allowView:null,
          allowDuration:null,
          classHourName:null,
          coverUrl:null,
          videoId:null
        }
        this.$nextTick(() => {
          this.$refs.imageupload2.syncElUpload();
        })
        this.fileList=[]
        this.coverImgList=[]
        this.isEdit=false
        this.isTop=0
     },



     deleteClass(item){
       this.$confirm('是否确认删除该课时', "警告", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         }).then(function() {

         }).then(() => {
              this.TrainCourseLists[this.tabIndex].providersTrainClassHourList.some((item, i) => {
                if (item.classHourName == item.classHourName) {
                  this.TrainCourseLists[this.tabIndex].providersTrainClassHourList.splice(i, 1);
                  return true
                }
              })
             console.log(this.TrainCourseLists)
             this.msgSuccess("删除成功");
         })
     },

     editClass(item){
    this.coverImgList=[]
    this.isEdit=true
    let tempForm = {

    };

    for (var i = 0; i < this.TrainCourseLists[this.tabIndex].providersTrainClassHourList.length; i++) {
      if (this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[i].classHourName == item.classHourName) {
        tempForm = this.TrainCourseLists[this.tabIndex].providersTrainClassHourList[i]
        this.selectIndex=i;
      }
    }
    // console.log(this.TrainCourseLists)
    console.log(tempForm)
    this.form2 = tempForm;
    this.isTop = tempForm.allowView
    let data = {
        url: tempForm.fullCoverUrl,
        relative_url: tempForm.coverUrl
      }
    this.coverImgList.push(data)
    console.log( this.coverImgList)


    this.openClass = true;
     },






      // 获取选择的导师
      chooseTutor(value) {
        console.log(value)
        if (value != null) {
          this.form.tutorId = value.tutorId
          this.selectImg = value.fullImgUrl
          this.teacherName = value.tutorName
        } else {
          this.teacherName = "请在左侧选择导师"
        }

      },

      // 获取分类列表
      gettrainClassificationList() {
        trainClassificationList().then(response => {
          console.log(response)
          this.trainClassificationList = response.rows
        });
      },

      // 获取导师列表
      gettrainTutorList() {
        trainTutorList().then(response => {
          console.log(response)
          this.trainTutorList = response.rows
        });
      },



      getName(value) {
        if (value == "") {
          this.courseName = "请在左侧输入名称"
        } else {
          this.courseName = value
        }

      },
      getPrice(value) {
        if (value == "") {
          this.price = "暂无报价"
        } else {
          this.price = "￥" + value
        }

      },

      getIntroduction(value) {
        if (value == "") {
          this.introduce = "请在左侧输入简介"
        } else {
          this.introduce = value
        }
      },



      // 获取厂商列表
      getManufactorList() {
        ManufactorList().then(response => {
          console.log(response)
          this.ManufactorList = response.rows
        });
      },

      getindustryClassificationList() {
        industryClassification().then(response => {
          console.log(response)
          this.industryClassificationList = response.rows
        });
      },



      onEditorChange({
        editor,
        html,
        text
      }) { //内容改变事件
        console.log("---内容改变事件---")
        this.content = html
        console.log(html)

        if (html != '') {
          this.courseIntroduce = html
        } else {
          this.courseIntroduce = "请在左侧输入内容"
        }


      },
      // 富文本图片上传前
      beforeUpload() {
        this.loading = true;
      },

      onChange3(file){

      },

      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        console.log(res);
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (res.url) {
          this.loading = false;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片 res.url为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.url)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.loading = false;
          console.log("插入失败");
          this.$message.error('图片插入失败')
        }

      },
      // 富文本图片上传失败
      uploadError() {
        this.loading = false;
        console.log("上传失败");
        this.$message.error('图片插入失败')
      },


      preViewImage(img) {
        console.log(img)
        this.dialogImageUrl = img.image.url;
        this.dialogVisible = true;
      },


      switchTop(index) {
        this.isTop = index
        this.form2.allowView = index
      },

      goBack() {
        this.$router.go(-1);
      },

      submitForm() {
        this.form.sysAuditStatus = 2
        this.form.chapterJson=JSON.stringify(this.TrainCourseLists)
        if(this.imgList.length!=0){
         this.form.courseImgUrl= this.imgList[0].relative_url
        }
        else{
          this.form.courseImgUrl= ''
        }


        for (var i = 0; i < this.TrainCourseLists.length; i++) {
              if(this.TrainCourseLists[i].chapterName==null||this.TrainCourseLists[i].chapterName==''){
                this.$message.warning("请输入章节名称")
                return
              }

            }


        for (var i = 0; i < this.TrainCourseLists.length - 1; i++) {
            for (var j = i + 1; j < this.TrainCourseLists.length; j++) {
                if (this.TrainCourseLists[i].chapterName === this.TrainCourseLists[j].chapterName) {
                   this.$message.warning("章节名不能重复")
                   return
                }
            }
        }

        let newArray=[]
        for (var i = 0; i < this.TrainCourseLists.length; i++) {
        for (var j = 0; j < this.TrainCourseLists[i].providersTrainClassHourList.length; j++) {
            newArray.push(this.TrainCourseLists[i].providersTrainClassHourList[j].classHourName)
        }
        }
        let newArray2=newArray.sort()
        for(var i = 0; i < newArray2.length - 1; i++) {
          if(newArray2[i] == newArray2[i + 1]) {
            this.$message.warning("课时名不能重复")
             return
          }
        }


        console.log(this.form)

        addTrainCourse(this.form).then(response => {
          console.log(response)
          this.msgSuccess("课程已成功提交上线，请等待平台审核。");
          this.$router.go(-1);
        });


      },

      save() {
        this.form.sysAuditStatus = 0

this.form.chapterJson=JSON.stringify(this.TrainCourseLists)
        if(this.imgList.length!=0){
         this.form.courseImgUrl= this.imgList[0].relative_url
        }
        else{
          this.form.courseImgUrl= ''
        }


        for (var i = 0; i < this.TrainCourseLists.length; i++) {
              if(this.TrainCourseLists[i].chapterName==null||this.TrainCourseLists[i].chapterName==''){
                this.$message.warning("请输入章节名称")
                return
              }

            }


        for (var i = 0; i < this.TrainCourseLists.length - 1; i++) {
            for (var j = i + 1; j < this.TrainCourseLists.length; j++) {
                if (this.TrainCourseLists[i].chapterName === this.TrainCourseLists[j].chapterName) {
                   this.$message.warning("章节名不能重复")
                   return
                }
            }
        }

        let newArray=[]
        for (var i = 0; i < this.TrainCourseLists.length; i++) {
        for (var j = 0; j < this.TrainCourseLists[i].providersTrainClassHourList.length; j++) {
            newArray.push(this.TrainCourseLists[i].providersTrainClassHourList[j].classHourName)
        }
        }
        let newArray2=newArray.sort()
        for(var i = 0; i < newArray2.length - 1; i++) {
          if(newArray2[i] == newArray2[i + 1]) {
            this.$message.warning("课时名不能重复")
             return
          }
        }


        console.log(this.form)

        addTrainCourse(this.form).then(response => {
          console.log(response)
          this.msgSuccess("课程已成功提交上线，请等待平台审核。");
          this.$router.go(-1);
        });

      }


    },
  };
</script>

<style scoped>
  .view-pd/deep/img {
    margin: 0;
    padding: 0;
    width: 100%;
    object-fit: cover;
  }

  .my-input {
    width: 70% !important;
  }

  .my-input2 {
    width: 70% !important;
  }

  .my-input3 {
    width: 80% !important;
  }

  .my-input/deep/.el-input__inner {
    background-color: #f7f7f7;
  }

  .my-input2/deep/.el-input__inner {
    background-color: #f7f7f7;
  }

  .my-input3/deep/.el-input__inner {
    background-color: #f7f7f7;
  }


  .my-input/deep/.el-textarea__inner {
    background-color: #f7f7f7;
  }


  .lable-text/deep/.el-form-item__label {
    text-align: left;
    font-weight: 500;
  }

  .my-header/deep/.el-icon-back {
    font-size: 20px;
    margin-right: -6px;
    -ms-flex-item-align: center;
    align-self: center;
  }

  .my-dialog/deep/.el-dialog__body {
    padding-top: 10px;
  }

  .lable-text/deep/.el-form-item__label {
    text-align: left;
    font-weight: 500;
  }


  .selected-rate {
    background-color: #19AA29;
    color: white;
  }

  .unselect-rate {
    background-color: #f7f7f7;
    color: #a7a2a9;
  }

  .my-editor/deep/.ql-editor {
    min-height: 260px;
  }

  .ql-editor.ql-blank,
  .ql-editor {
    height: 350px;
  }


  .my-editor/deep/video::-webkit-media-controls-fullscreen-button {
    display: none;
  }

  .view-bg {
    background: url(../../../assets/images/yulan-bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .contact:hover .contact-operation{
    display: flex;
  }

  .contact-operation{
    display: none;
  }

  .contact-item{
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
  }

  .contact:hover .contact-item{
    background-color: #f7f7f7;
  }


  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
</style>
