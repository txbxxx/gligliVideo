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
      <el-form-item label="视频文件">
        <el-upload
            v-model:file-list="fileVideoList"
            class="upload-demo"
            action=""
            ref="uploadVideo"
            :auto-upload="false"
            :before-upload="fnVideoBeforeUpload"
            :http-request="fnUploadVideoRequest"
            :limit=1
        >
          <el-button type="primary">选择视频文件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              视频文件不得超过200MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="封面文件">
        <el-upload
            v-model:file-list="fileImageList"
            class="upload-demo"
            action=""
            ref="uploadImage"
            :auto-upload="false"
            :before-upload="fnImgBeforeUpload"
            :http-request="fnUploadImageRequest"
            :limit=1
        >
          <el-button type="primary">选择封面文件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              封面文件不得超过4MB，且只能时jpg格式
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitData"  >提交文件</el-button>
        <el-button type="primary" @click="submitCreate" >点击投稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="js" setup>
import {reactive, ref, toRefs} from "vue";
import {CreateVideo, UploadImage, UploadVideo} from "@/hook/videoHook";
import {ElLoading, ElMessage} from 'element-plus'



// 上传视频
const uploadVideo = ref(null);
const fileVideoList = ref([])

// 上传图片
const uploadImage = ref(null);

const fileImageList = ref([])

const loading = ref(false)
//创建视频接收视频表单数据
const  data = reactive({
  title: '',
  info: '',
  url: '',
  cover: '',
})
//解包成ref
const {title,info,url,cover} = toRefs(data)


// 验证视频文件
const fnVideoBeforeUpload = (file) => {
  const isVideo = (file.type === 'video/mp4' || file.type === 'video/avi' || file.type === 'video/mpeg' || file.type === 'video/mov');
  const isLt200M = file.size / 1024 / 1024 < 200;

  if (!isVideo) {
    ElMessage.error('上传视频要是mp4、avi、mpeg、mov格式!');
  }
  if (!isLt200M) {
    ElMessage.error('上传的视频大小不能超过 200MB!');
  }
  return  isLt200M && isVideo
}

// 验证图片文件
const fnImgBeforeUpload = (file) => {
  const isImg = (file.type === 'image/png' || file.type === 'image/jpeg');
  const isLt2M = file.size / 1024 / 1024 < 4;

  if (!isImg) {
    ElMessage.error('上传图片只能是图片格式!');
    return
  }
  if (!isLt2M) {
    ElMessage.error('上传的图片大小不能超过 4MB!');
    return
  }
  return  isLt2M && isImg
}

// 上传视频文件
const fnUploadVideoRequest = (option) => {
  return new Promise((resolve, reject) => {
    UploadVideo(option.file.name).then(res => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', res.put, true);
      loading.value = true;
      xhr.send(option.file);
      xhr.onload = () => {
        loading.value = false;
        url.value = res.key;
        resolve(); // 请求成功时解析 Promise
      };
      xhr.onerror = (error) => {
        ElMessage.error("网络错误", error);
        reject(error); // 请求失败时拒绝 Promise
      };
    }).catch((error) => {
      ElMessage.error("网络错误", error);
      reject(error);
    });
  });
}

// 上传图片文件
const fnUploadImageRequest = (option) => {
  return new Promise((resolve, reject) => {
    UploadImage(option.file.name).then(res => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', res.put, true);
      xhr.send(option.file);
      xhr.onload = () => {
        cover.value = res.key;
        resolve(); // 请求成功时解析 Promise
      };
      xhr.onerror = (error) => {
        ElMessage.error("网络错误", error);
        reject(error); // 请求失败时拒绝 Promise
      };
    }).catch((error) => {
      ElMessage.error("网络错误", error);
      reject(error);
    });
  });
}

//提交表单创建视频数据
const submitData = () => {
  uploadVideo.value.submit()
  uploadImage.value.submit()
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {

    loading.close()
  }, 50000)
}

const submitCreate = () => {
  CreateVideo(title.value, info.value, url.value,cover.value)
}
</script>


<style>
.create-video {
  margin-top: 10px;
  padding: 20px;
}


//上传文件
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>