
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<router-link :to="'/Xstj/'">
			<a class="icon_back"></a>
		</router-link>
		<h3 class="cartname">销售查询</h3>
	</header>
		<main class="mine_layout">
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="1">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="7">
				  	<div class="grid-content bg-purple topPdding" style='height:20px;font-size:16px'>
				  	</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">				
				
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
					<el-col :span="16">
					  <el-form-item label="推荐" style='line-height:10px'>
					    <el-input v-model="resultDatas.total_Baby_Count" style='line-height:10px' 
					    :disabled="true"
					    ></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>人</div>
					</el-col>
					<el-col :span="16">
					  <el-form-item label="已购买">
					    <el-input v-model="resultDatas.buy_Baby_Count" :disabled="true"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>人</div>
					</el-col>				
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>
							<router-link :to="'/HadBuy/'+ 
								this.$route.params.sid + '/' + 
								this.$route.params.gid + '/' + 
								this.$route.params.cid+ '/' + 
								this.$route.params.pid + '/' + '1'">
								<img src="../assets/images/hand.png" alt="" style='width: 40px;'>
				             </router-link>
						</div>
					</el-col>
					<el-col :span="16">
					  <el-form-item label="未购买">
					    <el-input v-model="resultDatas.unbuy_Baby_Count" :disabled="true"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>人</div>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>
							<router-link :to="'/NoBuy/'+ 
								this.$route.params.sid + '/' + 
								this.$route.params.gid + '/' + 
								this.$route.params.cid+ '/' + 
								this.$route.params.pid + '/' + '0'">
								<img src="../assets/images/hand.png" alt="" style='width: 40px;'>
				             </router-link>
						</div>
					</el-col>				
					<el-col :span="16">
					  <el-form-item label="已购买">
					    <el-input v-model="resultDatas.aff_Amount" :disabled="true"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>套</div>
					</el-col>					
					<el-col :span="16">
					  <el-form-item label="提成">
					    <el-input v-model="resultDatas.aff_Money" :disabled="true"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="2" style='padding-left:0px'>
						<div style='padding-top: 10px;'>元</div>
					</el-col>


					</el-form>
				</el-col>
			</el-row>
	    </section>

	    <section class="my_order_box" style='height: 100px;'>
			<el-row :gutter="20">
				<el-col :span="24">

				  </el-col>
			</el-row>
	    </section>
	</main>

</div>
</template>
<script>
	export default{
		data(){
			return{
				payMoney:this.$route.params.id,
				radio: '1',
				ip:'',
				labelPosition: 'right',
				resultDatas: [],
		        formLabelAlign: {
		          name: '',
		          region: '',
		          type: ''
		        },
		        ruleForm: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
			}
		},
		mounted(){
			
		},
		created() {
			this.getInfo();
		},
		methods:{
			getInfo() {
				let _this = this;
				let dataInfo = {
					"school_id": this.$route.params.sid,
					"grade_id": this.$route.params.gid,
					"class_id": this.$route.params.cid,
					"product_id": this.$route.params.pid,
				}
			    _this.$http.post('/Finance/Money/AffStatistics',
	            	JSON.stringify(dataInfo)
	            	,{
	                     headers: {'Content-Type': 'application/json;charset=UTF-8'}
	            	}).then((res)=>{
	            		_this.resultDatas = res.data.resultData;
	            },(err)=>{
	                console.log('数据' + err);
	            })
			},



			getPay() {
				let redirect = decodeURIComponent(_this.$route.query.redirect || '/TuiJianGoods/' + useid);
                _this.$router.push({
                    path: redirect
                });
				// let _this = this;
				// this.jumPa();
		  //       let orderId = window.sessionStorage.getItem('orderId');
				// let oderInfor = {
				// 		 "order_id": orderId,
				// 		 "pay_way:": 'wechat',
				// 	}
    //             _this.$http.post('mall/order/payment',
    //             	JSON.stringify(oderInfor)
    //             	,{
    //                      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    //             	}).then((res)=>{
    //             },(err)=>{
    //                 console.log('数据' + err);
    //             })
			},

		}
	}
</script>

<style rel="stylesheet/scss">

  .lineStyle {

  }
</style>



