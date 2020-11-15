<template>
<div>
  <!--顶部栏-->
  <top-navgation :course_name="Course_name">
    <div slot="Bar">
      <li class="nav-menu-item" style="margin-left: 400px"><a :class="{'active':navIndex==1}" @click="nav(1)">学生作业</a></li>
      <li class="nav-menu-item"><a :class="{'active':navIndex==2}" @click="nav(2)">作业讨论</a></li>
    </div>
  </top-navgation>
  <!--页面内容-->
  <div class="container">
  <div class="center">
     <div class="center-top">
         <div class="center-top-top">
           <h2 style="float: left">{{h_name}}</h2>
         </div>
         <div class="center-top-buttom">
           <div class="jiezi">
             {{getDeadLine}}
           </div>
           <div class="serach">
             <div class="select-down">
             <el-select v-model="ifShowScore" placeholder="请选择" size="mini" popper-class="select-down">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
             </div>
           </div>
         </div>
     </div>
     <div class="center-buttom">
       <div><p class="work-tips-info">已经筛选出人，全班共{{forShowTableData.length}}人</p></div>
       <div class="table-condition">
         <div class="conditions">
           <span>成绩:</span>
           <div style="float: right;">
            <!-- <p class="noption act" style="float: left;margin-left: -150px">不限</p>-->
             <p @click="noptionShow" :class="my" style="float: left;margin-left: -150px">不限</p>
           <div style="margin-right: 290px">
             <el-checkbox-group v-model="checkList" @change="filterStu">
             <el-checkbox label="已批"></el-checkbox>
             <el-checkbox label="未批"></el-checkbox>
             <el-checkbox label="未交"></el-checkbox>
           </el-checkbox-group>
           </div>
           </div>
         </div>
       </div>
     </div>
  </div>
  <div class="buttom">
    <div class="buttom-top">
      <ul class="typehead isrecruit0">
        <li @click="sortNav(1)" :class="{'select':sortNavIndex==1}"><a>学号<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(2)" :class="{'select':sortNavIndex==2}"><a>姓名<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(3)" :class="{'select':sortNavIndex==3}"><a>成绩<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(4)" :class="{'select':sortNavIndex==4}"><a>相似度<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(5)" :class="{'select':sortNavIndex==5}"><a>提交状态<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(6)" :class="{'select':sortNavIndex==6}"><a>作业字数<i class="el-icon-top"></i></a></li>
        <li @click="sortNav(7)" :class="{'select':sortNavIndex==7}"><a>批改次数<i class="el-icon-top"></i></a></li>
      </ul>
    </div>
    <div class="buttom-other">
      <!-- forShowTableData.filter(data => !search || data.S_name.toLowerCase().includes(search.toLowerCase())||data.S_sid.toLowerCase().includes(search.toLowerCase()))-->
      <el-table
        ref="multipleTable"
        :data="forShowTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="S_sid"
          label="学号"
          sortable
          width="120">
          <template slot-scope="scope">{{ scope.row.S_sid}}</template>
        </el-table-column>
        <el-table-column
          prop="S_name"
          sortable
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="S_score"
          sortable
          label="分数"
          show-overflow-tooltip>
          <template slot-scope="scope" ><input v-show="scope.row.S_isComit==1" placeholder="未批改" v-model="scope.row.S_score" @blur="modifyScore(scope)">
          </input><i v-show="scope.row.S_isComit==1">/{{ scope.row.S_maxScore}}</i><i v-show="scope.row.S_isComit==0" style="color: red;font-size: 18px">未交</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="S_submitTime"
          sortable
          label="提交时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="S_correctCount"
          sortable
          label="批改次数"
          width="120">
          <template slot-scope="scope"><i v-show="scope.row.S_isComit==2">{{scope.row.S_correctCount}}</i></template>
        </el-table-column>
        <el-table-column
          prop="S_correctCount"
          label="批改次数"
          width="120">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @input="filteByidOrName()"
              placeholder="输入学号或姓名"/>
          </template>
          <template slot-scope="scope">
            <a v-show="scope.row.S_isComit==0" class="cuijiao" style="margin-right: 5px;" @click="call(scope.row.S_sid)">催交</a>
            <a v-show="scope.row.S_isComit==0" class="cuijiao" @click="call()">全部催交</a>
            <a v-show="scope.row.S_isComit>=1" @click="downloadFile(scope.row.fileName)">下载批阅</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="forShowTableData.length">  <!-- //这是显示总共有多少数据，-->
      </el-pagination>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import {request} from "../../axios";
  import topNavgation from "../../components/topNavgation";
  import {downLoad} from "../../axios";
  export default {
        name: "teacherCorrect",
      components:{topNavgation},
        data(){
          return{
              navIndex:1, /*顶部菜单*/
              ifShowScore:'0',/*分数掩藏*/
              options:[{value:'0',label:'对学生掩藏成绩'},{value:'1',label:'对学生显示成绩'}],
              Course_name:'',
              h_name:'',
              checkList:[],
              search:'',     /*搜索框内容*/
              my:'noptiona',/*筛选不限绑定的类名*/
              sortNavIndex:1,   /**/
              H_id:'',        /*作业ID*/
              currentPage:1, //初始页
              pagesize:10,    //    每页的数据
              forShowTableData:[],/*展示数据*/
              totalTableData:[{  /*总量数据*/
                  S_sid: '11823020121',
                  S_name: '小虎',
                  S_score:77,
                  S_maxScore:100,
                  S_submitTime:'',
                  S_correctCount:1,
                  S_isComit:true,
              }, {  /*展示数据*/
                  S_sid: '11823020122',
                  S_name: '李小虎',
                  S_score:88,
                  S_maxScore:100,
                  S_submitTime:'',
                  S_correctCount:2,
                  S_isComit:true,
              }, {  /*展示数据*/
                  S_sid: '11823020123',
                  S_name: '王小虎',
                  S_score:'',
                  S_maxScore:100,
                  S_submitTime:'',
                  S_correctCount:0,
                  S_isComit:false,
              }, {  /*展示数据*/
                  S_sid: '11823020124',
                  S_name: '王小虎',
                  S_score:'',
                  S_maxScore:100,
                  S_submitTime:'',
                  S_correctCount:0,
                  S_isComit:false,
              },
                  {  /*总量数据*/
                      S_sid: '11823020121',
                      S_name: '小虎',
                      S_score:77,
                      S_maxScore:100,
                      S_submitTime:'',
                      S_correctCount:1,
                      S_isComit:true,
                  }, {  /*展示数据*/
                      S_sid: '11823020122',
                      S_name: '李小虎',
                      S_score:88,
                      S_maxScore:100,
                      S_submitTime:'',
                      S_correctCount:2,
                      S_isComit:true,
                  }, {  /*展示数据*/
                      S_sid: '11823020123',
                      S_name: '王小虎',
                      S_score:'',
                      S_maxScore:100,
                      S_submitTime:'',
                      S_correctCount:0,
                      S_isComit:false,
                  }, {  /*展示数据*/
                      S_sid: '11823020124',
                      S_name: '王小虎',
                      S_score:'',
                      S_maxScore:100,
                      S_submitTime:'',
                      S_correctCount:0,
                      S_isComit:false,
                  }
              ],
              multipleSelection: []
          }
        },
        methods:{
            goback(){
                this.$router.back()
            },
            nav(index){
                this.navIndex = index
            },
            /*根局成绩筛选*/
            filterStu(value){
                /*根据逻辑处理显示*/
                if (value.length==3 || value.length==0){
                   this.my = 'noptiona'
                   this.checkList=[]
                    this.forShowTableData = this.totalTableData
                    /*显示所有用户*/
               }else{
                    this.my = 'noption'
                    /*根据组合条件显示*/
                    if (value.length==1){
                        if (value[0]=='已批'){
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_correctCount>0)
                        }else if(value[0]=='未批'){
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_correctCount==0)
                        }else{
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_isComit==false)
                        }
                    }else{
                        this.forShowTableData = this.totalTableData
                        if ((value[0]=='已批'&&value[1]=='未批')||(value[1]=='已批'&&value[0]=='未批')){
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_isComit==true)
                        }else if ((value[0]=='已批'&&value[1]=='未交')||(value[1]=='已批'&&value[0]=='未交')){
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_isComit==false||data.S_correctCount>0)
                        }else{
                            this.forShowTableData = this.forShowTableData.filter(data => data.S_isComit==false||data.S_correctCount==0)
                        }
                    }
                }
            },
            /*点击不限*/
            noptionShow(){
                this.my = 'noptiona'
                this.checkList = []
                this.forShowTableData = this.totalTableData
                /*不限即所有用户显示*/
            },
            /*搜索框筛选*/
            filteByidOrName(){
                this.forShowTableData = this.totalTableData
                if (this.search==''){
                }else {
                    this.forShowTableData = this.forShowTableData.filter(data => !this.search || data.S_name.toLowerCase().includes(this.search.toLowerCase()) || data.S_sid.toLowerCase().includes(this.search.toLowerCase()))
                }
                },
            /*排序菜单栏*/
            sortNav(index){
                this.sortNavIndex = index
            },
            handleSelectionChange(rows){
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            /*将选择的数据加入multipl..*/
            handleSelectionChange(val) {
            this.multipleSelection = val;
        },
            /*修改分数*/
            modifyScore(value){
                if (value.row.S_score<=value.row.S_maxScore){
                    /*发起修改请求*/
                    request('/ModifyScore',{
                        H_id:this.H_id,
                        S_sid:value.row.S_sid,
                        S_score:value.row.S_score
                    }).then(res=>{
                        if (res.data.success)
                           this.$message.success('修改成功')
                    })
                }else{
                    value.row.S_score = ''
                    this.$message.error('分数值不能超过' + value.row.S_maxScore)
                }
            },
            /*催交*/
            call(id){
                if (id){/*催交个人*/
                    alert('one')
                }else {/*催交所有人*/
                    alert('all')
                }
            },
            /*下载文件*/
            downloadFile(fileName){
                downLoad('/DownLoadServlet?fileName=' + fileName).then(res=>{
                    var realFileName = fileName.substring(fileName.indexOf("_")+1);
                    this.saveFile(res.data,realFileName) //这里要传入文件名以及文件后缀
                })
            },
            saveFile (data, name) {
                try {
                    const blobUrl = window.URL.createObjectURL(data)
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.download = name
                    a.href = blobUrl
                    a.click()

                } catch (e) {
                    alert('保存文件出错')
                }
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
        },
        computed:{
            getDeadLine(){
                var date =new Date("2020.6.23")
                return "截至  " + (date.getMonth() + 1) + "月-" + date.getDate() + "号 " + "23:59"
            },
      },
      mounted() {
            this.forShowTableData = this.totalTableData
            this.H_id = this.$route.query.H_id
            this.h_name = this.$route.query.H_name
            this.Course_name = this.$route.query.C_name
            /*通过H_id请求所有学生作业信息*/
            request('/GetStuHomework',{
                H_id:this.H_id
            }).then(res=>{
                console.log(res);
                this.totalTableData = res.data.stuHomeworks
                this.forShowTableData = this.totalTableData
            })
      }
    }
