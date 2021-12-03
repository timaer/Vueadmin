<template>
    <div>
       <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
             <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="零售价格">
             <el-input v-model="form.dashprice"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
             <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
             <el-input v-model="form.stock"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐">
             <el-switch
                v-model="form.ishot"
                active-color="#13ce66">
              </el-switch>
          </el-form-item>
          <el-form-item label="所属分类">
              <el-select v-model="form.classid" placeholder="请选择分类">
                <el-option
                  v-for="item in goodsclass"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
                <el-button type="info" plain @click='openGoodsClass'>分类管理</el-button>
          </el-form-item>
          <el-form-item label="缩略图">
              <el-upload
                :action="uploadImgUrl"
                name='image'
                :data="{extra:'headimg',type:'goods_headimg'}"
                list-type="picture-card"
                :limit='1'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success='handleUploadOK'
                :on-exceed='handleExceed'
                :file-list="filelist['headimg']"	
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
          </el-form-item>
          <el-form-item label="轮播图">
              <el-upload
                :action="uploadImgUrl"
                name='image'
                :data="{extra:'slides',type:'slides'}"
                list-type="picture-card"
                :limit='20'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success='handleUploadOK'
                :on-exceed='handleExceed'
                :file-list="filelist['slides']"	
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">立即保存</el-button>
            <el-button @click='goBack'>取消</el-button>
          </el-form-item>
        </el-form>

        <el-dialog title="分类管理" :visible.sync="dialogFormVisible" @close='closeGoodsClass'>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                   <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                type="info"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
               <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增分类</el-button>
            </div>
            <el-tabs tab-position="left" style="min-height: 300px;" v-model='activeTab' @tab-click='handleTabClick'>
              <el-tab-pane v-for="classname in dynamicTags" :key='classname' :label="classname">
                    <el-select v-model="selectgoods" filterable placeholder="请选择">
                      <el-option
                        v-for="item in goodslist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <el-button plain @click="addToGoodsClass(classname)"><i class="el-icon-plus el-icon--right"></i>添加商品到此分类</el-button>
                     <el-table
                        :data="classgoodslist"
                        style="width: 100%">
                        <el-table-column
                          label="缩略图"
                          >
                          <template slot-scope="scope"> 
                              <el-image
                              style="width: 100px; height: 100px"
                              :src="scope.row.headimg"
                              fit="fit"></el-image>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop='name'
                          label="名称"
                          >
                        </el-table-column>
                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              type="danger"
                              @click="handleClassGoodsDelete(scope.$index, scope.row)">移除</el-button>
                          </template>
                        </el-table-column>
                      </el-table> 
              </el-tab-pane>
            </el-tabs>      
            </el-card>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeGoodsClass">关 闭</el-button>
          </div>
      </el-dialog>
    </div>  
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id:'',
          name: '',
          desc: '',
          dashprice:'',
          price:'',
          stock:'',
          ishot:false,
          classid:'',
          headimg:[],
          slides:[]
        },
        goodsclass:[],
        uploadImgUrl:process.env.VUE_APP_API+"/upload/uploadImg",
        dialogImageUrl: '',
        dialogVisible: false,
        processing:false,
        filelist:[],

        dialogFormVisible:false,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',

        goodslist:[],
        selectgoods:'',
        classgoodslist:[],
        activeTab:'',
        activeClassName:''
      }
    },
    created(){
          this.form.id=this.$route.query.goodsid==undefined?0:this.$route.query.goodsid
          this.initGoodsInfo(this.form.id)
    },
    methods: {
      onSave() {
          if(this.processing){
             this.$message.error("请等待处理完成");return false
          }
          
          if(this.form.name==''){
            this.$message.error("商品名称不能为空");return false
          }
          if(this.form.desc==''){
            this.$message.error("商品简介不能为空");return false
          }
          if(this.form.dashprice=='' || isNaN(this.form.dashprice) || parseInt(this.form.dashprice)<=0){
            this.$message.error("商品零售价设置有误");return false
          }
          if(this.form.price==''|| isNaN(this.form.price) || parseInt(this.form.price)<=0){
            this.$message.error("商品价格设置有误");return false
          }
          if(this.form.stock==''|| isNaN(this.form.stock) || parseInt(this.form.stock)<0){
            this.$message.error("商品库存设置有误");return false
          }
          if(this.form.classid==''){
            this.$message.error("商品分类不能为空");return false
          }
          if(this.form.headimg.length<1){
            this.$message.error("请上传商品缩略图片");return false
          }
          if(this.form.slides.length<1){
            this.$message.error("请上传商品轮播图");return false
          }
          this.form.headimg=this.form.headimg[0]
          this.form.ishot=this.form.ishot ? 1: 0
         
          this.processing=true
          this.$post("/goods/saveGoods",{goodsinfo:this.form}).then((data)=>{
               if(data.result.success){
                   this.$message({message:data.result.info,type:'success'})
                   setTimeout(()=>{this.$router.push('/goodslist')},500)
               }else{
                   this.$message.error(data.result.info)
               }
               this.processing=false
          })
      },
      initGoodsInfo(goodsid){
          this.$post("/goods/getGoodsInfo",{goodsid:goodsid}).then((data)=>{
             if(data.result.success==1){
                this.form=data.result.info.goodsinfo
                this.filelist=data.result.info.filelist
                this.goodsclass=data.result.info.goodsclass
                this.dynamicTags=data.result.info.classnames
             }else if(data.result.success==2){
                this.goodsclass=data.result.info.goodsclass
                this.dynamicTags=data.result.info.classnames
             }else{
                this.$message.error(data.result.info)
             }
          })
      },
      goBack(){
          this.$router.go(-1)
      },
      handleRemove(file, fileList) {
        let type=file.response.result.info.extra
        switch(type){
          case 'headimg':
                this.form.headimg=this.getSlides(fileList);break;
          case 'slides':
                this.form.slides=this.getSlides(fileList);break;  
          default:
                this.$message("图片类型错误");      
        }
      },
      handleUploadOK(response, file, fileList){
        let type=response.result.info.extra
        switch(type){
          case 'headimg':  
                this.form.headimg=this.getSlides(fileList);break;    
          case 'slides':
                this.form.slides=this.getSlides(fileList);break;
          default:
                this.$message("图片类型错误");      
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getSlides(fileList){
         return fileList.map((item)=>item.response.result.info.url)
      },
      handleExceed(){
         this.$message.error("超出最大上传数量");
      },
      openGoodsClass(){
        this.$post("/goods/getGoodsClassInfo",{}).then((data)=>{
              if(data.result.success){
                this.goodslist=data.result.info.goodslist
                this.classgoodslist=data.result.info.classgoodslist
              }else{
                this.$message.error(data.result.info)
              }
          })
        this.activeTab='0'
        this.activeClassName=this.dynamicTags[0]
        this.dialogFormVisible=true
      },
      closeGoodsClass(){
        this.$post("/goods/getGoodsClassSelectList",{}).then((data)=>{
              if(data.result.success){
                this.goodsclass=data.result.info
              }else{
                this.$message.error(data.result.info)
              }
          })
        this.dialogFormVisible=false
      },
      handleClose(tag) {
        this.$post("/goods/delGoodsClass",{classname:tag}).then((data)=>{
           if(data.result.success){
                  this.$message({message:data.result.info,type:'success'})
                  this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
             }else{
                  this.$message.error(data.result.info)
             }
        })
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(()=> {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        if(this.processing){
          this.$message.error("请稍等");return false;
        }
        let inputValue = this.inputValue;
        if(inputValue=='' || inputValue==undefined) return false;

        if(this.dynamicTags.includes(inputValue)){
          this.$message.error("已存在该分类！");
          this.inputVisible = false;
          this.inputValue = '';
          return false;
        }
        this.processing=true
        this.$post("/goods/addGoodsClass",{classname:inputValue}).then((data)=>{
             if(data.result.success){
                  this.$message({message:data.result.info,type:'success'})
                  if(inputValue) this.dynamicTags.push(inputValue) 
                  this.inputVisible = false;
                  this.inputValue = '';
             }else{
                  this.$message.error(data.result.info)
             }
             this.processing=false
        })
      },
      addToGoodsClass(classname){
          if(this.selectgoods==''){
            this.$message.error("请先选择要添加的商品");return false;
          }
          this.$post("/goods/addToGoodsClass",{goodsid:this.selectgoods,classname:classname}).then((data)=>{
            if(data.result.success){
               this.$message({message:'添加商品分类成功',type:'success'})
               this.classgoodslist=data.result.info
            }else{
               this.$message.error(data.result.info)
            }
          })
      },
      handleClassGoodsDelete(index, row) {
         this.$post("/goods/delClassGoods",{goodsid:row.id,classname:this.activeClassName}).then((data)=>{
             if(data.result.success){
               this.$message({message:'删除商品分类成功',type:'success'})
               this.classgoodslist=data.result.info
            }else{
               this.$message.error(data.result.info)
            }
         })
      },
      handleTabClick(tabItem){
         this.activeClassName=tabItem.label
         this.$post("/goods/getClassGoodsList",{classname:tabItem.label}).then((data)=>{
            if(data.result.success){
              this.classgoodslist=data.result.info
            }else{
              this.$message.error(data.result.info)
            }
         })
      }
    }
  }
</script>

<style scoped lang="scss">
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
