<template>
  <div class="app-container" style="padding: 20px;">

    <el-page-header @back="goBack" class="my-header">
      <span slot="title"></span>
      <span slot="content" style="font-weight: bold;font-size: 16px;">修改账号</span>
    </el-page-header>


     <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">
     <el-form ref="form" :model="form" label-width="120px">
       <h5 style="font-weight: bold;">基础信息</h5>
       <el-row>
         <el-col :span="14">

           <el-form-item label="昵称" prop="activityProgramName" class="lable-text">
             <el-input v-model="form.activityProgramName" placeholder="请输入1-12个字的昵称" maxlength="12" class="my-input" />
           </el-form-item>

           <el-form-item label="手机号" prop="activityProgramName" class="lable-text">
             <span>186****0068</span>
           </el-form-item>

           <el-form-item label="头像" prop="logoImgUrl" class="lable-text">
             <div slot="label">
              <span>头像</span>
              <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
             </div>
              <div style="pointer-events: none;cursor: default;">
             <imgUpload v-model="imgList" :limit="1" :isSingle="false" ></imgUpload>
              </div>
             <div class="el-upload__tip">推荐尺寸694px*284px，只支持jpg/png格式</div>
           </el-form-item>



         </el-col>

       </el-row>

       <!-- 分割线 -->
       <div class="my-divder">
          <el-divider></el-divider>
       </div>

       <el-row>
         <el-col :span="14">
           <h5 style="font-weight: bold;">权限</h5>
            <el-form-item label="功能权限" prop="activityProgramName" class="lable-text">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll1" @change="handleCheckAllChange">海报</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedPermission" @change="handleCheckedCitiesChange" style="margin-left: 20px;">
                  <el-checkbox v-for="permission in permissions1" :label="permission" :key="permission">{{permission}}</el-checkbox>
                </el-checkbox-group>

             <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">活动方案</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedPermission2" @change="handleCheckedCitiesChange" style="margin-left: 20px;">
                  <el-checkbox v-for="permission2 in permissions2" :label="permission2" :key="permission2">{{permission2}}</el-checkbox>
                </el-checkbox-group>

               <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3" >在线微课</el-checkbox>
                 <div style="margin: 15px 0;"></div>
                 <el-checkbox-group v-model="checkedPermission3" @change="handleCheckedCitiesChange" style="margin-left: 20px;">
                   <el-checkbox v-for="permission3 in permissions3" :label="permission3" :key="permission3">{{permission3}}</el-checkbox>
                 </el-checkbox-group>
            </el-form-item>



         </el-col>

       </el-row>






       <div class="dialog-footer" style="margin-left: 120px;">
         <el-button type="primary" @click="submitForm">提 交</el-button>
       </div>


     </el-form>

      </el-card>

   </div>
</template>

<script>
  const permission1 = ['新增', '修改', '下线', '删除'];
  const permission2 = ['新增', '修改', '下线', '删除'];
  const permission3 = ['新增', '修改', '下线', '删除'];


  import imgUpload from '@/components/imgUpload'
  export default {
    components: {
      imgUpload
    },

     data() {
       return {
         imgList:[],
         form:{},
         checkAll1: false,
         checkAll2: false,
         checkAll3: false,
         checkedPermission: [],
         checkedPermission2: [],
         checkedPermission3: [],
         permissions1: permission1,
         permissions2: permission2,
         permissions3: permission3,
         isIndeterminate: true,
         isIndeterminate2: true,
         isIndeterminate3: true
       };
     },

      methods: {
        goBack(){
         this.$router.go(-1);
        },

        handleCheckAllChange(val) {
                this.checkedPermission = val ? permission1 : [];
                this.isIndeterminate = false;
              },

        handleCheckAllChange2(val) {
                this.checkedPermission2 = val ? permission2 : [];
                this.isIndeterminate2 = false;
              },

        handleCheckAllChange3(val) {
                this.checkedPermission3 = val ? permission3 : [];
                this.isIndeterminate3 = false;
              },

              handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.permissions1.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.permissions1.length;
              },

              handleCheckedCitiesChange2(value) {
                let checkedCount = value.length;
                this.checkAll2 = checkedCount === this.permissions2.length;
                this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.permissions2.length;
              },

              handleCheckedCitiesChange3(value) {
                let checkedCount = value.length;
                this.checkAll3 = checkedCount === this.permissions3.length;
                this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.permissions3.length;
              },

         submitForm(){

         }

      }
    }

</script>

<style scoped>
  .my-input {
    width: 80% !important;
  }

  .my-divder/deep/.el-divider{
    background-color: #f7f7f7;
    margin-top: 0px;
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
