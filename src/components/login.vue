<template>
    <div id="login">
        <div class="login-bg">
        <div class="login-box">
            <div class="title items">
                <a @click="dindex(1)" :class="{'active':index==1}">账号登录</a>
                <a @click="dindex(2)" :class="{'active':index==2}">手机短信登录</a>
                <a href="javascript:;">微信登录</a>
            </div>
            <div class="center">
                <div class="padding-cont pt-login " v-show="index==1">
                    <div class="input" style="margin-top: 0;">
                        <span style="display: none;">账号：</span>
                        <input type="text" autocomplete="off" v-model="account" placeholder="邮箱/账号/手机号">
                    </div>
                    <div class="input">
                        <span style="display: none;">密码：</span>
                        <input type="password" autocomplete="off" v-model="password" placeholder="密码" @keyup.enter="login('pt-log')">
                    </div>
                    <el-radio v-model="radio" label="1">教师/助教</el-radio>
                    <el-radio v-model="radio" label="2">学生</el-radio>
                    <div class="opt clearfix">
                        <a href="javascript:;" class="auto-login fl"><el-checkbox v-model="checked">下次自动登录</el-checkbox></a>
                        <a class="forget fr">忘记密码？</a>
                    </div>
                    <a @click="login('pt-log')" class="btn-btn">登录</a>
                    <a href=""  class="btn-register" @click="toRegister()">
                        <span class="str1">还没有账号？</span>
                        <span class="str2">去注册</span>
                    </a>
                </div>

                <div class="padding-cont tel-login" v-show="index==2">
                    <div class="input">
                        <span style="display: none;">手机号：</span>
                        <input type="text" autocomplete="off" v-model="tel" placeholder="手机号">
                    </div>
                    <div class="yzm-box clearfix">
                        <div class="input fl short">
                            <span style="display: none;">验证码：</span>
                            <input type="text" autocomplete="off" v-model="code" placeholder="验证码">
                        </div>
                        <a href="javascript:;" class="get-yzm">获取验证码</a>
                    </div>
                    <div class="opt clearfix">
                        <a href="javascript:;" class="auto-login fl"><el-checkbox v-model="checked">下次自动登录</el-checkbox></a>
                        <a href="" class="forget fr">忘记密码？</a>
                    </div>
                    <a @click="login('pt-tel')" class="btn-btn">登录</a>
                    <a href="" class="btn-register" @click="toRegister()">
                        <span class="str1">还没有账号？</span>
                        <span class="str2">去注册</span>
                    </a>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import {request} from '../axios'
    export default {
        name: "login",
        data(){
            return{
                radio:'1',
                account:'',
                password:'',
                tel:'',
                code:'',
                index:1,
                checked:false
            }
        },
        methods:{
            dindex(index){
                this.index=index
            },
            toRegister(){
                this.$router.push('/register')
            },
            test(){
                var obj = {
                    ifLogin : true,
                    account:'12345',
                    userName:'123'
                }
                this.$store.commit('updateIsLogin',obj)
                this.$router.push('/student')
            },
            login(type){
                var user = this.radio=='1'? 'teacher':'student';
                if (type=='pt-log'||type==null){
                    var telreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (this.account==''||this.password==''){
                        alert("账号和密码不能为空")
                        return;
                    }
                    if (!telreg.test(this.account)&&(!emailreg.test(this.account))){
                        alert("请输入正确的邮箱或者手机账号")
                        return;
                    }
                    //调用request方法
                    request('/Login',
                       {
                            user:user,
                            account:this.account,
                            password:this.$md5(this.password),
                        }
                    ).then(res=>{
                        if (res.data.success==true){
                            var obj = {
                                account:this.account,
                                userName:res.data.userName,
                                ifLogin:true,
                                userType:user
                            }
                            this.$store.commit('updateIsLogin',obj)
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            if (user=='teacher'){
                                this.$router.replace('/teacher')
                            }else {
                                this.$router.replace('/student')
                            }
                        }else{
                            this.$message.error('账号或密码错误');
                        }

                    })
                    //调用then跳转到
                }else {
                    //通过验证码登录
                }
            }
        }
    }
</script>

<style scoped>
    #login{
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        margin: 0px 0px;
        padding: 0px 0px;
        background: url("../images/login/login-bg2-01.jpg");
    }
    .login-box{
        width: 480px;
        height: 562px;

        display: block;
        box-shadow: 0 3px 5px rgba(0,0,0,.2);
        margin-top: 50px;
        background: #FFF;
        margin-left: auto;
        margin-right: auto;
        border-radius: 4px;

        position: relative;
    }

    .login-box .items {
        font-size: 0;
        padding-top: 47px;
        padding-left: 41px;
        padding-bottom: 58px;
    }

    .login-box .items a:nth-child(2)::before {
        left: 0;
    }
    .login-box .items a:nth-child(2)::after, .login-box .items a:nth-child(2)::before {
        content: "";
        position: absolute;
        top: 50%;
        height: 16px;
        width: 1px;
        margin-top: -8px;
        background: #E2E6ED;
    }

    .login-box .items a.active {
        font-size: 26px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(59,61,69,1);
    }
    .login-box .items a:first-child {
        padding-left: 0;
    }
    .login-box .items a {
        font-size: 16px;
        color: #5F6368;
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
        padding: 0 15px;
        padding-left: 15px;
    }

    .login-box, .login-box .items a:nth-child(2) {
        position: relative;
    }
    .login-box .items a {
        font-size: 16px;
        color: #5F6368;
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
        padding: 0 15px;
    }

    .hide{
        display: none;
    }

    .login-bg{
        background: rgba(20,27,47,.6);
        position: fixed;
        top: 0;
    }
    .login img, .login-bg {
        width: 100%;
        height: 100%;
    }

    .login-box .padding-cont {
        padding: 0 30px 60px;
    }

    .login-box .input {
        position: relative;
        margin-bottom: 24px;
        height: 64px;
        border-radius: 4px;
        border: 1px solid rgba(226,230,237,1);
        box-sizing: border-box;
        transition: border .3s;
    }
    .login-box .input input {
        width: 95%;
        height: 100%;
        float: left;
        font-size: 16px;
        padding-left: 12px;
    }
    .login-box .opt {
        padding: 20px 0;
        height: 24px;
        line-height: 24px;
    }
    .login-box .opt .auto-login {
        font-size: 12px;
        color: #818181;
        padding-left: 20px;
    }
    .fl {
        float: left;
    }

    .login-box .opt .forget {
        font-size: 12px;
        color: #818181;
    }
    .fr {
        float: right;
    }
    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }
    .login-box .btn-btn {
        display: block;
        height: 50px;
        line-height: 50px;
        background: #32BAF0;
        text-align: center;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        margin-top: 25px;
    }
    .login-box .btn-register {
        padding: 15px 0;
        text-align: right;
        display: block;
    }
    a {
        text-decoration: none;
        outline: 0;
        blr: expression(this.onFocus=this.blur());
    }
    .login-box .tel-login .yzm-box .input {
        width: 260px;
    }
    .login-box .tel-login .yzm-box .get-yzm {
        float: right;
        width: 126px;
        height: 62px;
        box-sizing: border-box;
        text-align: center;
        line-height: 62px;
        border: 1px solid #DCDCDC;
        background: #F2F2F2;
        border-radius: 3px;
        color: #818181;
    }
</style>
