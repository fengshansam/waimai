<template>
	<div class="seller">
		<div class="seller-content">
			<div class="overview">
				<h2 class="title">{{ seller.name }}</h2>
				<div class="des">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{ seller.ratingCount }})</span>
					<span class="text">月售{{ seller.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h3 class="">起送价</h3>
						<div class="content">
							<span class="stress">{{ seller.minPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h3 class="">商家配送</h3>
						<div class="content">
							<span class="stress">{{ seller.deliveryPrice }}</span>元
						</div>
					</li>
					<li class="block">
						<h3 class="">平均配送时间</h3>
						<div class="content">
							<span class="stress">{{ seller.deliveryTime }}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="collect=!collect">
					<span class="icon-favorite" :class="{'active':collect}"></span>
					<span class="text">{{ collect?'已收藏':'收藏' }}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h2 class="title">公告与活动</h2>
				<div class="content-wrapper border-1px">
					<p class="content">{{ seller.bulletin }}</p>
				</div>
				<ul v-if="seller.supports" class="sup">
					<li class="supports-item border-1px" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{ seller.supports[index].description }}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h2 class="title">商家实景</h2>
				<div class="pic-wrapper" ref="picsWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h2 class="title">商家信息</h2>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{ info }}</li>
				</ul>
			</div>
			
		</div>
		
	</div>
</template>
<script type="text/javascript">
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll'
import axios from 'axios'
	export default{
		props:{
			seller:{
				type:Object
			}

		},
		components:{
			star,
			split
		},
		data() {
			return{
				collect:false
			}
		},
		created:function(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			 this.init()
		},
		methods:{
			init() {
	       		this.$nextTick(() => {
	          		this.scroll = new BScroll(this.$el, {
	           			 click: true
	          			})
	         		 this._initPicScroll()
	        		})
	
    		},
    		_initPicScroll() {
    			if (this.picsScroll) {
        			return
      			}
      			const PIC_WIDTH = 120
      			const MARGIN = 6
      			let picLen = this.seller.pics.length
      			this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
      			this.picsScroll = new BScroll(this.$refs.picsWrapper, {
        			scrollX: true
     			})

    		}
    		


		}
		

	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
@import "../../common/stylus/base"

.seller
	position:absolute
	top:174px
	bottom:0
	left:0
	width:100%
	overflow:hidden
	.overview
		padding:18px
		position:relative
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
			font-weight:700
		.des
			padding-bottom:18px
			border-1px(rgba(7,17,27,.1))
			font-size:0
			.star
				display:inline-block
				margin-right:8px
				vertical-align:top
			.text
				margin-right:12px
				display:inline-block
				vertical-align:top
				font-size:10px
				color:rgb(77,85,93)
				line-height:18px
		.remark
			display:flex
			padding-top:18px
			.block
				flex:1
				text-align:center
				border-right:1px solid rgba(7,17,27,0.1)
				&:last-child
					border:none
				h3
					margin-bottom:4px
					line-height:10px
					font-size:10px
					color:rgb(147,153,159)
				.content
					line-height:24px
					font-size:10px
					color:rgb(7,17,27)
					.stress
						font-size:24px
		.favorite
			position:absolute
			right:18px
			top:18px
			width:50px
			text-align:center
			.icon-favorite
				display:block
				margin-bottom:4px
				line-height:24px
				font-size:24px
				color:#d4d6d9
				&.active
					color:rgb(240,20,20)
			.text
				line-height:10px
				font-size:10px
				color:rgb(77,85,93)

	.bulletin
		padding:18px 18px 0 18px
		.title
			margin-bottom:8px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.content-wrapper
			padding:0 12px 16px 12px
			border-1px(rgba(7,17,27,.1))
			.content
				line-height:24px
				font-size:12px
		.sup
			.supports-item
				padding:16px 12px
				border-1px(rgba(7,17,27,.1))
				font-size:0
				.icon
					display:inline-block
					width:16px
					height:16px
					background-size:16px 16px
					backgroun-repeat:no-repeat
					vertical-align:top
					margin-right:6px
					&.decrease
						bg-image('decrease_4')
					&.discount
						bg-image('discount_4')
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
				.text
					display:inline-block
					font-size:12px
					line-height:16px
					color:rgb(7,17,27)
	.pics
		padding:18px
		.title
			margin-bottom:12px
			line-height:14px
			color:rgb(7,17,27)
			font-size:14px
		.pic-wrapper
			width:100%
			overflow:hidden
			white-space:nowrap
			.pic-list
				font-size:0
				.pic-item
					display:inline-block
					margin-right:12px
					width:120px
					height:90px
					&:last-child
						margin-right:0
	.info
		padding:18px 18px 0px 18px
		.title
			padding-bottom:12px
			line-height:14px
			border-1px(rgba(7,17,27,.1))
			color:rgb(7,17,27)
			font-size:14px
		.info-item
			padding:16px 12px
			line-height:16px
			border-bottom 1px solid rgba(7,17,27,0.1)
			font-size:12px
			color:rgb(7,17,27)
			&:last-child
				border none


				



	
</style>