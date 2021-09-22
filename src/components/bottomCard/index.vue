<template>
  <div style="display: flex;align-items: center;justify-content: center;height: 40px;flex-direction: column;">
    <div style="display: flex;flex-direction: row; align-items: center;font-size: 12px;color: #b4b4b5;">
      <span >关于我们</span>
      <span style="margin-left: 5px;margin-right: 5px;">|</span>
      <span >服务协议</span>
      <span style="margin-left: 5px;margin-right: 5px;">|</span>
      <span style="cursor: pointer;" @click="sendSuggest()">意见反馈</span>
    </div>
    <span style="color: #b4b4b5;font-size: 12px;margin-top: 10px;">Copyright © 2021北京中体联合数据科技有限公司</span>


    <!-- 意见反馈 -->
    <el-dialog :title="title" :visible.sync="openMessage" width="500px" append-to-body class="my-dialog">
      <span style="margin-top: -10px;font-size: 13px;">
        非常感谢您给我们提出宝贵的意见和建议，我们会认真研究，并期望能给您提供更好的服务
      </span>
      <el-input
      class="my-input"
      style="margin-top: 16px;"
        type="textarea"
        :rows="14"
        placeholder="请在此处输入您要反馈的问题"
        v-model="feedbackContent">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdvice">提 交</el-button>
        <el-button @click="cancelAdvice">关 闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>


<script>

import {feedback} from "@/api/index/index";

export default {
  name:'BottomCard',
  props: {
    // 模块名称
    moduleName: {
      type: String,
      default: ""
    },
    // 页面名称
    pagesName: {
      type: String,
      default: ""
    }

  },
  data() {
    return {
      name: '',
      title:'',
      openMessage:false,
      feedbackContent:""
    }
  },
  methods: {



     sendSuggest(){
       this.openMessage=true
       this.title="意见反馈"
     },

     cancelAdvice(){
       this.openMessage=false
       this.feedbackContent=""
     },


     submitAdvice(){

       let data={
         moduleName:this.moduleName,
         pagesName:this.pagesName,
         feedbackContent:this.feedbackContent
       }
       feedback(data).then(response => {
           this.openMessage=false
           this.feedbackContent=""
           this.msgSuccess("提交成功")
       });
     }
  }
}
</script>




<style>
</style>
