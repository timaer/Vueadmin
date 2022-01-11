<template>
  <div id='login'>
      <div class='login-content'>
            <div class='logo'>
                <Icon src='login' class='logoimg'/>
            </div>
            <div class='title'>VueAdmin后台管理</div>
            <div class='subtitle'>用户名:vadmin 密码:vadmin</div>
            <div class='loginform'>
                <div class='login-input'>
                    <div class='login-input-icon'><Icon src='user' class='login-input-svg'/></div><div class='login-input-content'> <input type='text' v-model='username' placeholder="请输入用户名"/></div>
                </div>
                <div class='login-input'>
                    <div class='login-input-icon'><Icon src='password' class='login-input-svg'/></div><div class='login-input-content'> <input type='password' v-model='password' placeholder="请输入密码" /></div>
                </div>
                <div class='login-btn'>
                        <el-button type="primary" @click='doLogin()' class='login-btn-self'>登  陆</el-button>
                </div>    
            </div>    
            <div class='bottomwords'>copyright@2021</div>
      </div>
  </div>
</template>
<script>
import Icon from '@/components/icon'

export default {
   name: 'login',
   data() {
        return {
          username:'vadmin',
          password:'vadmin'
        };
   }, 
   methods: {
      doLogin(){
          if(this.username=='') {
              this.$message("用户名不能为空")
              return false
          }
          if(this.password=='') {
              this.$message("密码不能为空")
              return false
          }

          this.$store.dispatch("doLogin",{username:this.username,password:this.password}).then((data)=>{
              if(!data.result.success){
                  this.$message(data.result.info);return false;
              }
              this.$router.push('/').catch(()=>{})
          })
      }
   },
   components: {
        Icon
   }
}
</script>
<style scoped>
#login{background-color:#2d3a4b;min-height: 100vh;padding-top:60px;z-index:999;padding: 0 0.3rem;overflow:hidden;position: relative;color:#ffffff;margin: 0 auto;text-align: center;}
.login-content{width:3.5rem;margin: 0 auto;}
@media screen and (max-width:768px){
.login-content{width:100%;margin: 0 auto;}
}
.logo{margin-top:0.05rem;}
.logoimg{width:100%;width:2rem;height:2rem;}
.title{font-size:0.20rem;font-weight: 600;padding: 0.1rem;}
.subtitle{font-size:0.12rem;padding: 0 0.1rem 0.1rem;}
.login-btn{margin-top: 0.2rem;}
.login-input{background-color: #eeeeee;height:0.15rem;margin-top: 0.15rem;border-radius: 0.1rem;display:flex;align-items: center;padding: 0.15rem 0.15rem 0.15rem 0;}
.login-input-icon{width:0.5rem;text-align: center;}
.login-input-svg{width:0.25rem;height:0.25rem;}
.login-input-content{flex:3;}
.login-input-content input{outline: none;border: none;background-color: #eeeeee;height:0.2rem;line-height: 0.2rem;width:100%;font-size:0.15rem;border-radius: 0.2rem;}
.bottomwords{position: absolute;width: 100%;text-align: center;left:0;bottom:0;font-size:0.15rem;}
.login-btn-self{width:100%;font-size:0.18rem;padding: 0.1rem;}
</style>