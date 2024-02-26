<template>
	<view class="content">
		<center>
		
		<table border="1"  cellspacing="0"  style="width:90%;text-align: center;">
		
		    <tr >
		        <th>车牌</th>
		        <th>{{carNo}}</th>
		    </tr>
		
		    <tr>
		        <td>原因</td>
		        <td>
					<radio-group @click="reasonChange()">
						<label class="radio"><radio value="1"  @click="reason=1"/>送货</label>
						<label class="radio"><radio value="2"  @click="reason=2"/>取货</label>
						<label class="radio"><radio value="3"  @click="reason=3" />作业</label>
					</radio-group>
		        </td>
		    </tr>
			
			<tr v-show ="reason==1 || reason==2">
			    <th>是否称重</th>
			    <th>
			        <!-- <label>
			        	<checkbox value="cb"  checked="true"  />是
			        </label> -->
					<radio-group >
						<radio value="1"  v-model="weigh" @click="weigh=true" />是</radio>
						<radio value="2"  v-model="weigh" @click="weigh=false"/>否</radio>
					</radio-group>
			    </th>
			</tr>
		
		    <tr v-show="weigh">
		        <td >物料</td>
		        <td>
		            <picker @change="changeMaterial" :range="materials" range-key="title">
		            	 <view class="uni-input">{{material ? material : '请选择'}}</view>
		            </picker>
		        </td>
		    </tr>
		
		    <tr  v-show="weigh && reason==1">
		        <td>发货方</td>
		        <td>
		            <picker @change="changeSeller" :range="order" range-key="seller">
		            	<view class="uni-input">{{seller ? seller : '请选择'}}</view>
		            </picker>
		        </td>
		    </tr>
		
		    <tr  v-show="weigh && reason==2">
		        <td>收货方</td>
		        <td>
		            <picker @change="changeBuyer" :range="order" range-key="buyer">
		            	<view class="uni-input">{{buyer ? buyer : '请选择'}}</view>
		            </picker>
		        </td>
		    </tr>
		
			<tr v-show="weigh">
			    <th>净重(吨)</th>
			    <td><input type="text"  v-model="thridWeight">
				</td>
				
			</tr>
					
			<tr v-show="weigh">
			    <th>空车重量(吨)</th>
			    <td >
					<input type="text"  v-model="data.thridEmptyWeight">
				</td>
				
			</tr>
					
			<tr v-show="weigh" >
			    <th>重车重量(吨)</th>
			    <td >
			        <input  type="text" v-model="data.thridFllWeight">
			    </td>
				
			</tr>
					
			<tr v-show="weigh">
			    <th>司机名字</th>
			    <td >
			        <input type="text" v-model="data.driverName" >
			    </td>
			</tr>
					
			<tr v-show="weigh">
			    <th>身份证号</th>
			    <td >
			        <input type="text" v-model="data.driverIdCard">
			    </td>
			</tr>
					
			<tr v-show="weigh">
			    <th>联系电话</th>
			    <td >
			        <input type="text" v-model="data.driverTel">
			    </td>
			</tr>
		</table>
		</center>
		<br>
		<center>
		    <button type="button" @click="next()">确认登记</button>
		</center>
	</view>
</template>

<script>
	
	export default {
		data() {
			
			return{
				weigh:null,
				reason:null,
				data:{},
				carNo:'',
				
				title: 'picker',
				array: [{name:'请选择'},{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
				index: 0,
				
				materials:[],
				material:'',
				materialId:'',
				
				order:[],
				seller:'',
				buyer:'',
				
			}
			
		},
		onLoad(options){
			this.carNo = JSON.parse(options.list); // 字符串转对象
			// console.log(this.carNo)
			this.query();
			
			
		},
		computed: {
		  // 计算属性的 getter
		  thridWeight: function () {
		    // `this` 指向 vm 实例
		    return (this.data.thridFllWeight ? this.data.thridFllWeight : 0) - (this.data.thridEmptyWeight ? this.data.thridEmptyWeight : 0);
		  }
		},
		methods: {
			
			reasonChange(){	
				if (this.reason == 3){
					this.weigh = false
				}else if(this.reason == 1 || 2){
					this.weigh = true
				}
			},
			
			bindPickerChange: function(type,e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			
			changeMaterial: function(e) {
				let index = e.detail.value;
				this.material = this.materials[index].title;
				this.materialId = this.materials[index].id;
				
				this.querySendAddress(this.materialId)
			},
			
			changeSeller: function(e) {
				let index = e.detail.value;
				this.seller = this.order[index].seller;
				this.orderId = this.order[index].id;
				// alert(this.orderId)
			},
			
			changeBuyer: function(e) {
				let index = e.detail.value;
				this.buyer = this.order[index].buyer;
				this.orderId = this.order[index].id;
			},
			
			/*
			* 查询物料
			*/
			query(){
				uni.request({
					url:'/api/materialManage/list',
					data: {
						material:''
					},
					method:'GET',
					success: (res) => {
						//console.log(res.data);
						this.materials = res.data.data;
						console.log(this.materials)
					}
					});
			},
			
			/**
			 * 查询收货方或发货方
			 */
			querySendAddress(materialId){
				uni.request({
					url:'/api/takeRecord/manufactures',
					data: {
						materialId:materialId
					},
					method:'GET',
					success: (res) => {
						this.order = res.data.data,
						console.log(res.data.data)
					}
					});
			},
			
			next(){
				uni.request({
				url:'/api/takeRecord/QrRegister',
				data: {
					...this.data,
					carNo : this.carNo,
					thridWeight : this.thridWeight		
				},
				method:'POST',
				success: (res) => {
					console.log(res.data);
					uni.navigateTo({
					url: './end'
					})
				}
				});
				console.log(this.data)
			},
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