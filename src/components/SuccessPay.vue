<template>
	<div class="search_page">
		<main class="mine_layout">
	    <section class="my_order_box" style='height: auto;'>
	    	<el-row :gutter="20">
			  <el-col :span="20"><div class="grid-content bg-purple topPdding" style="text-align: center;">支付成功</div></el-col>
			</el-row>
	    	<el-row :gutter="20">
	    	<el-col :span="4"><div class="grid-content bg-purple topPdding"></div></el-col>
			  <el-col :span="16"><div class="grid-content bg-purple topPdding">{{this.timeShow}} 秒后 跳转到订单详情页面</div></el-col>
			</el-row>
	    	<el-row :gutter="20">
	    		<el-col :span="2"><div class="grid-content bg-purple topPdding"></div></el-col>
			  	<el-col :span="18"><div class="grid-content bg-purple topPdding" style="text-align: center;">如果不能跳转请点击链接直接跳转到首页</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="20">
			  	<div class="grid-content bg-purple topPdding" style="text-align: center;">
					<a href="#" class="buybuy"  style='background-color: #f3f3f3;'>
		                <router-link :to="'/home/' ">返回首页</router-link>
		            </a>
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
				timeShow:10,
			}
		},
		created() {
		    if ( this.timeOut ) {
		        clearTimeout(this.timeOut);
		    }
		    this.getListIng();
		},

		methods:{
		    getListIng() {
		        let _this = this;
		        if (this.timeShow > 1) {
		        	this.timeOut = setTimeout(() => {
		                _this.getListIng();
		               _this.timeShow --
		            }, 1000);
		        }
				this.timeOut = setTimeout(() => {
					let redirect = decodeURIComponent(_this.$route.query.redirect || '/home');
	                _this.$router.push({
	                    path: redirect
	                });
		        }, 10000);
		    },
		}
	}
</script>
<style >

</style>