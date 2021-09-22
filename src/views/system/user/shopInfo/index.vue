<template>
<div class="app-container" style="padding: 20px;">

  <el-page-header @back="goBack" class="my-header">
    <span slot="title"></span>
    <span slot="content" style="font-weight: bold;font-size: 16px;">商家资料</span>
  </el-page-header>

   <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;margin-top: 20px;">
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">

    <el-row>
      <el-col :span="14">
         <h5 style="font-weight: bold;">基础信息</h5>
        <el-form-item label="商家名称" prop="activityProgramName" class="lable-text" >
          <el-input v-model="form.shopName" placeholder="请输入" class="my-input" />
        </el-form-item>

        <el-form-item label="营业年限" prop="businessYears" style="width: 100%;" class="lable-text">
          <div slot="label">
           <span>营业年限</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-select v-model="form.businessYears" placeholder="请选择" style="width: 80%;" class="my-input">
            <el-option v-for="(item, index) in businessYearsList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictLabel"/>
          </el-select>
        </el-form-item>

        <el-form-item label="企业规模" prop="enterpriseScope" style="width: 100%;" class="lable-text">
          <div slot="label">
           <span>企业规模</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-select v-model="form.enterpriseScope" placeholder="请选择" style="width: 80%;" class="my-input">
            <el-option v-for="(item, index) in enterpriseScopeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictLabel"/>
          </el-select>
        </el-form-item>

        <el-divider></el-divider>


        <h5 style="font-weight: bold;">联系信息</h5>

        <el-form-item label="所在地区" prop="cityId" style="width: 100%;" class="lable-text">
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

        <el-form-item label="街道地址" prop="streetAddress" class="lable-text" >
          <div slot="label">
           <span>街道地址</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-input v-model="form.streetAddress" placeholder="请输入" class="my-input"/>
        </el-form-item>

        <el-form-item label="联系人" prop="userName" class="lable-text" >
          <div slot="label">
           <span>联系人</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-input v-model="form.userName" placeholder="请输入" class="my-input" />
        </el-form-item>

        <el-form-item label="联系电话" prop="mobileNumber" class="lable-text" >
          <div slot="label">
           <span>联系电话</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-input v-model="form.mobileNumber" placeholder="请输入" class="my-input" />
        </el-form-item>

        <el-form-item label="传真" prop="fax" class="lable-text" >
          <div slot="label">
           <span>传真</span>
           <span style="color: #c6c6c7;margin-left: 6px;">(选填)</span>
          </div>
          <el-input v-model="form.fax" placeholder="请输入" class="my-input" />
        </el-form-item>


      </el-col>

    </el-row>


    <div class="dialog-footer" style="margin-left: 120px;">
      <el-button type="primary" @click="submitForm">提 交</el-button>
      <div style="display: flex;flex-direction: row;color: #da4a50;margin-top: 10px;">
        <i class="el-icon-bell" style="font-size: 15px;margin-top: 3px;margin-right: 5px;"></i>
        <span style="font-size: 13px;">平台审核中，请等待...</span>
      </div>

     <!-- <div style="display: flex;flex-direction: row;color: #da4a50;margin-top: 10px;">
        <i class="el-icon-warning-outline" style="font-size: 15px;margin-top: 3px;margin-right: 5px;"></i>
        <span style="font-size: 13px;">审核失败，xxxxxxx...</span>
      </div> -->
    </div>


  </el-form>

   </el-card>

</div>



</template>

<script>
  import imgUpload from '@/components/imgUpload'
    import {getShopInfo,listArea,listcity,editShopInfo} from "@/api/system/user";


  export default {
    components: {
      imgUpload
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

         businessYearsList:[
           {
             "dictLabel": "3年以内",
             "dictValue": 1
           },
           {
             "dictLabel": "3年~5年",
             "dictValue": 2
           },
           {
             "dictLabel": "5年~10年",
             "dictValue": 3
           },
           {
             "dictLabel": "10年以上",
             "dictValue": 4
           }
         ],

         enterpriseScopeList:[
           {
             "dictLabel": "10人以下",
             "dictValue": 1
           },
           {
             "dictLabel": "10人~50人",
             "dictValue": 2
           },
           {
             "dictLabel": "51人~100人",
             "dictValue": 3
           },
           {
             "dictLabel": "101人~300人",
             "dictValue": 4
           },
           {
             "dictLabel": "301人以上",
             "dictValue": 5
           }
         ],


         imgList:[],
         form:{},
         openYearList:[],
         organizPeopleList:[]
       };
     },

     created() {
       this.getData()
     },

      methods: {


        locationsChange2(value) {
           console.log(value)
           console.log(this.$refs['cascaderAddr'])
          this.form.provinceId=value[0];
          this.form.cityId=value[1];
         },


       goBack(){
        this.$router.go(-1);
       },

       getData(){
         getShopInfo().then(response => {
            console.log(response)
            this.form=response.data.contentProviderShop
         });
       },


       submitForm(){
         editShopInfo(this.form).then(response => {
            console.log(response)
         });
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
