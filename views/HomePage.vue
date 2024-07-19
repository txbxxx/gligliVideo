<template>
    <div>
      <el-row>
        <el-col :span="4" v-for="item in data" :key="item.identity" class="video-card">
          <el-card style="max-width: 240px"  @click="toVideoDetail(item)">
            <img :src="item.cover" style="width: 100%"/>
            <div class="video-title">{{item.title}}</div>
            <div class="video-info">{{item.info}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>


<script setup>
//接收视频信息的变量
import {onMounted,ref} from "vue";
import {ListVideo} from "@/hook/videoHook";
import router from "@/router/route";

onMounted(() => {
  listVideo()
})

let data = ref([])


//调用函数列出视频信息
const listVideo = () => {
  ListVideo(1,10).then(res => {
    if (res === null){
      return false;
    }
    data.value = res
  })
}

//播放视频
const toVideoDetail = (video) => {
  return router.push({name:'videoDetail',params: { identity: video.identity }})
}

</script>


<style scoped>
.video-title {
  font-size: 16px;
  margin-top: 8px;
}
.video-info {
  margin-top: 6px;
  color: #7a7374;
  font-size: 14px;
}
.video-card {
  cursor: pointer;
}
</style>