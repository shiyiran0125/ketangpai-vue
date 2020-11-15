<template>
    <div>
      <div class="nav nav-default ">
        <ul class="nav-menu-left">
          <li class="nav-menu-item"><a style="font-size: 26px" @click="goback()"><i class="el-icon-back"/></a></li>
          <li class="nav-menu-item ktplogo ">
            <a @click="goback()">
              <el-button  type="primary" round>{{course_name}}</el-button>
            </a>
          </li>
        </ul>
        <ul style="float: left;margin-top: 0px"><slot name="Bar"></slot></ul>
        <ul class="nav-menu-right">
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
          </li>
          <li class="nav-menu-item user">
            <a id="user" @click="userShow=!userShow">
              <img class="avatar" src="../images/teacher/25.png" :alt="this.$store.state.userName" :title="this.$store.state.userName">
            </a>
            <div class="user-info" v-show="userShow">
              <ul>
                <li>
                <a class="link setting" style="color: rgb(45, 45, 45);">个人设置</a>
              </li><li>
                <a class="link logout"  style="color: rgb(45, 45, 45);" @click="dropDown">退出账户</a>
              </li>
              </ul>
            </div>
          </li>
        </ul>
        <div style="clear: both"></div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "topNavgation",
        props:{
            course_name:'',
        },
        data(){
            return{
                userShow:false,
                toolshow:false,
                noticeshow:false,
            }
        },
        methods:{
            /*退出账户*/
            dropDown(){
                this.$store.state.user_account = ''
                this.$store.state.userName = ''
                this.$store.state.isLogin = false
                this.$router.replace('/login')
            },
            goback(){
                this.$router.back()
            },
            settoolshow(){
                this.toolshow = ! this.toolshow
            },
            setnotice(){
                this.noticeshow = !this.noticeshow
            },
        }
    }
</script>

<style scoped>
  .nav-default {
    margin-left: -8px;
    z-index: 2;
    padding: 0 4%;
    box-sizing: border-box;
    box-shadow: 0 0 10px #ccc;
  }
  .nav-default {
    background-color: #fff;
    color: #FFF;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .nav {
    height: 72px;
  }

  .nav-menu-left {
    margin-left: 0;
    margin-top: 5px;
    padding: 0px;
  }
  .nav-menu-left {
    float: left;
  }
  li, ul {
    list-style: none;
  }
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
  .nav-menu-left .nav-menu-item:first-of-type {
    margin-left: 0;
    margin-right: 0;
  }
  .nav-menu-left .nav-menu-item a {
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
  .nav, .nav-menu-item a {
    font-size: 16px;
  }
  a {
    text-decoration: none;
  }
  .nav-menu-item .ketangpaitophref img, .nav-menu-item .side-button img {
    display: inline-block;
    vertical-align: middle;
    padding: 2px 10px 2px 0;
    margin-top: -4px;
    margin-left: -2px;
  }
  img {
    border: none;
  }
  a{
    cursor: pointer;
  }

  .nav-menu-right {
    margin-right: 0;
    margin-top: 8px;
  }
  .nav-menu-right{
    float: right;
  }
  .nav-menu-item.tool {
    margin-top: 14px;
  }
  .tool .toolicon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../images/teacher/tool_icon.png) 0/25px no-repeat;
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
    transform: translateX(-50%);
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
    background: url(../images/teacher/paperrepeaticon.png) 0 1px/32px no-repeat;
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
    background: url(../images/teacher/sjczicon.png) -3px/40px no-repeat;
    padding-left: 35px;
    font-style: normal;
    color: rgba(95,99,104,1);
  }

  .user-info {
    position: absolute;
    width: 110px;
    padding: 0px;
    left: -70px;
    top: 35px;
    text-align: center;
    z-index: 10;
    background: #FFF;
    box-shadow: 0 0 20px rgba(0,0,0,.35);
  }
  .user-info ul{
    padding: 0px;
  }
  .user-info ul li:hover{
    background-color: #32BAF0;
    opacity: .4;
    display: block;
  }
  .addteacher {
    background: url(../images/teacher/addteacher1.png) -5px/44px no-repeat;
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
    line-height: 32px;
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
    right: 31px;
    top: 71px;
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
    margin-right: 0;
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
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
