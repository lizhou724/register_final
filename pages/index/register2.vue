<template>
	<view>
	<center>
		<table v-if="!this.end" border="1" cellspacing="0" cellpadding="7"  align="center" style="width:95%; text-align: center;font-size: 20px;" >
		    <tr>
		        <td>车牌</td>
		        <td >{{data.carNo}}</td>
		    </tr>
		    <tr>
		        <td>物料</td>
		        <td>{{data.material}}</td>
		    </tr>
		    <tr>
		        <td>作业点</td>
		        <td>{{data.outPoint}}</td>
		    </tr>
		    <tr>
		        <td>发货方</td>
		        <td>{{data.seller}}</td>
		    </tr>
		    <tr>
		        <td>收货方</td>
		        <td>{{data.buyer}}</td>
		    </tr>
	
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>司机名字</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverName" placeholder="请输入司机名字"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>联系电话</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverTel" placeholder="请输入司机联系电话"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>身份证号</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverIdCard" placeholder="请输入司机身份证号"> 
				</td>
			</tr>
			
			
			<template v-if="(data.materialId == 2 || data.materialId == 56) && (data.carTypeId == 4 || data.carTypeId == 5)">
				<tr >
					<td style="font-size: 19px;"><span style="color:red">* </span>箱号</td>
					<td >
						<input class="required" type="text"  style="font-size: 19px;" v-model="record.carBoxNo" placeholder="请输入箱号">
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 19px;">铅封号</td>
					<td >
						<input class="required" type="text"  style="font-size: 19px;" v-model="record.carSealNo" placeholder="请输入铅封号">
					</td>
				</tr>
				
				<tr>
				    <td style="font-size: 19px;"><span style="color:red">* </span>净重(吨)</td>
				    <td >
				        <input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.thridWeight" placeholder="请输入净重"> 
				    </td>
				</tr>
			</template>
			<template v-else>
				<template v-if="data.orderType != 2">
					
					<tr>
						<td style="font-size: 19px;"><span style="color:red">* </span>重车重量(吨)</td>
						<td >
							<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.thridFllWeight" placeholder="请输入重车重量"> 
						</td>
					</tr>
					
					<tr>
						<td style="font-size: 19px;"><span style="color:red">* </span>空车重量(吨)</td>
						<td >
							<input class="required" type="text"  style="font-size: 19px;" v-model="record.thridEmptyWeight" placeholder="请输入空车重量">
						</td>
					</tr>

					<tr>
						<td>净重(吨)</td>
						<td>{{thridWeight}}</td>
					</tr>

				</template>
			</template>
		</table>
	</center>
	
	<center>
		
		<button v-if="!this.end" type="button" @click="next()" style="font-size: 20px;margin-top: 3px;" :loading="loading">确认登记!</button>
		
		<view v-if="this.end" style="margin-top: 3px;">
			<image  style="width: 300rpx;height: 300rpx;" src="../../static/complete.png"></image>
			<view style="font-size: 30px; align-content: center;">登记成功，允许入厂！</view>
		</view>
			
	</center>
	
	</view>
</template>



<script>
	
	function isEmpty(value){
		return length(value) < 1
	}
	function length(value)
	{
		return value == null ? -1 : value.length
	}
	function isNumber(value){
	    var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。
		return !isEmpty(value) && regPos.test(value);
	}
	function accMul(arg1,arg2)
	 { 
		 var m=0,s1=arg1.toString(),s2=arg2.toString(); 
		 try{m+=s1.split(".")[1].length}catch(e){} 
		 try{m+=s2.split(".")[1].length}catch(e){} 
		 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
	 }
	
	import  ValidationUtil  from '@/utils/ValidationUtil.js';
	import  StringUtil  from '@/utils/StringUtil.js';
	
	export default {
		data() {
			return{
				data:'',
				thridFllWeight:'',
				thridEmptyWeight:'',
				end:false,
				carSealNo: null,
				carBoxNo: null,
				record: {
				},
				loading: false
			}
		},
		
		onLoad(options){
		   var data = JSON.parse(options.list); // 字符串转对象
		   this.data = data;
		   console.log(data)
		   
		   this.record = {
			   driverTel: data.driverTel,
			   driverIdCard: data.driverIdCard,
			   driverName: data.driverName,
			   thridFllWeight: data.thridFllWeight != null ? data.thridFllWeight / 1000 : null,
			   thridEmptyWeight: data.thridEmptyWeight != null ? data.thridEmptyWeight / 1000 : null,
			   thridWeight: data.thridWeight != null ? data.thridEmptyWeight / 1000 : null
		   }
		   
		},
			
		computed: {
		  // 计算属性的 getter
		  thridWeight: function () {
			  if(isNumber(this.record.thridFllWeight) && isNumber(this.record.thridEmptyWeight))
			  {
			  	return (Number(this.record.thridFllWeight) - Number(this.record.thridEmptyWeight)).toFixed(2); //toFixed(2) 去掉误差
			  }
			  return null;
		  }
		},
		
		methods: {
			
			next(){
				if(this.loading)
				{
					alert("正在处理，请稍后")
					return;
				}
				
			
					if((this.data.materialId == 2 || this.data.materialId == 56) && (this.data.carTypeId == 4 || this.data.carTypeId == 5))
					{
						if(this.record.carBoxNo == null || this.record.carBoxNo.length < 5)
						{
							alert("请输入正确的箱号")
							return
						}
						if(!isNumber(this.record.thridWeight))
						{
							alert("请输入正确的净重")
							return
						}
					}
					else
					{
						//采购必填
						if(this.data.orderType == 1)
						{
							if(!(isNumber(this.record.thridFllWeight) && Number(this.record.thridFllWeight) < 100))
							{
								alert("请输入正确的重车重量,重量不能大于100吨")
								return
							}
							if(!(isNumber(this.record.thridEmptyWeight) && Number(this.record.thridEmptyWeight) < 100))
							{
								alert("请输入正确的空车重量,重量不能大于100吨")
								return
							}
							this.record.thridWeight = this.thridWeight;
						}
						
						if(isNumber(this.record.thridFllWeight) && isNumber(this.record.thridEmptyWeight))
						{
							this.record.thridWeight = this.thridWeight;
						}
					}
					
					
					if(length(this.record.driverName) <= 1)
					{
						alert("请输入正确的司机名字")
						return
					}
					
					if(!ValidationUtil.idCard(this.record.driverIdCard))
					{
						alert("请输入正确的身份证号")
						return
					}
					
					if(length(this.record.driverTel) != 11 )
					{
						alert("请输入正确的手机号")
						return
					}
					
					this.loading = true;
					let data = {carNo: this.data.carNo,...this.record}
					let trans = ['thridFllWeight','thridEmptyWeight','thridWeight'];
					trans.forEach(key=>{
						if (data[key] != null)
						{
							let value = data[key];
							data[key] = accMul(typeof(value) == 'number' ? value : Number(value), 1000)
						}
					})
					console.log("=========", data)
					uni.request({
					url: '/api/takeRecord/QrRegister',
					// url: '/takeRecord/QrRegister',
					// url: 'http://192.168.67.230:4001/takeRecord/QrRegister',
					data: data,
					method:'POST',
					success: (res) => {
						this.loading = false;
						let data = res.data;
						if ("00000" == data.code){
							this.end = true
						}else{
							let message = data.message;
							alert(message)
						}
					}
				});
				
				 
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