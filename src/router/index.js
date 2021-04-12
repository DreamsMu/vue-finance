import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Main from "@/views/Main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: {
      path: '/',
      name: 'Main',
      component: Main
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
