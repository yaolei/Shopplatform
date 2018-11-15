
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<router-link :to="'/RecommendTecGoods/'">
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
				<el-col :span="20">
					<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="推荐商品" prop="region">
						    <el-select v-model="ruleForm.region" placeholder="全部">
						      <el-option :label='item.product_Name'
						      			:value='item.id'
						      v-for="(item, index) in mainGoodsDatas"></el-option>
						    </el-select>
						  </el-form-item>						  
						  <el-form-item label="学校" prop="regionSchool">
						    <el-select v-model="ruleForm.region1" placeholder="全部"
						    @change="getschoolId(ruleForm.region1)">
						      <el-option :label="this.shcoolName" :value="this.shcoolId"></el-option>
						    </el-select>
						  </el-form-item>						  
						  <el-form-item label="年级" prop="region2" >
						    <el-select v-model="ruleForm.region2" placeholder="全部" 
						    @change="getGradeId(ruleForm.region2)">
						      <el-option :label="item1.grade_Name" :value="item1.id" 
						      v-for="(item1, index1) in mainGradeDatas"></el-option>
						    </el-select>
						  </el-form-item>						  
						  <el-form-item label="班级" prop="region3">
						    <el-select v-model="ruleForm.region3" placeholder="全部">
						      <el-option :label="ite.class_Name" :value="ite.id" v-for="(ite, index2) in mainClassDatas" ></el-option>
						    </el-select>
						  </el-form-item>
					</el-form>
				</el-col>
			</el-row>
	    </section>
	    <div class="placeStyle1"></div>
	    <section style='height: 150px;'>
			<el-row :gutter="20" >
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;height:20px'>
				  	</div>
				</el-col>
				<el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;height:20px'>
				  		<el-button type="success" @click="getPay('ruleForm')" style='width: 220%;'>查询</el-button>
				  	</div>
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
				mainGoodsDatas:[],
				mainGradeDatas:[],
				mainClassDatas:[],
				shcoolName: window.sessionStorage.school_Name,
				shcoolId: window.sessionStorage.school_Id,
				gradId:'',
				labelPosition: 'right',
		        formLabelAlign: {
		          name: '',
		          region: '',
		          region1: '',
		          region2: '',
		          region3: '',
		          type: ''
		        },
		        ruleForm: {
		          name: '',
		          region: '',
		          region1: '',
		          region2: '',
		          region3: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
			}
		},

	    watch: {

	    },

		mounted(){
			this.confirmOrd();
			this.getBestGoodsData();
			this.getScoolList();
			this.getGrade();
			this.getClassInfo();
		},
		methods:{
			confirmOrd() {
				this.getGrade();
			},
			getschoolId() {

			},
			getGradeId (gid) {
				this.ruleForm.region3 = '';
				this.getClassInfo(gid);
			},
			getScoolList() {
				let _this = this;
				this.shcoolName = window.sessionStorage.school_Name;
				this.shcoolId = window.sessionStorage.school_Id;
			},

			getGrade() {
				let _this = this;
				let id = window.sessionStorage.school_Id;
				let gradeIds = {
			        school_Id: this.shcoolId
			    };
				_this.$http.post('/School/School/GradeList',
                    JSON.stringify(gradeIds)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                	if (res.data.status) {
                		_this.mainGradeDatas = res.data.resultData;
                	} else {
                		_this.mainGradeDatas = [];
                	}

                },(err)=>{
                    console.log('左侧数据' + err);
                })
			},			

			getClassInfo(gid) {
				let _this = this;
				if (gid) {
					let gradeIds = {
			        school_Id:this.shcoolId,
			        grade_Id:gid
				    };
					_this.$http.post('/School/School/ClassList',
	                    JSON.stringify(gradeIds)
	                , {
	                         headers: {
	                            'Content-Type': 'application/json;charset=UTF-8'
	                    }
	                }).then((res)=>{
	                	if (res.data.status) {
	                		_this.mainClassDatas = res.data.resultData;
	                	} else {
	                		_this.mainClassDatas = [];
	                	}

	                },(err)=>{
	                    console.log('左侧数据' + err);
	                })
				}
			},
			
			getBestGoodsData () {
				let _this = this;
				_this.$http.post('/Mall/Product/BestList').then((res)=>{
					if (res.data.status) {
						_this.mainGoodsDatas = res.data.resultData.dataList;

					} else {
						_this.mainGoodsDatas = []
					}
                },(err)=>{
                    _this.mainGoodsDatas = 0
                    console.log(err);
                })
			},

			jumPa() {
				let _this = this;
			},

			getPay(formName) {
				let _this = this;
				// this.ruleForm
				let sid = this.ruleForm.region1;
				let gid = this.ruleForm.region2;
				let cid = this.ruleForm.region3;
				let pid = this.ruleForm.region;

				if (sid && gid && cid && pid) {
					let redirect = decodeURIComponent(_this.$route.query.redirect || 
						'/XstjList/' + sid + '/' + gid + '/' + cid+ '/' + pid);
	                _this.$router.push({
	                    path: redirect
	                });
				} else {
		          this.$message({
		            type: 'info',
		            message: '信息数据不全,请重新输入.'
		          });
				this.ruleForm.region1 = '';
				this.ruleForm.region2 = '';
				this.ruleForm.region3 = '';
				this.ruleForm.region = '';
		          return false;
				}


			},

		}
	}
</script>

<style rel="stylesheet/scss">

  .lineStyle {

  }
  .el-input__inner {
  	line-height: 15px !important;
  }
</style>



