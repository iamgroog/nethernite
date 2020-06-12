import Vue from 'vue'
import VueRouter from 'vue-router'
import ThePackageList from '../views/ThePackageList/ThePackageList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ThePackageList',
    component: ThePackageList
  }
]

const router = new VueRouter({
  routes
})

export default router
