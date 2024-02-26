<template>
	<view >
	<center>
	
	</br>
	<view style="font-size: 30px; align-content: center;">登记成功，允许入厂！</view>
	<div class="times"  >
		<span>{{ hour }} : {{ minutes }}</span>
		<span style="font-size: 38upx;margin-left: 10upx;;">{{ seconds }}s</span>
	</div>
	

	
	
	</center>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			const now = new Date()
						return {
							hour: now.getHours() < 10 ? '0' + now.getHours() : now.getHours(), //当小时为个为数时在在前加0（例：01），以下同理
							minutes: now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
							seconds: now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds(),
							timer: null
						}
			
		},
		onLoad() {
					if (this.timer) {
						clearInterval(this.timer)
					}
					setInterval(() => {
						this.getTime()
					},1000)  //设置定时器，时时间每隔一秒钟走一次（即每秒）
				},
		methods: {
					getTime () {
						var date = new Date()
						this.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
						this.minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
						this.seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
					}
					
					
				}
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
	}

	.times {
		margin-left: 250upx ;
		font-size: 60upx;
		padding-top: 60upx;
		font-weight: bold;
	}
</style>

