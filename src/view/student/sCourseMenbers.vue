<template>
  <div style="margin: 0px; padding:0px">
    <top-navgation :Course_name="C_name">
      <div slot="Bar">
        <li class="nav-menu-item" style="margin-left: 350px"><a :class="{'active':navIndex==1}" @click="nav(1)">成员</a></li>
        <li class="nav-menu-item"><a :class="{'active':navIndex==2}" @click="nav(2)">学生分组</a></li>
        <li class="nav-menu-item"><a :class="{'active':navIndex==3}" @click="nav(3)">成绩管理</a></li>
      </div>
    </top-navgation>
    <div style="clear: both"></div>
    <div class="container">
      <div class="top">
        <div style="float: right;width: 200px;height: 20px">
          <el-input
            v-model="search"
            size="mini"
            @input="filteByidOrName()"
            placeholder="输入学号或姓名"/>
        </div>
      </div>
      <div class="body">
        <div class="body-left">
          <ul>
            <li @click="menNav(1)" :class="{'active':menberNav==1}">教学团队(<i>{{teachers.length}}</i>)</li>
            <li @click="menNav(2)" :class="{'active':menberNav==2}">全部学生 (学生<i>{{students.length}}</i>)</li>
          </ul>
        </div>
        <div class="body-right">
          <div v-show="menberNav==1" class="teaTable">
            <div class="teaHead">
              <h3 class="fl" style="width: auto;">教学团队（老师<span>{{teachers.length}}</span>）</h3>
            </div>
            <div>
              <template>
                <el-table
                  :data="forShowTableData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label=""
                    width="230">
                    <template slot-scope="scope">
                      <img src="../../images/teacher/25.png" class="userPic">
                      <span style="margin-left:10px;margin-top:10px">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label=""
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="account"
                    label=""
                    width="230">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label=""
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="">
                    <template slot-scope="scope">
                      <i class="el-icon-chat-dot-round" style="font-size: 16px;margin-right: 10px;margin-left: 10px;cursor: pointer"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
          <div v-show="menberNav==2" class="stuTable">
            <template>
              <el-table
                ref="multipleTable"
                :data="forShowTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="学号"
                  width="220">
                  <template slot-scope="scope"><img v-show="scope.row.sid!=''" src="../../images/teacher/25.png" style="margin-left: 0px">{{ scope.row.sid}}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="account"
                  label="账号"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="加课时间"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop=""
                  label=""
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div>
                      <i v-show="scope.row.sid!=''" class="el-icon-chat-dot-round" style="font-size: 16px;margin-right: 10px;margin-left: 10px;cursor: pointer"></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div style="width: 100%;height:40px;"></div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="forShowTableData.length">  <!-- //这是显示总共有多少数据，-->
              </el-pagination>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import topNavgation from "../../components/topNavgation";
    import {request} from "../../axios";
    export default {
        name: "sCourseMenbers",
        components:{topNavgation},
        data(){
            return{
                C_name:'',         /*课程名字*/
                C_code:'',         /*课程码*/
                navIndex:1,        /*顶部导航栏*/
                menberNav:1,       /*教师或学生表格*/
                search:'',         /*筛选框*/
                currentPage:1,     /*初始页*/
                pagesize:10,       /*每页的数据*/
                multipleSelection:[], /*多选容器*/
                forShowTableData:[],  /*表格绑定的数据*/
                /*存储教师信息*/
                teachers:[{name:'石益然',account:'1101419059@qq.com',menOption:false},{name:'石益然',account:'1101419059@qq.com',menOption:false}],
                /*存储学生信息*/
                students:[{sid:'11823020121',name:'李火火',account:'13648252443',date:'2020.06.20',menOption:false},{sid:'11823020122',name:'李火火',account:'13640252743',date:'2020.06.20',menOption:false},{sid:'11823020124',name:'李火火',account:'13648952743',date:'2020.06.20',menOption:false}
                ],
            }
        },
        methods:{
            /*切换导航栏*/
            nav(index){
                this.navIndex = index
            },
            /*切换教师学生选项*/
            menNav(index){
                if (index===1){
                    this.forShowTableData = this.teachers
                }else{
                    this.forShowTableData = this.students
                }
                this.menberNav = index
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                //点击第几页
            },
            /*搜索框筛选*/
            filteByidOrName(){
                if (this.menberNav==1) {
                    this.forShowTableData = this.teachers
                    if (this.search==''){
                    }else {
                        this.forShowTableData = this.forShowTableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
                    }
                }else{
                    this.forShowTableData = this.students
                    if (this.search==''){
                    }else {
                        this.forShowTableData = this.forShowTableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()) || data.sid.toLowerCase().includes(this.search.toLowerCase()))
                    }
                }
            },
        },
        mounted() {
            this.C_code = this.$route.query.C_code;
            this.C_name = this.$route.query.C_name;
            var list = []
            /*请求该课程的同学及老师*/
            request('/GetStuTea',{
                C_code:this.C_code
            }).then(res=>{
                list = res.data.Teachers
                list.forEach(item=>{
                    item.menOption = false
                })
                this.teachers = list
                list = res.data.Students
                list.forEach(item=>{
                    item.menOption = false
                })
                this.students = list
                this.forShowTableData = this.teachers
            })
        }
    }
</script>

<style scoped>
  div{
    padding: 0px;
    margin: 0px;
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
  a {
    text-decoration: none;
  }
  .container{
    width: 1224px;
    background: #FFF;
    border: 1px solid #c8c8c8;
    margin: 110px auto 60px;
    border-radius: 8px;
  }
  .top{
    height: 8px;
    box-shadow: 0 1px 0 0 rgba(226,230,237,1);
    padding-bottom: 20px;
    margin-bottom: 27px;
    border-radius: 8px;
  }
  .body{
    background: #FFF;
    border: 1px solid rgba(226,230,237,1);
    min-height: 600px;
    border-radius: 8px;
    position: relative;
  }
  .body-left{
    float: left;
    width: 286px;
    min-height: 300px;
  }
  .body-right{
    width: 936px;
    border-left: 1px solid rgba(226,230,237,1);
    min-height: 600px;
    margin-left: -1px;
    float: left;
  }
  .body-left ul{
    padding: 0px;
    margin: 0px 0px;
  }
  .body-left ul li {
    height: 55px;
    line-height: 55px;
    padding: 0 24px;
    cursor: pointer;
    font-weight: 500;
    color: rgba(59,61,69,1);
    font-size: 16px;
  }
  .body-left ul li:hover{
    background-color: rgba(50,186,240,.4);
    display: block;
  }
  li {
    list-style: none;
  }
  .body-left ul li.active {
    background: #32BAF0 !important;
    color: #FFF;
  }
  .teaHead {
    padding: 0 12px 0 25px;
    height: 55px;
    background: rgba(241,243,244,1);
    border-radius: 0 8px 0 0;
  }
  .teaHead h3 {
    display: inline-block;
    height: 55px;
    font-weight: 500;
    color: rgba(59,61,69,1);
    font-size: 16px;
    float: left;
  }
  .teaTable img,.stuTable img{
    height: 40px;
    margin-top: 0px;
    margin-left: 25px;
    float: left;
    border-radius: 100%;
    border: none;
  }
  .teaTable span{
    display: inline-block;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
  }
  .title h3 {
    font-weight: 400;
    line-height: 1;
    font-size: 18px;
    color: #5A5A5A;
    margin-top: 0px;
  }
  .input-box span {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    vertical-align: middle;
  }
  .input-box input{
    border: 0px;
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    width: 260px;
    font-size: 14px;
  }
</style>
