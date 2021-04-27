import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Main from "@/views/Main";
import Income from "@/views/Income";
import Expend from "@/views/Expend";
import Chart from "@/views/Chart";
import Family from "@/views/Family";
import UserSet from '@/views/UserSet';
import Home2 from '@/views/Home2';
import Login from '@/views/Login';
import Register from '@/views/Register';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/main',
    component: Home,
    children: [{
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        requireAuth: true
      },
    },{
        path: '/income',
        name: 'Income',
        component: Income,
        meta: {
          requireAuth: true
        },
    },{
      path: '/expend',
      name: 'Expend',
      component: Expend,
      meta: {
        requireAuth: true
      },
    },{
      path: '/chart',
      name: 'Chart',
      component: Chart,
      meta: {
        requireAuth: true
      },
    },{
      path: '/family',
      name: 'Family',
      component: Family,
      meta: {
        requireAuth: true
      },
    },{
      path: '/userset',
      name: 'UserSet',
      component: UserSet,
      meta: {
        requireAuth: true
      },
    }]
  },{
    path: '/',
    component: Home2,
    children: [{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("token") == 'true') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      next('/');
    }else{
      next();
    }
  }
});