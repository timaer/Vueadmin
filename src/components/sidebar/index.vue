<template>
   <el-aside :class="isCollapsed?'sidebar-close-style':'sidebar-open-style'">
               <el-menu  class="el-menu-vertical-demo" :collapse="isCollapsed" background-color="#545c64" text-color="#fff" :default-active='activeTag'>
                      <div v-for='item in myMenuList' :key="item.name">
                        <el-submenu :index="item.name" v-if='item.hasChildren'>
                            <template slot="title">
                              <Icon :src='item.icon'/>
                              <span slot="title" class='menutitle' v-if='!isCollapsed'>{{item.title}}</span>
                            </template>
                            <el-menu-item  v-for='child in item.children' :key='child.name' :index="child.name" @click='goUrl(child.title,child.name,child.icon,child.path)'>
                                <Icon :src='child.icon' />
                                <span slot="title" class='menutitle'>{{child.title}}</span>
                            </el-menu-item> 
                        </el-submenu>
                        <el-menu-item :index="item.name" @click='goUrl(item.title,item.name,item.icon,item.path)' v-else>
                          <Icon :src='item.icon'/>
                          <span slot="title" class='menutitle'>{{item.title}}</span>
                        </el-menu-item>
                      </div>
                </el-menu>

  </el-aside>
</template>

<script>
import Icon from '@/components/icon'
export default {
  name: 'Sidebar',
  computed:{
     isCollapsed(){
       return this.$store.getters.isCollapsed
     },
     tagViewArr(){
        return this.$store.getters.TagviewLists
     },
     activeTag(){
        return this.$store.getters.ActiveTagview
     },
     myMenuList(){
        return this.$store.state.user.myroutes  
     }
  },
  methods:{
     goUrl(title,name,icon,url){
       if(this.tagViewArr.find(item=>item.name==name)==undefined){
              this.$store.commit("ADD_TAG",{title:title,name:name,icon:icon,url:url})
       }else{
              this.$store.commit("SET_ACTIVETAG",{activename:name})
       }
       this.$store.commit("SET_ACTIVEROUTE",{activename:name,routers:this.myMenuList});
       this.$router.push(url).catch(()=>{});
     }
  },
  components:{
    Icon
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width:768px){
.sidebar-open-style{width:210px!important;background-color: rgb(84, 92, 100);transition:width 0.4s;-webkit-transition:width 0.4s;overflow-x: hidden;}
.sidebar-close-style{width:64px!important;background-color: rgb(84, 92, 100);transition:width 0.4s;-webkit-transition:width 0.4s;overflow-x: hidden;}
}
@media screen and (max-width:767px){
.sidebar-open-style{width:210px!important;background-color: rgb(84, 92, 100);transition:width 0.4s;-webkit-transition:width 0.4s;overflow-x: hidden;}
.sidebar-close-style{width:0!important;background-color: rgb(84, 92, 100);transition:width 0.4s;-webkit-transition:width 0.4s;overflow-x: hidden;}
}
.el-aside {color: #333;}
.el-menu-vertical-demo:not(.el-menu--collapse) {width: 210px;min-height:100vh;}
.el-menu--collapse{min-height:100vh;}
a{text-decoration: none!important;}
.menutitle{padding-left:0.1rem;font-size:0.1rem;}
</style>
