<template>
	<view>
	<center>
		<table v-if="!this.end" border="1" cellspacing="0" cellpadding="7"  align="center" style="width:95%; text-align: center;font-size: 20px;" >
		    <tr>
		        <td>车牌</td>
		        <td >{{data.data.carNo}}</td>
		    </tr>
		    <tr>
		        <td>物料</td>
		        <td>{{data.data.material}}</td>
		    </tr>
		    <tr>
		        <td>卸货点</td>
		        <td>{{data.data.outPoint}}</td>
		    </tr>
		    <tr>
		        <td>发货方</td>
		        <td>{{data.data.seller}}</td>
		    </tr>
		    <tr>
		        <td>收货方</td>
		        <td>{{data.data.buyer}}</td>
		    </tr>
			
			<tr>
			    <td style="font-size: 19px;"><span style="color:red">* </span>重车重量(吨)</td>
			    <td >
			        <input class="input-title redDot" type="text" style="font-size: 19px;" v-model="thridFllWeight" placeholder="请输入重车重量"> 
			    </td>
			</tr>
			
			<tr>
			    <td style="font-size: 19px;"><span style="color:red">* </span>空车重量(吨)</td>
			    <td >
					<input class="required" type="text"  style="font-size: 19px;" v-model="thridEmptyWeight" placeholder="请输入空车重量">
				</td>
			</tr>
							
			<tr>
			    <td>净重(吨)</td>
			    <td>{{thridWeight}}</td>
			</tr>
	
			<tr>
			    <td>司机名字</td>
			    <td >{{data.data.driverName}}</td>
			</tr>
					
			<tr>
			    <td>身份证号</td>
			    <td >{{data.data.driverIdCard}}</td>
			</tr>
					
			<tr>
			    <td>联系电话</td>
			    <td >{{data.data.driverTel}}</td>
			</tr>
			
			
		</table>
	</center>
	
	<center>
		
		<button v-if="!this.end" type="button" @click="next()" style="font-size: 20px;margin-top: 3px;">确认登记!</button>
		
		<view v-if="this.end" style="margin-top: 3px;">
			<image  style="width: 300rpx;height: 300rpx;" src="../../static/complete.png"></image>
			<view style="font-size: 30px; align-content: center;">登记成功，允许入厂！</view>
		</view>
			
	</center>
	
	</view>
</template>



<script>
	
	  
	export default {
		data() {
			return{
				data:'',
				thridFllWeight:'',
				thridEmptyWeight:'',
				end:false
			}
		},
		
		onLoad(options){
		   var data = JSON.parse(options.list); // 字符串转对象
		   this.data = data;
		   console.log(data)
		},
			
		computed: {
		  // 计算属性的 getter
		  thridWeight: function () {
		    // `this` 指向 vm 实例
		    return ((this.thridFllWeight ? this.thridFllWeight : 0) - (this.thridEmptyWeight ? this.thridEmptyWeight : 0)) > 0 ? ((this.thridFllWeight ? this.thridFllWeight : 0) - (this.thridEmptyWeight ? this.thridEmptyWeight : 0)).toFixed(2) : '';
		  }
		},
		
		methods: {
			
			next(){
				if(this.thridFllWeight && this.thridEmptyWeight && (this.thridFllWeight > this.thridEmptyWeight)){
					if(this.thridFllWeight > 100 || this.thridEmptyWeight > 100){
						alert("请注意重量单位为吨，谨慎填写")
					}else{
					uni.request({
					url: '/api/takeRecord/QrRegister',
					// url: '/takeRecord/QrRegister',
					// url: 'http://192.168.67.230:4001/takeRecord/QrRegister',
					data: {
						...this.data.data,
						thridWeight : this.thridWeight*1000,
						thridFllWeight : this.thridFllWeight*1000,
						thridEmptyWeight : this.thridEmptyWeight*1000,
						weigh : '1'
					},
					method:'POST',
					success: (res) => {
						let data = res.data;
						if ("00000" == data.code){
							this.end = true
						}else if("00001" == data.code){
							let message = data.message;
							alert(message)
						}
					}
				});}
				
				}else {
					alert("请正确填写重车重量和空车重量")
				}
				console.log(this.end)
				
			},	
		},
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