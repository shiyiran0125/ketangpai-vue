<template>
  <div class="courseList">
    <div class="coursePane cl">
      <course-card class="card" v-for="(value,index) in topCourse" :key="index">
        <div slot="top">
          <strong><a @click="toCourseInfo(value)">{{value.C_name}}</a><span>{{value.C_cname}}</span></strong>
          <div class="invitecode">
            <div class="qrcode">
              <i class="iconfont iconketangma1" data-role="1"><i class="el-icon-menu" style="text-align: center"></i></i>
            </div>
            <div class="down-menu" data-role="1">
              加课码：<span class="code" data-code="HT7JZX">{{value.C_code}}</span>
            </div>
          </div>
          <span class="time">2020-2021<br>第一学期</span>
          <div class="bigDiv teacl">
            <div class="squr"></div>
            <div class="ju">学</div>
          </div>
          <div class="zhidings" v-show="value.top"><a @click="cancelTop(value)">取消置顶</a></div>
          <div class="zhidings" v-show="!value.top"><a @click="setTop(value)">置顶</a></div>
          <div class="more"><a class="kdmore" @click="courseMenuShow(value)"><span>更多</span><i></i></a></div>
          <ul class="kdcgd" v-show="value.courseMenu">
            <li class="kdli3"><a @click="Delete(value.C_code)">退课</a></li>
            <li class="kdli2"><a @click="guidang(value)">归档</a></li>
          </ul>
        </div>
        <div slot="footer">
          <ul class="footul">
            <li class="off"><span>近期作业</span></li>
            <li><span>{{value.h_name}}</span></li>
          </ul>
          <div class="ddfoot clearfix">
            <div class="user-avatar-area"></div>
            <!-- 教授的课程才显示成员数 -->
            <a>
              <span style="height:25px;line-height:25px;margin-left:10px">{{value.t_Name}}</span>
            </a>
          </div>
        </div>
      </course-card>
    </div>
    <p class="qitacourse" v-show="topCourse.length!=0">其他课程</p>
    <div class="otherCourse">
      <course-card class="card" v-for="(value,index) in totalCourses" :key="index">
        <div slot="top">
          <strong><a @click="toCourseInfo(value)">{{value.C_name}}</a><span>{{value.C_cname}}</span></strong>
          <div class="invitecode">
            <div class="qrcode">
              <i class="iconfont iconketangma1" data-role="1"><i class="el-icon-menu" style="text-align: center"></i></i>
            </div>
            <div class="down-menu" data-role="1">
              加课码：<span class="code">{{value.C_code}}</span>
              <div class="selecon cl" v-show="value.codeMenushow">
                <ul>
                  <li class=""><a class="stop-course-code" v-show="value.codeuse" @click="hideCodeuse(value)">停用</a></li>
                  <li class="hide2"><a class="start-course-code" v-show="!value.codeuse" @click="hideCodeuse(value)">启用</a></li>
                  <li class=""><a class="reset-course-code" v-show="value.codeuse">重置</a></li>
                </ul>
              </div>
            </div>
          </div>
          <span class="time">2020-2021<br>第一学期</span>
          <div class="bigDiv teacl">
            <div class="squr"></div>
            <div class="ju">学</div>
          </div>
          <div class="zhidings" v-show="value.top"><a @click="cancelTop(value)">取消置顶</a></div>
          <div class="zhidings" v-show="!value.top"><a @click="setTop(value)">置顶</a></div>
          <div class="more"><a class="kdmore" @click="courseMenuShow(value)"><span>更多</span><i></i></a></div>
          <ul class="kdcgd" v-show="value.courseMenu">
            <li class="kdli3"><a @click="Delete(value.C_code)">退课</a></li>
            <li class="kdli2"><a @click="guidang(value)">归档</a></li>
          </ul>
        </div>
        <div slot="footer">
          <ul class="footul">
            <li class="off"><span>近期作业</span></li>
            <li><span>{{value.h_name}}</span></li>
          </ul>
          <div class="ddfoot clearfix">
            <div class="user-avatar-area"></div>
            <!-- 教授的课程才显示成员数 -->
            <a>
              <span style="height:25px;line-height:25px;margin-left:10px">{{value.t_Name}}</span>
            </a>
          </div>
        </div>
      </course-card>
    </div>
  </div>
