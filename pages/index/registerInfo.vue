<template>
	<view>
		<div class="sep">
			<div v-if="this.end"  style="margin-top: 50rpx">
						<label style="color:darkgreen">{{msg}}</label>
					</div>		  
		</div>
		<div v-if="!this.end" >
			<view class="bottom-bar-height"  >
				<center style="margin-bottom: 30px;">
					<table  border="1" cellspacing="0" cellpadding="7"  align="center" style="width:95%; text-align: center;font-size: 18px;" >
						<tr>
							<td class="bk">司机姓名</td>
							<td class="bk">{{basicData.driverName}}</td>
						</tr>
						<tr>
							<td class="bk">司机身份证号</td>
							<td class="bk">{{basicData.driverIdcard}}</td>
						</tr>
						<tr>
							<td class="bk">车牌号</td>
							<td class="bk">{{basicData.plateNumber}}</td>
						</tr>
						<tr>
							<td class="bk">运输方式</td>
							<td class="bk">{{basicData.transportType}}</td>
						</tr>
						<tr>
							<td class="bk">车辆类型</td>
							<td class="bk">{{basicData.carType}}</td>
						</tr>
						<tr>
							<td class="bk">车辆类型</td>
							<td class="bk">{{basicData.planTakeTime}}</td>
						</tr>
						<tr>
							<td class="bk" style="font-size: 19px;"><span style="color:red">* </span>司机电话</td>
							<td >
								<input class="input-title redDot" type="text" style="font-size: 19px;" v-model="basicData.driverPhone" placeholder="请输入司机电话"> 
							</td>
						</tr>
					</table>
				</center>
				<center>
				 <div class="sep">
						   <div  style="margin-top: -11px">
							 <label>选择提货单信息</label>
						   </div>
						  
				 </div>

				</center>
				<view style="padding: 0 20rpx 15rpx 20rpx ;display: flex; grid-column-gap: 5px;">
					<template v-for="item in containers">
						<view class="tag-view">
											<uni-tag :inverted="!item.checked" :text="'选择箱号：'+ item.text " type="primary" @click="checkContainer(item)" />
										</view>
					</template>
				</view>
				
				
				<center >
					
					 
				
				
			<view v-for="(son,index) in headerList" :key="index" style="border: 1px solid ; margin: 50px;">
				<div
				style="width:95%; text-align: left;font-size: 18px;margin-bottom: 30px;">数据来源：{{son.dataSource==0?"HD":"YG"}}
				<span @click="onlyOne(son)" >
					<jo-checkbox style="margin-right:10px;width:25px;float:right;transform: scale(1.5);border: 1px solid red;background-color:red ;"  v-model="son.checked" ></jo-checkbox>
				</span>
				
				</div>
				<view  class="list-box" v-for="(item,index) in son.childList" :key="index">
					<table border="1" cellspacing="0" cellpadding="7"  align="center" style="width:95%; text-align: center;font-size: 18px; margin-bottom: 30px;" >
						<tr>
							<td class="bk">提货单</td>
							<td class="bk">{{item.releaseNo}}
							<!-- <jo-checkbox style="float:right" v-model="item.checked"></jo-checkbox> -->
							</td>
						</tr>
						<tr v-if="!isEmpty(item.vbeln)">
							<td class="bk">交货单号</td>
							<td class="bk">{{item.vbeln}}
							</td>
						</tr>
						<tr>
							<td class="bk">客户名称</td>
							<td class="bk">{{item.custom==null || item.custom == '' ? item.customerName:item.custom}}</td>
						</tr>
						<tr>
							<td class="bk">提货要求</td>
							<td class="bk">{{item.requirement}}</td>
						</tr>
						<tr v-if="item.hasFee == '1'">
							<td class="bk">缴费状态</td>
							<td class="bk">
								<span style="color: red;">
									未缴费
								</span>
							</td>
						</tr>
						<tr>
							<td class="bk">预计装糖量</td>
							<td class="bk">{{item.planWeight/1000}}吨</td>
						</tr>
						<tr>
							<td class="bk" style="font-size: 19px;">箱号</td>
							<td v-if="!item.canEdit"  >
								<input :class="[checkInputStatus(item),'input-title', 'redDot'] " type="text" style="font-size: 19px;" v-model="item.containerNo1" placeholder="请输入箱号">
							</td>
						   <td v-if="item.canEdit" class="bk">{{item.containerNo1}}</td>
						</tr>	
					</table>
				</view>
				</view>
			</center>
		</view>
		<div class="payItem" v-if="showQrCode">
			<view>
				<div id="qrCodeUrl" ref="qrCodeUrl" style="width:100%;margin-bottom:10px;"></div>
				<span>支持微信、支付宝扫码</span>
			</view>
			<button
			 type="primary" @click="showQrCode=false" style="font-size: 20px;margin-top: 3px;background-color: red;color:#FFFFFF;"
			 >关闭</button>
		</div>
		<div class="bottom-bar right">
			<view v-if="fee>0">
				<button
				 type="primary" @click="toPay()" style="font-size: 20px;margin-top: 3px;background-color: red;color:#FFFFFF;" :loading="loading"
				 :disabled="showQrCode"
				 >缴费({{fee}}元)</button>
			</view>
			<view>
				
				<button 
				 type="primary" @click="confirm()" style="font-size: 20px;margin-top: 3px;" :loading="loading"
				 :disabled="total == 0||fee > 0"
				 >确认({{total / 1000}}吨)</button>
			</view>
		</div>
	</div>
	 
	
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
	function isPhone(value){
	    var regPos =/^1[0-9]{10}$/; //判断是否是数字。
		return !isEmpty(value) && regPos.test(value);
	}

	
	import  ValidationUtil  from '@/utils/ValidationUtil.js';
	import  StringUtil  from '@/utils/StringUtil.js';
	import QRCode from 'qrcodejs2';
	import {MQTT_IP,MQTT_OPTIONS} from '@/utils/mqtt.js';
	var client;
	export default {
		data() {
			return{
				basicData:'',
				releaseList:[],
				end:false,
				loading: false,
				record: {
				},
				msg:"",
				headerList:[],
				fee:0,
				showQrCode:false,
				qrcode:null
			}
		},
		computed:{
			total(){
				let total = 0;
				this.fee = 0;
				this.registerReleaseIds=[]
				for (let item of this.headerList)
				{
					if (item.checked){
						total += item.planWeight
						for(let children of item.childList){
							if(children.hasFee==1){
								this.fee = this.fee+children.fee;
							}
						}
					}
					//YG单据相同全选
					this.headerList.filter(f=> f.dataSource==1&&f.carBillNo==item.carBillNo).forEach(s => {
						s.checked=item.checked;
						})
				}
				return total;
			},
			containers(){
				let containers = new Set();
				for (let item of this.headerList)
				{
					if (!isEmpty(item.containerNo1))
					{
						containers.add(item.containerNo1)
					}
				}
				return Array.from(containers).map(item=>{
					return {checked: false, text: item }
				});
			}
		},
		onLoad(options){
		   var data = JSON.parse(options.list); // 字符串转对象
		   this.setData(data);
		},
		onUnload() {
			if(client){
				client.end(true);
			}
		},
		methods: {
			setData(data){
				this.basicData = data.basicData;
				this.releaseList = data.registerReleaseList;
				
				let headerList1 = Array.from(new Set(this.releaseList.map(obj => obj.carBillNo))).map(carBillNo => {
				  return this.releaseList.find(obj => obj.carBillNo === carBillNo);
				});
						  
				let tempList= data.registerReleaseList;
				let tmpParent = [];
				for(let tmp of headerList1){
					var par = {
						releaseNo:tmp.releaseNo,
						requirement:tmp.requirement,
						custom:tmp.custom==null || tmp.custom == '' ? tmp.customerName:tmp.custom,
					    containerNo1:tmp.containerNo1,
					    dataSource:tmp.dataSource,
					    carBillNo:tmp.carBillNo,
					    checked:false,
					    childList:[],
					    planWeight:tmp.planWeight
				    }
					tmpParent.push(par);
				}
				
				for(let parent of tmpParent){
					if(parent.dataSource == 0){ //HD
				    let pl = 0;
					for(let child of tempList){
					   if( parent.carBillNo!=null  && (parent.carBillNo  == child.carBillNo)){
						   pl+=child.planWeight;
						   parent.planWeight = pl;
						   parent.childList.push(child);
					   }
					}
				    }else{ // YG
						let pl = 0;
					    for(let child of tempList){
						    if( parent.carBillNo!=null  && (parent.carBillNo  == child.carBillNo)){
								pl+=child.planWeight;
							    parent.planWeight = pl;
							    parent.childList.push(child);
						    }
					    }
				   }
				}
				this.headerList = tmpParent;
				console.log(tmpParent);
			},
			reloadData(plateNumber){
				uni.request({
					url: '/api/logisticsRegister/getRegisterByPlateNumber',
					method: 'POST',
					data: {
						plateNumber : plateNumber,
					},
					success: (res) => {	
						let result = res.data;
						if("00000" == result.code){
							this.setData(result.data);
						}else 
						{
							alert(result.message);
						}
					},
				})
			},
			onlyOne(item){
				//YG和HD只能选择一个 YG只能选择一个
				if(item.checked){
					this.headerList.filter(f=> f.dataSource!=item.dataSource||(item.dataSource==1&&f.carBillNo!=item.carBillNo)).forEach(s => {
						s.checked=!item.checked;
					})
				}
			},
			isEmpty,
			checkContainer(container){
				container.checked = !container.checked
				this.headerList.forEach(item=>{
					if (item.containerNo1 == container.text)
					{
						item.checked = container.checked;
					}
				})
			},
			confirm(){
				if(!isPhone(this.basicData.driverPhone))
				{
					alert("请输入正确的电话")
					return;
				}
				/**
				 * 海运集装箱，需要检测箱号
				 */
				if (this.basicData.transportType == '海运集装箱')
				{
					for (let item of this.headerList)
					{
						if(item.checked){
							for (let son of item.childList)
							{
								if ( isEmpty(son.containerNo1))
									{
										this.$refs.uToast.show({
											title: '请输入箱号！',
											duration: 3000
										})
										return
									}
							}
						}
						
						
					}
				}
				
				
				uni.showModal({
					title: '提货确认',
					content: '确认本次提货'+(this.total / 1000)+'吨吗？',
					success: res => {
						if (res.confirm) {
							 this.save()
						}
					}
				});
			},
			save(){
				if(this.loading)
				{
					alert("正在处理，请稍后")
					return;
				}
					
				this.loading = true;
				let lastList =[];
				this.headerList.filter(item=> item.checked).forEach(s => {
						lastList = lastList.concat(s.childList);
						});
				lastList.forEach(s => {
						s.checked = true;
						});
				let data = {basicRelease: this.basicData, releaseList: lastList}
				// console.log(data)
				 uni.request({
				 	url: '/api/logisticsRegister/reservation',
				 	data: data,
				 	method:'POST',
					success: (res) => {
						this.loading = false;
				 		let data = res.data;
				 		if ("00000" == data.code){
				 			this.end = true
				 			this.msg="确认成功";
				 		}else{
				 			let message = data.message;
				 			alert(message)
				 		}
				 	}
				 });
			},	
			checkInputStatus(item){
				if (item.checked && this.basicData.transportType == '海运集装箱' && isEmpty(item.containerNo1)){
					return 'warning';
				}
				return '';
			},
			toPay(){
				var _this = this;
				let lastList =[];
				_this.headerList.filter(item=> item.checked).forEach(s => {
					lastList = lastList.concat(s.childList);
				});
				let registerReleaseIds = lastList.filter(f=> f.hasFee==1).map(r => r.id);
				_this.showQrCode = true;
				_this.loading = true;
				uni.request({
					url: '/api/pay/thd',
					data: {
						registerReleaseIds:registerReleaseIds,
						wayCode:"BOCOM_PAY",
						mchOrderNo:"LNTYTHD"+new Date().getTime() + Math.floor(Math.random() * (9999 - 1000) + 1000)
					},
					method:'POST',
					success: (res) => {
						_this.loading = false;
						let data = res.data;
						if ("00000" == data.code){
							_this.connect(data.data.rsp_body.pay_mer_tran_no);
							setTimeout(function(){
								_this.createQrcode(data.data.rsp_body.display_code_text);
							},500);
						}else{
							let message = data.message;
							alert(message)
						}
					}
				});
			},
			createQrcode(text) {
			    this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
			        text: text, // 需要转换为二维码的内容
			        width: 250,
			        height: 250,
			        colorDark: '#000000',
			        colorLight: '#ffffff',
			        correctLevel: QRCode.CorrectLevel.H
			    })
			},
			connect(curTopic) {
				var _this = this;
				var mqtt = require('mqtt/dist/mqtt.js');
				if(client){
					client.end(true);
				}
				// #ifdef H5
				client = mqtt.connect('ws://'+MQTT_IP,MQTT_OPTIONS);
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				client = mqtt.connect('wx://'+MQTT_IP,MQTT_OPTIONS);
				// #endif
				client.on('connect', function() {
					console.log('MQTT服务连接成功');
					client.subscribe(curTopic, function(err) {
						if (!err) {
							console.log('MQTT服务订阅成功');
						}
					})
				}).on('reconnect', function() {
					console.log('正在重连...');
				}).on('error', function(error) {
					console.log('连接失败...' + error);
				}).on('end', function() {
					console.log('连接断开');
				}).on('message', function(topic, message) {
					if(topic==curTopic){
						_this.showQrCode = false;
						_this.reloadData(_this.basicData.plateNumber);
					}
				})
			}
		},
	}
</script>

<style>
	.bk{
		background-color: aliceblue;
	}
	.sep {
		border-top: 1px solid #ddd;
		height: 20px;
		text-align: center;	       
	}
	 label {
	    color: #666;
	    padding: 0 10px;
	    background: #fff;
	    font-size: 20px;
	}
	
	

.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
		background-color: white;
		padding: 3rpx;
	}
.payItem {
	position: fixed;
	bottom: 0;
	background-color: white;
	padding: 50px;
	height: 320px;
	/* #ifdef H5 */
	left: 40%;
	top: 20%;
	/* #endif */
	border:2px solid #12d269;
}
	.right
	{
		display: flex;
		justify-content: flex-end; 
	}
	
	.bottom-bar-height
	{
		padding-bottom: 80rpx; 
	}


.warning
{
	border: 1rpx solid red;
}
</style>