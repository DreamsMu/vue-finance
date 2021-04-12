import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Main from "@/views/Main";
import Income from "@/views/Income";
import Expend from "@/views/Expend";
import AddOrder from "@/views/AddOrder";

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/',
      name: 'Main',
      component: Main
    },{
        path: '/income',
        name: 'Income',
        component: Income
    },{
      path: '/expend',
      name: 'Expend',
      component: Expend
    },{
      path: '/addOrder',
      name: 'AddOrder',
      component: AddOrder
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
