<template>
  <el-header :class="isCollapse?'topbar-collapse':'topbar-normal'">
              <div class='btn-toggle' @click='onToggleSidebar'>
                 <Icon classname='toggle-icon' :src="isCollapse?'sidebar-open':'sidebar-close'" />
              </div>   
              <el-breadcrumb separator-class="el-icon-arrow-right" class='breadstyle'>
                <el-breadcrumb-item v-for='item in BreadRoutePath' :key='item' class='breadtitle'>{{item}}</el-breadcrumb-item>
              </el-breadcrumb>
              <div class='head-right'>
                 <span class='tagbtn'>
                     <span class='tagbtn-label'>多标签</span>
                     <el-switch
                      :value="isTagview"
                      active-color="#13ce66"
                      @change='onToggleTagview'
                      >
                     </el-switch>
                 </span>
                  <span class='username'>您好,{{username}}</span>
                  <Icon src='exit' @click='exit'/>
              </div>  
   </el-header>
</template>

<script>
import Icon from '@/components/icon'
export default {
  name: 'Topbar',
  computed:{
    isTagview(){
        return this.$store.getters.isTagViewed
    },
    isCollapse(){
       return this.$store.getters.isCollapsed
    },
    username(){
       return this.$store.state.user.username
    }, 
    BreadRoutePath(){
       return this.$store.getters.BreadRoutePath
    }
  },
  methods:{
     onToggleSidebar(){
         this.$store.commit("TOGGLE_SIDEBAR",{isCollapse:!this.isCollapse})
     },
     onToggleTagview(){
         this.$store.commit("TOGGLE_TAGVIEW",{isTagView:!this.isTagview})
     },
     exit(){
         this.$router.push("/login")
     }
  },
  components:{
    Icon
  }
}
</script>

<style scoped lang="scss">
 @media screen and (min-width:768px){
.topbar-normal{box-shadow:0 1px 4px rgba(0,21,41,.08);text-align: left; font-size: 0.12rem;background-color:#fff;color: #333;line-height: 60px;width:calc(100% - 210px);position:fixed;left:212px;top:0;display: flex;align-items:center;transition:left 0.4s;-webkit-transition:left 0.4s;z-index:999;}
.topbar-collapse{box-shadow:0 1px 4px rgba(0,21,41,.08);text-align: left; font-size: 0.12rem;background-color:#fff;color: #333;line-height: 60px;width:calc(100% - 64px);position:fixed;left:66px;top:0;display: flex;align-items:center;transition:left 0.4s;-webkit-transition:left 0.4s;z-index:999;}
}
@media screen and (max-width:767px){
.topbar-normal{box-shadow:0 1px 4px rgba(0,21,41,.08);text-align: left; font-size: 0.12rem;background-color:#fff;color: #333;line-height: 60px;width:calc(100% - 210px);position:fixed;left:212px;top:0;display: flex;align-items:center;transition:left 0.4s;-webkit-transition:left 0.4s;z-index:999;}
.topbar-collapse{box-shadow:0 1px 4px rgba(0,21,41,.08);text-align: left; font-size: 0.12rem;background-color:#fff;color: #333;line-height: 60px;width:100%;position:fixed;left:0;top:0;display: flex;align-items:center;transition:left 0.4s;-webkit-transition:left 0.4s;z-index:999;}
}
.head-right{margin-left:auto;display:flex;align-items: center;}
.btn-toggle{padding: 0.02rem;margin-right:0.05rem;font-size: 0.18rem;display: flex;align-items: center;}
.username{padding: 0.1rem;font-size:0.1rem;}
.el-dropdown{display: flex;align-items: center;}
.tagbtn{display: flex;align-items: center;}
.tagbtn-label{margin-right:0.05rem;font-size:0.1rem;}
.toggle-icon{height:0.8em;}
.breadstyle{display:flex;align-items: center;}
.breadtitle{font-size:0.08rem;}
</style>
