
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)" class="icon_back"></a>
		<h3 class="cartname" style="float:right; padding-right:5%">确认订单</h3>
		<a href="#" ></a>
	</header>
		<main class="mine_layout">
	    <section class="my_order_box" style='height: auto;'>
	    	<el-row>
	    		<el-col :span="2">
			  		<div class="grid-content bg-purple " style='margin-top:70%;padding-left:10px;'>
			  		<i class="el-icon-location-outline"></i>
			  		</div>
			    </el-col>	    		
			    <el-col :span="19" v-if='showSchoolAddress === false'>
					<el-row>
					<el-col :span="6"><div class="grid-content bg-purple topPdding" style=''>收货人:</div></el-col>
						  <el-col :span="6"><div class="grid-content bg-purple topPdding">{{addressDatas.user_Name}}</div></el-col>
						  <el-col :span="4"><div class="grid-content bg-purple topPdding">电话:</div></el-col>
						  <el-col :span="6"><div class="grid-content bg-purple topPdding">{{addressDatas.user_PhoneNum}}</div></el-col>
						</el-row>	    	
						<el-row :gutter="20" v-if='showSchoolAddress === true'>
						  <el-col :span="6"><div class="grid-content bg-purple topPdding" style=''>收货人:</div></el-col>
						  <el-col :span="6"><div class="grid-content bg-purple topPdding">{{True_Name}}</div></el-col>
					</el-row>
			    </el-col>
			    <el-col :span="19">
			    	<el-row>
					 <el-col :span="6"><div class="grid-content bg-purple ">收货地址:</div></el-col>
					 <el-col :span="10" v-if='showSchoolAddress === false'>
					  	<div class="grid-content bg-purple ">{{addressDatas.province}}{{addressDatas.city}}{{addressDatas.address}}</div>
					 </el-col>
				  	<el-col :span="11" v-if='showSchoolAddress === true'>
					  	<div class="grid-content bg-purple ">
					  		{{School_Name}}{{Grade_Name}}{{Class_Name}}
					  	</div>
				  	</el-col>
			    	</el-row>
			    </el-col>
	    	</el-row>

	    </section>
	    <div class="placeStyle"></div>
		<section class="my_order_box" style='height: auto;'>
	    	<el-row :gutter="20">
			  <el-col :span="10">
			  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>{{goodsData.store_Name}}</div>
			  </el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="10">
			  		<div class="grid-content bg-purple topPdding" style='text-align: right;'>
						<img :src=goodsData.default_Pic class='orderImg'>
			  		</div>
			  	</el-col>
			  	<el-col :span="12">
			  			<el-row :gutter="24" class='topPdding'>
			  				<el-col :span="6">
				  				<div class="grid-content bg-purple topPdding"></div>
				 			</el-col>
							<el-col :span="18" style='padding-left:20px'>
									{{goodsData.product_Name}}  {{goodsData.product_Summary}}
						  	</el-col>
					  	</el-row>
					  	<el-row :gutter="24" class='PddingHe'>
							<el-col :span="24" style='padding-left:20px'>
						  	</el-col>
					  	</el-row>
					  	<el-row :gutter="20" style='padding-left: 15px;'>
						  	<el-col :span="5">
							  	<div class="grid-content bg-purple-right topPdding"></div>
						  	</el-col>

							<el-col :span="11">
							  	<div class="grid-content bg-purple topPdding">
							  		<a style='color:#ff7200;font-size: 16px;'>¥{{goodsData.price}}</a>
							  	</div>
						  	</el-col>
						  	<el-col :span="7">
							  	<div class="grid-content bg-purple-right topPdding" style='text-align: right;'>
							  		X {{goodsData.buyNum}}
							  	</div>
						  	</el-col>
						</el-row>
				</el-col>
			</el-row>
	    </section>
	    	<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="100%"
	>
  <span>收货地址没有添加</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="backPage()">返回上一次操作</el-button>
    <el-button type="primary" @click="jumpS()">添加收货地址</el-button>
  </span>
