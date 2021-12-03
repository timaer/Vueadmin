import store from '@/vuex'
export function hasAuthLogin(topath){
     const whiteUrlList=['login','404']
     if(!whiteUrlList.includes(topath) && (store.state.user.token=='' || !store.state.user.powerlist.includes(topath))){
         return false
     }else{
         return true
     }
}

export function doLogout(){
     store.commit("LOG_OUT")
}