<template>
	<view>
		<view>
			<div style="text-align: center;">
			    <input style="text-align: center;font-size:35px;"  type="text" placeholder="请输入车牌号"  v-model="carNo" >
			</div>
			<div style="text-align: center;">
			    <button  type="button"  @click="query()">查询</button>
			</div>
		</view>
		
		<view v-if="data.data" class="grid">
			<template v-if="data.data.totalRows > 0">
				<view class="item" v-for="(item,index) in data.data.rows" @click="detail(index)">
					
						<view class="info">净重：{{item.netWeight}}千克</view>
						<view class="info">运输单号：{{item.tradeNo}}</view>
						<view class="info">时间：{{item .updateTime}}</view>
						
				</view>
			
				<uni-section type="line" padding>
					<uni-pagination :total="this.data.data.totalRows"  @change="change"/>
				</uni-section>
			</template>
			<view v-else style="text-align: center;font-size: 30px;">
				 未查到磅单信息！！！
			</view>
		</view>
		
		 
	</view>
</template>

<script>
	export default {
		data() {
			
			return{
				data:{},
				carNo:'',
				
			}
			
		},
		watch:{
		 
		},
		
		// onLoad(options) {
		// 	var data = JSON.parse(options.list); // 字符串转对象
		// 	this.data = data;
		// 	console.log(data)
		// },
		created() {
			 
		},
		methods: {	
			
			change(e){
				console.log(e)
				this.current = e.current
				this.query();
			},
			
			detail(index){
				
				uni.navigateTo({
					url: './poundDetail?list='+ encodeURIComponent(JSON.stringify(this.data.data.rows[index]))
				})
				
			},
			query(){
				if(this.carNo.length == 7){
						uni.request({
						    // url: 'http://192.168.24.208:8081/takeRecord/carRegister', //仅为示例，并非真实接口地址。
							// url: 'http://47.96.38.201:11888/api/sysTenant/tenantCodeLogin',
							// url: '/weighCar/poundPage',
							url: '/api/weighCar/poundPage',
							// url: 'http://192.168.67.230:4001/weighCar/poundPage',
							
							method: 'GET',
						    data: {
								carNo:this.carNo,
								pageSize:"10",
								pageNo:this.current
							},
						    success: (res) => {	
								this.data = res.data;
								console.log(this.data);
								if("00001" == this.data.code){
									let message = this.data.message;
									alert(message)
								}
								// else if("00000" == this.data.code){
								// 	data.data.carNo = this.carNo;
								
								// 	uni.navigateTo({
								// 	url: './poundInfoList1?list='+ encodeURIComponent(JSON.stringify(data)),
								// 	})
									
								// }
						    },
						})
				}else if(this.carNo.length == 0){
						alert("请输入车牌号")
				}else{
						alert("错误的车牌号")
				}
				
			}
			
		},
	}
</script>

<style>
	.grid
	{
		display: grid;
		grid-template-columns: 100%;
		
	    font-size: 19px;
		/* text-align: center; */
		margin-left: 2px;
		margin-right: 2px;
		margin-top: 2px;
	}
	.item
	{
		
		background-color: #007AFF;
		margin: 3px;
		text-align: left;
		color: #FFF;
		border-radius:4px;
		line-height: 1.6;
	}
	.info{
		margin-left: 5px;
	}
	
</style>
