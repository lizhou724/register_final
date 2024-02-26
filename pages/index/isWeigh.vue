<template>
	<view>
		<!-- <center>
			
		<radio-group style="zoom: 250%; ">
			<radio value="1"  v-model="weigh"  @click="weigh=1,sendInfo()" /><font size="4">需要过磅</font><br>
			<radio value="2"  v-model="weigh"   @click="weigh=0,sendInfo()" /><font size="4">无需过磅</font></radio>
		</radio-group >
		</center> -->
		
		<view class="grid">
			<view class="item" v-model="weigh"  @click="weigh=1,sendInfo()">
				需要过磅
			</view>
			
			<view class="item" v-model="weigh"   @click="weigh=0,sendInfo()">
				无需过磅
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return{
				weigh:'2',
			}
		},
		
		onLoad() {
		},
		
		methods: {
			sendInfo(){
				if(this.weigh == 1){
					uni.navigateTo({
					url: './weigh'
					})
				}else if(this.weigh == 0){
					uni.navigateTo({
					url: './unWeigh'
					})
				}else if(this.weigh == 2){
					alert("请选择是否称重！！")
				}	
			}
		}
	}
    
</script>

<style>
	/* .grid
	{
		display: grid;
		grid-template-columns: 100%;
		
	    font-size: 50px;
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
	
	.row-input 
	{
		text-align: right;
		font-size: 20pt;
	}
		
		
		
</style>

