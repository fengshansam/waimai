<template lang="html">
	<div class="ratings" ref="ratingsWrapper">
		<div>
			<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h2 class="score">{{ seller.score }}</h2>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{ seller.rankRate }}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{ seller.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商家评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{ seller.foodScore }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间：</span>
						<span class="deliveryTime">{{ seller.deliveryTime }}分钟</span>
					</div>
				</div>

			</div>
		</div>
		<split></split>
		<ratingselect @increment="incrementTotal" :selectType="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
		<div class="ratings-wrapper">
			<ul>
				<li v-for="rating in ratings" class="ratings-item" v-show="needShow(rating.rateType, rating.text)">
					<div class="avatar">
						<img width="28px" height="28px" :src="rating.avatar">
					</div>
					<div class="content">
						<h2 class="name">{{ rating.username }}</h2>
						<div class="star-wrapper">
							<star :size="24" :score="rating.score"></star>
							<span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}</span>
						</div>
						<p class="text">{{ rating.text }}</p>
						<div class="recommend" v-show="rating.recommend.length">
							<span class="icon-thumb_up"></span>
							<span v-for="item in rating.recommend" class="item">{{ item }}</span>
						</div>
						<div class="time">{{rating.rateTime | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
		
	</div>
</div>
</template>
<script>
import star from "../star/star"
import split from "../split/split"
import ratingselect from "../ratingselect/ratingselect"
import BScroll from 'better-scroll'
import axios from 'axios'
import {formatDate} from '../../common/js/date'
 const ALL = 0
export default{
	components:{
			star,
			split,
			ratingselect
		},
	data() {
		      return {
		        ratings: [],
		        showFlag: false,
		        selectType: ALL,
		        onlyContent: true
		      };
    	},
	props:{
		
		seller:{
			type:Object
		}
	},
	created() {
		axios.get('static/data.json').then((res) => {
      	this.ratings = res.data.ratings;
      	this.$nextTick(() => {
        console.log(this.$el);
        this.scroll = new BScroll(this.$el, {click: true});
      		});
    	});
    	
	},
	methods:{
		
		incrementTotal(type, data) {
	        this[type] = data;
	        this.$nextTick(() => {
	          this.scroll.refresh();
	        });
	      },
	      needShow(type, text) {
	        if (this.onlyContent && !text) {
	          return false;
	        }
	        if (this.selectType === ALL) {
	          return true;
	        } else {
	          return type === this.selectType;
	        }
      	}
	},
	filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },

}
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.ratings
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow: hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex: 0 0 137px
				width:137px
				border-right:1px solid rgba(7,17,27,.1)
				text-align:center
				padding:6px 0
				@media only screen and (max-width:320px)
					flex:0 0 100
					width:100
				.score
					line-height:28px
					font-size:18px
					color:rgb(255,153,0)
					margin-bottom:6px
				.title
					line-height:12px
					font-size:12px
					color:rgb(7,17,27)
					margin-bottom:8px
				.rank
					line-height:10px
					font-size:10px
					color:rgb(147,153,159)

			.overview-right
				flex:1
				padding:6px 0 6px 12px
				@media only screen and (max-width:320px)
					padding-left:6px

				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title
						display:inline-block
						vertical-align:top
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
					.star
						display:inline-block
						margin:0 12px
						vertical-align:top
						@media only screen and (max-width:320px)
							margin:0 3px
					.score
						display:inline-block
						vertical-align:top
						color:rgb(255,153,0)
						font-size:12px
						line-height:18px
				.delivery-wrapper
					font-size:0
					.title
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
					.deliveryTime
						font-size:12px
						color:rgb(147,153,159)
		.ratings-wrapper
			padding:0 18px
			.ratings-item
				display:flex
				padding:18px 0
				border-1px(rgba(7,17,27,0.1))
				.avatar
					flex:0 0 28px
					width:28px
					margin-right:12px
					img
						border-radius:50%
				.content
					position:relative
					flex:1
					.name
						margin-bottom:4px
						line-height:12px
						font-size:10px
					.star-wrapper
						margin-bottom:6px
						font-size:0
						.star
							display:inline-block
							margin-right:6px
							vertical-align:top
						.delivery
							display:inline-block
							vertical-align:top
							font-size:10px
							color:rgb(147,153,159)
					.text
						line-height:18px
						font-size:12px
						color:rgb(7,17,27)
						margin-bottom:8px
					.recommend
						line-height:16px
						font-size:0px
						.icon-thumb_up,.item
							display:inline-block
							margin:0 8px 4px 0
							font-size:9px
						.icon-thumb_up
							color:rgb(0,160,220)
						.item
							padding:0 6px
							border:1px solid rgb(7,17,27)
							border-radius:1px
							color:rgb(147,153,159)
							background:#fff
					.time
						position:absolute
						top:0
						right:0
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px




	
</style>