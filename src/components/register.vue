<template>
     <div id="register">
      <div class="card" v-show="index==1">
        <el-card :body-style="{width: '480px',height: '504px'}">
            <h3>注册账号</h3>
            <p style=" margin-top: 20px; color: #707070;">请选择您在日常教学中的实际身份</p>
            <div class="choose">
                <a class="teacher" @click="jump(2)">
                    我是老师/助教
                </a>
                <a class="student" @click="jump(3)">
                    我是学生
                </a>
            </div>
            <a class="btn-login" @click="toLogin()">
                <span class="str1" >已有账号？</span>
                <span class="str2">去登录</span>
            </a>
        </el-card>
      </div>

         <div class="teacher-card" v-show="index==2">
             <el-card :body-style="{width: '410px',height: '538.6px',padding: '0px 25px'}">
                 <a class="return" @click="jump(1)"></a>
                 <h3 class="fl">老师/助教注册</h3>
                 <el-form :model="formteacher">
                     <el-form-item >
                         <el-input v-model="formteacher.account" placeholder="邮箱/手机号"></el-input>
                     </el-form-item>
                     <el-form-item >
                         <el-input show-password v-model="formteacher.password" placeholder="密码"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-input show-password v-model="formteacher.repassword" placeholder="确认密码"></el-input>
                         <p style="color: red" v-show="formteacher.password!=formteacher.repassword&&formteacher.repassword!=''">两次输入的密码不一致</p>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="formteacher.name" placeholder="姓名"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="formteacher.school" placeholder="学校"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-col :span="14">
                         <el-input v-model="formteacher.code" placeholder="验证码" ></el-input>
                         </el-col>
                             <a><img class="verify" src="../images/register/verify.html.png" style="width: 157px;height: 50px;float: right;"/>
                         </a>
                     </el-form-item>
                     <a @click="regist('teacher')" class="btn-btn">注册为老师/助教</a>
                     <a class="btn-login" style="margin-top: -15px;margin-right: 0px" @click="toLogin()">
                         <span class="str1">已有账号？</span>
                         <span class="str2">去登录</span>
                     </a>
                 </el-form>
             </el-card>
         </div>

         <div class="teacher-card" v-show="index==3">
             <el-card :body-style="{width: '410px',height: '598.6px',padding: '0px 25px'}">
                 <a class="return" @click="jump(1)"></a>
                 <h3 class="fl">学生注册</h3>
                 <el-form :model="formstudent">
                     <el-form-item >
                         <el-input v-model="formstudent.account" placeholder="邮箱/手机号"></el-input>
                     </el-form-item>
                     <el-form-item >
                         <el-input show-password v-model="formstudent.password" placeholder="请输入大于6个字符的密码"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-input show-password v-model="formstudent.repassword" placeholder="确认密码"></el-input>
                       <p style="color: red" v-show="formstudent.password!=formstudent.repassword&&formstudent.repassword!=''">两次输入的密码不一致</p>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="formstudent.name" placeholder="姓名"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="formstudent.school" placeholder="学校"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-input v-model="formstudent.sid" placeholder="请输入11位数的学号"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-col :span="14">
                             <el-input v-model="formstudent.code" placeholder="验证码" ></el-input>
                         </el-col>
                         <a><img class="verify" src="../images/register/verify.html.png" style="width: 157px;height: 50px;float: right;"/>
                         </a>
                     </el-form-item>
                     <a @click="regist('student')" class="btn-btn">注册为学生</a>
                     <a class="btn-login" style="margin-top: -15px;margin-right: 0px" @click="toLogin()">
                         <span class="str1">已有账号？</span>
                         <span class="str2">去登录</span>
                     </a>
                 </el-form>
             </el-card>
         </div>

     </div>

</template>

