<!--  个人页面 -->
<template>
	<div class="mine_mm">
	<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">账户管理</h3>
	</header>
	<main class="mine_layout">
	    <section class="mine_infos clearfix">
	        <div class="mmm_info">
	            <div class="user_icon">
					<img :src=uInfs.face_Path style='width:56px; height:56px' alt="">
	            </div>
	            <div class="user_detal">
	                	<a v-if='uInfs.user_Type === 0' style='color: white;'>(游客)</a>
						<a v-if='uInfs.user_Type === 1' style='color: white;'>(家长)</a>
						<a v-if='uInfs.user_Type === 2' style='color: white;'>(老师)</a>
						<a v-if='uInfs.user_Type === 3' style='color: white;'>(园长)</a>
	                <div class="reg">
	                	<p class="user_name">{{uInfs.nick_Name}}</p>
	                </div>
	            </div>
	        </div>
	    </section>
	    <section class="my_order_box my_b_info">
	    	<router-link :to="'/AddressList/'+ 'userId'">
	        <div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/images/baitiao1.png" alt="">
	                	<span>地址管理</span>
	            </div>
	            <div class="order_right">
	                	<span>></span>
	            </div>
	        </div>
	        </router-link>
	        <div class="order_top_box">
	            <div class="order_left">
	                <img src="../assets/images/baitiao2.png" alt="">
	                <span>信息管理</span>
	            </div>
	            <router-link :to="'/UserInforModif/'">
	            <div class="order_right">
	                <span>修改个人信息></span>
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
				uInfs:{}
			}
		},
		mounted(){
			this.getUDatas();
		},
		methods:{
			getUDatas(){
				let _this = this;
				let useId = window.sessionStorage.user_id;
					_this.$http.get('/Mall/Member/UserInfo').then((res)=>{
					_this.uInfs = res.data.resultData;
					_this.uInfs.face_Path = res.config.baseURL.substr(0, 29) + _this.uInfs.face_Path;

 				},(err)=>{
					console.log('用户数据' + err);
				})
			}
		}
	}
</script>





