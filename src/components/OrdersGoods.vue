<!--  个人页面 -->
<template>
	<div class="mine_mm">
	<header class="top_bar">
		<router-link :to="'/mine/'">
		    <a  href="#" class="icon_back"></a>
		    <h3 class="cartname">待收货订单</h3>
		 </router-link>
	</header>
	<main class="mine_layout">
	    <section class="my_order_box" style='height: auto;' v-for="(item, index) in orders">
	        <el-row :span="12">
	        	<el-col :span="1">
			  	    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
			    </el-col>
	            <el-col :span="5">
			  	    <div class="grid-content bg-purple topPdding" style='text-align: center;'>订单编号:</div>
			    </el-col>
		        <el-col :span="4">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>{{item.order_Id}}</div>
				</el-col>
			</el-row>

			
			
			 <section class="my_order_box" style='height: auto;'>
			<el-row :gutter="20">
				<div v-for="productDatas in item.product_List">
					<el-row :span="18">
						<el-col :span="1">
					  	    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
					    </el-col>
				        <el-col :span="16">
						  	<div class="grid-content bg-purple topPdding" style='padding-left: 22px;'>{{productDatas.store_Name}}</div>
						</el-col>
				</el-row>
					<el-row :gutter="20">
						<el-col :span="10">
					  		<div class="grid-content bg-purple topPdding" style='text-align: right;'>
								<img :src=productDatas.product_Default_Pic class='orderImgOrder'>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
				  			<el-row :gutter="24" class='topPdding'>
								<el-col :span="18" style='padding-left:20px'>
										{{productDatas.product_Name}}  {{productDatas.product_Summary}}
							  	</el-col>
							</el-row>
							<el-row :gutter="24" class='topPddingOrder paddingright'>
					            <el-col :span="12" class='paddingNull'>
							  	    <div class="grid-content bg-purple paddingSt" style="min-height: 10px !important;">总共购买:</div>
							    </el-col>
						        <el-col :span="10" class ='paddingSt'>
								  	<div class="grid-content bg-purple paddingSt" style="margin-left: -20px;min-height: 10px !important;">
								  		{{item.product_Count}} 件商品
								  	</div>
								</el-col>
							</el-row>							
							<el-row :gutter="24" class='topPddingOrder paddingright'>
					            <el-col :span="12">
							  	    <div class="grid-content bg-purple" style="margin-left: 10px;min-height: 10px !important;">商品总价:</div>
							    </el-col>
						        <el-col :span="4">
								  	<div class="grid-content bg-purple " style='text-align: center;margin-left: -20px;min-height: 10px !important;'>
								  		¥{{item.order_Price}}
								  	</div>
								</el-col>
							</el-row>

				<el-row :gutter="20">
		    		<el-col :span="10">
		    			<div class="grid-content bg-purple " style='margin-left: 40%;'>
		    				<a @click="open2(item.order_Id)">
				                <span style='color: rgb(255, 114, 0);'>删除</span> 
		            		</a>
		    			</div>
		    		</el-col>		    		
		    		<el-col :span="10">
		    			<div class="grid-content bg-purple " style="border: solid 1px rgb(255, 114, 0);min-height:10px">
							<button style='color: rgb(255, 114, 0);margin-left: 5px;' @click="goPay()">立即购买</button>
		    			</div>
		    		</el-col>
	    	</el-row>

						</el-col>
					</el-row>
				</div>
			</el-row>
		</section>

	    </section>
	    <section class="my_order_box" style='height: 100px;'>
			<el-row :gutter="20">
				<el-col :span="24">
				  	<div class="grid-content bg-purple topPdding" style="text-align: center;">
				  	</div>
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
				orders:{}
			}
		},
		mounted(){
			this.getOrders();
		},
		methods:{
			delAddress () {
				let r=confirm("您确认要删除当前推荐商品吗？");
				if (r==true) {
					 alert("删除成功");
				} else {
					alert("取消成功");
				}
			},
			getOrders(){
				let _this = this;
				let orders ={};


                let orderDatas = {
                    page:1,
                    status: 1
                }
                _this.$http.post('mall/order/list',
                    JSON.stringify(orderDatas)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                	if (res.data.resultData) {
                		_this.orders = res.data.resultData.dataList
                	}
                },(err)=>{
                    console.log('左侧数据' + err);
                })
			}
		}
	}
</script>
<style type="text/css">
	.paddingSt {
		padding: 0px !important;
	}
</style>