import Vue from 'vue'
import Router from 'vue-router'
import Myheader from '../components/header/myheader'
import Goods from "../components/goods/goods"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Vue',
      component: Vue,
      children:[
      {path:'',component:Goods},
      {path:'goods',component:Goods}
     
      ]
    }
  ]
})
