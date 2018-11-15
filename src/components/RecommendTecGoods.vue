<template>
	<div class="my_l">
		<header class="top_bar">

			    <a onclick="window.history.go(-1)"  class="icon_back"></a>
			    <h3 class="cartname">推荐列表</h3>
			<router-link :to="'/Xstj/'">
			    <a href="#" class="icon_menu" style="background: unset;width: 90px;color: rgb(255, 114, 0);">销售统计</a>
			</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;' v-for="item in mainDatas">
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px'></div>
				</el-col>
				<el-col :span="12">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;color: rgb(255, 114, 0);'>
				  		{{item.store_Name}}
				  	</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="10">
				  	<div class="grid-content bg-purple topPdding">
				  		<img :src=item.default_Pic class='orderImgTj'>
				  	</div>
				</el-col>
				<el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;'>
				  		{{item.product_Name}}
				  	</div>
				</el-col>
				<el-col :span="11">
				  	<div class="grid-content bg-purple">
				  	<el-row :gutter="24">
						<el-col :span="12">
						  	<div class="grid-content bg-purple " style='text-align: left;font-size: 12px;min-height: 10px;color:#c3c3c3'>
						  		会员价:{{item.product_Price1}} 元
						  	</div>
						</el-col>
						<el-col :span="12">
							  	<div class="grid-content bg-purple " style='text-align: left;font-size: 12px;min-height: 10px;color:#c3c3c3'>
							  		零售价:{{item.product_Price0}} 元
							  	</div>
						</el-col>
					</el-row>
					<el-row :gutter="10">

					</el-row>
						<el-row :gutter="24">
							<el-col :span="12" style='padding-right:0px;'>
							  	<div class="grid-content bg-purple " style='text-align: left;font-size: 12px;min-height: 10px;color:#c3c3c3'>
							  		我的分佣:{{item.me_Pr}} 元
							  	</div>
							</el-col>
							<el-col :span="12" style='padding-right:0px;'>
							  	<div class="grid-content bg-purple " style='text-align: left;font-size: 12px;min-height: 10px;color:#c3c3c3'>
							  		老师提成:{{item.te_Pr}} 元
							  	</div>
							</el-col>
						</el-row>
						<el-row :gutter="20">

						</el-row>


						<el-row :gutter="20">
							<el-col :span="18">
							  	<div class="grid-content bg-purple " style='text-align: left;font-size: 12px;min-height: 10px;color:#c3c3c3'>
							  		成本价:{{item.product_Price3}} 元
							  	</div>
							</el-col>
						</el-row>
				  	</div>
				</el-col>
			</el-row>
			        <div class="order_top_box" style='background-color: white;'>
			            <div class="order_right" style='height: 40px;'>
<!-- 			            	<router-link :to="'/TuiJianGoods/'+ item.id">
								<img src="../assets/images/addressSet.png" alt="" style='margin-top: 5px;'>
				                <span>编辑</span>
				             </router-link> -->
				             <!-- <a @click="delAddress(item.id)"> -->
				             <a @click="open2(item.id)">
				                <span style='color: rgb(255, 114, 0);'>删除</span> 
			            	</a>
			            </div>
			        </div>
	    </section>
	   		<section class="my_order_box" style='height: 150px;'>
	    </section>
		</main>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				mainDatas:[]
			}
		},
		mounted(){
			this.getaddressDatas();
		},
		methods:{

			getaddressDatas() {
				let _this = this;

				_this.$http.post('/Mall/Product/BestList').then((res)=>{
					if (res.data.status) {
						_this.mainDatas = res.data.resultData.dataList;
	                    for (var i = _this.mainDatas.length - 1; i >= 0; i--) {
							_this.mainDatas[i]['goods_unit'] = _this.mainDatas[i]['product_Price0'] - _this.mainDatas[i]['product_Price3']
	                    }
					} else {
						_this.mainDatas = []
					}

                },(err)=>{
                    _this.mainDatas = 0
                    console.log(err);
                })

			},
			      open2(aId) {
			      	let _this = this
			        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          customClass: 'androidStyle',
			          center: true
			        }).then(() => {

					let addId = {
						product_id: aId
					}

					_this.$http.post('/mall/product/bestdelete',
						JSON.stringify(addId),
						{
	                        headers: {
	                            'Content-Type': 'application/json;charset=UTF-8'
	                        }
	                    }
					).then((res)=>{
						_this.getaddressDatas()
						this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
					},(err)=>{
						console.log('左侧数据' + err);
					})
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
			      }
		}
	}
</script>

<style type="text/css">
    .orderImg {
	  	width: 180px;
	    height: 120px;
	    padding-left: 20px;
    }    
    .orderImgTj {
	  	width: 130px;
	    height: 100px;
	    padding-left: 20px;
    }
    .androidStyle {
    	width: 90% !important;
    }
</style>










