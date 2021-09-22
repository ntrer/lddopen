<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">

        <!-- <el-tooltip content="后续版本通过标签推荐内容" placement="bottom">

           <div class="right-menu-item hover-effect" >
             <i class="el-icon-chat-dot-square" style="padding: 4px; border: 1px #eee solid;border-radius: 50px;"></i>
           </div>

        </el-tooltip> -->


        <el-tooltip content="消息" placement="bottom">
             <router-link :to="{name:'Message',path: '/content/Message'}">
           <div class="right-menu-item hover-effect">
             <i class="el-icon-chat-dot-square" style="padding: 4px; border: 1px #eee solid;border-radius: 50px;"></i>
           </div>
            </router-link>

        </el-tooltip>



      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
           <router-link to="/user/shopInfo">
          <el-dropdown-item >
            <span>商家资料</span>
          </el-dropdown-item>
           </router-link>
          <router-link to="/user/info">
            <el-dropdown-item divided style="width: 100px;">个人资料</el-dropdown-item>
          </router-link>
         <!-- <el-dropdown-item @click.native="changeShop">
            <span>切换商家</span>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="editPhone">
            <span>修改手机号</span>
          </el-dropdown-item>
         <el-dropdown-item @click.native="editPwd">
           <span>修改密码</span>
         </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


     <!-- 修改密码 -->
    <el-dialog :title="title" :visible.sync="openPassword" width="500px" append-to-body>
      <el-form ref="form" :model="passwordform"  label-width="100px">

        <el-form-item label="旧密码" prop="oldPassword" class="lable-text">
          <el-input v-model="passwordform.oldPassword" placeholder="请输入当前的密码" maxlength="24" show-password class="my-input"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" class="lable-text">
          <el-input v-model="passwordform.newPassword" placeholder="请输入6-24位的新密码" maxlength="24" show-password class="my-input"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提 交</el-button>
        <el-button @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>


    <!-- 修改手机号1 -->
    <el-dialog :title="title" :visible.sync="openphoneNumber" width="500px" append-to-body>
      <el-form ref="form" :model="phoneform1"  label-width="120px">

        <el-form-item label="短信验证码" prop="verificationCode" class="lable-text">
          <span slot="label" style="display: flex; flex-direction: row;align-items: center;">
            短信验证码
            <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
              <img src="../../assets/images/lablepng.png" style="width: 18px;height: 18px;" />
            </el-tooltip>
            </span >
          <el-input v-model="phoneform1.verificationCode" placeholder="请输入短信验证码" maxlength="24" class="my-input">
            <template>
               <slot slot="suffix" class="input-slot">
                 <div style="cursor: pointer;" @click="sendYzm">
                   <i class="el-icon-message" style=" color: #19AA29;"></i>
                   <span style="margin-left: 5px;font-size: 13px; color: #19AA29;">{{yzm}}</span>
                 </div>

               </slot>
            </template>
          </el-input>
          <span style="font-size: 13px;">验证码将发送给18888888888</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="cancelNext">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 修改手机号2 -->
    <el-dialog :title="title" :visible.sync="openphoneNumber2" width="500px" append-to-body>
      <el-form ref="form" :model="phoneform2"  :rules="phonerules" label-width="120px">

        <el-form-item label="新的手机号" prop="newPhone" class="lable-text">
          <span slot="label" style="display: flex; flex-direction: row;align-items: center;">
            新的手机号
            <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
              <img src="../../assets/images/lablepng.png" style="width: 18px;height: 18px;" />
            </el-tooltip>
            </span >
          <el-input v-model="phoneform2.newPhone" placeholder="请输入11位手机号" maxlength="24"  class="my-input"/>
        </el-form-item>
        <el-form-item label="短信验证码" prop="verificationCode" class="lable-text">
          <el-input v-model="phoneform2.verificationCode" placeholder="请输入验证码" maxlength="24"  class="my-input">
            <template>
               <slot slot="suffix" class="input-slot">
                 <div style="cursor: pointer;" @click="sendYzm2">
                   <i class="el-icon-message" style=" color: #19AA29;"></i>
                   <span style="margin-left: 5px;font-size: 13px; color: #19AA29;">{{yzm}}</span>
                 </div>

               </slot>
            </template>
          </el-input>
          <span style="font-size: 13px;">验证码将发送给18888888888</span>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitYzm">提 交</el-button>
        <el-button @click="cancelsubmitYzm">关 闭</el-button>
      </div>
    </el-dialog>



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
        v-model="adviceText">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdvice">提 交</el-button>
        <el-button @click="cancelAdvice">关 闭</el-button>
      </div>
    </el-dialog>


    <!-- 选择商家 -->
    <el-dialog :title="title" :visible.sync="openShop" width="500px" append-to-body class="my-dialog">

      <div class="" v-for="index in 4" :key="index" style="margin-top: 5px;" @click="chooseShop(index)">
        <el-card class="my-card" shadow="hover" :class="selectedIndex==index?'selected-shop':''">
          <div style="display: flex;flex-direction: row;align-items: center;height: 60px; justify-content: space-between;padding-left: 20px;padding-right: 20px;">
             <span>北京xxxxxx公司</span>
             <el-tag v-if="selectedIndex==index" style="float: right; background-color: #19AA29;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">当前</el-tag>
          </div>

        </el-card>
      </div>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitShop">提 交</el-button>
        <el-button @click="cancelShop">关 闭</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import message from '@/components/RuoYi/message'

import {resetPassword,feedback,beforeSend,beforeUpdate,afterSend,afterUpdate} from "@/api/index/index";



