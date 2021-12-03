<template>
  <div>
    <el-tag v-if="managerType==1">当前登陆角色：超级管理员-{{username}}</el-tag>
    <el-tag type='info' v-else>当前登陆角色：普通商店管理员-{{username}}</el-tag>
    <el-row :gutter="20">
      <el-col :span="12" :sm="24" :xs="24" :md='12'>
          <el-card class="box-card">
                <div slot="header" class="clearfix">
                   <span v-if='managerType==1'><el-button type="info" @click='switchLoginUser(0)'>切换为普通商店管理员</el-button> </span>
                   <span v-else><el-button type="primary" @click='switchLoginUser(1)'>切换为超级管理员</el-button></span>

                   <div style='float:right;' :sm="24">
                     当前绑定店铺:
                    <el-select v-model="bindshopid" placeholder="请选择绑定店铺" @change='changeBindShop'>
                          <el-option
                            v-for="item in shoplist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            >
                          </el-option>
                      </el-select>
                    </div>
                </div>
                <el-tree
                  :data="treeData"
                  show-checkbox
                  ref="tree"
                  node-key="id"
                  :default-expanded-keys="expandData"
                  :default-checked-keys="checkData"
                  :props="defaultProps"
                  @check='refreshMenu'
                  >
                </el-tree>
                <div class="buttons" style='margin-top:15px;'>
                  <el-button @click='savePower'>保存权限</el-button>
                </div>
          </el-card>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>

   
  </div>
</template>

<script>
export default {
  name: 'power',
  data(){
      return {
        treeData:[],
        expandData:[],
        checkData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        nameMap:{},
        shoplist:[],
        bindshopid:''
      }
  },
  created(){
      this.getList()
  },
  computed:{
    username(){
       return this.$store.state.user.username
    },
    managerType(){
       if(this.username=='vadmin'){
          return 1
       }else{
          return 0
       }
    } 
  },
  methods: {
     getList(){
            this.$post("/manager/getPowerInfo",{}).then((data)=>{
                if(data.result.success){
                  this.treeData=data.result.info.treedata
                  this.expandData=data.result.info.expanddata 
                  this.checkData=data.result.info.checkdata
                  this.nameMap=data.result.info.namemap
                  this.shoplist=data.result.info.shoplist
                  this.bindshopid=data.result.info.bindshopid
                }else{
                  this.$message.error(data.result.info);
                }
            })
     },
     switchLoginUser(type){
          this.$store.dispatch("getLoginUser",{type:type}).then((data)=>{
              if(data.result.success){
                  this.$message({message:"刷新登陆成功",type:'success'})
              }
          })
          this.type=type
          setTimeout(()=>{this.getList()},200)
          setTimeout(()=>{this.refreshMenu()},500)
     },
     savePower(){
        this.$post("/manager/savePower",{powerlist:this.$refs.tree.getCheckedKeys()}).then((data)=>{
              if(data.result.success){
                 this.$message({message:data.result.info,type:'success'})
                 setTimeout(()=>{this.getList()},1000)
              }else{
                 this.$message.error(data.result.info)
              }
        })
     },
     refreshMenu(){
        let powerlist=[]
        this.$refs.tree.getCheckedKeys().forEach((id)=>{
           if(this.nameMap[id]!=undefined) powerlist.push(this.nameMap[id])
        })
        this.$store.commit("INIT_POWERLIST",{powerlist:powerlist})
        this.$store.commit("UPDATE_TAGVIEWLIST",{powerlist:powerlist})
     },
     changeBindShop(shopid){
         this.$post("/manager/bindShopid",{shopid:shopid}).then(()=>{
            this.switchLoginUser(this.managerType)
            setTimeout(()=>{this.getList},100)
         })
     }
  }
}
</script>
