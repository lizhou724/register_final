<template>
	<view class="content">
		
		
		<table border="0" cellspacing="5" cellpadding="5" align="center" style="text-align: left;width: 95%; font-size: 22px; " >
			<tr>
				<td>车号：{{data.carNo}}</td>
			</tr>
			
			
			<tr>
				<td>货物名称：{{data.material}}</td>
			</tr>
			
			<tr>
				<td>车型：{{data.carType}}</td>
			</tr>
			
			<tr>
				<td>发货单位：{{data.seller}}</td>
			</tr>
			
			<tr>
				<td>收货单位：{{data.buyer}}</td>
			</tr>
			
			
			<tr>
				<td>毛重：{{data.fllCarWeight}}千克</td>
			</tr>
			
			<tr>
				<td>皮重：{{data.emptyCarWeight}}千克</td>
			</tr>
			
			<tr>
				<td>净重：{{data.netWeight}}千克</td>
			</tr>
			<tr>
				<td>毛重时间：{{data.fllCarTime}}</td>
			</tr>
			
			<tr>
				<td>皮重时间：{{data.emptyCarTime}}</td>
			</tr>
			
			
			<tr>
				<td>运输单号：{{data.tradeNo}}</td>
			</tr>
		</table>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
			 
			
				
			}
		},
		onLoad(options){
		   var data = JSON.parse(options.list); // 字符串转对象
		   this.data = data;
		   console.log(data);
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
