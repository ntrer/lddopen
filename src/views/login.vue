<template>
  <div class="login" style="display: flex; flex-direction: row;">
    <!-- 登录输入 -->
     <div style="display: flex;  flex: 1;background-color: white;height: 100%; align-items: center; justify-content: flex-end;">
       <!-- 账号输入 -->
       <div v-if="!isCode" style="margin-right: 10%;display: flex;flex-direction: column;">

         <span style="font-size: 24px;margin-left: 25px;margin-top: 30px;">登录</span>

         <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" style="margin-top: 30px;">
           <span style="font-size: 14px;">账号/手机号</span>
           <el-form-item prop="username" style="margin-top: 10px;">
             <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
               <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
             </el-input>
           </el-form-item>
            <span style="font-size: 14px;margin-top: 20px;">密码</span>
           <el-form-item prop="password"style="margin-top: 10px;">
             <el-input
               v-model="loginForm.password"
               type="password"
               auto-complete="off"
               placeholder="密码"
               @keyup.enter.native="handleLogin"
             >
               <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
             </el-input>
           </el-form-item>
           <div style="display: flex;justify-content: space-between;">
             <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">保持登录</el-checkbox>

             <span id="" style="font-size: 14px; color: #19AA29;cursor: pointer" @click="isCodeLogin">验证码登录</span>
           </div>

           <el-form-item style="width:100%;">
             <el-button
               :loading="loading"
               size="medium"
               type="primary"
               style="width:100%;"
               @click.native.prevent="handleLogin"
             >
               <span v-if="!loading">登 录</span>
               <span v-else>登 录 中...</span>
             </el-button>
           </el-form-item>
         </el-form>


       </div>



       <!-- 验证码输入 -->


       <div v-if="isCode==true"  style="margin-right: 10%;display: flex;flex-direction: column;">

         <span style="font-size: 24px;margin-left: 25px;margin-top: 30px;">验证码登录</span>

         <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" style="margin-top: 30px;">
           <span style="font-size: 14px;">手机号</span>
           <el-form-item prop="username" style="margin-top: 10px;">
             <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
               <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
             </el-input>
           </el-form-item>
            <span style="font-size: 14px;margin-top: 20px;">验证码</span>
           <el-form-item prop="code"style="margin-top: 10px;">
             <el-input
               v-model="loginForm.code"
               type="password"
               auto-complete="off"
               placeholder="验证码"
               @keyup.enter.native="handleLogin"
             >
               <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />

               <template slot="append" style="background-color: white;" class="my-span" >
                 <span id="" style="font-size: 12px; color: #19AA29;cursor: pointer" @click="getCode">{{yzm}}</span>
               </template>

             </el-input>
           </el-form-item>
           <div style="display: flex;justify-content: space-between;">
             <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">保持登录</el-checkbox>

             <span id="" style="font-size: 14px; color: #19AA29;cursor: pointer" @click="isCodeLogin">密码登录</span>
           </div>

           <el-form-item style="width:100%;">
             <el-button
               :loading="loading"
               size="medium"
               type="primary"
               style="width:100%;"
               @click.native.prevent="handleLogin"
             >
               <span v-if="!loading">登 录</span>
               <span v-else>登 录 中...</span>
             </el-button>
           </el-form-item>
         </el-form>


       </div>






     </div>



     <div style="display: flex;  flex: 1;background-color:#19aa29;height: 100%; align-items: center;">

       <!-- 系统名称 -->
       <div style="margin-left: 20%;">
         <h2 class="name-style">欢迎使用</h2>
         <h2 class="name-style" style="margin-top: -10px;">练多多内容开放平台</h2>
       </div>

      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2018-2021 ruoyi All Rights Reserved.</span>
      </div>
     </div>

  </div>
</template>

<script>
import { getCodeImg,sendSms} from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      isCode:false,
      yzm:'发送验证码',
      second: 60,
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
		    loginMode:1,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // this.getCode();
    this.getCookie();
  },
  methods: {


    isCodeLogin(){
      this.isCode=!this.isCode
	  if(this.isCode){
		  this.loginForm.loginMode=2
	  }
	  else{
		  this.loginForm.loginMode=1
	  }
    },


    getCode() {
      if(this.yzm!="发送验证码"){
        return;
      }

      let data={
        mobileNumber:this.loginForm.username
      }
      sendSms(data).then(response => {
       console.log(response)
       this.loginForm.uuid=response.data.uuid
       var interval = setInterval(() => {
       	let times = --this.second
       	this.second = times < 10 ? '0' + times : times ,//小于10秒补 0
       	this.yzm=this.second+"秒后重新获取"
       }, 1000)
       setTimeout(() => {
       	clearInterval(interval)
       	this.second = 60
       	this.yzm="发送验证码"
       }, 60000)
      });


    },


    // getCode() {
    //   getCodeImg().then(res => {
    //     this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    //     if (this.captchaOnOff) {
    //       this.codeUrl = "data:image/gif;base64," + res.img;
    //       this.loginForm.uuid = res.uuid;
    //     }
    //   });
    // },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      const loginMode = Cookies.get('loginMode')
      const code = Cookies.get('code')
      const uuid = Cookies.get('uuid')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        uuid: uuid === undefined ? this.loginForm.uuid : uuid,
        code: code === undefined ? this.loginForm.code : code,
        loginMode: loginMode === undefined ? this.loginForm.loginMode : loginMode
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
            // Cookies.set('loginMode', this.loginForm.loginMode, { expires: 30 });
            // Cookies.set('uuid', this.loginForm.uuid, { expires: 30 });
            // Cookies.set('code', this.loginForm.code, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
            // Cookies.remove('loginMode');
            // Cookies.remove('uuid');
            // Cookies.remove('code');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(() => {
            this.loading = false;

          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/images/login-background.jpg");
  // background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  margin-left: 10%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}

.name-style{
  color: white;
}



</style>
