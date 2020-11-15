<template>
  <div>
    <div class="homeworks" v-show="homeworkListShow">
      <homework-item v-for="(item,index) in homeworks"  :content="item.Content" :PublicDate="item.Date_issue" :type="item.Type" :title="item.Title" :deadline="item.Deadline" :h_id="item.H_id" :C_name="C_name" :key="index">
        <div class="homework-right-buttom">
          <el-button v-show="item.State==0" type="primary" round @click="goComit(item)">上传作业</el-button>
          <router-link to=""><el-button v-show="item.State==1">已提交</el-button></router-link>
          <router-link to=""><el-button v-show="item.State==2">成绩未公布</el-button></router-link>
        </div>
      </homework-item>
    </div>
  </div>
</template>

<script>
    import {request} from "../../axios";
    import homeworkItem from "../../components/homeworkItem";
    export default {
        name: "studentHomeworks",
        components:{
            homeworkItem
        },
        props:{
            C_code:{
                type: String,
                default:''
            },
            C_name:{
                type:String,
                default: ''
            },
        },
        data() {
            return {
                homeworkListShow:true,/*作业列表展示*/
                homeworks:[]
            }
        },
        methods:{
            goComit(item){
              this.$store.commit('comitHomework',item);
              this.$router.push('/dealHomework')
            },
            /*作业菜单*/
            hoptionShow(item){
                item.hoption = ! item.hoption
            },
        },
        mounted(){
            var list = []
            request('/GetHomeworkList',{
                C_code:this.$store.state.courseInfo.C_code,
                user:'student',
                account:this.$store.state.account
            }).then(res=>{
                console.log(res)
                list = res.data.homeworkList
                list.forEach(item=>{
                    item.hoption = false
                })
                this.homeworks = list
                this.$store.state.homeworkNumber = this.homeworks.length
            })
            /*request('/FileListServlet',{
                user:'student'
            }).then(res=>{
                list.forEach(item=>{
                    item.fileName = res.data.fileName
                    item.filePath = res.data.filePath
                })
            })*/
        }
    }

</script>

<style scoped>
  .homeworks{
    padding-top: 20px;
  }
  a{
    color: #5F6368;
    cursor: pointer;
    text-decoration: none;
  }
  .homework-right-buttom{
    padding-top: 100px;
    padding-left: 150px;
    position: relative;
    min-width: 290px;
    height: 66px;
    margin-right: 0;
    border: none;
    background: #FFF;
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
  li{
    list-style: none;
  }
  .homework-right-top-option ul li a:hover{
    background-color: rgba(12,12,12,.45);
    display: inline-block;
  }
</style>
