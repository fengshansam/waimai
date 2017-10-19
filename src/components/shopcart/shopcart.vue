<template>
	<div class="shopcart">
		<div class="content" >
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight':totalPrice}">
						<span class="icon-shopping_cart" :class="{'highLight':totalPrice}"></span>
					</div>
					<div class="num" v-show="totalPrice">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'highLight':totalPrice}">￥{{ totalPrice }}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{ payDes }}</div>
			</div>
		</div>
		
		<div class="ball-container">
			<transition name="drop" v-for="(ball,index) in balls" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter">
			<div class="ball"   v-show="ball.show">
				<div class="inner inner-hook"></div>
			</div>
			</transition>
		</div>
		<transition name="shopList">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h2 class="title">购物车</h2>
				<span class="empty" @click="deleteAll">清空</span>
			</div>
			<div class="list-content" ref="foodList">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{ food.name }}</span>
						<div class="price">
							<span>￥{{ food.price*food.count }}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import 	Bscroll from 'better-scroll'
	export default{
		components:{
				cartcontrol
			},
		props:{
			
			selectFoods:{
				type:Array,
				default() {
					return [
					

					]
				}
			},
			
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data() {
		    return {
		      balls: [{
		        show: false
		      }, {
		        show: false
		      }, {
		        show: false
		      }, {
		        show: false
		      }, {
		        show: false
		      }],
		      dropBalls: [],
		      fold:true
		    }
		  },
		  created() {
		  	this.$root.eventHub.$on('cart.add',this.drop)
		  },
		computed:{
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food)=>{
					total += food.price*food.count
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count +=food.count
				})
				return count;
			},
			payDes() {
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let dif=this.minPrice-this.totalPrice
					return 	`还差￥${dif}元起送`	

				}else{
					return '去结算'
				}
			},
			payClass() {
				if(this.totalPrice<this.minPrice){
					return "notEnough"
				}else{
					return 'enough'
				}
			},
			listShow() {
				if (!this.totalCount) {
					this.fold = true;
					return false;

				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new Bscroll(this.$refs.foodList,{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			}
		},
		methods:{
			toggleList() {
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			drop(el) {
				for(let i=0;i<this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length;
				while(count--){
					let ball = this.balls[count];
					if(ball.show) {
						let react = ball.el.getBoundingClientRect();
						let x = react.left-32;
						let y = -(window.innerHeight-react.top-22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
          				inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          				inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}

			},
			enter(el) {
				 el.offsetHeight;
				 this.$nextTick(() => {
			        el.style.webkitTransform = 'translate3d(0,0,0)';
			        el.style.transform = 'translate3d(0,0,0)';
			        let inner = el.querySelector('.inner-hook');
			        inner.style.webkitTransform = 'translate3d(0,0,0)';
			        inner.style.transform = 'translate3d(0,0,0)';
			      }) 

			},
			afterEnter(el) {
				 let ball = this.dropBalls.shift();
				 if (ball) {
			        ball.show = false
			        el.style.display = 'none'
			      }
			},
			deleteAll() {
				this.selectFoods.forEach((food)=>{
					food.count=0
				})
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.shopcart
		position:fixed
		left:0
		bottom:0
		width:100%
		height:48px
		z-index:50
		.content
			display:flex
			background:#141d27
			font-size:0
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					border-radius:50% 
					background:#141d27
					.logo
						width:100%
						height:100%
						background:#2d343c
						border-radius:50%
						text-align:center
						&.highLight
							background:rgb(0,160,220)
						.icon-shopping_cart
							display:inline-block
							font-size:24px
							color:#80858a
							line-height:44px
							&.highLight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:9px
						color:#fff
						background:rgb(240,20,20)
						font-weight:700
						box-shadow:0 4px 8px 0 rgba(0,0,0,.4) 
				.price
					display:inline-block
					vertical-align:top
					margin-top:12px
					line-height:24px
					padding-right:12px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,.1)
					font-size:16px
					font-weight:700
					color:rgba(255,255,255,.4)
					&.highLight
						color:#fff
				.desc
					display:inline-block
					vertical-align:top
					margin:12px 0 0 12px
					line-height:24px
					color:rgba(255,255,255,.4)
					font-size:10px
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					height:48px
					line-height:48px
					text-align:center
					font-size:12px
					color:rgba(255,255,255,.4)
					font-weight:700
					background:#2b333b
					&.notEnough
						background:#2b333b
					&.enough
						background:#00b43c
						color:#fff
		.ball-container
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:200
				&.drop-enter,&.drop-enter-active
					transition:all .4s cubic-bezier(0.49,-0.29,0.75,0.41)
					.inner
						width:16px
						height:16px
						border-radius:50%
						background:rgb(0,160,220)
						transition:all .4s linear
		.shopcart-list
			position:absolute
			left:0
			top:0
			z-index:-1
			width:100%
			transform:translate3d(0,-100%,0)
			background:#fff
			&.shopList-enter-active,&.shopList-leave-active
				transition:all .5s
			&.shopList-enter,&.shopList-leave-active
				transform:translate3d(0,0,0)
			.list-header
				height:40px
				line-height:40px
				border-bottom:1px solid rgba(7,17,27,.1)
				background:#f3f5f7
				padding:0 18px
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				overflow:hidden
				.food
					position:relative
					padding:12px 0
					box-sizing:border-box
					border-1px(rgba(7,17,27,.1))
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						line-height:24px
						font-size:14px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:6px




</style>