<script>
    import {request} from '../axios'
    export default {
        name: "register",
        data() {
            return {
                passunit:false,
                index:1,
                currentDate: new Date(),
                formteacher:{
                    account:'',
                    password:'',
                    repassword:'',
                    name:'',
                    school:'',
                    code:''
                },
                formstudent:{
                    account:'',
                    password:'',
                    repassword:'',
                    name:'',
                    sid:'',
                    school:'',
                    code:''
                }
            }
        },
        methods:{
            jump(index){
                this.index = index
            },
            toLogin(){
                this.$router.replace("/login")
            },
            isLegal(tag){
                var telreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var s = this.formstudent;
                var t = this.formteacher
                if (tag=='teacher'){
                    if(t.account==''||t.password==''||t.name==''||t.repassword==''||t.school==''||t.code==''){
                        this.$message.error("有空缺信息项")
                        return false;
                    }
                    if (!telreg.test(t.account)&&(!emailreg.test(t.account))){
                        this.$message.error("请输入正确的邮箱或者手机号")
                        return false;
                    }
                    if (t.repassword!=t.password){
                        this.$message.error("两次输入的密码不一致")
                        return false;
                    }
                    if (t.password.length<6){
                        this.$message.error("请输入大于6个字符长度的密码")
                        return false;
                    }
                }else{
                    if(s.account==''||s.password==''||s.sid==''||s.name==''||s.repassword==''||s.school==''||s.code==''){
                        this.$message.error("有空缺信息项")
                        return false;
                    }
                    if (!telreg.test(s.account)&&(!emailreg.test(s.account))){
                        this.$message.error("请输入正确的邮箱或者手机号")
                        return false;
                    }
                    if (s.repassword!=s.password){
                        this.$message.error("两次输入的密码不一致")
                        return false;
                    }
                    if (s.password.length<6){
                        this.$message.error("请输入大于6个字符长度的密码")
                        return false;
                    }
                    if (s.sid.length!=11){
                        this.$message.error("请输入11位数的学号")
                        return false;
                    }
                }
                return true;
            },
            regist(tag){
               if (this.isLegal(tag)) {
                   if (tag == 'teacher') {
                       request('/Register',
                           {
                               user: 'teacher',
                               T_account: this.formteacher.account,
                               T_password: this.$md5(this.formteacher.password),
                               T_name: this.formteacher.name,
                               T_school: this.formteacher.school,
                               T_code: this.formteacher.code
                           }
                       ).then(res => {
                           if (res.data.success == true) {
                               this.$message({
                                       message: '注册成功',
                                       type: 'success'
                                   });
                               this.$router.replace('/login')
                           } else {
                               this.$message.error('该用户已经注册')
                           }
                       })
                   } else {
                       request('/Register',
                           {
                               user: 'student',
                               S_account: this.formstudent.account,
                               S_password: this.$md5(this.formstudent.password),
                               S_name: this.formstudent.name,
                               S_sid: this.formstudent.sid,
                               S_school: this.formstudent.school,
                               S_code: this.formstudent.code
                           }
                       ).then(res => {
                           console.log(res);
                           if (res.data.success == true) {
                               this.$message({
                                   message: '注册成功',
                                   type: 'success'
                               });
                               this.$router.replace('/login')
                           } else {
                               this.$message.error('该用户已经注册')
                           }
                       })
                   }
               }else {
               }
            }
        }
    }
</script>

<style scoped>
    #register{
        position: relative;
        height: 100%;
        background: url("../images/register/bg.jpg");
        background-size: auto;
        background-size: cover;
        overflow: auto;
    }
    .card{
        padding: 30px 30px 0;
    }

    .card{
        width: 545px;
        height: 504px;
        padding: 47px 41px 0;
        background: #FFF;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: rgba(122,122,122,0);
    }

   .card h3{
        font-size: 32px;
        font-weight: 400;
        color: #3b3d45;
    }

    .card .choose{
        margin-top: 70px;
        margin-left: 15px;
    }

    a{
        cursor: pointer;
        text-decoration: none;
        outline: 0;
    }
    .card .choose a{
        display: block;
        width: 330px;
        font-size: 16px;
        color: #fff;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #32BAF0;
        border-radius: 4px;
        margin-left: 90px;
        position: relative;
    }

    .card .choose .teacher{
        margin-bottom: 30px;
    }

    .card .choose a::before{
        content: '';
        position: absolute;
        left: -90px;
        top: 2px;
        width: 60px;
        height: 60px;
        background: url("../images/register/teacher.png");
    }

    .btn-login{
        padding: 15px 0;
        text-align: right;
        display: block;
        margin-right: 50px;
    }
    .btn-login .str1{
        color: #AFB1B3;
    }
    .btn-login .str2{
        color: #32BAF0;
    }

    .teacher-card{
        width: 545px;
        height: 504px;
        padding: 47px 41px 0;
        background: #FFF;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: rgba(122,122,122,.0);
    }
    .return{
        width: 40px;
        height: 40px;
        background: url("../images/register/returnReg.png") no-repeat;
        display: inline-block;
        margin-right: 22px;
        float: left;
    }

    .teacher-card h3{
        line-height: 40px;
        font-size: 32px;
        color: #3B3D45;
        font-weight: 400;
    }

    .teacher-card a{
        cursor: pointer;
        text-decoration: none;
    }
    .teacher-card .btn-btn{
        height: 48px;
        line-height: 48px;
        display: block;
        background: #32BAF0;
        text-align: center;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
    }
    .teacher-card .verify{
        background: url("../images/register/verify.html.png");
    }
</style>
