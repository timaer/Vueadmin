import {getActiveRoute} from "@/utils/router.js"

const moduleApp={
    state: {
        isCollapse:false,
        isTagView:true,
        TagviewList:[],
        ActiveTag:'',
        RoutePath:[],
        LoadingVal:false
    },
    getters:{
        isCollapsed:state=>{
            return state.isCollapse
        },
        isTagViewed:state=>{
            return state.isTagView
        },
        TagviewLists:state=>{
            return state.TagviewList
        },
        ActiveTagview:state=>{
            return state.ActiveTag
        },
        BreadRoutePath:state=>{
            return state.RoutePath
        },
        LoadingState:state=>{
            return state.LoadingVal
        }
    },
    mutations: {
        TOGGLE_SIDEBAR:(state,payload)=>{
            state.isCollapse=payload.isCollapse
        },
        TOGGLE_TAGVIEW:(state,payload)=>{
            state.isTagView=payload.isTagView
        },
        ADD_TAG:(state,payload)=>{
            state.TagviewList.push(payload)
            state.ActiveTag=payload.name
        },
        REMOVE_TAG:(state,payload)=>{
            state.ActiveTag = payload.active_tag_name;
            state.TagviewList = state.TagviewList.filter(tab => tab.name !== payload.remove_tag_name)
        },
        SET_ACTIVETAG:(state,payload)=>{
            state.ActiveTag=payload.activename
        },
        SET_ACTIVEROUTE:(state,payload)=>{
            let activename=payload.activename
            let routes=payload.routers
            state.RoutePath=getActiveRoute(activename,routes)              
        },
        LOADING_START:(state)=>{
            state.LoadingVal=true
        },
        LOADING_END:(state)=>{
            state.LoadingVal=false
        },
        UPDATE_TAGVIEWLIST:(state,payload)=>{
            state.TagviewList = state.TagviewList.filter(tab => payload.powerlist.includes(tab.name))
        }
    },
    actions: {
        
    }
}

export default moduleApp