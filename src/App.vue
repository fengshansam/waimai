<template>
 <div>
  <div id="app">

 	<Myheader :seller="seller"></Myheader>
 	<div class="tab">
 		<div class="tab-item">
 			<router-link to="/goods">商品</router-link>
 		</div>
 		<div class="tab-item">
			<router-link to="/ratings">评论</router-link>
 		</div>
 		<div class="tab-item">
			<router-link to="/seller">商家</router-link>
 		</div>
 	</div>
 	<keep-alive>
 	<router-view :seller="seller"></router-view>
  	</keep-alive>
   
  </div>
  
 
</div>
</template>

<script>

import Myheader from './components/header/myheader'
import axios from 'axios'


export default {
	data:function(){
		return{
			seller:{}
		}
	},
	created() {
    axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller
      console.log(res.data)
      
    })
  },
 
  components:{
    Myheader
  }

  

  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/index'
#app
	.tab
		display:flex
		width:100%
		height:40px
		line-height:40px
		border-bottom:1px solid rgba(7,17,27,.2)
		.tab-item
			flex:1
			text-align:center
			& > a
				display:block
				font-size:14px
				color:rgb(77,85,93)
				&.active
					color:rgb(240,20,20)

</style>