</template>
<script>
    import {request} from "../../axios";
    import courseCard from "../../components/courseCard";
    export default {
        name: "sCourselist",
        props: {
            usertype: {
                type: String,
                default: null
            }
        },
        data(){
            return{
                haveTop:false,
                topCourse:[],
                otherCourse:null,
                totalCourses:[{courseMenu:false,T_Name:'石益然',top:false,h_id:'202001',h_name:'大作业',C_name:'javaEE',C_cname:'01',C_code:'7YGTFD',C_year:'2018-2019',C_term:'第一学期',C_info:['年级']},
                    {courseMenu:false,T_Name:'石益然',top:false,h_id:'202002',h_name:'反射',C_name:'Python',C_cname:'02',C_code:'7YGTFD1',C_year:'2018-2019',C_term:'第一学期',C_info:['年级']},
                    {courseMenu:false,T_Name:'石益然',top:false,h_id:'202001',h_name:'大作业',C_name:'javaEE',C_cname:'01',C_code:'7YGTFD',C_year:'2018-2019',C_term:'第一学期',C_info:['年级']},
                ]

            }
        },
        components:{
            courseCard
        },
        methods:{
            /*课程管理菜单*/
            courseMenuShow(item){
                item.courseMenu = !item.courseMenu
            },
            /*取消置顶*/
            cancelTop(item){
                item.top = false
                this.totalCourses.push(item)
                for(var i = 0;i < this.topCourse.length; i++){
                    if (this.topCourse[i].C_code== item.C_code){
                        this.topCourse.splice(i,1);
                    }
                }
                request('/TopCourse',{
                    C_code:item.C_code,
                    /*学生则user是student*/
                    user:'student',
                    top:false,
                    account:this.$store.state.account,
                }).then(res=>{
                    if (res.data.success==true){
                        this.$message.success('置顶成功')
                    }
                })
                if (this.topCourse.length==0)
                    this.$emit('changetop')
            },
            /*置顶*/
            setTop(item){
                item.top = true
                this.topCourse.push(item)
                if (this.topCourse.length==1)
                    this.$emit('changetop')
                for(var i = 0;i < this.totalCourses.length; i++){
                    if (this.totalCourses[i].C_code== item.C_code){
                        this.totalCourses.splice(i,1);
                    }
                }
                request('/topCourse',{
                    C_code:item.C_code,
                    /*学生则user是student*/
                    user:'student',
                    top:true,
                    account:this.$store.state.account,
                }).then(res=>{
                    if (res.data.success==true){
                        this.$message.success('置顶成功')
                    }
                })
            },
            /*归档*/
            guidang(item){
                request('/GuiDangCourse',{
                    use:false,
                    user:'student',
                    account:this.$store.state.account,
                    C_code:item.C_code
                }).then(res=>{
                    /*this.$store.state.tCourseGuiDangs.push(item)*/
                    this.$store.commit('updateTCourseGui',item)
                    /*从界面移除归档课程*/
                    for(var i = 0;i < this.totalCourses.length; i++){
                        if (this.totalCourses[i].C_code== item.C_code){
                            this.totalCourses.splice(i,1);
                        }
                    }
                    for(var i = 0;i < this.topCourse.length; i++){
                        if (this.topCourse[i].C_code== item.C_code){
                            this.topCourse.splice(i,1);
                        }
                    }
                    this.$message({
                        message: '归档成功',
                        type: 'success'
                    });
                    this.$router.go(0)
                })
            },
            /*退课*/
            Delete(C_code){
                this.$confirm('是否退出该课程?').then(_ => {
                    request('/CancelCourse',{
                        C_code:C_code,
                        account:this.$store.state.account,
                    }).then(res=> {
                        /*从界面移除删除的课程*/
                        for(var i = 0;i < this.totalCourses.length; i++){
                            if (this.totalCourses[i].C_code== C_code){
                                this.totalCourses.splice(i,1);
                            }
                        }
                        /*置顶中删除课程*/
                        for(var i = 0;i < this.topCourse.length; i++){
                            if (this.topCourse[i].C_code== C_code){
                                this.topCourse.splice(i,1);
                            }
                        }
                        this.$message({
                            message: '退课成功',
                            type: 'success'
                        });
                    })
                }).catch(_=>{})
            }
            ,
            toCourseInfo(item){
                /* this.$store.state.courseInfo = item*/
                this.$store.commit('updateInfo',item)
                this.$router.push({path:'/sCourseInfo/sHomework'})
            }

        },
        mounted() {
            request('/GetCourseList',{
                account:this.$store.state.account,
                user:'student'
            }).then((res)=>{
                /*返回置顶课程，非置顶课程，归档课程*/
                /*置顶课程*/
                console.log(res);
                var list = res.data.topCourse
                list.forEach(item => {
                    /*需要加的*/
                    item.courseMenu=false
                })
                if (list.length>0){
                    this.$emit('changetop')
                }
                this.topCourse = list

                /*非置顶课程*/
                list = res.data.totalCourse
                list.forEach(item => {
                    item.courseMenu=false
                })
                this.totalCourses = list
                /*归档课程*/
                /*加课码，课程名字*/
                var guidanglist = res.data.guidangCourse
                guidanglist.forEach(item=>{
                    item.show=false
                })
                /*this.$store.state. tCourseGuiDangs = guidanglist*/
                this.$store.commit('updateGuiDang',guidanglist)
                this.$emit('guiDang')
            })
        }
    }
