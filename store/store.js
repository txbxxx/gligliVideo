import { createStore } from 'vuex'


const store = createStore({
    state: {
        saToken: "",
        identity: "",
    },
    mutations: {
        //获取Token
        getSaToken(state, token) {
            state.saToken = token
            sessionStorage.token = token
        },
        //删除Token
        delSaToken (state) {
            state.saToken = ""
            sessionStorage.removeItem('token')
        },
        //获取identity
        getIdentity(state, identity) {
            state.identity = identity
        },
    },
})
export  default store