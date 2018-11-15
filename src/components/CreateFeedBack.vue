<template>
	<div class="my_l" style='background-color: white;'>
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">创建反馈信息</h3>
		</header>
		<main class="user_login_box">
	    <section class="my_order_box" style='height: auto;'>
	    	<form @submit.prevent="submit" id='formId'>
		    	<el-row :gutter="20">
				  <el-col :span="6"><div class="grid-content bg-purple topPdding" style='text-align: right;'>标题:</div></el-col>
				  <el-col :span="16"><div class="grid-content bg-purple topPdding">
					  	<el-input v-model="input" placeholder="请输入内容"></el-input>
				  </div>
				</el-col>
				</el-row>
				<el-row :gutter="20">
				  	<el-col :span="6">
				  		<div class="grid-content bg-purple topPdding" style='text-align: right;'>反馈内容:</div>
				  	</el-col>
				  	<el-col :span="16">
					  <div class="grid-content bg-purple topPdding">
						 <el-input type="textarea" name="User_PhoneNum" id='User_PhoneNum' class="user_input" style ='font-size: 18px;'
						 	placeholder="请输入内容"
						 	:rows="5"
							v-model="textarea"/>
				            </el-input>
					  </div>
					</el-col>
				</el-row>
			</form>
	    </section>
	    <section class="my_order_box" style='height: 150px;'>
			<el-row :gutter="20">
				<el-col :span="24">
				  	<div class="grid-content bg-purple topPdding" style="text-align: center;">
				  		<el-button type="success" round @click='submit()'>保存</el-button>
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
				submitDatas:{},
				addressDatas:[],
				textarea:'',
				input:''
			}
		},
		mounted(){
			this.getaddressDatas();
			this.hiddenFooter();
		},

		methods:{

			getaddressDatas() {
				let _this = this;
				if (this.$route.params.id === 'isEdit') {
					_this.$http.post('/Mall/Member/ShippingAddressList').then((res)=>{
						// debugger;tag
						for (var i = res.data.resultData.length - 1; i >= 0; i--) {
							if (res.data.resultData[i]['id'] == _this.$route.params.obj) {
								_this.addressDatas = res.data.resultData[i];
							}
						}
					},(err)=>{
						console.log('左侧数据' + err);
					})
				}
			},
			hiddenFooter() {
                this.$store.dispatch('hideNav');
            },
			submit: function() {
				let _this = this;

				let feedbackJsonData ={
					subject: this.input,
					body: this.textarea
				};

                _this.$http.post('/user/backfeed/add',
                	JSON.stringify(feedbackJsonData)
                , {
                	     headers: {
            				'Content-Type': 'application/json;charset=UTF-8'
        			}
                }
                ).then((res)=>{
                	setTimeout(() => {
                		this.$message('反馈信息提交成功!');
                		setTimeout(() => { 
                			window.location.href = 'hltc://back.in';
                		},300);
		            }, 300);
                // let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddressList/userid');
                // _this.$router.push({
                //     path: redirect
                // });
				},(err)=>{
					console.log('左侧数据' + err);
				})
            }
		}
	}
</script>

<style type="text/css">
	.user_input {
		border: 1px solid;
	}
</style>










