<template>
	<view>
		<!-- <table>
			<tr>
				<td style="display: flex;">
					<input placeholder="请输入重量"  class="row-input"/>KG
				</td>
				<td style="display: flex;">
					<input placeholder="请输入重量"  class="row-input"/>KG
			    </td>
			</tr>
		</table> -->
	<view class="grid" >
			<view class="item" >入厂登记</view>
			 <view class="item">磅单查询</view>
			 <view class="item">自助打印</view>
			 <view class="item">投诉建议</view>
			 <view class="item">投诉建议</view>
			 <view class="item">投诉建议</view>
			 <view class="item">投诉建议</view>
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
			 
			 
		}
	}
</script>

<style>
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
		font-size: larger;
		line-height: 7;
	}
	
	.row-input 
	{
		text-align: right;
		font-size: 20pt;
	}
</style>
