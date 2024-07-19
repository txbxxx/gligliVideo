import {post,get} from "@/utils/request";
import {createVideo, listVideo, detailVideo, uploadVideo} from "@/api/video";


//创建视频
export function create(title,info,url,cover) {
    return post(createVideo,{
            title: title,
            info: info,
            url: url,
            cover: cover
    })
}

//列出视频
export function list(page,size) {
    return get(listVideo,{
        page: page,
        size: size
    })
}

//视频详情
export function detail(identity) {
    return get(detailVideo(identity),{
        identity: identity
    })
}

//上传视频
export function upload(fileName) {
    return post(uploadVideo,{
        file_name: fileName
    })
}