<!--  个人页面 -->
<template>
	<div class="mine_mm">
	<main class="detail_box">
	    <section class="banner_box">
	    	<el-row >
                    <el-col :span="2"><div class="grid-content bg-purple-left"></div></el-col>
                    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" :span="4">
                        <div class="grid-content bg-purple titleName"></div>
                    </el-col>
                    <el-col :xs="9" :sm="15" :md="15" :lg="15" :xl="4" :span="1">
                        <div class="grid-content bg-purple titleName"></div>
                    </el-col>
                </el-row>
	    </section>
	    <section class="my_order_box" style='height:auto'>
	        <div class="order_top_box" style='margin-top:20px'>
	            <div class="order_left">
	                <span>地址管理</span>
	            </div>
	            <router-link :to="'/AddressList/' + 'userId'">
	            <div class="order_right">
	                <span>></span>
	            </div>
	        	</router-link>
	        </div>
	    </section>

	    <section class="my_order_box">
	        <div class="order_top_box" style='margin-top:20px'>
	            <div class="order_left">
	                <span>我的订单</span>
	            </div>
	            <router-link :to="'/AllOrders/'+ 'userId'+'/'+ 'all'">
	            <div class="order_right">
	                <span>全部订单></span>
	            </div>
	        	</router-link>
	        </div>
	        <div class="order_bottom_box">
	            <ul>
	                <li class="order_item">
	                	<router-link :to="'/Orders/'+ 'userId' +'/'+ 'dfk'">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/images/waitpay.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">待付款</span>
	                    </a>
	                    </router-link>
	                </li>
	                <li class="order_item">
	                	<router-link :to="'/OrdersGoods/'+ 'userId' +'/'+ 'dsh'">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/images/wuliu.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">待收货</span>
	                    </a>
	                </router-link>
	                </li>
					<li class="order_item">
						<router-link :to="'/OrdersCompleted/'+ 'userId' +'/' + 'ywc'">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/images/comple.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">已完成</span>
	                    </a>
	                </router-link>
	                </li>
					<li class="order_item">
						<router-link :to="'/OrdersCanle/'+ 'userId' +'/' + 'yqx'">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/images/clane.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay">已取消</span>
	                    </a>
	                </router-link>
	                </li>
	            </ul>
	        </div>
	    </section>
	    <section class="my_order_box" style='height:auto'>
	        <div class="order_top_box" style='margin-top:20px'>
	            <div class="order_left">
	                <span>优惠券</span>
	            </div>
	            <router-link :to="'/AddressList/'">
	            <div class="order_right">
	                <span>></span>
	            </div>
	        	</router-link>
	        </div>
	    </section>
		<section class="my_order_box" style='height:auto' v-if='role == 3'>
	        <div class="order_top_box" style='margin-top:20px'>
	            <div class="order_left">
	                <span>推荐列表</span>
	            </div>
	            <router-link :to="'/recommendGoods/'">
	            <div class="order_right">
	                <span>></span>
	            </div>
	        	</router-link>
	        </div>
	    </section>		
	    <section class="my_order_box" style='height:auto' v-if='role == 2'>
	        <div class="order_top_box" style='margin-top:20px'>
	            <div class="order_left">
	                <span>推荐列表</span>
	            </div>
	            <router-link :to="'/RecommendTecGoods/'">
	            <div class="order_right">
	                <span>></span>
	            </div>
	        	</router-link>
	        </div>
	    </section>
	</main>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				sumGoods:'',
				uInfs:{},
				role:parseInt(window.sessionStorage.user_Type),
			}
		},
		mounted(){
			this.getUDatas();
		},
		methods:{
			getUDatas(){
				let _this = this;

				if(window.sessionStorage.userInfo){
					let useId = window.sessionStorage.user_id;
					_this.$http.post('/Mall/Member/UserInfo').then((res)=>{
					_this.uInfs = res.data.resultData;
					if (_this.uInfs.balance == '') {
						_this.uInfs.balance = 0
					}					
				
					if (_this.uInfs.points == '') {
						_this.uInfs.balance = 0
					}
					_this.uInfs.face_Path = res.config.baseURL.substr(0, 29) + _this.uInfs.face_Path;

 				},(err)=>{
					console.log('用户数据' + err);
				})

				}else{
					_this.$router.push({
						path:'/login',
					})
				}
			}
		}
	}
</script>