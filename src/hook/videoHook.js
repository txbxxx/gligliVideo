import {create, detail, list} from "@/service/videoSvc";
import { ElNotification } from 'element-plus'


// CreateVideo 创建视频
export async function CreateVideo(title,info,url){
    try {
        const res = await create(title, info,url)
        if (res.code === 200) {
            ElNotification({
                title: 'Success',
                message: '创建视频成功！',
                type: 'success',
            })
        }else {
            console.log(res)
            ElNotification({
                title: 'Error',
                message: '创建视频失败'+ res.msg,
                type: 'error',
            })
        }
    } catch (e) {
        ElNotification({
            title: 'Error',
            message: '创建视频失败'+ e,
            type: 'error',
        })
    }
}

// ListVideo 列出视频
export async function ListVideo(page,size){
    try {
        const res = await list(page,size)
        if (res.code === 200){
            return res.data
        }else {
            console.log(res)
            ElNotification({
                title: 'Error',
                message: '列出视频失败'+ res.msg,
                type: 'error',
            })
        }
    } catch (e) {
        ElNotification({
            title: 'Error',
            message: '列出视频失败'+ e,
            type: 'error',
        })
    }
}


//视频详情
export async function DetailVideo(identity){
    try {
        const res = await detail(identity)
        if (res.code === 200){
            console.log(res)
            return res.data
        }else {
            console.log(res)
            ElNotification({
                title: 'Error',
                message: '查看视频详情失败'+ res.msg,
                type: 'error',
            })
        }
    } catch (e) {
        ElNotification({
            title: 'Error',
            message: '查看视频详情失败'+ e,
            type: 'error',
        })
    }
}