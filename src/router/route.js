import {createRouter, createWebHistory} from "vue-router";


//路由配置
const routes = [
    {
        path: '/',
        redirect: '/homePage',
    },
    {
        path: '/homePage',
        name: "home",
        component: () => import('/views/HomePage.vue')
    },
    {
        path: '/createVideo',
        name: 'createVideo',
        component: () => import('/views/CreateVideo.vue')
    },
    {
        path: "/video/:identity",
        name: "videoDetail",
        component: () => import('/views/VideoDetail.vue'),
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router