<template>
	<view>
		
		<view class="grid">
			<view class="item" @click="enter()">
				车辆登记
			</view>
			<!--
			<view class="item" @click="visitor()">
				人员登记
			</view>
			-->
			<view class="item" @click="query()">
				磅单查询
			</view>
			<!--
			<view class="item1" @click="daoyun()">
				填写原糖单
			</view>
			-->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			
			return{
				 
			}
			
		},
		watch:{
		 
		},
		onLoad() {
			
		},
		created() {
			 
		},
		methods: {
			enter(){
				 uni.navigateTo({
				 url: './isWeigh'
				 })
			 
			},
			query(){
				uni.navigateTo({
				url: './poundInfoList'
				})
			},
			daoyun(){
				uni.navigateTo({
				url: './daoyun'
				})
			},
			visitor(){
				uni.navigateTo({
				url: './visitor-read'
				})
			},
		},
	}
</script>

<style>
	/* .grid
	{
		display: grid;
		grid-template-columns: 33.3% 33.3% 33.3%;
		
	    font-size: 25px;
		text-align: center;
		
		
		
	}
	.item
	{
		
		background-color: #007AFF;
		margin: 8rpx;
		text-align: center;
		color: #FFF;
		
		line-height: 2;
	} */
	
	
	
	.grid
	{
		display: grid;
		grid-template-columns: 33.33% 33.33% 33.33%;
	     
	}
	.item 
	{
		
		background-color: #007AFF;
		margin: 8rpx;
		text-align: center;
		color: #FFF;
		font-size: 24px;
		line-height: 5;
	}
	.item1
	{
		
		background-color: #007AFF;
		margin: 8rpx;
		text-align: center;
		color: #FFF;
		font-size: 24px;
		line-height: 5;
	}
	
	.row-input 
	{
		text-align: right;
		font-size: 20pt;
	}
	
</style>
