<template>
   <div>
     <div class="search_unit">
        <div style='display:inline-block;'>
          <el-input placeholder="请输入搜索关键字" v-model="keywords" class="input-with-select" @change='getList()'>
                    <el-select v-model="classid" slot="prepend" placeholder="请选择分类" @change='getList()'>
                       <el-option  v-for='item in goodsclass' :key='item.id' :label="item.name"  :value="item.id"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click='getList()'></el-button>
          </el-input>
        </div>
    </div>
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
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="shopname"
        label="所在店铺"
        >
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存">
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
      <div class='page-number'>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageinfo.total"
          :page-size="pageinfo.pagesize"
          :current-page.sync="pageinfo.pageindex"
          @current-change='getList'
          >
        </el-pagination>
      </div>
   </div> 
</template>

<script>
export default {
  data(){
     return {
        tableData:[],
        classid:'',
        keywords:'',
        pageinfo:{
          total:0,
          pagesize:10,
          pageindex:1
        },
        goodsclass:[]
     }
  },
  created(){
     this.getList()
  },
  methods: {
      getList(){
          this.$post("/goods/getGoodsList",{pageinfo:this.pageinfo,classid:this.classid,keywords:this.keywords}).then((data)=>{
               if(data.result.success){
                  this.tableData=data.result.info.goodslist
                  this.pageinfo=data.result.info.pageinfo 
                  this.goodsclass=data.result.info.goodsclass
               }else{
                  this.$message.error(data.result.info)
               }
          })
      },
      handleEdit(goodsid){
          this.$router.push({name:'addgoods',query:{goodsid:goodsid}})
      },
      handleItem(command,goodsid){
        switch(command){
          case 'delete':
                this.$post("/goods/delGoods",{goodsid:goodsid}).then((data)=>{
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
.page-number{margin-top:20px;float:right;}
.search-unit{margin-top: 15px;}
</style>