</el-dialog>
	    <div class="placeStyle1"></div>
		<section class="my_order_box" style='height: 50px;border-bottom: solid 1px #c3c3c3;'>
			<el-row :gutter="20">
	    		<el-col :span="2">
			  		<div class="grid-content bg-purple " style=''>
			  		</div>
			    </el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple topPdding" style=''>优惠券:</div>
				  </el-col>
			</el-row>
	    </section>
		<div class="placeStyle1"></div>
		<section class="my_order_box" style='height: 50px;border-bottom: solid 1px #c3c3c3;margin-top:0px '>
			<el-row :gutter="20">
				<el-col :span="2">
			  		<div class="grid-content bg-purple " style=''>
			  		</div>
			    </el-col>
				<el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style=''>买家留言:</div>
				  </el-col>
				  <el-col :span="10">
				      <input type="text" name="" id='commentVal' class="grid-content bg-purple topPdding">
				  </el-col>

			</el-row>
	    </section>
	    <section class="my_order_box" style='height: 50px;border-bottom: solid 1px #c3c3c3;margin-top:0px '>
			<el-row :gutter="20">
				<el-col :span="2">
			  		<div class="grid-content bg-purple " style=''>
			  		</div>
			    </el-col>
				<el-col :span="6">
				  	<div class="grid-content bg-purple topPdding" style=''>配送方式:</div>
				  </el-col>
				  <el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style=''></div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple topPdding" style='text-align: right;'>快递</div>
				  </el-col>
			</el-row>
	    </section>
	    <div class="placeStyle1"></div>
		<section class="my_order_box" style='height: 100px;'>
			<el-row :gutter="20">
				<el-col :span="11">
				  	<div class="grid-content bg-purple topPdding"></div>
				  </el-col>
				  <el-col :span="13">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;'>
				  	共{{goodsData.buyNum}}件商品 小计<a style='color:#ff7200;font-size: 16px;padding-left:10px'>¥{{goodsData.sumPrice}}</a></div>
				  </el-col>
			</el-row>
	    </section>
	</main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a class="m_item_link" style='width: 100%;'>
                        </a>
                        <a href="#" class="m_item_link" style='padding-top:10px;color:#ff7200'>
                        	合计:  ¥{{goodsData['sumPrice']}}
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a href="#" class="buybuy" style='background-color: green;' @click='getOrders'>立即购买</a>
                </div>
            </div>
        </footer>
