<template>
	<div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">我的收货地址</h3>
		</header>
		<main class="user_login_box">
			<section class="my_order_box" style='height:auto'>

				<li class="" style="list-style-type:none;" v-if='showSchoolAddress === true' v-for="(item, index) in addressDatas">
					<div style='padding-left:10%;'>
				    收货人: <a style='font-size:14px'>&nbsp; &nbsp;{{item.true_Name}}&nbsp;</a>
				    <br>
				    幼儿园:  {{item.school_Name}}
				    <br>
				    年级: {{item.grade_Name}}
				    <br>
				    班级: {{item.class_Name}}
					</div>
					<br>
				</li>


				<li class="" style="list-style-type:none;" v-for="item in addressDatas"  v-if='showSchoolAddress === false'>
					<div class=" order_top_box" style='height: auto !important;background-color: white;'>
						收货人<a style='font-size:14px'>&nbsp; &nbsp;{{item.user_Name}}&nbsp;</a>  电话： {{item.user_PhoneNum}}
						<p>{{item.province}}{{item.city}}{{item.district}}</p>
						<p>{{item.address}}</p>
			        </div>
			        <div class="order_top_box" style='background-color: white;'>
			            <div class="order_left" v-if='item.isDefaultaddress' >
			                <span>默认地址</span>
			            </div>
			            <div class="order_right" style='height: 40px;'>
			            	<router-link :to="'/createAddress/'+'isEdit' + '/' +item.id +'/'+ item.province +'/'+item.city
			+'/'+item.district ">
								<img src="../assets/images/addressSet.png" alt="" style='margin-top: 5px;width: 20px;'>
				                <span>编辑</span>
				             </router-link>
				             <a @click="open2(item.id)">
								<img src="../assets/images/del.png" alt="" style='margin-top: 5px;width: 20px;'>
				                <span>删除</span> 
			            	</a>
			            </div>
			        </div>
	   			 </li>
	    </section>

	   		<section class="my_order_box" style='height: 150px;' >
			<el-row :gutter="20">
				<el-col :span="24">
				  	<div class="grid-content bg-purple topPdding" style="text-align: center; height:20px"> 
			<router-link :to="'/createAddress/'+'useId'+'/' + 'new' + '/1/2/3'">
		        <div style='text-align: center;width: 90%;margin-left: 5%;margin-top: 5%;background-color: green;display: block;right: ;' v-if='showSchoolAddress === false'>
		        	<div style='font-size: 18px;color: white;'>+       添加地址</div>
		        </div>
	        </router-link></div>
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
				addressDatas:[],
				showSchoolAddress:true
			}
		},
		mounted(){
			this.getaddressDatas();
		},

		methods:{
			getaddressDatas(){
				let _this = this;
				_this.$http.post('/Mall/Member/ShippingAddressList').then((res)=>{
					if (res.data.resultData.school.length > 0) {
	                        _this.showSchoolAddress = true;
	                        _this.addressDatas = res.data.resultData.school;
	                    } else {
	                        _this.showSchoolAddress = false;
	                        for (let i = res.data.resultData.post.length - 1; i >= 0; i--) {
	                                _this.addressDatas = res.data.resultData.post;
	                        }
	                    }
				},(err)=>{
					console.log('左侧数据' + err);
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
						id: aId
					}

					_this.$http.post('/mall/member/shippingaddressdel',
						JSON.stringify(addId),
						{
	                        headers: {
	                            'Content-Type': 'application/json;charset=UTF-8'
	                        }
	                    }
					).then((res)=>{

						_this.$http.post('/Mall/Member/ShippingAddressList').then((res)=>{
							if (res.data.resultData.school.length > 0) {
	                        _this.showSchoolAddress = true;
	                        _this.addressDatas = res.data.resultData.school;
	                    } else {
	                        _this.showSchoolAddress = false;
	                        if (res.data.resultData.post) {
	                        	for (let i = res.data.resultData.post.length - 1; i >= 0; i--) {
	                                _this.addressDatas = res.data.resultData.post[i];
	                        	}
	                        } else {
	                        	_this.addressDatas = [];
	                        }

	                    }

							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });

						},(err)=>{
							console.log('左侧数据' + err);
						})
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












