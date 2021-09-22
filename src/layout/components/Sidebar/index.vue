<template>
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                 class="my-menu"
                 ref="menus"
                :default-active="$route.path"
                :default-openeds="['1','2','3','4']"
                :collapse="isCollapse"
                :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuText : 'rgba(0,0,0,.65)'"
                :unique-opened="false"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
                @close="handleClose"
                router
            >
               <!-- <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                /> -->

              <el-submenu index="1">
                 <template slot="title">
                   <svg-icon icon-class="form"/>
                   <span slot="title" >工作台</span>
                 </template>
                 <el-menu-item index="/index">
                     <svg-icon icon-class="form" ></svg-icon>
                    <span slot="title" >概览</span>
                 </el-menu-item>
               </el-submenu>

               <el-submenu index="2">
                  <template slot="title">
                    <svg-icon icon-class="form"/>
                    <span slot="title">内容</span>
                  </template>
                  <el-menu-item index="/content/Poster">
                      <svg-icon icon-class="form"/>
                     <span slot="title">海报</span>
                  </el-menu-item>
                  <el-menu-item index="/content/Activity">
                      <svg-icon icon-class="form"/>
                     <span slot="title">活动方案</span>
                  </el-menu-item>
                  <el-menu-item index="/content/Class">
                      <svg-icon icon-class="form"/>
                     <span slot="title">课程</span>
                  </el-menu-item>
                  <el-menu-item index="/content/Teacher">
                      <svg-icon icon-class="form"/>
                     <span slot="title">导师</span>
                  </el-menu-item>
                  <el-menu-item index="/content/Tools">
                      <svg-icon icon-class="form"/>
                     <span slot="title">器材</span>
                  </el-menu-item>
                  <el-menu-item index="/content/Company">
                      <svg-icon icon-class="form"/>
                     <span slot="title">厂商</span>
                  </el-menu-item>
                </el-submenu>

              <el-submenu index="3">
                 <template slot="title">
                   <svg-icon icon-class="form"/>
                   <span slot="title">功能</span>
                 </template>
                 <el-menu-item index="/function/Order">
                     <svg-icon icon-class="form"/>
                    <span slot="title">订单</span>
                 </el-menu-item>
                 <el-menu-item index="/function/Comment">
                     <svg-icon icon-class="form"/>
                    <span slot="title">评论</span>
                 </el-menu-item>

               </el-submenu>


               <el-submenu index="3">
                  <template slot="title">
                    <svg-icon icon-class="form"/>
                    <span slot="title">管理</span>
                  </template>
                  <el-menu-item index="/manage/Money">
                      <svg-icon icon-class="form"/>
                     <span slot="title">资金</span>
                  </el-menu-item>
                 <!-- <el-menu-item index="/manage/Account">
                      <svg-icon icon-class="form"/>
                     <span slot="title">账号</span>
                  </el-menu-item> -->

                </el-submenu>

               <!-- <el-submenu index="4">
                   <template slot="title">
                     <svg-icon icon-class="form"/>
                     <span slot="title">统计</span>
                   </template>
                   <el-menu-item index="/statistics/UserStatics">
                       <svg-icon icon-class="form"/>
                      <span slot="title">用户分析</span>
                   </el-menu-item>
                   <el-menu-item index="2">
                       <svg-icon icon-class="form"/>
                      <span slot="title">内容分析</span>
                   </el-menu-item>

                 </el-submenu> -->


            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    methods:{
      handleClose(key, keyPath) {
      		      this.$refs.menus.open(keyPath);
      		    },
    }
};
</script>

<style scoped>
  .my-menu/deep/.el-submenu__icon-arrow{
    display: none;
  }
</style>
