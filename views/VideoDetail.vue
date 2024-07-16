<template>
  <div class="video">
    <video-player
        :src="url"
        fluid
        autoplay
        controls
    />
  </div>
</template>

<script setup>
import {VideoPlayer} from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
import {onMounted, ref} from "vue";
import {DetailVideo} from "@/hook/videoHook";
import {useRoute} from "vue-router";
const url = ref('')

onMounted(() => {
  getUrl()
})

const route = useRoute()
const identity = route.params.identity

const getUrl = () => {
  DetailVideo(identity).then(res => {
    url.value = res.url
    console.log(url.value)
  })
}
</script>



<style scoped>

</style>