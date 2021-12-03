<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="缩略图">
      <template slot-scope="scope"> 
           <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.headimg"
          fit="fit"></el-image>
      </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="店铺ID"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="店铺名称"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="business"
        label="经营范围">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope"> 
           {{scope.row.createtime | timeToDate}}    
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope"> 
             <el-dropdown split-button type="primary" @click='handleEdit(scope.row.id)' @command='(command)=>handleItem(command,scope.row.id)'>
              编辑
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='delete'>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  data(){
     return {
        tableData:[]
     }
  },
  created(){
     this.getList()
  },
  methods: {
      getList(){
          this.$post("/shop/getShopList",{}).then((data)=>{
               if(data.result.success){
                  this.tableData=data.result.info 
               }else{
                  this.$message.error(data.result.info)
               }
          })
      },
      handleEdit(shopid){
          this.$router.push({name:'addshop',query:{shopid:shopid}})
      },
      handleItem(command,shopid){
        switch(command){
          case 'delete':
                this.$post("/shop/delShop",{shopid:shopid}).then((data)=>{
                  if(data.result.success){
                      this.$message({message:data.result.info,type:'success'})
                      setTimeout(()=>{this.getList()},300)
                  }else{
                      this.$message.error(data.result.info)
                  } 
                })
                break;
          default:
                this.$message.error("选项有误");      
        }
      }
  }
}
</script>

<style scoped lang="scss">

</style>
