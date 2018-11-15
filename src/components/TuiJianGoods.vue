
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)" class="icon_back"></a>
		<h3 class="cartname">添加推荐商品</h3>
	</header>
		<main class="mine_layout">
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="11">
				  	<div class="grid-content bg-purple topPdding">
				  		<img :src=goodsData.default_Pic class='orderImg'>
				  	</div>
				  </el-col>
			</el-row>
	    </section>
		<div class="placeStyle1"></div>
		<section class="my_order_box" style='height: auto'>
			<el-row :gutter="20">
				<el-col :span="11">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>{{goodsData.product_Name}}</div>
				  </el-col>
				  <el-col :span="11">
					<div class="grid-content bg-purple topPdding" style='text-align: center;'>{{goodsData.product_Summary}}</div>
				  </el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple " style=''></div>
				</el-col>
				<el-col :span="4" style='padding-right:0px'>
				  	<div class="grid-content bg-purple topPdding" style=''>销量: {{goodsData.sale_Count}}</div>
				</el-col>
				<el-col :span="5">
				  	<div class="grid-content bg-purple " style=''></div>
				</el-col>
				  <el-col :span="8" style='padding-left:0px; padding-right:0px;'>
					<div class="grid-content bg-purple topPdding" style=''>规格: 中班课程</div>
				  </el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2" style='min-height:25px'>
				  	<div class="grid-content bg-purple " style="min-height:25px"></div>
				</el-col>					
				<el-col :span="4" style='padding-right:0px;min-height:25px'>
				  	<div class="grid-content bg-purple " style="min-height:25px">
				  		批发价:</div>
				</el-col>				
				<el-col :span="3" style='padding-left:0px; padding-right:0px;min-height:25px'>
				  	<div class="grid-content bg-purple " style='min-height:25px'>
				  		<a style='color:red;font-size: 16px;'>¥{{goodsData.product_Price3}}</a></div>
				</el-col>
				<el-col :span="2">
				  	<div class="grid-content bg-purple " style='min-height:25px;padding-right:0px'></div>
				</el-col>
				<el-col :span="4" style='padding-left:0px; padding-right:0px;min-height:25px'>
				  	<div class="grid-content bg-purple " style='min-height:25px'>
				  		会员价:</div>
				</el-col>				
				<el-col :span="4" style='padding-left:0px'>
				  	<div class="grid-content bg-purple " style='min-height:25px'>
				  		<a style='color:red;font-size: 16px;'>¥{{goodsData.product_Price1}}</a></div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple " style=''></div>
				</el-col>					
				<el-col :span="4" style='padding-right:0px;'>
				  	<div class="grid-content bg-purple "style=''>
				  		零售价:</div>
				</el-col>				
				<el-col :span="4" style='padding-left:0px; padding-right:0px;'>
				  	<div class="grid-content bg-purple" style=''>
				  		<a style='color:red;font-size: 16px;'>¥{{goodsData.product_Price0}}</a></div>
				</el-col>					
			</el-row>
	    </section>
	    <section class="my_order_box" style='height:auto'>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="4">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
				  	 利润:</div>
				  </el-col>
				  <el-col :span="5" style='padding-left:0px;padding-right:0px;'>
				  	<div class="grid-content bg-purple topPdding" style='padding-left:0px;'>
				  		<a style='color:red;font-size: 16px;'>¥{{goodsData.total_Pr}}元</a>
				  	</div>
				  </el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="6">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
				  	 我的利润:</div>
				  </el-col>
				  <el-col :span="10">
				  	<div class="grid-content bg-purple" style=''>
						<el-input  type="number" @input="handleInput" v-model="numrec1" @blur="handleBlur" size="small" :min="1" label="" id='me'>
							<span slot="suffix">元</span>
                        </el-input>
                        <!-- <input type="number" min="0" inputmode="numeric" pattern="[0-9]*" title="Non-negative integral number"> -->
				  	</div>
				  </el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="6">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
				  	 教师利润:</div>
				  </el-col>
				  <el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
						<el-input  type="number" v-model="numrec2" size="small":min="1" label="" id ='teac' readonly>
							<span slot="suffix">元</span>
                        </el-input>
				  	</div>
				  </el-col>
			</el-row>
	    </section>
	    <div class="placeStyle1"></div>
	    	    	<el-alert
    title="超出最大利润"
    type="error"
    show-icon
    v-show='showError'
     @close="disError"
    >
  </el-alert>
		<section class="my_order_box" style='height: 100px;'>
			<el-row :gutter="20">
				<el-col :span="24">
				  	<div class="grid-content bg-purple topPdding" style="text-align: center;"> <el-button type="success" round @click='jumpToList()'>立即推荐</el-button></div>
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
				goodsData: [],
				numrec1: '',
				numrec2: '',
				showError: false
			}
		},
		mounted(){
			this.getGoodsInfor();
		},
		methods:{
			getGoodsInfor () {
				let _this = this;
				_this.$http.get('/Mall/Product/Detail',{
                    params: {
                        id: this.$route.params.id
                    }
                }).then((res)=>{
                    // _this.goodsImages = res.data[0];
                    _this.goodsData = res.data.resultData;
					_this.goodsData['goods_unit_me'] = parseFloat(_this.goodsData['total_Pr']);
					_this.numrec1 = parseFloat(_this.goodsData['me_Pr']);
					_this.numrec2 = parseFloat(_this.goodsData['te_Pr']);


                },(err)=>{
                    console.log(err);
                })
			},
			disError() {
				this.showError = false
			},
			handleBlur(event) {
				let mypric;
					let teach
				if (document.getElementById('me').value === '') {
					mypric = 0
					this.numrec1 = this.goodsData['total_Pr']
				} else {
					mypric = parseFloat(document.getElementById('me').value).toFixed(2);
				}
				if (document.getElementById('teac').value === '') {
					teach = 0
				} else {
					teach = parseFloat(document.getElementById('teac').value).toFixed(2);
				}

				if (parseFloat(mypric) === 0) {
					this.numrec2 = this.numrec1 = ''
					this.numrec1 = this.goodsData['total_Pr']
				} else if (parseFloat(mypric) > this.goodsData['total_Pr']) {
					this.showError = true
					this.numrec1 = this.goodsData['total_Pr']
					this.numrec2 = ''
				}
			},
			handleInput(event) {
				let mypric;
				if (document.getElementById('me').value === '') {
					mypric = 0
				} else {
					mypric = parseFloat(document.getElementById('me').value).toFixed(2);
				}
				if (mypric === 0 || mypric === '0.00') {
					this.numrec2 = parseFloat(this.goodsData['total_Pr']).toFixed(2);
					this.numrec1 = 0
				} else {
					this.numrec2 = parseFloat(this.goodsData['total_Pr']).toFixed(2) - parseFloat(mypric).toFixed(2)
					if (this.numrec2 < 0) {
						this.numrec2 = 0;
					}
				}
			},
			jumpToList () {
				let _this = this;
                // if (!_this.goodsData.isBest) {
                   let recGoodsData = {
                    Product_Id:_this.$route.params.id,
                    Product_Price2:parseFloat(this.numrec2)
                }
                _this.$http.post('Mall/Product/ChooseProduct',
                    JSON.stringify(recGoodsData)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                let useid = _this.goodsData.id;
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/recommendGoods');
                _this.$router.push({
                    path: redirect
                });
                },(err)=>{
                    console.log('左侧数据' + err);
                })
			}
		}
	}
</script>

<style rel="stylesheet/scss">
 .orderImg {
  	width: 180px;
    height: 120px;
    padding-left: 20px;
  }
  .el-input__suffix {
  	top: 5px !important;
  }
</style>



