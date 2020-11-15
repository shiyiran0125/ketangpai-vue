<template>
  <div>
        <el-container>
        <el-aside v-show="leftshow" width="350px" style="position: absolute">
          <div class="nav-top">
            <a class="leftnavclass" @click="toTeacher()"><i class="el-icon-s-home"></i><i class="iconfont iconketang"></i>课堂</a>
            <a class="leftnavresource"><i class="el-icon-document"></i><i class="iconfont iconbeikequ"></i>备课区</a>
            <a class="leftnavletter"><i class="el-icon-chat-dot-round"></i><i class="iconfont iconsixin2"></i><b>私信</b></a>
          </div>
          <div class="open-box" style="top: -58.9744px;">
            <p class="myteachp">教授的课程 ({{totalCourse.length}})</p>
            <div class="listmyteachbox" style="height: 256px; display: block;">
              <div class="list listmyteach" style="top: 0px;">
                <a @click="toCourseInfo(item)" :title="item.C_name" v-for="(item,index) in totalCourse" :key="index">
                  <i>{{item.C_name.toString()[0]}}</i>
                  <span>{{item.C_name}}<div></div></span>
                </a>
              </div>
            </div>
          </div>
        </el-aside>
        <el-container style="margin-top: -8px;width: 100%" >
          <el-header>
            <ul class="nav-menu-left">
              <li class="nav-menu-item">
                <a @click="leftshow=!leftshow"><i class="el-icon-s-unfold" style="margin-top: 20px;margin-left: 50px;margin-right: 30px"></i></a>
              </li>
              <li class="nav-menu-item">
                <p style="color: #32BAF0"><router-link to="/teacher">
                <a style="margin-right: 10px">课堂</a></router-link><span>&gt;</span>{{course.C_name}}&nbsp;{{course.C_cname}}
                </p>
              </li>
            </ul>
            <ul class="nav-menu-right" @click="hideLeft()">
              <li class="nav-menu-item tool">
                <a @click="settoolshow()"><i class="toolicon"></i>工具</a>
                <span ></span>
                <ul v-show="toolshow">
                  <li>
                    <a href="/PaperCheckrepeat/index.html">
                      <i class="for-duplicates" title="论文查重">论文查重</i>
                    </a>
                  </li>
                  <li class="sjcz">
                    <a>
                      <i class="sjczicon" title="学术存证">学术存证</i>
                    </a>
                  </li>
                  <li>
                    <a>
                      <i class="addteacher" title="邀请教师">邀请教师</i>
                    </a>
                  </li>	</ul>
              </li>

              <li class="nav-menu-item ico notice nav-mian-margin">
                <a id="notice" @click="setnotice()">
                  <i class="iconfont iconxiaoxi1"><i class="el-icon-bell"></i></i>
                  <!-- <b>消息</b> -->
                </a>
                <div class="notice-ct notice-new-ct" v-show="noticeshow==true">
                  <p class="zw">暂无新通知</p>
                  <div class="bt-bar">
                    <div class="more operation-more">
                      <a id="ignore-all" class="operation-more-ingoreall" href="javascript:void(0);">全部标记已读</a>
                      <a class="link operation-more-ink" href="/Message/index.html">查看全部</a>
                    </div>
                  </div>
                </div>
              </li>        <!-- 缺少class user -->
              <li class="nav-menu-item user">
                <a id="user" @click="setUserMenu()">
                  <img class="avatar" src="http://www.ketangpai.com/Public/Common/img/40/25.png" :alt="this.$store.state.userName" :title="this.$store.state.userName">
                </a>
                <div class="user-info" v-show="userMenushow">
                  <ul>
                   <li>
                    <a  style="color: rgb(45, 45, 45);">个人设置</a>
                  </li><li>
                    <a style="color: rgb(45, 45, 45);">邀请记录</a>
                  </li><li>
                    <a style="color: rgb(45, 45, 45);" @click="dropDown">退出账户</a>
                  </li>
                  </ul>
                </div>
              </li>
            </ul>
          </el-header>
          <el-main>
            <div id="course-header" class="topbox cl">
              <a id="selecttheme" href="javascript:void(0);">更改背景</a>
              <div class="topm cl">
                <h1 style="padding-top: 0;padding-bottom: 5px">{{course.C_name}}<i></i></h1>
                <h2>{{course.C_cname}}</h2>
                <div class="box-box">
                  <div class="sele" id="course-qrcode" data-abc="TCXAZF">
                    <div class="qrcode fl"></div>
                    <div class="infotextmain">加课二维码</div>
                  </div>
                  <div class="sele" id="course-code-select" :data-abc="course.C_code" style="margin-left:10px;">
                    <div class="infotextmain" style="padding-left:10px;">加课码:</div>
                    <div class="codetext">{{course.C_code}}</div>
                    <i class="el-icon-arrow-down" @click="codeMenushow()"></i>
                    <div class="selecon cl" v-show="course.codeMenushow">
                      <ul>
                        <li><a @click="hideCodeuse(course)" v-show="course.codeuse">停用</a></li>
                        <li class="hide2"><a @click="hideCodeuse(course)" v-show="!course.codeuse">启用</a></li>
                        <li><a v-show="course.codeuse">重置</a></li>
                      </ul>
                    </div>
                  </div>
                  <ul style="float:left;">
                    <router-link :to="{path:'/courseMenbers',query:{C_code:course.C_code,C_name:course.C_name}}"><li class="li3"><a><i class="iconfont"></i><i class="el-icon-user-solid"/>成员1</a></li></router-link>
                    <li class="li0"><a><i class="iconfont"></i><i class="el-icon-s-data"/>数据分析</a></li>
                    <li class="li4">
                    <a><i class="iconfont"></i><i class="el-icon-document-checked"/>成绩</a>
                    </li>
                  </ul>
                  <div class="coursedatabox" style="float: right">
                    <div class="coursedata">
                    <ul>
                      <li>0</li>
                      <li style="margin-left: -16px">互动个数</li>
                    </ul>
                    <ul>
                      <li>{{this.$store.state.homeworkNumber}}</li>
                      <li style="margin-left: -16px">发布作业</li>
                    </ul>
                    <ul>
                      <li>0</li>
                      <li style="margin-left: -16px">发布测试</li>
                    </ul>
                  </div></div>
                </div>
              </div>
            </div>
            <template>
              <div style="margin: 0px auto;width: 1220px;font-weight: 500;">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#E9EEF3">
                  <el-menu-item index="1"><router-link to="/courseInfo/eachtalk">课堂互动</router-link></el-menu-item>
                  <el-menu-item index="2"><router-link to="/courseInfo/tHomework">作业</router-link></el-menu-item>
                  <el-menu-item index="3"><router-link to="/courseInfo/topic">话题</router-link></el-menu-item>
                  <el-menu-item index="4">资料</el-menu-item>
                  <el-menu-item index="5">测试(考试)</el-menu-item>
                  <el-menu-item index="6">公告</el-menu-item>
                </el-menu>
              </div>
            </template>
          </el-main>
          <template>
            <div style="margin: 0px auto;width: 1220px;">
              <router-view :C_code="course.C_code" :C_name="course.C_name" v-if="isRouterAlive"></router-view>
            </div>
          </template>
        </el-container>
      </el-container>
  </div>
