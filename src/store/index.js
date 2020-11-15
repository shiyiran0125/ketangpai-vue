import vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
vue.use(vuex)
const store = new vuex.Store({
  state:{
    userName:'石益然',
    account:'',
    password:'',
    userType:'',
    isLogin:false,
    totalCourse:[],/*所有非归档课程*/
    tCourseGuiDangs:[{C_name:'DB',show:false,C_code:'HGHJY7'}], /*归档课程*/
    modifyCourse:{},   /*当前修改的课程*/
    deleteCourseCode:'',/**/
    courseInfo:{},/*当前查看课程*/
    homeworkNumber:0,
    comitHomework:{}  /*要提交的作业的相关信息*/
  },
  mutations:{
    comitHomework(state,obj){
      state.comitHomework = obj;
    },
    updateIsLogin(state,obj){
      state.isLogin = obj.ifLogin
      state.userName = obj.userName
      state.account = obj.account
      state.userType=obj.userType
    },
    updateGuiDang(state,obj){
      state.tCourseGuiDangs = obj
    },
    updateInfo(state,obj){
      state.courseInfo= obj
    },
    updateTCourseGui(state,item){
      state.tCourseGuiDangs.push(item)
    },
    updateTotalCourse(state,list){
      state.totalCourse = list
    }

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})

export default store
