<template>
	<view>
		<center>
			
		<table v-if="!this.end" border="1" cellspacing="0" cellpadding="12"  align="center" style="width:95%; text-align: center;font-size: 20px;">
			<tr>
		        <td><span style="color:red">* </span>车牌</td>
		        <td><input style="font-size: 19px;" type="text"  v-model="data.carNo" placeholder="请输入车牌"></td>
		    </tr>
			
			<tr>
			    <td><span style="color:red">* </span>车辆类型</td>
			    <td >
			        <select v-model:value="data.carTypeId" style="width: 98%;font-size: 14pt;padding: 8px;">
						<option value="">请选择</option>
						<option  v-for="item in carTypeList" :value="item.dictCode">
							{{item.dictName}}
						</option>
					</select>
			    </td>
			</tr>
			
			<tr>
			    <td><span style="color:red">* </span>原因</td>
			    <td>
					<radio-group >
						<radio style="margin-left: 8px;"  :value="item.dictCode"  v-model="data.typeId" @click="data.typeId = item.dictCode"  v-for="item in typeIdList" >{{item.dictName}}</radio>
					</radio-group>
			    </td>
			</tr>
			
			<tr>
			    <td><span style="color:red">* </span>司机姓名</td>
			    <td >
			        <input style="font-size: 19px;" type="text" v-model="data.driverName" placeholder="请输入名字">
			    </td>
			</tr>
					
			<tr>
			    <td><span style="color:red">* </span>身份证号</td>
			    <td >
			        <input style="font-size: 19px;" type="text" v-model="data.driverIdCard" placeholder="请输入身份证号">
			    </td>
			</tr>
					
			<tr>
			    <td><span style="color:red">* </span>联系电话</td>
			    <td >
			        <input style="font-size: 19px;" type="text" v-model="data.driverTel" placeholder="请输电话">
			    </td>
			</tr>		
		</table>
		
		<view v-if="!this.end">
			 <button  type="button"  @click="next()" style="font-size: 22px; margin-top: 7px;">确认登记</button>
		</view>
		
		<view v-if="this.end" style="margin-top: 4px;">
			<image style="width: 300rpx;height: 300rpx;" src="../../static/complete.png"></image>
			</br>
			<view style="font-size: 30px; align-content: center;">登记成功，请联系审批人审批即可入厂！</view>
		</view>
			
		</center>
	</view>
	
</template>

<script>
	
	import ValidationUtil from '@/utils/ValidationUtil.js';
	import StringUtil  from '@/utils/StringUtil.js';

	export default {
		data() {
			return{

				data: {carTypeId: ''},
				end:false,
				typeIdList: [],
				carTypeList: []
				
			}
		},
		onLoad(options){
			
			uni.request({
				url: '/api/takeRecord/getDictListByCode?dictTypeCode=wb_car_check-type_id-car',
				success: (res) => {
						if(res.data.code == "00000")
						{
							this.typeIdList = res.data.data;
						}
						else
						{
							alert(data.data.message)
						}
					
					}
			})
			
			uni.request({
				url: '/api/takeRecord/getDictListByCode?dictTypeCode=car_type',
				success: (res) => {
						if(res.data.code == "00000")
						{
							this.carTypeList = res.data.data;
						}
						else
						{
							alert(data.data.message)
						}
					
					}
			})
		},
		
		methods: {
			// this.data.carNo&&this.data.carNo.length == 7 && this.data.driverTel.length == 11 && this.data.driverIdCard.length == 18 && this.data.typeId && this.data.driverName
			
			next(){ 
 				if( !ValidationUtil.carNo(this.data.carNo)){
 					alert("请填写正确的车牌号！！！")
 				}
				else if(this.data.carTypeId.length == 0){
					alert("请输入车辆类型！！！")
				}
				else if(StringUtil.length(this.data.driverName) < 1){
					alert("请填写司机姓名！！！")
				}else if( !ValidationUtil.idCard(this.data.driverIdCard)){
					alert("请填写正确的身份证号！！！")
				}else if( !ValidationUtil.tel(this.data.driverTel)){   
					alert("请填写正确的手机号！！！")
				}else{
					uni.request({
					url:'/api/takeRecord/QrRegisterCheck',
					// url: '/takeRecord/QrRegister',
					// url: 'http://192.168.67.230:4001/takeRecord/QrRegister',
					
					data: {
						...this.data,
						what: 1
					},
					method:'POST',
					success: (res) => {
						let data = res.data;
						if ("00000" == data.code){
							this.end = true
						}else if("00001" == data.code){
							let message=data.message;
							alert(message)
						}
					}
					});
					console.log(this.data)
					
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