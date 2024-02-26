<template>
	<view >
		<div style="text-align: center;">
		    <input style="text-align: center;font-size:47px;" type="text" placeholder="请输入车牌"  v-model="carNo" >
		</div>
		{{res}}
		<div style="text-align: center; ">
		    <button  type="button"  @click="sendInfo()" style="font-size: 22px;" >下一步</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				carNo:'',
				res: {}
			}
		},
		
		onLoad(option) {
			// var url = window.location.href
			// var rs = /ts=(.*)&ps=/.exec(url);
			// if(rs.length > 1)
			// {
			// 	console.log(rs[1])
			// }

			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function (res) {
			// 		alert(res.longitude)
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// });
			
			
			uni.getLocation({
				type: 'wgs84', //返回可以用于uni.openLocation的经纬度
				// isHighAccuracy: true,
				success:(res)  =>  {
					const latitude = res.latitude;
					const longitude = res.longitude;
					
					console.log("===", latitude, longitude)
					this.res = res.latitude + "/" + longitude; 
					// uni.openLocation({
					// 	latitude: latitude,
					// 	longitude: longitude,
					// 	success: function () {
					// 		console.log('success');
					// 	}
					// });
				},
				fail() {
					//alert("失败")
				}
			});
			
			
		},
		
		methods: {
			getScanTime()
			{
				var url = window.location.href
				var rs = /ts=(.*)&ps=/.exec(url);
				if(rs.length > 1)
				{
					return Number(rs[1])
				}
				return 0;
			},
			sendInfo(){
				// let st = this.getScanTime();
				// console.log('==st', st);
				// console.log('==now', Date.now());
				// console.log('==', (Date.now() - st));
				// if ((Date.now() - st) > 60 * 1000)
				// {
				// 	alert("请重新扫描二维码");
				// 	return;
				// }
				if(this.carNo.length == 7){
						uni.request({
							url: '/api/takeRecord/carRegister',
							method: 'POST',
						    data: {
								carNo : this.carNo,
						    },
						    success: (res) => {	
								let data = res.data;
								// data.data.carNo = this.carNo;
								console.log(data)
								if("00001" == data.code){
									let message=data.message;
									alert(message)
								}
								else 
								{
									data.data.carNo = this.carNo;
									uni.navigateTo({
									url: './register2?list='+ encodeURIComponent(JSON.stringify(data.data)),
									})
								}
						    },
						})
					}
					else if(this.carNo.length == 0){
						alert("请输入车牌")
					}
					else{
						alert("错误的车牌")
					}
				
			}
		}
	}
</script>

<style>
	.content {
		
	}

	.logo {
	
	}

	.text-area {
		
	}

	.title {
		
	}
</style>
