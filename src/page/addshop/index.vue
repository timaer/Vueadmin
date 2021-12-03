<template>
          <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介">
             <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="店铺描述">
             <el-input v-model="form.intro"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址">
             <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="营业时间">
             <el-input v-model="form.opentime"></el-input>
          </el-form-item>
          <el-form-item label="经营范围">
             <el-input v-model="form.business"></el-input>
          </el-form-item>
          <el-form-item label="Logo图片">
              <el-upload
                :action="uploadImgUrl"
                name='image'
                :data="{extra:'logo',type:'logo'}"
                list-type="picture-card"
                :limit='1'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success='handleUploadOK'
                :on-exceed='handleExceed'
                :file-list="filelist['logo']"	
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
          </el-form-item>
          <el-form-item label="缩略图">
              <el-upload
                :action="uploadImgUrl"
                name='image'
                :data="{extra:'headimg',type:'shop_headimg'}"
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
          <el-form-item label="推荐栏背景">
              <el-upload
                :action="uploadImgUrl"
                name='image'
                :data="{extra:'hotbg',type:'hotbg'}"
                list-type="picture-card"
                :limit='1'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success='handleUploadOK'
                :on-exceed='handleExceed'
                :file-list="filelist['hotbg']"	
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
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id:'',
          name: '',
          desc: '',
          intro: '',
          address: '',
          opentime: '',
          business: '',
          logo:[],
          headimg:[],
          hotbg:[],
          slides:[]
        },
        uploadImgUrl:process.env.VUE_APP_API+"/upload/uploadImg",
        dialogImageUrl: '',
        dialogVisible: false,
        processing:false,
        filelist:[]
      }
    },
    created(){
          this.form.id=this.$route.query.shopid==undefined?0:this.$route.query.shopid
          if(this.form.id>0){
             this.initShopInfo(this.form.id)
          }
    },
    methods: {
      onSave() {
          if(this.processing){
             this.$message.error("请等待处理完成");return false
          }
          
          if(this.form.name==''){
            this.$message.error("商店名称不能为空");return false
          }
          if(this.form.desc==''){
            this.$message.error("商店简介不能为空");return false
          }
          if(this.form.intro==''){
            this.$message.error("商店描述不能为空");return false
          }
          if(this.form.address==''){
            this.$message.error("商店地址不能为空");return false
          }
          if(this.form.opentime==''){
            this.$message.error("商店营业时间不能为空");return false
          }
          if(this.form.business==''){
            this.$message.error("商店营业范围不能为空");return false
          }
          if(this.form.logo.length<1){
            this.$message.error("请上传商店LOGO图片");return false
          }
          if(this.form.headimg.length<1){
            this.$message.error("请上传商店缩略图片");return false
          }
          if(this.form.hotbg.length<1){
            this.$message.error("请上传商店推荐背景");return false
          }
          if(this.form.slides.length<1){
            this.$message.error("请上传商店轮播图");return false
          }
          this.form.logo=this.form.logo[0]
          this.form.headimg=this.form.headimg[0]
          this.form.hotbg=this.form.hotbg[0]
          this.processing=true
          this.$post("/shop/saveShop",{shopinfo:this.form}).then((data)=>{
               if(data.result.success){
                   this.$message({message:data.result.info,type:'success'})
                   setTimeout(()=>{this.$router.push('/shoplist')},500)
               }else{
                   this.$message.error(data.result.info)
               }
               this.processing=false
          })
      },
      initShopInfo(shopid){
          this.$post("/shop/getShopInfo",{shopid:shopid}).then((data)=>{
             if(data.result.success){
                this.form=data.result.info.shopinfo
                this.filelist=data.result.info.filelist
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
          case 'logo':
                this.form.logo=this.getSlides(fileList);break;
          case 'headimg':
                this.form.headimg=this.getSlides(fileList);break;
          case 'hotbg':
                this.form.hotbg=this.getSlides(fileList);break;
          case 'slides':
                this.form.slides=this.getSlides(fileList);break;  
          default:
                this.$message("图片类型错误");      
        }
      },
      handleUploadOK(response, file, fileList){
        let type=response.result.info.extra
        switch(type){
          case 'logo':
                this.form.logo=this.getSlides(fileList);break;
          case 'headimg':  
                this.form.headimg=this.getSlides(fileList);break;
          case 'hotbg':
                this.form.hotbg=this.getSlides(fileList);break;      
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
      }
    }
  }
</script>
