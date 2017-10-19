<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0, $event)">{{ des.all }}<span class="count">{{ ratings.length }}</span></span>
			<span class="block positive" :class="{'active':selectType===1}" @click="select(1, $event)">{{ des.positive }}<span class="count">{{ positives.length }}</span></span>
			<span class="block negative" :class="{'active':selectType===2}" @click="select(2, $event)">{{ des.negative }}<span class="count">{{ negatives.length }}</span></span>
		</div>
		<div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
			<i class="iconfont icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/javascript">
 const POSITIVE = 0;
 const NEGATIVE = 1;
 const ALL = 0;
export default{
	props:{
		onlyContent: {
        	type: Boolean,
       		default: false
      	},
		ratings:{
			type:Array,
			default() {
				return [];
			}
		},
		des:{
			type:Object,
			default() {
				return {
					all:"全部",
					positive:"满意",
					negative:"吐槽"
				}
			}
		},
		selectType:{
			type:Number,
			default:ALL
		}
	},
	computed:{
		positives() {
			 return this.ratings.filter((rating) => {
          		return rating.rateType === POSITIVE;
        	});
		},
		negatives() {
			return this.ratings.filter((rating) => {
          		return rating.rateType === NEGATIVE;
        	});
		}
		
	},
	methods:{
		select(type,event) {
			if (!event._constructed) {
         	 return;
       		}
       		this.selectType = type;

       		this.$emit('increment', 'selectType', type);
		},
		toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('increment', 'onlyContent', this.onlyContent);
      }
	},
	
}
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			.block
				display:inline-block
				padding:8px 12px 
				margin-right:8px
				font-size:12px
				color rgb(77, 85, 93)
				&.positive
					background:rgba(0, 160, 220, 0.2)
					&.active
						background:rgb(0, 160, 220)
						color:#fff
				&.negative
					background:rgba(77, 85, 93, 0.2)
					&.active
						background:rgb(77, 85, 93)
						color:#fff
		.switch
			padding:12px 18px
			line-height:24px
			font-size:12px
			color:rgb(147,153,159)
			border:1px solid rgba(1,17,27,.1)
			font-size:0
			&.on
				.iconfont
					color:#00c850
			.iconfont
				vertical-align:top
				display:inline-block
				font-size:24px
				margin-right:4px
			.text
				font-size:12px
		


 
				



	
</style>