<template>
  <div class="app-container home">
    <H4  style="font-weight: bold;  display: flex; flex-direction: row;margin-top: 0px;align-items: center;">
      账号
      <el-tooltip content="后续版本通过标签推荐内容" placement="top" style="margin-left: 10px;">
        <img src="../../../assets/images/lablepng.png" style="width: 16px;height: 16px;" />
      </el-tooltip>
    </H4 >


    <el-card style="min-height: 100vh;border-radius: 0 4px 4px 4px;">
      <div>
        <el-input
        class="my-input"
          style="width: 200px;margin-left: 10px;"
          v-model="selectName"
          placeholder="可输入订单编号进行搜索"
          clearable
          size="medium"
          @keyup.enter.native="handleQuery"
        />

        <router-link :to="{name:'addAccount',path: '/manage/addAccount'}">
        <el-button
          style="background-color: #19AA29;color: white;float: right;"
          plain
          icon="el-icon-plus"
          size="small"
        >新增</el-button>
         </router-link>


      </div>

      <div style="margin-top: 20px;" v-loading="loading">
        <el-row :gutter="40">
          <el-col :span="6" v-for="(o, index) in 4" :key="o" >
            <el-card :body-style="{ padding: '0px' }" style="height: 320px;margin-top: 20px;">
              <!-- 标签 -->
              <div style="width: 100%;height: 50px;">
                <el-tag style="float: right; background-color: #19AA29;color: white;height: 18px;padding: 0 4px;line-height: 18px;margin: 10px;">正常</el-tag>
              </div>

              <!-- 信息 -->
              <div style="display: flex;flex-direction: column;justify-content: center; align-items: center;">
                <img src="../../../assets/images/avater.jpg" style="height: 120px;width: 120px;border-radius: 4px;" >
                <span style="margin-top: 30px;color: black;">姓名</span>
                <span style="margin-top: 10px;color: #9b9b9b;">138****0068</span>
              </div>

              <!-- 底部操作 -->
              <div style=" margin-top: 28px; background-color: #f7f7f7;height: 40px;display: flex;flex-direction: row; align-items: center;">
                  <el-button
                    style="display: flex;flex: 1;justify-content: center;color: black;"
                    size="mini"
                    type="text"
                    icon="el-icon-view"
                    @click="handleView()"
                   
                  >查看</el-button>
                   <router-link :to="{name:'editAccount',path: '/content/editAccount'}">
                  <el-button
                   style="display: flex;flex: 1;justify-content: center;color: black;"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                  
                  >修改</el-button>
                   </router-link>
                   <el-dropdown  style="display: flex;flex: 1;justify-content: center;color: black;width: 80px;">
                     <el-button
                       style="color: black;"
                       size="mini"
                       type="text"
                       @click="handleUpdate()"
                      
                     >更多</el-button>
                     <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item style="width: 100px;">停用</el-dropdown-item>
                       <el-dropdown-item>删除</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>

              </div>

            </el-card>
          </el-col>


        </el-row>
      </div>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="pageNum"
          :limit.sync="pageSize"
          @pagination="getList"
        />


    </el-card>


    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      direction="rtl"
      size="28%">
      <template>
        <slot name="=title">
          <div style="margin: 20px;color: black;display: flex;flex-direction: row;align-items: center;font-weight: bold;">
            <i class="el-icon-close" style="color: black;font-size: 18px;font-weight: bold;margin-top: 3px;" @click="closeDrawer"></i>
            <span style="margin-left: 3px;">查看账号</span>
          </div>

        </slot>
      </template>

      <!-- 基础信息 -->
      <div style="margin-left: 20px;margin-top: 10px;margin-right: 20px;">
        <span style="font-size: 13px;font-weight: bold;">基础信息</span>

        <div style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;border: 1px solid #dbdbdb;">
          <!-- 左边 -->
          <div style="display: flex;flex: 1;background-color: #f4f4f4;flex-direction: column;">
             <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
               <span style="margin-left: 10px;">昵称</span>
             </div>
             <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                <span style="margin-left: 10px;">手机号</span>

             </div>
             <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                <span style="margin-left: 10px;">状态</span>

             </div>
             <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                <span style="margin-left: 10px;">近期登录时间</span>

             </div>
             <div class="info-item">
                <span style="margin-left: 10px;">创建时间</span>

             </div>
          </div>


          <!-- 右边 -->
          <div style="display: flex;flex: 1;flex-direction: column;">
              <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                 <span style="margin-left: 10px;">张三</span>

              </div>
              <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                <span style="margin-left: 10px;">18637280068</span>

              </div>
              <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                 <span style="margin-left: 10px;">正常</span>

              </div>
              <div class="info-item" style="border-bottom: 1px solid #dbdbdb;">
                <span style="margin-left: 10px;"> 2021-01-01 13:00:20</span>

              </div>
              <div class="info-item">
                <span style="margin-left: 10px;"> 2021-01-01 13:00:20</span>

              </div>
          </div>

        </div>



      </div>



      <!-- 分割线 -->
      <div style="margin-left: 25px;margin-right: 25px;">
         <el-divider ></el-divider>
      </div>

      <span style="font-size: 13px;font-weight: bold;margin-left: 20px;">功能权限</span>
      <el-tree
        style="'margin-top: 20px;"
        :data="data"
        show-checkbox
        node-key="id"
         ref="tree"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>

    </el-drawer>



   </div>
</template>

<script>


  export default {
    name: "index",
    data() {
      return {
        // 版本号
        version: "3.6.0",
        activeName: 'first',
        pageNum:1,
        pageSize:10,
        total:10,
        loading:false,
        selectName:null,
        drawer: false,
        data: [{
                  id: 1,
                  label: '海报',
                  children: [{
                    id: 3,
                    label: '新增'
                  }, {
                    id: 4,
                    label: '修改'
                  },
                  {
                    id: 5,
                    label: '下线'
                  },
                  {
                    id: 6,
                    label: '删除'
                  }
                  ]
                }, {
                  id: 2,
                  label: '活动方案',
                  children: [{
                    id: 7,
                    label: '新增'
                  }, {
                    id: 8,
                    label: '修改'
                  },
                  {
                    id: 9,
                    label: '下线'
                  },
                  {
                    id: 10,
                    label: '删除'
                  }
                  ]
                }],
                defaultProps: {
                     children: 'children',
                     label: 'label'
                  }
      };
    },

    created() {

    },


    methods: {

      handleView(row){
        this.drawer=true
      },

      closeDrawer(){
        this.drawer=false
  
      }
    },
  };

</script>

<style scoped>

  .info-item{
    display: flex;
    align-items: center;
    height: 40px;
  }
</style>
