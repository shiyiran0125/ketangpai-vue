<template>
<div>
  <div class="nav nav-default ">
    <ul class="nav-menu-left">
        <li class="nav-menu-item ktplogo ">
            <a class="ketangpaitophref" href="/Index/index">
            	<img src="../../images/teacher/logo-mainblue.png" alt="" width="96px" height="24px">
            </a>
        </li>
        <li class="nav-menu-item"><a @click="nav(1)" :class="{'active':nav_index==1}"><router-link to="/teacher/courselist">课堂</router-link></a></li>
         <li class="nav-menu-item"><a @click="nav(2)" :class="{'active':nav_index==2}">备课区</a></li>
         <li class="nav-menu-item jingpin" data-yy="0"><a @click="nav(3)" :class="{'active':nav_index==3}">精品慕课</a></li>
         <li class="nav-menu-item"><a @click="nav(4)" :class="{'active':nav_index==4}">我的精品</a></li>
         <li class="nav-menu-item"><a @click="nav(5)" :class="{'active':nav_index==5}">双选会</a></li>
         <li class="nav-menu-item paper">
           <a @click="nav(6)" :class="{'active':nav_index==6}">论文管理
             <img src="../../images/teacher/hot.png" style="width: 21px;height: 10px;vertical-align: top;">
           </a>
         </li>
    </ul>
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
      </li>        <!-- 缺少class user -->
      <li class="nav-menu-item user">
        <a id="user" @click="userShow=!userShow">
          <img class="avatar" src="http://www.ketangpai.com/Public/Common/img/40/25.png" :alt="this.$store.state.userName" :title="this.$store.state.userName">
        </a>
        <div class="user-info" v-show="userShow">
          <ul>
          <li>
            <a class="link setting" style="color: rgb(45, 45, 45);">个人设置</a>
          </li><li>
            <a class="link logout" style="color: rgb(45, 45, 45);" @click="dropDown">退出账户</a>
          </li>
          </ul>
        </div>
      </li>
    </ul>
	</div>
  <div class="ktcon c1">
    <div class="ktcon1 cl clearfix">
      <p class="fl quanbucourse" v-show="!topshow">全部课程</p>
      <p class="fl zhidingcourse" v-show="topshow">置顶课程</p>
      <div class="fr quick-release" style="margin-left: 20px;margin-top: 18px">
        <span>+ 快速发布活动</span>
      </div>
      <div class="ktcon1l fr" style="margin-top: 18px">
        <span @click="setCourseshow()">+ 创建/加入课程</span>
      </div>
      <ul class="options" v-show="courseshow">
        <li><a @click="letwindowshow()" id="addClass">创建课程</a></li>
        <li><a @click="joinCourseshow=!joinCourseshow" id="joinClass">加入课程</a></li>
      </ul>
      <div class="ktcon1r fr">
        <ul>
          <li class="ktli1"><a @click="showCsortshow(1)"><img style="width: 20px;height: 20px;vertical-align: bottom" src="../../images/teacher/serchclass.png"/> <i class="iconfont iconkechengpaixu"></i> 课程排序</a></li>
          <li class="ktli2"><a @click="showCsortshow(2)"><img style="width: 20px;height: 20px;vertical-align: bottom" src="../../images/teacher/gui.png"/><i class="iconfont iconguidangguanli1"></i> 归档管理</a></li>
        </ul>
      </div>
    </div>
  </div>
  <!--添加课程-->
  <div class="bg" v-show="windowshow"></div>
  <div v-show="windowshow" class="createCor">
    <div class="title">
      <h3>新建课程<i class="close-newClass" @click="closeWindow(1)"></i></h3>
    </div>
    <div class="input-box">
      <span>课程名称：</span>
      <input type="text" v-model="course.C_name" placeholder="请输入课程名称">
    </div>
    <div class="input-box">
      <span>班级名称：</span>
      <input type="text" v-model="course.C_cname" placeholder="请输入班级名称（选填）">
    </div>
    <div class="select">
      <span>选择学期：</span>
      <el-select v-model="course.C_year" placeholder="请选择">
        <el-option v-for="item in years"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="course.C_term">
        <el-option v-for="item in terms"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="infosettip">学生必须额外填写下列信息才能加入课程</div>
    <div class="infoset">
      <el-checkbox-group v-model="infoset">
        <el-checkbox label="自然班级"></el-checkbox>
        <el-checkbox label="年级"></el-checkbox>
        <el-checkbox label="入学年份"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="pop-btns">
      <a  @click="closeWindow(1)" class="cancel">取消</a>
      <a @click="newCourse()" class="sure">创建</a>
    </div>
  </div>
  <!--归档排序-->
  <div class="bg" v-show="csortshowbg"></div>
  <div class="sortCor" v-show="csortshowbg">
    <div class="guidangpaixutop cl">
      <ul>
        <li :class="{'ktli1 on':csortshow==1}"><a @click="showCsortshow(1)">课程排序</a></li>
        <li :class="{'ktli2 on':csortshow==2}"><a @click="showCsortshow(2)"> 归档管理</a></li>
      </ul>
      <span class="gdpcmore" @click="hideCsortshow()"><a></a></span>
    </div>
    <div v-show="csortshow==1" class="guidangpaixucon gd1 clearfix" style="height: 500px;display: flex;overflow: auto">
      <ul class="gxul ui-sortable" style="top: 0px;padding: 0px;margin-top: 0px">
        <li data-id="MDAwMDAwMDAwMLScy5aIqbNs" class="ui-sortable-handle" style="border: 1px solid rgb(236, 236, 236); z-index: 0;">
          <i style="background-color: rgb(49, 142, 235);"></i>
          <span>熟悉  课堂派</span>
        </li>
      </ul>
    </div>
    <div v-show="csortshow==2" class="guidangpaixucon gd2 clearfix" style="height: 500px;display: flex;flex-wrap:wrap;overflow: auto">
      <div class="bb-div" style="top: 0px;" v-for="(value,index) in guidangs" :key="index">
        <dl class="gpdl1 dv1" :title="value.C_name">
          <dt class="guidangbg">
            <strong><a class="text-overflow" :title="value.C_name">{{value.C_name}}</a></strong>
            <p>角色：老师</p>
            <a class="kdmorex" @click="doRecovery(value)"></a>
            <ul class="kdcgdx" v-show="value.show">
              <li class="kdli1 gdhf"><a @click="recovery(value.C_code)">恢复</a></li>
              <li class="kdli2 gdsc"><a @click="Delete(value.C_code)">删除</a></li>
            </ul>
          </dt>
        </dl>
      </div>
    </div>
  </div>
  <!--修改课程-->
  <div class="bg" v-show="ModifyCourse.windowShow"></div>
  <div v-show="ModifyCourse.windowShow" class="createCor">
    <div class="title">
      <h3>编辑课程<i class="close-newClass" @click="closeWindow(2)"></i></h3>
    </div>
    <div class="input-box">
      <span>课程名称：</span>
      <input type="text" v-model="ModifyCourse.C_name" placeholder="请输入课程名称">
    </div>
    <div class="input-box">
      <span>班级名称：</span>
      <input type="text" v-model="ModifyCourse.C_cname" placeholder="请输入班级名称（选填）">
    </div>
    <div class="select">
      <span>选择学期：</span>
      <el-select v-model="ModifyCourse.C_year" placeholder="请选择">
        <el-option v-for="item in years"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="ModifyCourse.C_term">
        <el-option v-for="item in terms"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="infosettip">学生必须额外填写下列信息才能加入课程</div>
    <div class="infoset">
      <el-checkbox-group v-model="ModifyCourse.C_info">
        <el-checkbox label="自然班级"></el-checkbox>
        <el-checkbox label="年级"></el-checkbox>
        <el-checkbox label="入学年份"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="pop-btns">
      <a  @click="closeModifyWindow()" class="cancel">取消</a>
      <a @click="modifyCourse()" class="sure">确定</a>
    </div>
  </div>
  <!--加入课程-->
  <div class="bg" v-show="joinCourseshow"></div>
  <div class="chuangjiankc" v-show="joinCourseshow">
    <div class="chuangjiankctop">加入课程</div>
    <div class="chuangjiankccon">
      <input type="text" placeholder="请输入课程加课验证码" v-model="joinCourseCode"/>
    </div>
    <div class="chuangjiankcbot">
      <ul>
        <li class="cjli1"><a class="btn btn-defalut" @click="joinCourseshow=false">取消</a></li>
        <li class="cjli2"><a class="btn disable" @click="joinCourse">加入</a></li>
      </ul>
    </div>
  </div>
  <router-view @changetop="topShow()" @showCreCor="letwindowshow" @guiDang="addGuiDangs()" @modify="Modify"></router-view>
