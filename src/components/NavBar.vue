<template>
  <div>
    <el-menu
        default-active="/homePage"
        class="nav-bar"
        router
        mode="horizontal"
    >
      <el-menu-item index="/homePage">首页</el-menu-item>
      <el-menu-item index="/createVideo">投稿</el-menu-item>
    </el-menu>
  </div>

</template>



<script setup>

</script>


<style scoped>
.nav-bar {
  margin-bottom: 10px;
}
</style>