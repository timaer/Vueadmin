<template>
  <div id='tagview'>
       <el-tabs :value="activeTag" type="card" closable @tab-remove="removeTab" @tab-click='switchTab'>
          <el-tab-pane
            v-for="item in tagviewArr"
            :key="item.name"
            :name="item.name"
          >
             <span slot="label"><span class='tagstyle'><Icon :src='item.icon' />{{item.title}}</span></span>
          </el-tab-pane>
          <router-view/>
      </el-tabs>
  </div>
</template>

<script>
import Icon from '@/components/icon'
export default {
  name: 'Tagview',
  computed:{
      tagviewArr(){
          return this.$store.getters.TagviewLists
      },
      activeTag(){
          return this.$store.getters.ActiveTagview
      },
      myMenuList(){
        return this.$store.state.user.myroutes  
     }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.tagviewArr
      let activeName = this.activeTag
      let needRouteUrl=''
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
                activeName = nextTab.name
                needRouteUrl=nextTab.url
            }
          }
        });
      }
      this.$store.commit("REMOVE_TAG",{active_tag_name:activeName,remove_tag_name:targetName})
      this.$store.commit("SET_ACTIVEROUTE",{activename:activeName,routers:this.myMenuList});
      if(needRouteUrl!='') this.$router.push(needRouteUrl).catch(()=>{})
    },
    switchTab(tabInfo){
        const targetTab=this.tagviewArr.find((item)=>item.name==tabInfo.name)
        this.$store.commit("SET_ACTIVETAG",{activename:targetTab.name})
        this.$store.commit("SET_ACTIVEROUTE",{activename:targetTab.name,routers:this.myMenuList});
        this.$router.push(targetTab.url).catch(()=>{});
    }
  },
  components:{
    Icon
  }
}
</script>

<style scoped lang="scss">
.tagstyle{font-size:0.1rem;padding: 0.02rem;vertical-align:middle;}
</style>
