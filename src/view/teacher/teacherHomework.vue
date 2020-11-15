<template>
  <div>
    <div class="tHomework">
      <div class="center-left">
      <el-button plain @click="publicOneShow()">发布个人作业</el-button>
      <el-button plain @click="publicMulShow()">发布小组作业</el-button>
      </div>
      <div class="center-right">
        <a>
        <i class="el-icon-cloudy"/>
        <i class="el-icon-download"></i>
        <i>下载所有作业</i>
        </a>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="homeworks" v-show="homeworkListShow">
       <homework-item v-for="(item,index) in homeworks" :content="item.Content" :PublicDate="item.Date_issue" :type="item.Type" :title="item.Title" :deadline="item.Deadline" :h_id="item.H_id" :C_name="C_name" :key="index">
         <div class="homework-right-top">
           <span style="float: right;color:gray;font-size: 25px"><a><i class="el-icon-more" @click="hoptionShow(item)"></i></a></span>
           <div class="homework-right-top-option" v-show="item.hoption">
             <ul>
               <li><a @click="showModify(item)">编辑</a></li>
               <li><a @click="deleteHomework(item.H_id)">删除</a></li>
             </ul>
           </div>
         </div>
         <div class="homework-right-buttom">
           <router-link :to="{path:'/correct',query:{H_id:item.H_id,C_name:C_name,H_name:item.Title}}">
           <p class="score">
             <a href="">{{item.Corrected}}</a>
             <a href="" class="green">已批</a>
           </p>
           </router-link>
           <router-link :to="{path:'/correct',query:{H_id:item.H_id,C_name:C_name,H_name:item.Title}}">
           <p class="score">
             <a>{{item.UnCorrected}}</a>
             <a class="grey">未批</a>
           </p>
           </router-link>
           <router-link :to="{path:'/correct',query:{H_id:item.H_id,C_name:C_name,H_name:item.Title}}">
           <p class="score">
             <a>{{item.UnSubmitted}}</a>
             <a class="red">未交</a>
           </p>
           </router-link>
         </div>
       </homework-item>
    </div>
    <div class="personly" v-show="personaly">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="作业名称"></el-input>
        </el-form-item>
        <el-form-item prop="textarea">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="作业简介，作业格式等要求,温馨提醒：word,pdf,txt等文字性的文档，都可以进行查重"
            v-model="form.textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="截止日期" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" @change="getCreateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="满分值" prop="maxScore">
          <el-col :span="2">
            <el-input v-model="form.maxScore"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否查重" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpload(form)">立即发布</el-button>
          <el-button @click="onCancel(form)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="personly modify" v-show="isModifing">
      <el-form ref="modifyForm" :model="modifyForm" label-width="80px">
        <el-form-item prop="name">
          <el-input v-model="modifyForm.Title" placeholder="作业名称"></el-input>
        </el-form-item>
        <el-form-item prop="textarea">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="作业简介，作业格式等要求,温馨提醒：word,pdf,txt等文字性的文档，都可以进行查重"
            v-model="modifyForm.textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="截止日期" prop="date">
          <el-col :span="11">
            <el-date-picker type="date" v-model="modifyForm.date" @change="getModifyTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="满分值" prop="maxScore">
          <el-col :span="2">
            <el-input v-model="modifyForm.maxScore"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否查重" prop="delivery">
          <el-switch v-model="modifyForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyHomework()">保存</el-button>
          <el-button @click="isModifing = false;homeworkListShow = true">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="multiply" v-show="mulitiply">
        <i class="el-icon-error"/>对不起该功能暂未开放
    </div>
  </div>
</template>

