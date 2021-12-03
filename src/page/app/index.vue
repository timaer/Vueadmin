<template>
  <div id="app">
      <router-view v-if='noLayout'/>
      <el-container class='container-style' v-else>
          <Sidebar/>
          <el-container>
              <Topbar />
               <el-main style='margin-top:60px;' v-loading="Loading">
                        <Tagview v-if='isTagview' />
                        <router-view v-else/>
                </el-main>
          </el-container>
      </el-container>
            
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar'
import Topbar from '@/components/topbar'
import Tagview from '@/components/tagview'

export default {
  name: 'app',
  computed:{
     isTagview(){
          return this.$store.getters.isTagViewed
     },
     Loading(){
          return this.$store.getters.LoadingState
     },
     noLayout(){
          const whiteList=['login','404']
          if(whiteList.includes(this.$route.name)){
               return true
          }else{
               return false
          }
     }
  },
  components:{
     Sidebar,
     Topbar,
     Tagview
  }
}
</script>

<style lang="scss">
.container-style{border: 1px solid #eee; min-height: 100vh;}
</style>
