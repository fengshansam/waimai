<template>
<transition name="fade">
	<div class="foodDetail" v-show="show">
		<div class="food-content">
			<div class="imgWrapper">
				<img :src="food.image" width="100%" height="425" >
				<span class="icon-arrow_lift" @click="hide"></span>
			</div>
			<div class="content">
				<h2 class="title">{{ food.name }}</h2>
				<div class="detail">
					<span class="count">月售{{ food.sellCount }}份</span>
					<span class="comment">好评率{{ food.rating }}%</span>
				</div>
				<div class="price">
					<span class="nowPrice">￥{{ food.price }}</span>
					<span class="oldPrice" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
				</div>
				<div class="catcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<transition name="buy">
					<div class="buy" @click.stop.prevent="addFirst($event)"
					v-show="!food.count || food.count === 0">加入购物车</div>
				</transition>
			</div>
			<split></split>
			<div class="info" >
				<h2 class="titel">商品信息</h2>
				<p class="text" v-show="food.info">{{ food.info }}</p>
			</div>
			<split></split>
			<div class="rating">
				<h3 class="title">商品评价</h3>
				<ratingselect @increment="incrementTotal" :selectType="selectType" :only-content="onlyContent" :ratings="food.ratings"></ratingselect>
				<div class="rating-wrapper">
					<ul>
						<li class="rating-item border-1px" v-for="rating in food.ratings" >
							<div class="user">
								
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" >
							</div>
							<div class="time">{{rating.rateTime | formatDate}}
							</div>
							<p class="text">
								<span class="iconfont" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"> </span>{{rating.text}}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>		
	</div>
</transition>	
</template>
<script type="text/javascript">
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
import Vue from 'vue'
const ALL = 0
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data() {
			return{
				show:false,
				showFlag: false,
		        selectType: ALL,
		        onlyContent: true
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		},

		methods:{
			isShow() {
				this.show = true;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$el,{
							click:true
						})

					}else{
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.show = false;
			},
			incrementTotal(type, data) {
		        this[type] = data;
		        this.$nextTick(() => {
		          this.scroll.refresh();
		        });
	      	},
	      	addFirst(event) {
	      		if (!event._constructed) {
	      			return;
	      		}
	      		Vue.set(this.food, 'count', 1)

	      	}
	      
		},
		filters: {
		      formatDate(time) {
		        let date = new Date(time);
		        return formatDate(date, 'yyyy-MM-dd hh:mm');
		      }
   		 }
		

	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.foodDetail
		position:fixed
		top:0
		left:0
		bottom:48px
		width:100%
		background:#fff
		&.fade-enter-active,&.fade-leave-active
			transition:all 0.2 linear
			transform:translate3d(0,0,0)
		&.fade-enter,&.fade-leave-active
			opacity:0
			transform:translate3d(100%,0,0)

		.food-content
			.imgWrapper
				position:relative
				width:100%
				height:425px
				img
					width:100%
					height:425px
				.icon-arrow_lift
					position:absolute
					left:0px
					top:0px
					font-size:20px
					color:#fff
					padding:10px
			.content
				position:relative
				padding:18px
				.title
					font-size:14px
					font-weight:700
					line-height:14px
					margin-bottom:8px
					color:rgb(7,17,27)
				.detail
					margin-bottom:18px
					line-height:10px
					height:10px
					font-size:0
					.count,.comment
						display:inline-block
						font-size:10px
						color:rgb(147,153,159)
					.count
						margin-right:12px
				.price
					line-height:24px
					
					.nowPrice
						font-size:14px
						font-weight:700
						line-height:8px
						color:rgb(240,20,20)
					.oldPrice
						font-size:10px
						color:rgb(147,153,159)
						text-decoration:line-through
				.catcontrol-wrapper
					position:absolute
					right:12px
					bottom:12px
				.buy
					position:absolute
					right:18px
					bottom:18px
					z-index:20
					line-height:24px
					height:24px
					padding:0 12px
					box-sizing:border-box
					border-radius:12px
					font-size:10px
					color:#fff
					background:rgb(0,160,220)
					&.buy-enter-active,&.buy-leave-active
						transition:all 0.2s
						opacity:0
					&.buy-enter,&.buy-leave-active
						opacity:0
			.info
				padding:18px
				.title
					line-height:14px
					margin-bottom:6px
					font-size:14px
					color:rgb(7,17,27)
				.text
					font-size:12px
					line-height:24px
					padding:0 8px
					color:rgb(77,85,93)
			.rating
				padding-top:18px
				.title
					line-height:14px
					margin-left:18px
					font-size:14px
					color:rgb(7,17,27)
				.rating-wrapper
					padding:0 18px
					.rating-item
						position:relative
						padding:16px 0
						border-1px(rgba(7,17,27,.1))
						.user
							font-size:0
							height:24px
							.name
								display:inline-block
								text-align:center
								height:24px
								line-height:24px
								font-size:10px
								color:rgb(147, 153, 159)
							.avatar
								float:left
								width:24px
								height:24px
								border-radius:50%
						.time
							position:absolute
							right:0px
							top:20px
							font-size:10px
							color:rgb(147, 153, 159)
						.text
							line-height:16px
							font-size:12px
							color:rgb(7,17,27)
						.iconfont
							margin-right:4px
							line-height:16px
							font-size:12px
						.icon-thumb_up
							color:rgb(0,16,220)
						.icon-thumb_down
							color:rgb(147, 153, 159)


				



</style>