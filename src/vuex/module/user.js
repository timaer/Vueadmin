import {post} from '@/api'
import {getAccessRoutes} from "@/utils/router.js"

const moduleUser={
    state: {
        username:'',
        shopid:'',
        token:'',
        powerlist:[],
        myroutes:[] 
    },
    mutations: {
        SET_USERNAME:(state,payload)=>{
            state.username=payload.username
        },
        SET_SHOPID:(state,payload)=>{
            state.shopid=payload.shopid
        },
        SET_TOKEN:(state,payload)=>{
            state.token=payload.token
        },
        LOG_OUT:(state)=>{
            state.username=''
            state.token=''
        },
        INIT_POWERLIST:(state,payload)=>{
                state.powerlist=payload.powerlist
                state.myroutes=getAccessRoutes(payload.powerlist)
        }
    },
    actions: {
        doLogin({commit},data){
            return new Promise((resolve)=>{
                post("/login/doLogin",{username:data.username,password:data.password}).then((data)=>{
                    if(data.result.success){
                        commit("SET_USERNAME",{username:data.result.info.username})
                        commit("SET_SHOPID",{shopid:data.result.info.shopid})
                        commit("SET_TOKEN",{token:data.result.info.token})
                        commit("INIT_POWERLIST",{powerlist:data.result.info.powerlist})
                    }
                    resolve(data)
                }).catch(()=>{});
            }).catch(()=>{})
        },
        doLogout({commit}){
            return new Promise((resolve)=>{
                commit("LOG_OUT")
                resolve(1)
            }).catch(()=>{})
        },
        getLoginUser({commit},data){
            return new Promise((resolve)=>{
                post("/login/getLoginUser",{type:data.type}).then((data)=>{
                    if(data.result.success){
                        commit("SET_USERNAME",{username:data.result.info.username})
                        commit("SET_SHOPID",{shopid:data.result.info.shopid})
                        commit("SET_TOKEN",{token:data.result.info.token})
                    }
                    resolve(data)
                }).catch(()=>{});
            }).catch(()=>{})
        }
    }
}

export default moduleUser