</script>

<style scoped>
  .courseList{
    padding: 0 4%;
  }
  .cl {
    clear: left;
  }
  .coursePane,.otherCourse {
    display: flex;
    width: auto;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .otherCourse::after,.coursePane::after{
    content: "";
    flex: auto;
  }
  .cl {
    clear: both;
  }
  .qitacourse{
    padding-bottom: 20px;
    box-shadow: rgb(226, 230, 237) 0px 1px 0px 0px;
    margin-bottom: 20px;
  }
  .hide {
    display: none;
  }
  .card strong{
    display: block;
    font-size: 20px;
    font-weight: lighter;
    color: #fff;
    height: 62px;
    margin-left: 18px;
    margin-right: 48px;
    overflow: hidden;
  }
  .card strong.a {
    color: #fff;
    font-size: 20px;
    line-height: 30px;
  }
  .card strong.a:hover{
    background: red;
    display: block;
  }
  a{
    text-decoration: none;
  }
  a:hover{
    background: #eeeeee;
    display:block;
  }
  Strong span{
    display: block;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
    overflow: hidden;
  }

  .invitecode {
    height: 22px;
    background: rgba(255,255,255,.2);
    border-radius: 2px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 22px;
    text-align: center;
    margin-left: 18px;
    padding-left: 2px;
    padding-right: 4px;
    margin-top: 13px;
    display: inline-block;
  }

  .invitecode .qrcode {
    display: block;
    float: left;
    width: 16px;
  }
  .iconketangma1 {
    font-size: 14px;
  }
  .iconfont {
    font-size: 16px;
    font-style: normal;
  }
  .down-menu {
    display: block;
    float: left;
    cursor: pointer;
  }

  .iconfont .iconzhu{
    font-size: 12px;
  }
  .selecon {
    top: 120px;
    right: 110px;
  }
  .selecon {
    position: absolute;
    z-index: 11;
    width: 110px;
    border: 1px solid #dcdcdc;
    background: #fff;
  }
  .selecon ul{
    padding: 0px 0px;
  }
  .selecon a{
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
  .time {
    float: right;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding-right: 14px;
    opacity: .5;
    display: flex;
    align-items: flex-end;
    height: 30px;
  }

  .teacl {
    position: absolute;
    width: 24px;
    height: 28px;
    top: 0;
    right: 25px;
  }

  .teacl .squr {
    width: 0;
    height: 0;
    border-left: 10px solid #fff;
    border-right: 10px solid #fff;
    position: absolute;
    z-index: 1;
    top: 21px;
    left: 15px;
    border-bottom: 4px solid transparent;
  }

  .teacl .ju {
    width: 20px;
    background: #fff;
    color: #2C58AB;
  }
  .teacl .ju {
    line-height: 22px;
    left: 15px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    position: absolute;
  }

  div.zhidings {
    bottom: 8px;
    right: 52px;
    z-index: 1;
    width: 48px;
    border-radius: 2px;
  }
  a.kdmore,div.zhidings {
    position: absolute;
    display: block;
    cursor: pointer;
    text-align: center;
  }
  div.zhidings a {
    font-size: 12px;
    color: #A0A0A0;
  }

  .kdmore {
    bottom: 0;
    right: 5px;
    height: 32px;
    line-height: 31px;
  }
  a.kdmore span {
    float: left;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(44,88,171,1);
  }
  a.kdmore i {
    display: inline-block;
    width: 10px;
    height: 100%;
    background: url(../../images/course/more-vertical.png) 0 9px/10px 15px no-repeat;
    margin-left: 1px;
  }

  .kdcgd {
    bottom: 19px;
    right: 10px;
    width: 128px;
    box-shadow: 1px 2px 3px rgba(0,0,0,.2);
    background: #fff;
    padding: 5px 0;
  }
  .kdcgd{
    position: absolute;
    border: 1px solid #dcdcdc;
  }
  .kdcgd li {
    cursor: pointer;
    width: 105px;
    height: 30px;
    padding-left: 23px;
    line-height: 30px;
  }
  .kdcgd li a{
    color: #2c2c2c;
  }
  .footul{
    margin-top: 5px;
    padding: 0 16px;
    height: 105px;
    border-bottom: 1px solid rgba(226,230,237,1);
  }
  .ddfoot {
    width: 80%;
    position: absolute;
    bottom: 4px;
    left: 16px;
    right: 16px;
  }
  ul {
    list-style: none;
  }
  .off span {
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(95,99,104,1);

  }
  .user-avatar-area {
    height: 25px;
    line-height: 25px;
    float: left;
  }
  .user-avatar-area + a {
    font-size: 12px;
    color: rgba(95,99,104,1);
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .dd{
    padding: 17% 38%;
    text-align: center;
  }
</style>

