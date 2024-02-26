<template>
	<view class="content">
		
		<select class="select" v-model="dataId" v-on:change="indexSelect($event)" style="width:87%; height: 28px;font-size: 25px; margin-top: 2px;" >
		        <option  v-for="(item,index) in data.data" :key="index" v-bind:value="item.id">{{item.updateTime}}</option>
		</select>
		
		
	
		<table border="0" cellspacing="4" cellpadding="4" align="center" style="text-align: left;width: 95%; font-size: 22px; margin-top: 2px;" >
			<tr>
				<td>车号：{{data.data[currentIndex].carNo}}</td>
			</tr>
			
			<tr>
				<td>货物名称：{{data.data[currentIndex].material}}</td>
			</tr>
			
			<tr>
				<td>车型：{{data.data[currentIndex].carType}}</td>
			</tr>
			
			<tr>
				<td>发货单位：{{data.data[currentIndex].seller}}</td>
			</tr>
			
			<tr>
				<td>收货单位：{{data.data[currentIndex].buyer}}</td>
			</tr>
			
			<tr>
				<td>称号：{{data.data[currentIndex].wbCode}}</td>
			</tr>
			
			<tr> 
				<td>毛重：{{data.data[currentIndex].fllCarWeight}}</td>  
			</tr>
			
			<tr>
				<td>皮重：{{data.data[currentIndex].emptyCarWeight}}</td>
			</tr>
			
			<tr>
				<td>毛重时间：{{data.data[currentIndex].fllCarTime}}</td>
			</tr>
			
			<tr>
				<td>皮重时间：{{data.data[currentIndex].emptyCarTime}}</td>
			</tr>
			
			<tr>
				<td>净重：{{data.data[currentIndex].netWeight}}</td>
			</tr>
			
			<tr>
				<td>运输单号：{{data.data[currentIndex].tradeNo}}</td>
			</tr>
		</table>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				model1: 0,
				currentIndex:0,
				updateTime:'',
				dataId:'',
				data:{}
			}
		},
		onLoad(options){
		   var data = JSON.parse(options.list); // 字符串转对象
		   this.data = data;
		   if(this.data && this.data.data){
			   this.dataId = this.data.data[0].id;
		   }
		   console.log(data)

		},
		watch:{
			dataId(newVal,oldVal){
				this.currentIndex = this.data.data.findIndex(item => newVal == item.id);
			}
		},
		methods: {
			indexSelect(e){
				 console.log(e)
				 console.log(e.target.selectedIndex) // 选择项的index索引
				 console.log(e.target.value) // 选择项的value，也就是v-bind:value 的绑定值，如果换成 v-bind:value="item.id",则打印的是 选中项的id
					
			 },
			
			
		},
		
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
