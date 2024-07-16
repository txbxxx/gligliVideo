<template>
  <div>
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        status-icon
        label-width="auto"
        class="create-video"
    >
      <el-form-item label="视频标题" prop="title" >
        <el-input  type="text" v-model="title" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="视频描述" prop="info">
        <el-input type="textarea" v-model="info" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="视频地址" prop="url" >
        <el-input type="text" v-model="url" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData" >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup>

import {reactive, toRefs} from "vue";
import {CreateVideo} from "@/hook/videoHook";

//创建视频接收视频表单数据
const  data = reactive({
  title: '',
  info: '',
  url: ''
})
//解包成ref
const {title,info,url} = toRefs(data)

//提交表单创建视频
const submitData = () => {
  CreateVideo(title.value,info.value,url.value)
}

</script>


<style scoped>
.create-video {
  margin-top: 10px;
  padding: 20px;
}

</style>