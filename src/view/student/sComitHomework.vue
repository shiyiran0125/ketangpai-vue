<template>
  <div style="padding: 0px;margin: 0px">
    <top-navgation :Course_name="C_name">
    <div slot="Bar">
      <li class="nav-menu-item" style="margin-left: 350px"><a :class="{'active':navIndex==1}" @click="nav(1)">提交作业</a></li>
      <li class="nav-menu-item"><a :class="{'active':navIndex==2}" @click="nav(2)">作业讨论</a></li>
    </div>
  </top-navgation>
    <div class="container">
      <div class="container-top">
        <div class="gWidth cWidth-new company">
          <div class="txt">
            <p style="color: #3C4043;font-size: 20px;margin-bottom: 8px;"></p>
            <p style="color: #202124;font-size: 14px;"></p>
          </div>
        </div>
        <div class="homeInfo">
        <span style="font-size: 18px;">{{C_name}}</span>
        <div class="description">如题所述</div>
          <p>截止时间:<i style="margin-left: 10px">{{deadline}}</i> <i style="margin-left: 10px">23:59</i><i v-show="type==1" style="margin-left: 20px">个人作业</i> <i v-show="type==2">小组作业</i></p>
        </div>
      </div>
      <div class="container-body">
        <el-button type="primary" round @click="submitUpload()">提交</el-button>
        <div style="float: right;"><p v-show="unCompelete" style="font-size: 18px">未完成</p><p v-show="!unCompelete" style="font-size: 18px">已提交</p></div>
      </div>
      <div class="homework-box">
        <div class="sc-tj-box sc-tj-box-new">
          <div class="sc-tj">
            <el-upload
              class="image-upload-pic"
              ref="upload"
              drag
              action="fakeaction"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="fileChange"
              :on-remove="removeFile"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadSectionFile">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip" style="color:red">上传文件只能是 doc、docx、txt 格式!</div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topNavgation from "../../components/topNavgation";
  import {post} from "../../axios";
  export default {
        name: "sComitHomework",
        components:{topNavgation},
        data(){
            return{
                navIndex:1,
                unCompelete:true,
                fileList:[],
                C_name:this.$store.state.courseInfo.C_name,
                C_code:this.$store.state.courseInfo.C_code,
                H_id: this.$store.state.comitHomework.H_id,
                deadline:this.$store.state.comitHomework.DeadLine,
                type:this.$store.state.comitHomework.Type
            }
        },
        methods:{
            nav(index){
                this.navIndex = index
            },
            /*加入文件后*/
            fileChange(file, fileList) {
                let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)//如果文件名重复
                if (existFile) {
                    this.$message.error('当前文件已经存在!');
                    fileList.pop()
                }
            },
            /*on-remove：文件列表移除文件时的钩子*/
            removeFile(file, fileList) {
                this.fileList = fileList
            },
            // 上传前对文件的大小和类型的判断
            beforeAvatarUpload(file) {
                const extension = file.name.split(".")[1] === "doc";
                const extension2 = file.name.split(".")[1] === "docx";
                const extension3 = file.name.split(".")[1] === "txt";
                if (!extension && !extension2 && !extension3) {
                    this.$message({
                        message: '上传文件只能是 doc、docx、txt 格式!',
                        type: 'error'
                    });
                }
                return extension || extension2 || extension3 ;
            },
            //表单提交
            submitUpload() {
                //触发组件的action
                this.$refs.upload.submit();
            },
            /*发布作业*/
            uploadSectionFile(params) {
                const file = params.file
                // 根据后台需求数据格式
                const form = new FormData();
                // 文件对象
                form.append("file", file);
                // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
                form.append('H_id', this.$store.state.comitHomework.H_id);        /*所属作业码*/
                form.append('account', this.$store.state.account);        /*学生*/
                // 项目封装的请求方法，下面做简单介绍
                post('/StuFileUpload',form)
                    .then(res => {
                        console.log(res);
                        if (res.data.success==true) {
                            this.$router.back()
                            this.$message.success('发布成功')
                            this.onCancel()
                        } else {
                            this.$message.error('发布失败')
                        }
                    })
                    .catch(() => {
                        // xxx
                    });
            } ,
        },
        mounted() {
            /*请求该作业文件说明文档*/
        }
    }
</script>

<style scoped>
  .nav-menu-item {
    margin: 18px 5px;
  }
  .nav-menu-item {
    margin: 18px;
    display: inline-block;
    vertical-align: middle;
    color: #FFF;
    position: relative;
    height: 32px;
    line-height: 32px;
  }
  .nav-menu-item a {
    padding-bottom: 22px;
    padding-right: 7px;
  }
  .nav-menu-item a.active {
    color: black;
    border-bottom: 4px solid #2C58AB;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
  }
  .nav-menu-item a {
    color: #5F6368;
  }
  .nav-menu-item a {
    font-size: 16px;
  }
  .company {
    margin: 100px auto 24px;
    border-radius: 8px;
    border: 1px solid rgba(218,220,224,1);
    padding: 24px;
    box-sizing: border-box;
  }
  .cWidth-new {
    width: 1224px;
  }
  .homeInfo{
    width: 1224px;
    margin: 0px auto 10px;
  }
  .description {
    color: #707070;
    overflow: hidden;
    line-height: 1.8;
    font-size: 14px;
    margin-bottom: 30px;
    margin-top: 10px;
    clear: both;
  }
  p {
    font-size: 12px;
    padding: 0 5px;
    line-height: 20px;
    margin-right: 10px;
    margin-bottom: 40px;
    background-color: #F1F3F4;
    color: #5F6368;
    border-radius: 2px;
  }
  .container-body{
    width: 1224px;
    margin: 0px auto;
  }
  .homework-box {
    width: 1224px;
    margin: 20px auto;
    border: 1px solid #E2E6ED;
    background: #FFF;
    border-radius: 8px;
  }
  .sc-tj-box-new {
    width: 330px;
    height: 80px;
    border: 2px dashed #CCC;
    margin: 13px 0 24px 24px;
    line-height: 40px;
  }
  .sc-tj i {
    width: 36px;
    height: 36px;
    line-height: 36px !important;
    background: rgba(50,186,240,1);
    border-radius: 50%;
    display: block;
    text-align: center;
    font-size: 16px !important;
    color: #fff !important;
    margin: 22px 13px 0px 30px;
    float: left;
  }
  .shangchuan {
    width: 250px;
    float: left;
  }
  .sc-tj-box .sc-tj .sc-btn {
    cursor: pointer;
    font-size: 14px;
    margin-top: 20px;
    line-height: 26px;
    color: #1F2023;
  }
  .sc-tj-box .sc-tj a {
    display: inline-block;
    font-size: 14px;
    text-align: center;
    border-radius: 3px;
  }
  .shangchuan span {
    color: #999;
    font-size: 12px;
    display: block;
    line-height: 12px;}
</style>
