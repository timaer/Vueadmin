<template>
   <div>
     <div class="search_unit">
        <div style='display:inline-block;'>
          <el-input placeholder="商品名称" v-model="keywords" class="input-with-select" @change='getList()'>
                    <el-select v-model="type" slot="prepend" placeholder="请选择分类">
                      <el-option label="订单号"   value="1"></el-option>
                      <el-option label="收货姓名" value="2"></el-option>
                      <el-option label="收货电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click='getList()'></el-button>
          </el-input>
        </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="下单时间">
      <template slot-scope="scope"> 
           {{scope.row.createtime | timeToDate}}
      </template>
      </el-table-column>
      <el-table-column
        prop="ordernum"
        label="订单号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="收货人">
      </el-table-column>
      <el-table-column
        label="订货商品">
        <template slot-scope="scope"> 
             <div v-for='item in scope.row.ordergoods' :key='item.id'>
                {{item.name}}x<el-badge :value="item.nums" class="item"></el-badge>
             </div>    
        </template>
      </el-table-column>
      <el-table-column
        prop="totalmoney"
        label="总金额">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope"> 
          <el-tag :type="scope.row.status | toStatusStyle">{{scope.row.status | toStatusWord}}</el-tag> 
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope"> 
             <el-dropdown split-button type="primary" @click='handleLook(scope.row)' @command='(command)=>handleItem(command,scope.row.id)'>
              查看
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='hand'>手工确认</el-dropdown-item>
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
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
         <el-card class="box-card">
          <div>
            <ul class='order-detail'>
               <li>订单号：{{orderDetail.ordernum}}</li>
               <li>订货商品：
                  <div v-for='item in orderDetail.ordergoods' :key='item.id'>
                      {{item.name}}x<el-badge :value="item.nums" class="item"></el-badge>
                  </div> 
               </li>
               <li>订单总额：{{orderDetail.totalmoney}}</li>
               <li>订单优惠：{{orderDetail.discountmoney}}</li>
               <li>订单实付：{{orderDetail.realmoney}}</li>
               <li>支付方式：{{orderDetail.paytype |toPaytype}}</li>
               <li>订单状态：{{orderDetail.status | toStatusWord}}</li>
               <li>收货人：{{orderDetail.name}}</li>
               <li>收货电话：{{orderDetail.mobile}}</li>
               <li>收货地址：{{orderDetail.province}}{{orderDetail.city}}{{orderDetail.county}}{{orderDetail.address}}</li>
            </ul>  
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
   </div> 
</template>

<script>
export default {
  data(){
     return {
        tableData:[],
        startDate:'',
        endDate:'',
        type:'',
        keywords:'',
        pageinfo:{
          total:0,
          pagesize:10,
          pageindex:1
        },
        orderDetail:{},
        dialogFormVisible:false
     }
  },
  created(){
     this.getList()
  },
  methods: {
      getList(){
          this.$post("/order/getOrderList",{pageinfo:this.pageinfo,startdate:this.startDate,enddate:this.endDate,keywords:this.keywords,type:this.type}).then((data)=>{
               if(data.result.success){
                  this.tableData=data.result.info.orderlist
                  this.pageinfo=data.result.info.pageinfo 
               }else{
                  this.$message.error(data.result.info)
               }
          })
      },
      handleLook(orderItem){
         this.orderDetail=orderItem
         this.dialogFormVisible=true
      },
      handleItem(command,orderid){
        switch(command){
          case 'hand':
                this.$post("/order/changeOrderStatus",{orderid:orderid}).then((data)=>{
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
.order-detail {font-size:0.1rem;}
.order-detail li{padding: 0.1rem;list-style-type:none;border-bottom: 1px dashed #ccc;}
.page-number{margin-top:20px;float:right;}
.search-unit{margin-top: 15px;}
</style>
