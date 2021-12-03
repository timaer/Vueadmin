<template>
  <el-result title="404" subTitle="抱歉，找不到所需网页">
  <template slot="icon">
         <Icon src='404' class='logoimg'/>
  </template>
  <template slot="extra">
    <el-button type="primary" size="medium" @click='goUrl("/login")'>返回</el-button>
  </template>
</el-result>
</template>
<script>
import Icon from '@/components/icon'
export default {
  name: 'error404',
  components:{
    Icon
  },
  methods:{
    goUrl(url){
      this.$router.push(url).catch(()=>{})
    }
  }
}
</script>
<style scoped lang="scss">
.logoimg{width:3rem;height:3rem;}
</style>