</div>
</template>
<script>
  import {request} from "../../axios";

  export default {
        name: "teacher",
        data() {
            return {
                infoset:[],
                windowshow:false,  /*添加课程面板*/
                topshow:false,   /*置顶课程菜单*/
                joinCourseshow:false,/*加入课程面板*/
                nav_index: 1,    /*默认导航小标*/
                toolshow:false,  /*工具菜单*/
                noticeshow:false,/*通知菜单*/
                userShow:false,
                joinCourseCode:'',/*加入课程的加课码*/
                courseshow:false,/*添加课程菜单*/
                csortshowbg:false, /*拖动排序面板大背景*/
                csortshow:0,  /*拖动排序背景*/
                guidangs:[],
                course:{          /*课程对象*/
                    C_name:'',
                    C_cname:'',
                    C_year:'',
                    C_term:'第一学期',
                    C_info:[]
                },
                ModifyCourse:{          /*修改的课程对象*/
                    C_code:'',
                    C_name:'111',
                    C_cname:'',
                    C_year:'',
                    C_term:'',
                    C_info:[],
                    windowShow:false
                },
                years: [{
                    value: '2014-2015',
                    label: '2014-2015'
                },{
                    value: '2015-2016',
                    label: '2015-2016'
                },{
                    value: '2016-2017',
                    label: '2016-2017'
                },{
                    value: '2017-2018',
                    label: '2017-2018'
                },{
                    value: '2018-2019',
                    label: '2018-2019'
                },{
                    value: '2019-2020',
                    label: '2019-2020'
                },{
                    value: '2020-2021',
                    label: '2020-2021'
                },{
                    value: '2021-2022',
                    label: '2021-2022'
                }
                ],
                terms:[{
                    value: '第一学期',
                    label: '第一学期'
                },{
                    value: '第二学期',
                    label: '第二学期'}
                ]
            };
        },
        methods: {
            doRecovery(item){
              item.show = !item.show
            },
            addGuiDangs(){
                this.guidangs = this.$store.state.tCourseGuiDangs
            },
            /*导航栏变换*/
            nav(index) {
                this.toolshow = false
                this.noticeshow = false
                this.nav_index = index
                this.courseshow = false
            },
            /*新建课程面板显示*/
            letwindowshow(){
                this.windowshow = true
            },
            /*修改课程显示*/
            Modify(){
                var it = this.$store.state.modifyCourse
                this.ModifyCourse.C_code = it.C_code
                this.ModifyCourse.C_name = it.C_name
                this.ModifyCourse.C_cname = it.C_cname
                this.ModifyCourse.C_year = it.C_year
                this.ModifyCourse.C_term = it.C_term
                this.ModifyCourse.C_info = it.C_info
                this.ModifyCourse.windowShow = true
            }
            ,
            /*修改课程的窗口*/
            closeModifyWindow(){
              this.ModifyCourse.windowShow = false
            },
            /*添加修改窗口关闭*/
            closeWindow(index){
                if (index==1){
                    this.windowshow = false
                }else{
                    this.ModifyCourse.windowShow = false
                }
            },
            /*工具显示掩藏*/
            settoolshow(){
                this.toolshow = ! this.toolshow
            },
            /*通知菜单显示掩藏*/
            setnotice(){
                this.noticeshow = !this.noticeshow
            },
            /*添加课程的菜单*/
            setCourseshow(){
                this.courseshow = !this.courseshow
            },
            /*置顶标识*/
            topShow(index){
                this.topshow = !this.topshow
            },
            /*显示排序归档面板*/
            showCsortshow(index){
                this.csortshow = index
                if (!this.csortshowbg) {
                  this.csortshowbg = true
                }
            },
            /*掩藏排序归档面板*/
            hideCsortshow(){
                this.csortshowbg = false /*拖动排序面板大背景*/
            },
            /*恢复归档课程*/
            recovery(C_code){
              this.$confirm('要恢复此课程么？\n' +
                    '\n' +
                    '您和您的学生将可以重新在此课程中互动。\n' +
                    '此课程会在课堂页上显示。\n').then(_=>{
                /*发起归档恢复请求并从this.guidangs中删除*/
                /*用replace刷新courselist*/
                request('/GuiDangCourse',{
                    use:true,
                    user:'teacher',
                    C_code:C_code
                }).then(res=>{
                    /*for (var i = 0; i < this.guidangs.length;i++){
                        if (this.guidangs[i].C_code== C_code){
                            this.guidangs.splice(i,1);
                        }
                    }*/
                    if (res.data.success==true) {
                        this.$message.success('已恢复课程')
                        this.$router.go(0)
                    }
                })
            }).catch(_=>{
                alert('cancel')
              })
            },
            /*加入课程*/
            joinCourse(){
                if (this.joinCourseCode==''){
                    this.$message.error('课程码为空')
                    return
                }else{
                    if (this.joinCourseCode.length!=6){
                        this.$message.error('请输入6位字符的加课码')
                        return;
                    }else{
                        request('/JoinCourse',{
                                 C_code:this.joinCourseCode,
                                 account:this.$store.state.account,
                                 user:'teacher'
                        }).then(res=>{
                            if (!res.data.success){
                                this.$message.error('加入课程失败，确认是否存在该课程')
                            }else {
                                this.$message.success('加入课程成功')
                                this.joinCourseCode = ''
                                this.joinCourseshow = false
                                this.$router.go(0)
                            }
                        })
                    }
                }
              alert(this.joinCourseCode)
            },
            /*修改课程*/
            modifyCourse(){
                request('/ModifyCourse',{
                    C_code:this.ModifyCourse.C_code,
                    C_name:this.ModifyCourse.C_name,
                    C_cname:this.ModifyCourse.C_cname,
                    C_year:this.ModifyCourse.C_year,
                    C_term:this.ModifyCourse.C_term,
                    C_info:this.ModifyCourse.C_info
                }).then(res=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.$router.go(0)
                })
            },
            /*删除课程*/
            Delete(C_code){
                request('/DeleteCourse',{
                    C_code:C_code
                }).then(res=> {
                    for (var i = 0; i < this.guidangs.length; i++) {
                        if (this.guidangs[i].C_code == C_code) {
                            this.guidangs.splice(i, 1);
                        }
                    }
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            },
            /*创建课程*/
            newCourse(){
                request('/AddCourse',{
                        account:this.$store.state.account,
                        C_name:this.course.C_name,
                        C_cname:this.course.C_cname,
                        C_year:this.course.C_year,
                        C_term:this.course.C_term,
                        C_info:this.course.C_info
                }).then(res=>{
                    console.log(res);
                    if (res.data.success == true){
                        this.windowshow = false
                        this.$router.go(0)
                    }else {
                        this.$message.error('创建失败')
                    }
                })
            },
            /*退出账户*/
            dropDown(){
                this.$store.state.user_account = ''
                this.$store.state.userName = ''
                this.$store.state.isLogin = false
                this.$router.replace('/login')
            },
        },
      mounted() {
          this.guidangs = this.$store.state.tCourseGuiDangs
      }
  }
</script>
<style scoped>
  .nav-default {
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
    background-image: url(../../images/teacher/25.png);
    background-repeat: no-repeat;
    background-position: center;
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
  .cl {
    clear: left;
  }
  .ktcon {
    height: 100%;
    padding: 85px 4% 2px;
  }
  .ktcon1 {
    position: relative;
    z-index: 1;
    justify-content: flex-start;
    box-shadow: 0 1px 0 0 rgba(226,230,237,1);
    margin-bottom: 20px;
  }
  .cl {
    clear: both;
  }

  .ktcon1 > p {
    height: 36px;
    line-height: 36px;
    color: rgba(59,61,69,1);
  }
  .ktcon1 > p, .ktcon1l, .quick-release {
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .fl {
    float: left;
  }

  .fr, .mgCalendar_timeConfirm {
    float: right;
  }
  .ktcon1l, .quick-release {
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
    cursor: pointer;
    background: rgba(50,186,240,1);
    text-align: center;
    font-size: 14px;
    color: rgba(255,255,255,1);
    padding: 5px 15px;
  }
  .ktcon1 .options {
    position: absolute;
    top: 38px;
    right: 149px;
    border: 1px solid #dcdcdc;
    width: 131px;
    box-shadow: 1px 2px 3px rgba(0,0,0,.2);
    background: #fff;
    padding: 5px 0;
  }
  .ktcon1 .options li {
    cursor: pointer;
    height: 44px;
    padding-left: 23px;
    line-height: 44px;
  }
  .ktcon1 .options li a {
    color: #2c2c2c;
    display: block;
  }
  a {
    text-decoration: none;
  }
  .fr, .mgCalendar_timeConfirm {
    float: right;
  }
  .ktcon1r {
    width: 300px;
  }
  .ktcon1r, .ktcon1r ul, .ktcon1r ul li {
    height: 34px;
    line-height: 34px;
  }
  .ktcon1r ul {
    float: right;
    display: flex;
    align-items: center;
  }
  .ktcon1r, .ktcon1r ul, .ktcon1r ul li {
    height: 34px;
    line-height: 34px;
  }
  .ktcon1r ul li.ktli1 {
    line-height: 16px;
    height: 16px;
    background-position: 0 2px;
    color: #272636;
    font-size: 14px;
  }
  .ktli1 a:hover,.ktli2 a:hover{
    background-color: black;
    opacity: .20;
  }
  .ktcon1r ul li {
    float: left;
    padding-left: 27px;
  }
  .ktcon1r, .ktcon1r ul, .ktcon1r ul li {
    height: 34px;
    line-height: 34px;
  }
  .ktcon1r ul li a {
    font-size: 14px;
    color: #78787a;
    line-height: 16px;
    height: 16px;
  }
  .iconguidangguanli1, .iconkechengpaixu {
    font-size: 14px;
  }
  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ktcon1r ul li.ktli2 {
    line-height: 16px;
    height: 16px;
    margin: 0 24px 0 0;
    display: inline;
    background-position: 0 -20px;
    color: #272636;
    font-size: 14px;
  }
  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .bg{
    width: 100%;
    height: 100%;
    background: #000;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    opacity: .45;
  }
  .hide {
    display: none;
  }
   .createCor{
     width: 620px;
     height: 413px;
     padding-bottom: 0;
     margin-top: 0 !important;
     margin-left: 0;
     transform: translate(-50%,-50%);
     position: fixed;
     left: 50%;
     top: 50%;
     z-index: 99;
     display: block;
     padding: 28px 30px;
     padding-bottom: 28px;
     background: #FFF;
   }
  .close-newClass {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30px;
    top: 20px;
    background: url(../../images/teacher/close.png) no-repeat;
    cursor: pointer;
  }
  .title h3 {
    font-weight: 400;
    line-height: 1;
    font-size: 18px;
    color: #5A5A5A;
    margin-top: 0px;
  }
  .input-box {
    margin-top: 26px;
    height: 38px;
    border-bottom: 1px solid #c8c8c8;
    box-sizing: border-box;
  }
  .input-box span {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    vertical-align: middle;
  }

  .input-box input{
    display: inline-block;
    vertical-align: middle;
    height: 38px;
    width: 260px;
    font-size: 14px;
  }
  .select{
    margin-top: 23px;
  }
  input, select, textarea {
    outline: 0;
    border: none;
    background: 0 0;
    cursor: text;
  }
  .select span{
    height: 36px;
    line-height: 39px;
  }
  .infosettip {
    font-size: 12px;
    color: #666;
    margin: 30px 0 15px;
  }
  .pop-btns {
    width: 630px;
    right: 15px;
    padding: 20px 30px 20px 0;
    background: #F5F5F5;
  }
  .pop-btns {
    text-align: right;
    margin-top: 27px;
    height: 38px;
    font-size: 0;
    position: relative;
  }
  .pop-btns a.cancel {
    color: #828282;
    margin-right: 10px;
  }
  .pop-btns a {
    display: inline-block;
    font-size: 16px;
    min-width: 84px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    border-radius: 3px;
    padding-left: 10px;
    padding-right: 10px;
  }
   .pop-btns a.sure {
    color: #FFF;
    background: #9abdf4;
  }
  .cl {
    clear: left;
  }
  .sortCor {
    background: #fff;
    border: 1px solid #dcdcdc;
    margin-top: -189px;
    display: block;
    position: fixed;
    width: 810px;

    margin-left: -405px;
    overflow: hidden;
  }
  .sortCor {
    z-index: 101;
    top: 35%;
    left: 50%;
  }
  .guidangpaixutop {
    background: #f8f8f8;
    border-bottom: 1px solid #dcdcdc;
    height: 58px;
    width: 100%;
    margin-top: -15px;
  }
  .guidangpaixutop ul {
    text-align: center;
  }
  .guidangpaixutop ul li {
    display: inline;
    text-align: center;
  }
  .guidangpaixutop ul li.on a {
    color: #2d2d2d;
    font-size: 18px;
    border-bottom: 3px solid #aaa;
  }
  .guidangpaixutop ul li a:hover{
      background-color: white;
  }
  .guidangpaixutop ul li a {
    color: #818181;
    font-size: 18px;
    display: inline-block;
    line-height: 55px;
    height: 55px;
    min-width: 118px;
    text-align: center;
    padding-left: 18px;
    padding-right: 18px;
  }
  .guidangpaixutop .gdpcmore {
    position: absolute;
    right: 26px;
    top: 11px;
  }
  .guidangpaixutop .gdpcmore a {
    width: 33px;
    height: 30px;
    display: block;
    background: url(../../images/teacher/icon2_03.png) center center no-repeat;
  }
  .gd2 {
    padding-left: 70px;
    padding-right: 70px;
  }
  .guidangpaixucon {
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }

  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .guidangpaixucon dl.gpdl1 {
    float: left;
    width: 300px;
    -webkit-box-shadow: 0 .1rem .2rem rgba(0,0,0,.12),0 0 .1rem rgba(0,0,0,.12);
    box-shadow: 0 .1rem .2rem rgba(0,0,0,.12),0 0 .1rem rgba(0,0,0,.12);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-clip: padding-box;
  }
  .guidangpaixucon dl {
    position: relative;
    margin: 15px 10px;
  }
  dl.gpdl1.dv1 dt, .guidangpaixucon dl.gpdl1.dv2 dt, .guidangpaixucon dl.gpdl1.dv3 dt {
    width: 268px;
    clear: both;
    height: 72px;
    padding: 24px 16px 14px;
  }
  .guidangpaixucon dl.gpdl1 dt strong {
    font-size: 20px;
    font-weight: lighter;
    color: #fff;
    height: 26px;
    line-height: 26px;
  }
  .guidangpaixucon dl.gpdl1 dt strong a {
    display: block;
    color: #fff;
    overflow: hidden;
    width: 240px;
  }
  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .guidangpaixucon dl.gpdl1 dt p {
    color: #fff;
    line-height: 20px;
    padding-top: 14px;
    font-size: 12px;
  }
  .guidangpaixucon dl.gpdl1 p {
    width: 264px;
    height: 42px;
    overflow: hidden;
  }
  .guidangpaixucon dl.gpdl1 dt a.kdmorex {
    position: absolute;
    top: 36px;
    right: 15px;
    display: block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: url(../../images/course/kczt_23.png) center center no-repeat;
  }
  .guidangpaixucon dl.gpdl1 dt .kdcgdx {
    padding: 0px;
    z-index: 11;
    position: absolute;
    top: 47px;
    right: 15px;
    border: 1px solid #dcdcdc;
    width: 128px;
    height: 88px;
    box-shadow: 1px 2px 3px #dcdcdc;
    background: #fff;
  }
  .guidangpaixucon dl.gpdl1 dt .kdcgdx li {
    cursor: pointer;
    height: 44px;
    padding: 0px;
    line-height: 44px;
    text-align: center;
  }
  .kdcgdx li a:hover{
    background:rgba(12,156,248,.4);
    display: block;
  }
  .guidangpaixucon ul li {
    padding-left: 40px;
    height: 58px;
    line-height: 58px;
    border: 1px solid #ececec;
    margin-top: -1px;
    position: relative;
  }
  .guidangbg{
    background:url("../../images/course/32.png") no-repeat #1066af;
  }
  .guidangpaixucon dl.gpdl1 dt .kdcgdx li a {
    color: #2c2c2c;
  }
  .guidangpaixucon.gd1 ul {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .gd1 .gxul li {
    cursor: pointer;
    background: #fff;
    margin-bottom: 1px;
  }
  .guidangpaixucon ul li {
    padding-left: 40px;
    height: 58px;
    line-height: 58px;
    border: 1px solid #ececec;
    margin-top: -1px;
    position: relative;
  }
  .guidangpaixucon ul li i {
    display: inline-block;
    width: 19px;
    height: 19px;
    background-image: url("../../images/course/ybg.png");
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 20px;
  }
  .guidangpaixucon ul li span {
    font-size: 16px;
    vertical-align: middle;
  }
  /*加入课程*/
  .chuangjiankc {
    width: 295px;
    height: 210px;
    margin-left: -134px;
    margin-top: -105px;
    background: #fff;
    border: 0;
  }
  .chuangjiankc, .huifukt {
    z-index: 101;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .chuangjiankctop {
    color: #a9a9a9;
    font-size: 18px;
    border-bottom: 1px solid #ececec;
    height: 66px;
    line-height: 66px;
    padding-left: 28px;
  }
  .chuangjiankccon {
    padding: 20px 25px;
  }
  .chuangjiankccon input {
    padding-top: 9px;
    padding-bottom: 9px;
    color: #2d2d2d;
    font-size: 14px;
    width: 100%;
    border: 0;
    border-bottom-color: currentcolor;
    border-bottom-style: none;
    border-bottom-width: 0px;
    height: 14px;
    line-height: 14px;
    border-bottom: 1px solid #ececec;
  }
  input, select, textarea {
    outline: 0;
    border: none;
    background: 0 0;
    cursor: text;
  }
  input{
    margin: 0;
    padding: 0;
  }
  .chuangjiankcbot {
    position: relative;
    height: 68px;
    background: #fff;
  }
  .chuangjiankcbot ul {
    text-align: center;
    padding-top: 12px;
    padding-left: 30px;
    padding-right: 15px;
  }
  .chuangjiankcbot ul li {
    float: left;
    padding-left: 10px;
  }
  .chuangjiankcbot ul li.cjli1 a {
    display: block;
    width: 86px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
    color: #818181;
    border-radius: 3px;
  }
  .btn{
    padding-left: 5px;
    padding-right: 5px;
  }
  .chuangjiankcbot ul li.cjli2 {
    padding-left: 20px;
  }
  .chuangjiankcbot ul li.cjli2 a {
    display: block;
    border-radius: 3px;
    width: 86px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  .btn.disable {
    cursor: default;
    background: #9ABDF4;
  }
</style>
