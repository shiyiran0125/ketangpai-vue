import VueRouter from "vue-router";
import Vue from 'vue'
// 引入组件，懒加载方式
import register from "../components/register";
import login from "../components/login";
import store from "../store/index";
const teacher = ()=>import("../view/teacher/teacher");
const student = ()=>import("../view/student/student");
const sCourselist  = ()=>import("../view/student/sCourselist");
const course = ()=>import("../view/teacher/courselist");
const courseInfo = ()=>import("../view/teacher/courseInfo");
const eachTalk = ()=>import("../view/teacher/TeacherEachtalk");
const tHomework = ()=>import("../view/teacher/teacherHomework");
const topic = ()=>import("../components/topic");
const correct = ()=>import("../view/teacher/TeacherCorrect");
const courseMenbers = ()=>import("../view/teacher/courseMenbers");
const sCourseInfo = ()=>import("../view/student/sCourseInfo");
const sHomework = ()=>import("../view/student/studentHomeworks");
const sEachtalk = ()=>import("../view/student/studentEachtalk");
import sComitHomework from "../view/student/sComitHomework";
const sCourseMenbers = ()=>import("../view/student/sCourseMenbers");
Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:'/register'
  },
  {
    path:"/register",
    name:'register',
    component: register
  },
  {
    path: "/login",
    name:'login',
    component: login
  },
  {
    path:"/teacher",
    component:teacher,
    children: [
      {
        path: '',
        redirect: '/teacher/courselist'
      },
      {
        path: '/teacher/courselist',
        name:'teacher/courselist',
        component: course
      }
    ]
  },
  {
    path:"/student",
    component:student,
    children: [
      {
        path: '',
        redirect: '/student/courselist'
      },
      {
        path: '/student/courselist',
        name:'student/courselist',
        component: sCourselist
      }
    ]
  },
  {
    path:"/courseInfo",
    name:'courseInfo',
    component:courseInfo,
    children: [
      {
        path: '/courseInfo/eachTalk',
        name:'courseInfo/eachTalk',
        component: eachTalk
      },
      {
        path: '/courseInfo/tHomework',
        name:'courseInfo/tHomework',
        component: tHomework
      },
      {
        path: '/courseInfo/topic',
        name:'courseInfo/topic',
        component: topic
      }
    ]
  },
  {
    path:'/correct',
    name:'correct',
    component:correct
  },
  {
    path:'/courseMenbers',
    name:'courseMenbers',
    component:courseMenbers
  },
  {
    path:"/sCourseInfo",
    component: sCourseInfo,
    children: [
      {
        path: '',
        redirect: '/sCourseInfo/sHomework',
      },
      {
        path: '/sCourseInfo/sHomework',
        name:'sCourseInfo/sHomework',
        component: sHomework
      },
      {
        path:'/sCourseInfo/sEachtalk',
        name:'sCourseInfo/sEachtalk',
        component:sEachtalk
      },
      {
        path:'/sCourseInfo/topic',
        name:'sCourseInfo/topic',
        component:topic
      }

    ]
  },
  {
    path:'/dealHomework',
    name:'dealHomework',
    component:sComitHomework
  },
  {
    path:'/sCourseMenbers',
    name:'sCourseMenbers',
    component:sCourseMenbers
  },
]
const route = new VueRouter({
  routes,
  mode:'history'
});
route.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  let isLogin =  store.state.isLogin;
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (to.path==='/login'||to.path==='/register') {
    next();
  }else{
    if (!isLogin){
      alert('请先登录')
      next('/login')
    }else{
      next()
    }
  }
});
export default route;
