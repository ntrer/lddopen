<template>
  <div id="app">
   <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>


<style>

  .app-main{
    background-color: #f0f2f4;
  }

  .el-divider{
    background-color: #e3e3e3 !important;
  }

</style>