</div>
</template>
<script>
	export default{
		data(){
			return{
				role:parseInt(window.sessionStorage.user_Type),
				addressDatas:[],
				goodsData:[],
				shopDatas:[],
				Grade_Id: window.sessionStorage.Grade_Id,
				Grade_Name:window.sessionStorage.Grade_Name,
				Grade_Id: window.sessionStorage.Grade_Id,
				Class_Name:window.sessionStorage.Class_Name,
				Class_Id:window.sessionStorage.Class_Id,
				School_Id:window.sessionStorage.School_Id,
				True_Name:window.sessionStorage.True_Name,
				School_Name:window.sessionStorage.School_Name,
				showSchoolAddress: true,
				dialogVisible: false,
			}
		},

		created() {
			this.getAdd();
		},

		mounted(){
			this.getAdd();
			this.getGoodInfor();
			this.hiddenFooter();
		},
		methods:{
			   handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			      },
			      dialogVisibled(flg) {
			      	this.dialogVisible = flg;
			      },
			      jumpS() {
			      	this.dialogVisible = false;
					let redirect = decodeURIComponent(this.$route.query.redirect || '/createAddress/useId/new/1/2/3');
                    this.$router.push({
                        path: redirect
                    });

			      },
			  	backPage() {
			  		if (window.location.href.indexOf('#') != '-1') {
			  			window.history.go(-2);
			  		} else {
			  			window.history.go(-1);
			  		}
			  		
			  	},
			getAdd () {
				let _this = this;
				 //获取用户地址信息
                _this.$http.post('/Mall/Member/ShippingAddressList').then((resData)=>{
                	if (resData.data.status) {
                		if (resData.data.resultData.school.length > 0) {
                        _this.showSchoolAddress = true;
                        _this.addressDatas = resData.data.resultData.school;
                        _this.School_Name = _this.addressDatas[0]['school_Name'];
                        window.sessionStorage.setItem('School_Name', _this.School_Name)
	                    } else {
	                        _this.showSchoolAddress = false;
	                        for (let i = 0; i < resData.data.resultData.post.length; i++) {
	                            if(resData.data.resultData.post[i]['isDefaultaddress']) {
	                                _this.addressDatas = resData.data.resultData.post[i];
	                            }
	                        }
	                    }
                	} else {
                		this.dialogVisibled(true);
                	}


                },(err)=>{
                    console.log('地址数据' + err);
                })
			},
			mul(a, b) {
			    var c = 0,
			        d = a.toString(),
			        e = b.toString();
			    try {
			        c += d.split(".")[1].length;
			    } catch (f) {}
			    try {
			        c += e.split(".")[1].length;
			    } catch (f) {}
			    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
			},
			getOrders(){
				let _this = this;
				let oderInfor = {};
				if (this.addressDatas != '') {
					if (!_this.showSchoolAddress) {
						oderInfor = {
							 "Shipping_Id":_this.addressDatas.id,//所选的收货地址Id
							 "Amount":parseInt(_this.goodsData.buyNum),//数量
							 "Product_Id":_this.$route.params.id,//商品Id
							 "Remark": document.getElementById('commentVal').value,
							 "best_Id": _this.goodsData.best_Id
						}
					} else {
						oderInfor = {
							 "Shipping_Id": '0',//所选的收货地址Id
							 "Amount":parseInt(_this.goodsData.buyNum),//数量
							 "Product_Id":_this.$route.params.id,//商品Id
							 "Remark": document.getElementById('commentVal').value,
							 "grade_Id": window.sessionStorage.Grade_Id,
							 "class_Id": window.sessionStorage.Class_Id,
							 "best_Id": _this.goodsData.best_Id,
							 "School_Id": window.sessionStorage.School_Id
						}
					}
	                _this.$http.post('mall/order/Confirm',
	                	JSON.stringify(oderInfor)
	                	,{
	                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
	                	}).then((res)=>{
	 						let str = res.data.resultData;
	 						window.sessionStorage.removeItem('orderId');
	 						window.sessionStorage.setItem('orderId', str.order_id)
	                    
	                },(err)=>{
	                    console.log('数据' + err);
	                })

					let redirect = decodeURIComponent(this.$route.query.redirect || '/PayStyle/'+ this.goodsData.sumPrice +'/' + this.goodsData.buyNum + '/' + this.goodsData.product_Name + '/' + this.goodsData.id + '/' + this.Grade_Id  + '/' + this.Class_Id);
                    this.$router.push({
                        path: redirect
                    });


				}else {
					this.dialogVisibled(true);
				}

			},
			getGoodInfor() {
				let _this = this;
				let goodsData=[];
				//获取商品信息
                _this.$http.get('/Mall/Product/Detail',{
                    params: {
                        id: this.$route.params.id
                    }
                }).then((res)=>{
                    _this.goodsData = res.data.resultData;
                    _this.goodsData['buyNum'] = this.$route.params.num;
                    let price = 0
                    switch (parseInt(window.sessionStorage.user_Type)) {
                    	case 0 :
                    		price = _this.goodsData['product_Price0']
                    	break;
						case 1 :
							if (_this.goodsData['best_Id'] == 0) {
								price = _this.goodsData['product_Price0']
							} else {
								price = _this.goodsData['product_Price1']
							}
                    	break;
						case 2 :
							if (_this.goodsData['best_Id'] == 0) {
								price = _this.goodsData['product_Price0']
							} else {
								price = _this.goodsData['product_Price1']
							}
                    	break;
						case 3 :
							if (_this.goodsData['best_Id'] == 0) {
								price = _this.goodsData['product_Price0']
							} else {
								price = _this.goodsData['product_Price3']
							}
                    		
                    	break;
                    	default: ''
                    }
                    _this.goodsData['price'] = parseFloat(price);
                    _this.goodsData['sumPrice'] = this.mul(price.toFixed(2), parseInt(this.$route.params.num))

                },(err)=>{
                    console.log(err);
                })
			},
			hiddenFooter() {
                this.$store.dispatch('hideNav');
            },
		}
	}
</script>

<style rel="stylesheet/scss">
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
   .placeStyle {
    height: 10px;
  }
  .orderImg {
  	width: 120px;
    height: 120px;
    padding-left: 20px;
  }
  .orderIfream {
  	width: 150px;
    height: 150px;
  }
  .PddingHe {
  	height: 50px;
  }.
  .placeStyle1 {
  	height: 2px;
  }
  body {
  	overflow:scroll;
  	overflow-x:hidden;
  }
</style>



