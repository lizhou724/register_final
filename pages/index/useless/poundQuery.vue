<template>
	<view>
		<div style="text-align: center;">
		    <input style="text-align: center;height:50px;font-size:50px;"  type="text" placeholder="请输入车牌号"  v-model="carNo" >
		</div>
		<div style="text-align: center;">
		    <button  type="button"  @click="sendInfo()">下一步</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				carNo:'',
			}
		},
		
		onLoad() {
			
		},
		
		methods: {
			sendInfo(){
				if(this.carNo.length == 7){
						uni.request({
						    // url: 'http://192.168.24.208:8081/takeRecord/carRegister', //仅为示例，并非真实接口地址。
							// url: 'http://47.96.38.201:11888/api/sysTenant/tenantCodeLogin',
							url: '/api/weighCar/exitDetails',
							// url: '/weighCar/exitDetails',
							// url: 'http://192.168.66.106:4001/weighCar/exitDetails',
							
							method: 'POST',
						    data: this.carNo,
						    success: (res) => {	
								let data = res.data;  	
								if("00001" == data.code){
									let message = data.message;
									alert(message)
								}else if("00000" == data.code){
								// data.data.carNo = this.carNo;
								console.log(data);
						    	uni.navigateTo({
						    	url: './poundInfoList?list='+ encodeURIComponent(JSON.stringify(data)),
						    	})
								}
						    },
						})
					}
					else if(this.carNo.length == 0){
						alert("请输入车牌号")
					}
					else{
						alert("错误的车牌号")
					}
				;
			}
		}
	}
</script>

<style>
</style>