</script>

<style scoped>
  input{
    width: 50px;
    border-bottom: 1px solid #dbdbdb;
    border-top:0px;
    border-left:0px;
    border-right:0px;
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
    background: #FFF;
    border: 1px solid #c8c8c8;
    margin: 110px auto 60px;
    width: 1020px;
  }
  body,div{
    margin: 0;
    padding: 0;
  }
  .center{
    background: #FFF;
    border: 1px solid #c8c8c8;
    margin: 0px auto 10px;
    width: 1020px;
  }
 .center-top{
   padding: 39px 30px 27px;
   height: 80px;
   position: relative;
   border-bottom: 1px solid #c8c8c8;
 }
  .center-top-top{
    display: inline-block;
    width: 100%;
  }
  .center-top-top h2 {
    font-size: 18px;
    color: #2d2d2d;
    font-weight: 400;
    display: inline-block;
  }
  .center-top-buttom{
    padding-top: 12px;
  }
  .jiezi{
    float: left;
  }
  .serach{
    float: right;
  }
  .select-down{
    background-color: #2C58AB;
    margin-right: 10px;
  }
  .work-tips-info {
    padding: 0 28px;
    color: #5a5a5a;
    background-color: #fff;
  }
  .work-tips-info {
    line-height: 25px;
    font-size: 12px;
  }
  .table-condition{
    background: #fff;
    margin: 0 30px;
    box-sizing: border-box;
    border: 1px solid #DCDCDC;
  }
  .conditions{
    border-bottom: 1px dashed #eaeaea;
    font-size: 0;
  }
  .table-condition span {
    color: #5A5A5A;
    width: 250px;
    border-right: 1px #DCDCDC;
    text-indent: 30px;
    font-size: 18px;
    margin-left: 46px;
    border-bottom: 1px dashed #eaeaea;
    margin-bottom: -1px;
  }
  .noptiona{
     margin-top: 1px;
     background: #357AE8;
     border-radius: 2px;
     cursor: default;
     color: #FFF;
     width: 48px;
     height: 20px;
     line-height: 20px;
     border: 1px solid #357AE8;
     font-size: 12px;
     text-align: center;
   }
  .noption{
    margin-top: 1px;
    background: white;
    border-radius: 2px;
    cursor: default;
    color: black;
    width: 48px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #357AE8;
    font-size: 12px;
    text-align: center;
  }
  .buttom{
    background: #FFF;

    margin: 0px auto 60px;
    width: 1020px;
    height: 500px;
  }

  .buttom-top{
    height: 40px;
    border: 1px solid #DCDCDC;
    background-color: #F6F6F6;
    width: 960px;
    margin:0px auto 20px;
  }
  .buttom-other{
    height: 300px;
    width: 960px;
    border: 1px solid #c8c8c8;
    margin: 0px auto;

  }
  ul{
    margin: 0;
    padding: 0;
  }
  .buttom-top li{
    display: inline-block;
    float: left;
    vertical-align: middle;
  }
  .buttom-top li a {
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    display: block;
    width: 100px;
    line-height: 38px;
    border: 1px solid transparent;
    margin-left: -1px;
    color: #595959;
    font-size: 12px;
  }
  .buttom-top li.select a {
    background-color: #fff;
    border-left-color: #d2d2d2;
    border-right-color: #d2d2d2;
  }
  .buttom-top li a:hover, .buttom-top li.select a {
    color: #4d90fe;
  }
  li {
    list-style: none;
  }

  .cuijiao{
    width: 60px;
    text-align: center;
  }
  .cuijiao{
    color: #4D90FE;
    vertical-align: middle;
  }
</style>