<script>
  import {post} from "../../axios";
  import {request} from "../../axios";
  import homeworkItem from "../../components/homeworkItem";
  export default {
      name: "teacherHomework",
      components:{
          homeworkItem
      },
      props:{
            C_name:{
                type:String,
                default: ''
          },
      },
      data() {
            return {
                C_code:this.$store.state.courseInfo.C_code,
                homeworkListShow:true,/*作业列表展示*/
                isModifing:false,     /*修改界面*/
                publicDate:'',
                personaly:false,
                mulitiply:false,
                rules: {
                    coordinateType: [
                        { required: true, message: '请选择文件中的坐标类型', trigger: 'change' }
                    ],
                },
                fileList:[],
                form: {
                    name: '',
                    textarea:'',
                    date: '',
                    maxScore: '',
                    delivery: false,
                },
                modifyForm: {
                    H_id:'',
                    Title: '',
                    textarea:'',
                    date: '',
                    maxScore: '',
                    delivery: false,
                },
                homeworks:[]
            }
        },
      computed: {
          // 这里定义上传文件时携带的参数，即表单数据
          upData: function() {
              return this.form
          }
      },
        methods:{
            /*个人作业*/
            publicOneShow(){
                this.homeworkListShow = false
                this.mulitiply =false
                this.personaly = !this.personaly
            },
            publicMulShow(){
                this.personaly = false
                this.mulitiply = !this.mulitiply
            },
            /*on-remove：文件列表移除文件时的钩子*/
            removeFile(file, fileList) {
                this.fileList = fileList
            },
            /*加入文件后*/
            fileChange(file, fileList) {
                let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name)//如果文件名重复
                if (existFile) {
                    this.$message.error('当前文件已经存在!');
                    fileList.pop()
                }
            },
            /*重置表单*/
            resetForm(){
                this.personaly = false
                this.mulitiply = false
                this.homeworkListShow = true
                this.$refs.form.resetFields()
            },
            /*得到特定格式发布时间*/
            getModifyTime(val) {
                this.modifyForm.date=val;
            },
            getCreateTime(val) {
                this.form.date=val;
            },
            getDate(){
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentDate = date.getFullYear() + "/" + month + "/" + strDate
                    + "  " + date.getHours() + ":" + date.getMinutes();/*20/06/11 00:19*/
                return currentDate;
            },
            /*作业菜单*/
            hoptionShow(item){
                item.hoption = ! item.hoption
            },
            /*修改界面*/
            showModify(item){
                this.modifyForm.H_id = item.H_id
                this.modifyForm.Title = item.Title
                this.modifyForm.textarea = item.Content
                this.modifyForm.date = item.DeadLine
                this.modifyForm.maxScore = item.Score
                this.homeworkListShow = false
                this.isModifing = true
            },
            /*确定修改作业*/
            modifyHomework(){

                                     /*发送H_Id，C_code,以及作业信息*/
                request('/ModifyHomework',{
                    H_id:this.modifyForm.H_id,
                    Title:this.modifyForm.Title,
                    Content:this.modifyForm.textarea,
                    Deadline:this.modifyForm.date,
                    Score:this.modifyForm.maxScore,
                }).then(res=>{
                    this.$message.success('修改成功')
                })
                                      /*修改本地作业信息*/
                for (var i = 0; i < this.homeworks.length;i++){
                    if (this.homeworks[i].H_id == this.modifyForm.H_id){
                        this.homeworks[i].Title = this.modifyForm.Title
                        this.homeworks[i].Content = this.modifyForm.textarea
                        this.homeworks[i].Deadline = this.modifyForm.date
                        this.homeworks[i].Score = this.modifyForm.maxScore
                        this.isModifing = false
                        this.homeworkListShow = true
                    }
                }
            },
            deleteHomework(H_id){
                  this.$confirm('是否删除该作业?').then(_ => {
                     request('/deleteHomework',{
                         H_id:H_id
                     }).then(res=>{
                         if (res.data.success==true){
                             this.$message.success('删除成功')
                         }else{
                             this.$message.error('删除失败')
                         }
                     })
                  }).catch(_ => {});
            },
            /*发布作业*/
            uploadSectionFile(params) {
                const file = params.file
                // 根据后台需求数据格式
                const form = new FormData();
                // 文件对象
                form.append("file", file);
                // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
                form.append('C_code', this.C_code);        /*所属课程码*/
                form.append('Type', '个人作业');                  /*个人*/
                form.append('Date_issue', this.form.date); /*发布日期*/
                form.append('Title', this.form.name);/*题目*/
                form.append('Content', this.form.textarea);/*内容*/
                form.append('Score', this.form.maxScore);/*满分值*/
                form.append('Deadline', this.form.date);/*截止日期*/
                // 项目封装的请求方法，下面做简单介绍
                post('/FileUpload',form)
                    .then(res => {
                        console.log(res);
                        //自行处理各种情况
                        if (res.data.success==true) {
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
            // 上传前对文件的大小和类型的判断
            beforeAvatarUpload(file) {
                this.form.fileName = file.name;
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
            submitUpload(form) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        //触发组件的action
                        this.$refs.upload.submit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //表单取消
            onCancel(form){
                this.personaly = false
                this.mulitiply = false
                this.homeworkListShow = true
                this.$refs.form.resetFields();
            },
        },
      mounted(){
          var list = [{hoption:false,H_id:1,C_code:'SDEFDS',Type:'1',Date_issue:'20/06/11 00:19',Title:'作业1',Content:'5555',Corrected: 2,Uncorrected: 0,Submitted: 0,Unsubmitted: 33,Deadline: '2020.6.20',Score:100},
              {hoption:false,H_id:2,C_code:'SDEFDS',Type:'1',Date_issue:'20/06/11 00:19',Title:'作业2',Content:'55',Corrected: 3,Uncorrected: 0,Submitted: 0,Unsubmitted: 23,Deadline: '2020.6.23',Score:100},
              {hoption:false,H_id:3,C_code:'SDEFDS',Type:'1',Date_issue:'20/06/11 00:19',Title:'作业3',Content:'55',Corrected: 4,Uncorrected: 0,Submitted: 0,Unsubmitted: 33,Deadline: '2020.6.24',Score:100}]
          request('/GetHomeworkList',{
              C_code:this.C_code,
              user:'teacher'
          }).then(res=>{
              console.log(res);
              list = res.data.homeworkList
              list.forEach(item=>{
                  item.hoption = false
              })
              this.homeworks = list
          })
          this.$store.state.homeworkNumber = this.homeworks.length
      }
  }

</script>

<style scoped>
  .uploadImg {
    width: 100%;
    height: 1.46rem;
    position: relative;
  input {
    width: 1.46rem;
    height: 100%;
    z-index: 1;
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }
  }
  .upload{
    margin-left: -70px;
  }
  .tHomework{
    padding-top: 20px;
    height: 60px;
  }
  .center-left{
     width: 300px;
    float: left;
  }
  .center-right{
    width: 300px;
    float: right;
    margin-top: 10px;
  }
  a{
    color: #5F6368;
    cursor: pointer;
    text-decoration: none;
  }
  .homework-right-top{
       height: 70px;
  }
  .homework-right-buttom{
    position: relative;
    min-width: 290px;
    height: 66px;
    margin-right: 0;
    border: none;
    background: #FFF;
    padding: 0;
    z-index: 2;
  }
   .homework-right-buttom p{

    line-height: 20px;
    text-align: center;
    float: left;
  }
  .homework-right-buttom p a:first-child{
    font-size: 30px;
    height: 44px;
    line-height: 44px;
  }
  .homework-right-buttom p a {
    display: block;
    min-width: 80px;
    padding-left: 15px;
    color: #707070;
    padding-right: 15px;
  }
  .homework-right-top-option{
    border: 1px solid #dcdcdc;
    box-shadow: 1px 2px 4px rgba(0,0,0,.2);
    width: 130px;
    background: #FFF;
    line-height: 25px;
    float: right;
    right: 110px;
  }
  li{
    list-style: none;
  }
  .homework-right-top-option ul li a:hover{
    background-color: rgba(12,12,12,.45);
    display: inline-block;
  }
</style>
