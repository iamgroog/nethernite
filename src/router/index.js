import Vue from "vue"
import VueRouter from "vue-router"
import TheSearchResults from "../views/TheSearchResults/TheSearchResults"

Vue.use(VueRouter)

const routes = [
  {
    path: "/:query/:page",
    name: "TheSearchResults",
    component: TheSearchResults,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
