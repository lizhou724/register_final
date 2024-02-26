<template>
	<view>
		<div style="text-align: center;">
			<input @tap="showCar = true" style="text-align: center;font-size:33px;" type="text" placeholder="请输入车牌或身份证号"  v-model="keyWord" >
		</div>
		<u-keyboard ref="uKeyboard" mode="car" @change="carNumberChange" @cancel="showCar = false" @confirm="showCar=false"
			@backspace="backspace" v-model="showCar" :autoChange='true' :safe-area-inset-bottom='true'></u-keyboard>
		
		<div style="text-align: center; margin-bottom: 30px;">
		    <button  type="button"  @click="search()" style="font-size: 22px;" >查询</button>
		</div>
		<center>
		 <div  class="sep">
		           <div v-if="this.showFlag" style="margin-top: -11px">
		             <label>请选择车牌</label>
		           </div>
		 </div>
		</center>
		<center >
			<view  class="list-box" v-for="(item,index) in plateNumbers" :key="index">
				<table border="1" cellspacing="0" cellpadding="7"  align="center" style="width:95%; text-align: center;font-size: 18px; margin-bottom: 1choose0px;" >	
					<tr>
						<td class="bk">车牌号</td>
						<td class="bk">{{item}}
						</td>
						<td class="bk">
							 <button  type="button"  @click="chooseCP(item)" style="font-size: 20px;background-color:cadetblue" >选择</button>
						</td>
					</tr>
				</table>
			</view>
		</center>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				driverIdcard:'',
				plateNumber:'',
				keyWord:"",
				showCar: false,
				plateNumbers:[],
				showFlag:false,
				res: {}
			}
		},
		
		onLoad(option) {
		},
		
		methods: {
			carNumberChange(val) {
				this.keyWord += val;
			},
			backspace(e) {
				// 删除value的最后一个字符
				if (this.keyWord.length) this.keyWord = this.keyWord.substr(0, this.keyWord.length - 1);
			},
			
			chooseCP(value){
				this.sendInfo(value);
			},
			search(){
				if(this.keyWord.length == 7){
					this.sendInfo(this.keyWord);
				}else if(this.keyWord.length == 18 ){
					uni.request({
						url: '/api/logisticsRegister/getPlateNumberByIdCard',
						method: 'POST',
						data: {
							driverIdcard : this.keyWord,
						},
						success: (res) => {	
							let result = res.data;
							if("00000" == result.code){
								
								if(result.data.length>0){
									if(result.data.length==1){
										this.sendInfo(result.data[0]);
										this.showFlag=false;
									}else{
										this.plateNumbers=result.data;
										this.showFlag=true;
									}
									
								}else{
									this.plateNumbers=[];
									this.showFlag=false;
									alert("找不到车辆");
								}
								
								
							}else 
							{
								alert(result.message);
							}
						},
					})
				}else{
					alert("请输入正确信息");
					this.plateNumbers=[];
					this.showFlag=false;
					return;
				}
				
			},
			
			sendInfo(value){
				uni.request({
					url: '/api/logisticsRegister/getRegisterByPlateNumber',
					method: 'POST',
					data: {
						plateNumber : value,
					},
					success: (res) => {	
						let result = res.data;
						if("00000" == result.code){
							uni.navigateTo({
							url: './registerInfo?list='+ encodeURIComponent(JSON.stringify(result.data)),
							})
							
						}else 
						{
							alert(result.message);
						}
					},
				})
				
			}
		}
	}
</script>

<style>
	.bk{
		background-color:aliceblue;
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
	
</style>
