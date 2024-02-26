<template>
	<view >
		<table  border="1" cellspacing="0" cellpadding="10"  align="center" style="width:95%; text-align: center;font-size: 20px;margin-left: 10px;margin-top: 5px;" >
			
			<tr>
			    <td style="font-size: 20px;"><span style="color:red">*</span>车牌号</td>
			    <td >
			        <input class="input-title redDot" type="text" style="font-size: 19px;" v-model.trim="carNo" placeholder="请输入车牌号"> 
			    </td>
			</tr>
			
			<tr>
			    <td style="font-size: 20px;"><span style="color:red">*</span>重车重量(吨)</td>
			    <td >
			        <input class="input-title redDot" type="text" style="font-size: 19px;" v-model="thridFllWeight" placeholder="请输入重车重量"> 
			    </td>
			</tr>
			
			<tr>
			    <td style="font-size: 20px;"><span style="color:red">*</span>空车重量(吨)</td>
			    <td >
					<input class="required" type="text"  style="font-size: 19px;" v-model="thridEmptyWeight" placeholder="请输入空车重量">
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 20px;"><span style="color:red">*</span>净重(吨)</td>
				<td>
				{{((thridFllWeight  * 1000 - thridEmptyWeight * 1000) / 1000).toFixed(2)}}    
				</td>
			</tr>
			
		</table>
		
		
		<div style="text-align: center; margin-top: 5px;">
		    <button  type="button"  @click="sendInfo()" style="font-size: 20px;" >提交</button>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return{
				carNo:'',
				thridFllWeight:'',
				thridEmptyWeight:'',
			}
		},
		onLoad() {
		},
		
		methods: {
			//乘法 
			  accMul(arg1,arg2) 
			 { 
				 var m=0,s1=arg1.toString(),s2=arg2.toString(); 
				 try{m+=s1.split(".")[1].length}catch(e){} 
				 try{m+=s2.split(".")[1].length}catch(e){} 
				 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
			 },
			sendInfo(){
				if(this.carNo.length == 7){
					if( this.thridFllWeight && this.thridEmptyWeight && (this.thridFllWeight > this.thridEmptyWeight) && (this.thridFllWeight < 100 && this.thridEmptyWeight < 100) ) {
						let thridFllWeight = this.accMul(this.thridFllWeight, 1000) 
						let thridEmptyWeight = this.accMul(this.thridEmptyWeight, 1000) 
						let thridWeight = thridFllWeight - thridEmptyWeight;
						uni.request({
							url: '/api/takeRecord/registerYT',
							// url: '/takeRecord/carRegister',
							// url: 'http://192.168.67.230:4001/takeRecord/carRegister',
							// url: 'http://192.168.67.176:8081/takeRecord/registerYT',
							
							method: 'POST',
						    data: {
								carNo : this.carNo,
								thridFllWeight : thridFllWeight,
								thridEmptyWeight : thridEmptyWeight,
								thridWeight: thridWeight
						    },
						    success: (res) => {	
								let data = res.data;
								console.log(data)
						    	if ("00000" == data.code){
									let message=data.message;
									alert(message)
						    	}else{
									let message=data.message;
						    		alert(message)
						    	}								
						    },
						})}else{
							alert("请正确填写重车重量和空车重量，注意单位为吨！")
						}
					}else if(this.carNo.length == 0){
						alert("请输入车牌")
					}else{
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
