
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)" class="icon_back"></a>
		<h3 class="cartname">选择支付方式</h3>
	</header>
		<main class="mine_layout">
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="1">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>					
				<el-col :span="8">
				  	<div class="grid-content bg-purple topPdding" style='font-size:17px'>
				  		支付金额:</div>
				</el-col>				
				<el-col :span="7" style='float: right;'>
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
				  		<a style='color:red;font-size: 20px;'>{{payMoney}} 元</a></div>
				</el-col>
			</el-row>
	    </section>
		<div class="placeStyle1"></div>
		<section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<el-col :span="1">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>
				<el-col :span="7">
				  	<div class="grid-content bg-purple topPdding" style='height:20px;font-size:16px'>
				  		支付方式
				  	</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">				
				<el-col :span="7">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;font-size:14px'>
				  		<img src="../assets/images/Wechat.png" alt="" class="banner_pic" style='    width: 40px;'></div>
				</el-col>					
				<el-col :span="5" style='padding-left:0px;margin-left: -20px;'>
						<div style="font-size:14px;padding-top: 20px;padding-left:0px">微信</div>
				</el-col>		
				<el-col :span="5">
				  	<div class="grid-content bg-purple topPdding"></div>
				</el-col>				
				<el-col :span="6" style='text-align: left;'>
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'><el-radio v-model="radio" label="1" size='medium'><i class="el-icon-success"></i></el-radio>
				  	</div>
				</el-col>
			</el-row>
		<!-- 	<div style="width:800px;height:1px;margin:0px auto;padding:0px;overflow:hidden;background-color: black;"></div> -->

<!-- 			<el-row :gutter="20">
				<el-col :span="3">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>					
				<el-col :span="7">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;font-size:20px'>
				  		<img src="../assets/images/chat.png" alt="" cchat.pnglass="banner_pic"></div>
				</el-col>				
				<el-col :span="7">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
				  		<a style='font-size: 20px;'>支付宝</a></div>
				</el-col>				
				<el-col :span="5">
					<div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
  						<el-radio v-model="radio" label="2" size='medium' border><i class="el-icon-success"></i></el-radio>
  					</div>
				</el-col>
			</el-row> -->
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
				  		<el-button type="success" @click='getPay' style='width: 220%;'>确认支付</el-button>
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
				ip:''
			}
		},
		mounted(){
			this.confirmOrd();
		},
		methods:{
			confirmOrd() {
				// this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			 //          confirmButtonText: '确定',
			 //          cancelButtonText: '取消',
			 //          type: 'warning'
			 //        }).then(() => {
			 //          this.$message({
			 //            type: 'success',
			 //            message: '删除成功!'
			 //          });
			 //        }).catch(() => {
			 //          this.$message({
			 //            type: 'info',
			 //            message: '已取消删除'
			 //          });          
			 //    });
			},

			jumPa() {
				let _this = this;
		        const h = this.$createElement;
		        let orderId = window.sessionStorage.getItem('orderId');
		        let odersConf = {
					"order_id": orderId,
				}
		        this.$msgbox({
		          title: '消息',
		          message: h('p', null, [
		            h('i', { style: 'color: teal' }, window.sessionStorage.user_Name),
		            h('span', null, ' 恭喜您,提交支付申请成功'),
		          ]),
		          showCancelButton: true,
		          confirmButtonText: '确定已支付',
		          cancelButtonText: '支付遇到问题',
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
		              instance.confirmButtonLoading = true;
		              instance.confirmButtonText = '确认中...';

		              setTimeout(() => {

		                _this.$http.post('mall/order/Detail',
		                	JSON.stringify(odersConf)
		                	,{
		                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
		                	}).then((res)=>{
		                		if (res.status == 200) {
		                			let redirect = decodeURIComponent(_this.$route.query.redirect || '/home');
					                _this.$router.push({
					                    path: redirect
					                });
		                		}
		                },(err)=>{
		                    console.log('数据' + err);
		                })
		                done();
		                setTimeout(() => {
		                  instance.confirmButtonLoading = false;
		                }, 300);
		              }, 4000);
		            } else {
		              done();
		            }
		          }
		        }).then(action => {
		          this.$message({
		            type: 'info',
		            message: '返回首页中....'
		          });
		        });
			},

			getPay() {
				let _this = this;
				this.jumPa();
		        let orderId = window.sessionStorage.getItem('orderId');
				let oderInfor = {
						 "order_id": orderId,
						 "pay_way:": 'wechat',
					}
                _this.$http.post('mall/order/payment',
                	JSON.stringify(oderInfor)
                	,{
                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
                	}).then((res)=>{
						window.location.href = res.data.resultData;
              //   	if (res.status == 200) {
            		// 	let redirect = decodeURIComponent(_this.$route.query.redirect || '/home');
		            //     _this.$router.push({
		            //         path: redirect
		            //     });
		            //     // window.location.href = res.data.resultData;
            		// }

                },(err)=>{
                    console.log('数据' + err);
                })
			},

		}
	}
</script>

<style rel="stylesheet/scss">

  .lineStyle {

  }
</style>



