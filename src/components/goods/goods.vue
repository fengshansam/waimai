<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods"  :class="index==currentIndex?'menu-item-selected':'menu-item'" @click="clickmenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="foods-list foods-list-hook">
					<h2 class="title">{{ item.name }}</h2>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="goDetail(food,$event)">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h3 class="name">{{ food.name }}</h3>
								<p class="des">{{ food.description }}</p>
								<div class="extra">
									<span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{ food.price }}</span>
									<span v-show="food.oldPrice" class="old">{{ food.oldPrice }}</span>
								</div>
								<div class="cart-wrapper">
									<cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopCart"></shopcart>
		<foodDetail :food="selectFood" ref="myfood" v-if="selectFood"></foodDetail>
	</div>
</template>
<script type="text/javascript">
import 	Bscroll from 'better-scroll'
import axios from 'axios'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import foodDetail from '../fooddetail/foodDetail'
import Vue from 'vue'
const eventHub = new Vue()
	export default{
		components:{
			shopcart,
			cartcontrol,
			foodDetail
		},
		props:{
			seller:{
				type:Object
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];

			axios.get('../../../static/data.json').then((res)=>{
				 this.goods=res.data.goods;
				 this.$nextTick(()=>{
				 	this.initScroll();
				 	this.calculateHwight()
				 	

				 });
			})
		},
		data:function(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectFood:''
			 
			}
		},
		computed:{

			currentIndex() {
				for (let i = 0 , l = this.listHeight.length; i < l; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if (!height2 || (this.scrollY>=height1&&this.scrollY<height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods;
			}
			 
		},
		
		methods:{
			
			initScroll() {
				this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
					click:true
				})
				this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
					click:true,
					probeType:3
					
				})
				this.foodsScroll.on("scroll",(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))

				})
			},
			calculateHwight() {
				let foodsList = this.$refs.foodsWrapper.getElementsByClassName("foods-list-hook")
				let height = 0;
				this.listHeight.push(height);
				for (var i = 0 , l = foodsList.length;i<l; i++) {
					let item = foodsList[i];
					height += item.clientHeight;
					this.listHeight.push(height); 
				}
			},
			clickmenu(index,event) {
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("foods-list-hook")
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el,300)
			},
			goDetail(food,event) {
				if (!event._constructed) {
          
          			return;
        		}
				this.selectFood=food;
				this.$nextTick(()=>{
					this.$refs.myfood.isShow();
				})
				
				
			},
			 incrementTotal(target) {
        		this.$refs.shopCart.drop(target);
      		}
		}
		
		
	}

</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'
	.goods
		display:flex
		position:absolute
		top:174px
		bottom:46px
		width:100%
		overflow:hidden
		.menu-wrapper
			flex:0 0 80px
			width:80px
			background:#f3f5f7
			margin-top:2px;
			.menu-item-selected
				background:#fff
				font-weight:700px
				margin-top:-1px
			.menu-item,.menu-item-selected
				position:relative
				display:table
				width:56px
				height:54px
				line-height:14px
				padding:0 12px
				&:last-child:after
					content:none
			.menu-item:after
					position:absolute
					content:''
					left:12px
					width:56px
					bottom:0
					border-bottom:1px solid rgba(7,17,27,0.1)
				.text
					display:table-cell
					vertical-align:middle
					font-size:12px
					font-weight:200
					line-height:14px
					.icon
						display:inline-block
						vertical-align:bottom
						width:12px
						height:12px
						margin-right:2px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
		.foods-wrapper
			flex:1 
			.title
				padding-left:14px
				hheight:26px
				line-height:26px
				border-left:2px solid #d0dde1
				font-size:12px
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:18px
				padding-bottom:18px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
					margin-right:0
				.icon
					flex:0 0 56px
					margin-right:10px
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						height:14px
						line-height:14px
						font-size:12px
						color:rgb(7,17,27)
					.des,.extra
						line-height:10px
						font-size:10px
						color:rgb(147,153,159)
					.des
						line-height:12px
						margin-bottom:8px
					.extra	
						.count
							margin-right:12px
							line-height:12px
					.price
						font-weight:700
						line-height:24px
						.now
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration:line-through
							font-size:10px
							color:rgb(147,153,159)
					.cart-wrapper
						position:absolute
						right:0
						bottom:12px

	

	
</style>