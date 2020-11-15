<template>
    <div class="homework-item">
      <div class="left">
        <div class="left-top"><p class="left-top-left">{{workType}}</p><p class="left-top-right">{{PublicDate}}</p></div>
        <router-link :to="{path:'/correct',query:{H_id:h_id,C_name:C_name,H_name:title}}">
        <p class="left-center" v-show="this.$store.state.userType=='teacher'"><a>{{title}}</a></p>
        </router-link>
        <p class="left-center" v-show="this.$store.state.userType=='student'"><a>{{title}}</a></p>
        <p class="left-2">{{content}}</p>
        <img src="../images/courseInfo/file_ext_big_doc.png" class="doc" alt="作业要求" title="作业要求">
        <i @click="downLoad(realFileName)" style="margin-left: 190px;font-size: 12px;font-style: normal;color: #32BAF0;cursor: pointer">{{realFileName}}</i>
        <p class="left-buttom">截止日期:{{deadline}}</p>
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import {request} from '../axios'
     import {downLoad} from "../axios";

    export default {
        name: "homeworkItem",
        data(){
          return{
              realFileName:'',
              fullFileName:'',
          }
        },
        props:{
            type: {
                type: String,
                default: '1'
            },
            PublicDate:{
                type:String
            },
            title:{
                type:String
            },
            content:{
              type:String
            },
            deadline:{
                type:String
            },
            h_id:{
                type:Number,
                default: ''
            },
            C_name:{
                type:String,
                default:''
            }
        },
        methods:{
            downLoad(){
                downLoad('/DownLoadServlet?fileName=' + this.fullFileName).then(res=>{
                    this.saveFile(res.data,this.realFileName) //这里要传入文件名以及文件后缀
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
            }
        },
        computed:{
            workType(){
                if (this.type=='1'){
                    return '个人作业'
                }else {
                    return '小组作业'
                }
            }
        },
        mounted() {
            request('/FileNameServlet',{
                H_id:this.h_id
            }).then(res=>{
                this.realFileName = res.data.realFileName
                this.fullFileName = res.data.fullFileName
            })
        }
    }
</script>

<style scoped>
.homework-item{
  height: 186px;
  width: 1220px;
  margin: 0px auto 20px;
  padding: 0 20px 0 40px;
  border: 1px solid #E2E6ED;
  border-radius: 8px;
  background: #FFF;
}
  .left{
    height: 186px;
    width: 400px;
    float: left;
  }
  a{
    cursor: pointer;
  }
  .right{
    height: 186px;
    width: 400px;
    float: right;
  }
  .left-top{
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
  }
  .left-top-left{
    font-size: 14px;
    color: #5F6368;
    background: #F1F3F4;
  }
  .left-top-right{
    font-size: 14px;
    margin-left: 25px;
    color: #5F6368;
  }
  .left-center{
    color: #3B3D45;
    font-size: 20px;
    font-weight: 400;
    word-break: break-all;
    word-wrap: break-word;
  }
  .left-2{
    color: #707070;
    overflow: hidden;
  }
  .left-buttom{
    float: left;
    margin-right: 20px;
    color: #A0A0A0;
  }
  .doc{
    width: 64px;
    height: 64px;
    float: right;
    margin-right: 52px;
    margin-top: -65px;
  }
</style>
