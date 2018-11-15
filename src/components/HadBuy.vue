
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)"  class="icon_back"></a>
		<h3 class="cartname">已购买</h3>
	</header>
		<main class="mine_layout">
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="1">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="7" v-if="this.resultDatas == ''">
				  	<div class="grid-content bg-purple topPdding" style='height:20px;font-size:16px'>

				  	</div>
				</el-col>				
				<el-col :span="7" v-else>
				  	<div class="grid-content bg-purple topPdding" style='height:20px;font-size:16px'>
				  	全部 {{this.sum}} 人
				  	</div>
				</el-col>
			</el-row>
			<el-row :gutter="24" style='padding-top:20px' v-if="this.resultDatas == ''">
				<el-col :span="20" style='    padding-left: 40%;'> 
						没有数据
				</el-col>
			</el-row>			

			<el-row :gutter="24" style='padding-top:20px' v-for="(item, index) in resultDatas" v-else >
				<el-col :span="1"> 
					<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="4">			
					<avatar :username="item.true_Name"></avatar>
					<div style='width:60px'>{{item.true_Name}}</div>
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
import Avatar from 'vue-avatar'
	export default{
		data(){
			return{
				payMoney:this.$route.params.id,
				radio: '1',
				ip:'',
				sum:'',
				labelPosition: 'right',
				resultDatas:[],
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
		 components: {
		    Avatar
		  },
		created() {
			this.getInfo();
		},
		mounted(){
			this.confirmOrd();
		},
		methods:{
			getInfo () {
				let _this = this;
				let dataInfo = {
					"school_id": this.$route.params.sid,
					"grade_id": this.$route.params.gid,
					"class_id": this.$route.params.cid,
					"product_id": this.$route.params.pid,
					"buy_status": this.$route.params.status,
				}
				_this.$http.post('/Finance/Money/AffStatisticsBaby',
	            	JSON.stringify(dataInfo)
	            	,{
	                     headers: {'Content-Type': 'application/json;charset=UTF-8'}
	            	}).then((res)=>{
	            		_this.resultDatas = res.data.resultData;
	            		_this.sum = _this.resultDatas.length;
	            		if (!_this.resultDatas) {
	            			_this.resultDatas = ''
	            		}
	            },(err)=>{
	                console.log('数据' + err);
	            })
			},
			confirmOrd() {

			},

			jumPa() {

			},

			getPay() {

			},

		}
	}
</script>

<style rel="stylesheet/scss">

  .lineStyle {

  }
</style>