</template>
<script>
  import {request} from "../../axios";
  export default {
        name: "courseInfo",
        data() {
            return {
                activeIndex: '2',
                activeName:'first',
                userMenushow:false,
                noticeshow:false,
                toolshow:false,
                leftshow:false,
                isRouterAlive:true,
                course:{},
                totalCourse:[]
            };
        },
      computed: {
          key() {
              return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
          }
      },
      methods:{
            /*tool menu*/
            settoolshow(){
                this.toolshow = !this.toolshow
            },
            /*notice menu*/
            setnotice(){
                this.noticeshow = ! this.noticeshow
            },
            /*退出账户*/
            dropDown(){
                this.$store.state.user_account = ''
                this.$store.state.userName = ''
                this.$store.state.isLogin = false
                this.$router.replace('/login')
            },
            /*user menu*/
            setUserMenu(){
                this.userMenushow = ! this.userMenushow
            },
            /*left menu*/
            hideLeft(){
                this.leftshow = false
            },
            toTeacher(){
                this.$router.push('/teacher')
            },
            /*codeMenu show*/
            codeMenushow(){
                this.course.codeMenushow = ! this.course.codeMenushow
            },
            /*加课码启用停用*/
            hideCodeuse(item){
                if (item.codeuse){
                    /*停用*/
                    request('/CourseCode',{
                        use:false,
                        C_code:item.C_code
                    }).then(res=>{
                        if (res.data.success==true){
                            this.$message.success('停用成功')
                        }
                    })
                }else{
                    /*启用*/
                    request('/CourseCode',{
                        use:true,
                        C_code:item.C_code
                    })
                }
                item.codeuse = !item.codeuse
            },
            /*导航到详情页*/
            toCourseInfo(item){
                /* this.$store.state.courseInfo = item*/
                /*this.$store.commit('updateInfo',item)*/
                this.course = item
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            }

        },
      watch: {
          $route (to, from) {
              this.$router.go(0)
          }
      },
      mounted() {
            this.totalCourse = this.$store.state.totalCourse
            this.course = this.$store.state.courseInfo
        }
    }