export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    message
  },

  data(){
    return{
      selectedIndex:0,
      passwordform:{},
      phoneform1:{},
      phoneform2:{},
      openPassword:false,
      openphoneNumber:false,
      openphoneNumber2:false,
      openMessage:false,
      openShop:false,
      yzm:"发送验证码",
      yzmCode:null,
      second: 60,
      title:'',
      adviceText:null,
      sendInterval:null,
      sendInterval2:null,
      phonerules:{
        newPhone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {

    // 切换商家
    changeShop(){
     this.openShop=true
     this.title="选择商家"
    },

    submitShop(){

    },

    cancelShop(){
      this.openShop=false
    },

    chooseShop(index){
     this.selectedIndex=index
    },



    // 反馈信息
    openMessageDialog(){
      this.openMessage=true
      this.title="意见反馈"
    },

    submitAdvice(){

    },

    cancelAdvice(){
      this.openMessage=false
    },


    editPwd(){
      this.openPassword=true
      this.title="修改密码"
    },


    submitForm(){
       resetPassword(this.passwordform).then(response => {
         console.log(response)
          this.openPassword=false
          this.restPasswordForm()
       });
    },

    cancel(){
      this.openPassword=false
      this.restPasswordForm()
    },

    restPasswordForm(){
      this.passwordform={
        newPassword:null,
        oldPassword:null
      }

      this.resetForm("passwordform");
    },



    // 修改手机号
    editPhone(){
      this.openphoneNumber=true
      this.title="修改手机号"
    },


    sendYzm(){
      if(this.yzm!="发送验证码"){
        return;
      }
    let data={
      mobileNumber:18912347777
    }
    beforeSend(data).then(response => {
     this.phoneform1.uuid=response.data.uuid
     this.sendInterval = setInterval(() => {
       let times = --this.second
       this.second = times < 10 ? '0' + times : times ,//小于10秒补 0
       this.yzm=this.second+"秒后重新获取"
     }, 1000)
     setTimeout(() => {
       clearInterval(this.sendInterval)
       this.second = 60
       this.yzm="发送验证码"
     }, 60000)
    });
    },


    next(){
      if(this.phoneform1.verificationCode==''||this.phoneform1.verificationCode==null){
        this.$message.warning("请输入短信验证码")
        return
      }

      beforeUpdate(this.phoneform1).then(response => {
        console.log(response)
        clearInterval(this.sendInterval)
        this.yzm="发送验证码"
        this.second=60
        this.restPhoneform1()
        this.openphoneNumber=false
        this.openphoneNumber2=true

      });
    },


    restPhoneform1(){
      this.phoneform1={
        uuid:null,
        verificationCode:null
      }
       this.resetForm("phoneform1");
    },

    cancelNext(){
      this.openphoneNumber=false
      clearInterval(this.sendInterval)
      this.yzm="发送验证码"
      this.second=60
      this.restPhoneform1()
    },



    sendYzm2(){
      if(this.yzm!="发送验证码"){
        return;
      }
    let data={
      mobileNumber:this.phoneform2.newPhone
    }
    afterSend(data).then(response => {
      console.log(response)
     this.phoneform2.uuid=response.data.uuid
     this.sendInterval2 = setInterval(() => {
       let times = --this.second
       this.second = times < 10 ? '0' + times : times ,//小于10秒补 0
       this.yzm=this.second+"秒后重新获取"
     }, 1000)
     setTimeout(() => {
       clearInterval(this.sendInterval2)
       this.second = 60
       this.yzm="发送验证码"
     }, 60000)
    });
    },

    restPhoneform2(){
      this.phoneform2={
        uuid:null,
        verificationCode:null
      }
       this.resetForm("phoneform2");
    },



   submitYzm(){
     this.phoneform2.newPhone=null;
     afterUpdate(this.phoneform2).then(response => {
       console.log(response)
       this.openphoneNumber2=false
       clearInterval(this.sendInterval2)
       this.yzm="发送验证码"
       this.second=60
       this.restPhoneform2()

     });


   },

   cancelsubmitYzm(){
     this.openphoneNumber2=false
     clearInterval(this.sendInterval2)
     this.yzm="发送验证码"
     this.second=60
     this.restPhoneform2()
   },


    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style  scoped>

   .selected-shop{
     border: 1px solid #19AA29;
   }

   .my-card/deep/.el-card__body{
     padding: 0;

   }

  .my-input/deep/.el-textarea__inner{
      background-color: #f7f7f7;
   }

   .my-dialog/deep/.el-dialog__body{
     padding-top: 10px;
   }


.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.navbar .hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.navbar .hamburger-container:hover {
  background: rgba(0, 0, 0, 0.025);
}
.navbar .breadcrumb-container {
  float: left;
}
.navbar .topmenu-container {
  position: absolute;
  left: 50px;
}
.navbar .errLog-container {
  display: inline-block;
  vertical-align: top;
}
.navbar .right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
}
.navbar .right-menu:focus {
  outline: none;
}
.navbar .right-menu .right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}
.navbar .right-menu .right-menu-item.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
}
.navbar .right-menu .right-menu-item.hover-effect:hover {
  background: rgba(0, 0, 0, 0.025);
}
.navbar .right-menu .avatar-container {
  margin-right: 30px;
}
.navbar .right-menu .avatar-container .avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.navbar .right-menu .avatar-container .avatar-wrapper .user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.navbar .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}


 .my-input/deep/.el-input__inner{
    background-color: #f7f7f7;
  }


  .lable-text/deep/.el-form-item__label {
    text-align: left;
    font-weight: 500;
  }

</style>
