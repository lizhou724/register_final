<template>
	<view>
		<center>
			
		<table v-if="!this.end" border="1" cellspacing="0" cellpadding="12"  align="center" style="width:95%; text-align: center;font-size: 20px;">
			
			<tr>
			    <td ><span style="color:red">* </span>类型</td>
			    <td>
					<radio-group >
						<radio style="margin-left: 8px;" :value="item.dictCode"  v-model="record.typeId" @click="record.typeId = item.dictCode"  v-for="item in typeIdList" >{{item.dictName}}</radio>
					</radio-group>
			    </td>
			</tr>
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>拜访人</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.visitUserName" placeholder="请输入拜访人名字"> 
				</td>
			</tr>
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>接待人</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.receiveUserName" placeholder="请输入请输入接待人名字"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>人员姓名</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverName" placeholder="请输入人员姓名"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>联系电话</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverTel" placeholder="请输入联系电话"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;"><span style="color:red">* </span>身份证号</td>
				<td >
					<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="record.driverIdCard" placeholder="请输入身份证号"> 
				</td>
			</tr>
			
			<tr>
				<td style="font-size: 19px;vertical-align: text-top;"><span style="color:red">* </span>事由</td>
				<td >
					<textarea class="input-title redDot"
						type="text" style="font-size: 19px;width: 80%" 
						v-model="record.remark" placeholder="请输入事由">
					</textarea>
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
	
	import  ValidationUtil  from '@/utils/ValidationUtil.js';
	import  StringUtil  from '@/utils/StringUtil.js';

	
	export default {
		data() {
			return{

				record:{},
				end:false,
				typeIdList: []
			}
		},
		onLoad(options){
			uni.request({
				url: '/api/takeRecord/getDictListByCode?dictTypeCode=wb_car_check-type_id-person',
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
			
		},
		
		methods: {
			// this.record.carNo&&this.record.carNo.length == 7 && this.record.driverTel.length == 11 && this.record.driverIdCard.length == 18 && this.record.typeId && this.record.driverName
			next(){
				
				if(StringUtil.length(this.record.driverName) <= 1)
				{
					alert("请输入正确的人员姓名")
					return
				}
				
				if( !ValidationUtil.idCard(this.record.driverIdCard))
				{
					alert("请输入正确的身份证号")
					return
				}
				
				if( !ValidationUtil.tel(this.record.driverTel))
				{
					alert("请输入正确的手机号")
					return
				}
				
				if(StringUtil.length(this.record.remark) < 5 )
				{
					alert("事由不能少于5个字")
					return
				}
				
				
				uni.request({
					url:'/api/takeRecord/QrRegisterCheck',
					// url: '/takeRecord/QrRegister',
					// url: 'http://192.168.67.230:4001/takeRecord/QrRegister',
					
					data: {
						...this.record,
						what:2 //人登记
					},
					method:'POST',
					success: (res) => {
						let data = res.data;
						if ("00000" == data.code)
						{
							this.end = true
						}
						else
						{
							let message= data.message;
							alert(message)
						}
					}
				});
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