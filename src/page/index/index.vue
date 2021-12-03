<template>
  <el-result title="开篇" subTitle="美好的一天，从Vue开始">
  <template slot="icon">
         <Icon src='index' class='logoimg'/>
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