</script>

<style scoped>
  .el-header{
    width: 100%;
    position: fixed;
    top: 0;
    background: #fff;
    padding-right: 5%;
    box-sizing: border-box;
    z-index: 5;
    font-size: 16px;
  }
  .el-aside {
    position: fixed;
    left: 0px;
    top: 0;
    height: 100%;
    width: 350px;
    background: #fff;
    z-index: 1000;
    box-shadow: 6px 0 12px 0 rgba(0,0,0,.12);
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .nav-menu-left {
    margin-left: 0;
    margin-top: 5px;
  }
  .nav-menu-left {
    float: left;
  }
  ul {
    margin: 0px;
    padding: 0;
  }
   li{
    float: left;
    list-style: none;
  }
  a {
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    color: #5A5A5A;
  }

  li{
    list-style: none;
  }

  .nav-menu-right {
    position: absolute;
    right: 50px;
    margin-top: 5px;
  }
  .nav-menu-right {
    margin-right: 0;
    float: right;
  }

  .nav-menu-item.tool {
    margin-top: 20px;
  }
  .tool .toolicon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../images/teacher/tool_icon.png) 0/25px no-repeat;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -5px;
  }
  .tool ul {
    display: block;
    padding: 8px 0;
    background: #FFF;
    box-shadow: 0 0 20px rgba(0,0,0,.35);
    position: absolute;
    width: 120px;
    z-index: 3;
    top: 50px;
  }
  .tool ul::before {
    content: '';
    display: block;
    position: absolute;
    top: -24px;
    width: 0;
    height: 0;
    border-width: 12px;
    border-style: dashed dashed solid;
    border-color: transparent transparent #fff;
  }

  .tool ul, .tool ul::before {
    left: 50%;
    transform: translateX(-89%);
  }
  .tool ul li {
    padding: 3px 10px;
  }
  .nav-menu-item.tool li a {
    padding: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .for-duplicates {
    display: inline-block;
    background: url(../../images/teacher/paperrepeaticon.png) 0 1px/32px no-repeat;
    padding-left: 35px;
    font-style: normal;
    color: rgba(95,99,104,1);
  }
  .for-duplicates{
    height: 32px;
    line-height: 32px;
  }
  .tool .sjcz i{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    background: url(../../images/teacher/sjczicon.png) -3px/40px no-repeat;
    padding-left: 35px;
    font-style: normal;
    color: rgba(95,99,104,1);
  }
  .addteacher {
    background: url(../../images/teacher/addteacher1.png) -5px/44px no-repeat;
    padding-left: 35px;
  }
  .addteacher{
    display: inline-block;
    font-style: normal;
    color: rgba(95,99,104,1);
  }
  .addteacher{
    height: 32px;
    line-height: 32px;
  }
  .nav-menu-item.ico, .nav-menu-item.search {
    margin-right: 10px;
  }
  #notice {
    position: relative;
  }
  .nav-menu-item #notice i {
    height: 32px;
    line-height: 61px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .iconfont.iconxiaoxi1 {
    font-size: 25px;
    color: #5F6368;
  }
  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
  }


  .nav-menu-item.notice .notice-ct {
    z-index: 10;
    position: fixed;
    right: 20px;
    top: 60px;
    background: #FFF;
    width: 343px;
    border: 1px solid #DCDCDC;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    border-radius: 5px;
  }
  .hide {
    display: none;
  }
  .nav-menu-item.notice .notice-ct .zw {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #2d2d2d;
    font-size: 16px;
    min-height: 260px;
  }
  .nav-menu-item .bt-bar, .nav-menu-item .th-bar {
    line-height: 30px;
    overflow: hidden;
    font-size: 12px;
    width: 100%;
    height: 44px;
    background: #f2f2f2;
    border-radius: 5px;
  }
  .nav-menu-item .bt-bar .more {
    text-align: center;
  }
  .bt-bar .operation-more .operation-more-ingoreall {
    text-indent: 42px;
  }
  .bt-bar .operation-more .operation-more-ink {
    float: right;
    margin-right: 42px;
  }
  .bt-bar .operation-more a {
    float: left;
    display: block;
    height: 15px;
    font-size: 16px;
    line-height: 50px;
    color: #999;
  }

  .nav-menu-item.user {
    margin: 16px 0px;
  }

  .nav-menu-item.user > a {
    padding-right: 0;
    position: relative;
  }
  .nav-menu-item.user > a {
    display: block;
    float: left;
  }
  .nav-menu-item.user > a img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: -3px;
    background-image: url(../../images/teacher/25.png);
    background-repeat: no-repeat;
    background-position: center;
  }
  .user-info {
    position: absolute;
    width: 160px;
    padding: 8px 0;
    left: 25px;
    top: 65px;
    text-align: center;
    z-index: 10;
    background: #FFF;
    box-shadow: 0 0 20px rgba(0,0,0,.35);
  }
  .user-info::before {
    top: -24px;
    right: 22px;
    border-width: 12px;
    border-style: dashed dashed solid;
    border-color: transparent transparent #fff;
  }
  .user-info::before {
    width: 0;
    height: 0;
    position: absolute;
    display: block;
    content: '';
  }
  .user-info ul li {
    line-height: 40px;
    font-size: 14px;
  }
  .nav-menu-item.user .user-info ul li a {
    color: #2D2D2D;
    display: block;
    font-size: 14px;
    text-align: left;
    padding-left: 50px;
    background-image: url(../../images/course/user-info-icon-bg.png);
    background-repeat: no-repeat;
  }
  .nav-menu-item.user .user-info ul li a:hover{
    background-color: rgba(255,255,255,0.45);
    display: block;
  }

  /*左边的菜单*/
  .nav-top {
    padding: 9px 0;
  }
  .nav-top a {
    display: block;
    height: 50px;
    line-height: 50px;
    color: #1F2023;
    padding: 0 30px;
    background-position: 33px;
    background-repeat: no-repeat;
  }
  .nav-top a:hover,.open-box a:hover{
    background-color: gray;
    opacity: 0.55;
  }
  a {
    text-decoration: none;
    outline: 0;
  }
  .nav-top a i {
    font-size: 18px;
    padding-right: 10px;
    display: inline-table;
  }
  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
  }
  .open-course {
    width: 350px;
  }
  .leftcon .listmystudybox, .leftcon .listmyteachbox, .leftcon .open-course {
    position: relative;
    overflow: hidden;
  }
  .open-course .open-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 350px;
  }
  p div{
    margin: 0;
    padding: 0;
  }
   .open-box p {
    color: #5F6368;
    font-size: 12px;
    height: 46px;
    line-height: 46px;
    padding-left: 25px;
    cursor: pointer;
  }
  .open-box .list a span {
    font-size: 14px;
    vertical-align: middle;
    width: 214px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  a{
    cursor: pointer;
  }
  .open-box .list a {
    display: block;
    height: auto;
    line-height: 24px;
    width: 290px;
    padding: 10px 25px;
    color: #1F2023;
  }
  .open-box .list a i {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 20px;
    background-color: #2C58AB;
    border-radius: 50%;
    font-style: normal;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }

  /*main*/
  .topbox {
    margin: 105px auto 0;
    background: url('../../images/course/02.png') 0 center no-repeat;
    background-size: auto;
    width: 1224px;
    background-size: cover;
    height: 200px;
    border-radius: 8px 8px 0 0;
    padding: 2px 0 0 40px;
    box-sizing: border-box;
  }
  .topbox, .topm .box-box, .topm .sele {
    position: relative;
  }
  #course-header #selecttheme {
    color: #FFF;
    background: url('../../images/course/theme.png') 0 no-repeat;
    position: absolute;
    top: 18px;
    right: 15px;
    padding-left: 30px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    outline: 0;
    blr: expression(this.onFocus=this.blur ());
  }
  .topm h1 {
    text-align: left;
    padding-top: 22px;
    font-size: 36px;
    color: #fff;
  }
  .topm h1, .topm h2 {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .topm{
     height: 131px;
  }
  .topm h1 i {
    width: 24px;
    height: 24px;
    background: url('../../images/course/edit-course.png') 0/24px no-repeat;
    cursor: pointer;
    margin-left: 15px;
  }
  .coursemembers, .topm .sele, .topm h1 i {
    display: inline-block;
  }
  .topm h2 {
    font-size: 20px;
    font-family: PingFang SC;
    color: rgba(255,255,255,1);
    line-height: 28px;
    width: 600px;
    margin-top: 0px;
    text-align: left;
  }
  .topm h1, .topm h2 {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0px;
  }
  .topm .box-box {
    height: 35px;
    margin: 20px auto 0;
  }
  .topm .sele {
    font-size: 15px;
    color: #fff;
    text-align: left;
    height: 24px;
    line-height: 24px;
    background-position: 100px 10px;
    background-size: 14px auto;
    cursor: pointer;
    user-select: none;
    background: rgba(255,255,255,.4);
    border-radius: 2px;
    padding-right: 10px;
    display: inline-block;
    float: left;
  }
  .topm .sele .qrcode {
    background: url('../../images/courseInfo/qrcodehover.png') center no-repeat;
    background-size: auto;
    width: 24px;
    background-size: 16px;
  }
  .topm .sele .codetext, .topm .sele .qrcode {
    display: inline-block;
    line-height: 24px;
    height: 24px;
  }
  .fl {
    float: left;
  }
  .infotextmain {
    display: inline-block;
    color: #fff;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
  }
  .topm .sele .codetext {
    font-size: 12px;
  }
  .topm .selecon {
    position: absolute;
    z-index: 11;
    top: 33px;
    right: 0;
    width: 126px;
    padding: 5px 0;
    border: 1px solid #dcdcdc;
    background: #fff;
  }
  .topm .selecon ul {
    padding: 0;
    margin: 0;
    width: 100%;
    float: left;
  }
  .topm ul, .topm ul li {
    display: inline-block;
  }
  .ktpx1 .selecon ul li, .topm .selecon ul li {
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    height: 24px;
    line-height: 44px;
    color: #2c2c2c;
    font-size: 14px;
    cursor: pointer;
  }
  .topm ul li {
    margin-left: 10px;
    position: relative;
    background: rgba(255,255,255,.4);
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  .ktpx1 .selecon ul li a, .topm .selecon ul li a {
    padding: 0;
    margin: 0;
    cursor: pointer;
    line-height: 44px;
    color: #2c2c2c;
    display: block;
    width: 100%;
    height: 44px;
    text-align: center;
  }
  .topm ul li a {
    font-size: 12px;
    display: block;
  }
  .topm ul li a{
    color: #fff;
    font-weight: lighter;
  }
  .coursedatabox .coursedata {
    margin-right: 30px;
  }
  .coursedatabox .coursedata ul {
    margin-top: -50px;
    width: 110px;
  }
  .topm ul, .topm ul li {
    display: inline-block;
  }
  .coursedatabox .coursedata ul li:first-of-type {
    font-size: 40px;
    line-height: 48px;
    height: 50px;
  }
  .coursedatabox .coursedata ul li:first-of-type, .noopened-vip > i {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
  }
  .coursedatabox .coursedata ul li {
    background: 0 0;
  }
  .coursedatabox .coursedata ul li + li {
    font-size: 12px;
    line-height: 16px;
    width: 80px;
  }
  .coursedatabox .coursedata ul li + li, .coursedatabox .coursedata ul li:first-of-type, .noopened-vip > i {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
  }
  .coursedatabox .coursedata ul li {
    background: 0 0;
  }
  .coursedataleft{
    margin-left: -16px;
  }
</style>
