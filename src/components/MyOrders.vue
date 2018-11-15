<!--  个人页面 -->
<template>
	<div class="mine_mm">
	<header class="top_bar">
		<router-link :to="'/mine/'">
		    <a href="#" class="icon_back"></a>
		    <h3 class="cartname">我的订单</h3>
		</router-link>
	</header>
	<main class="mine_layout">
	    <section class="my_order_box" style='height: auto;'>
	        <div class="order_bottom_box">
	            <ul>
	            	<li class="order_item">
	            		<router-link :to="'/MyOrders/'+ 'userId' +'/'+ 'all'">
	                    <a href="#" class="order_item_link">
	                        <img src="../assets/images/waitpay.png" alt="" class="order_item_pic">
	                        <span class="order_item_pay" style='color:red'>全部</span>
	                    </a>
	                   </router-link>
	                </li>
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
	    <section class="my_order_box">
	    	<li style="list-style-type:none;" v-for="item in orders">
	        <div class="order_top_box" style='height: auto !important;background-color: white;padding:0px'>
	            <div class="order_right" style='height: 40px;padding-right: 5%;'>
		             <a @click="delAddress()">
						<img src="../assets/images/del.png" alt="" style='margin-top: 5px;'>
		                <span>删除</span> 
	            	</a>
	            </div>
	        </div>
					<div class=" order_top_box" style='height: auto !important;background-color: white;'>
						<a style='font-weight:bold;font-size:24px'>{{item.shop_name}}</a>
						<hr style=" height:2px;border:none;border-top:2px dotted #e4e4e4;" />
						 <div style='width:auto'>
						 <div>
						 	<img v-lazy="item.goodsImgUrl" alt="" class="category_detail_item_pic" style='width: 20%;height: 20%;float: left;border-style: solid;border-width: 5px;border-color: #f3f3f3;'>
						 </div>
						 <div style='flont: left;width:50%;padding-left: 10%;margin-left: 20%;'>
							<li style="list-style-type:none;">
								<a style='font-weight:bold;font-size:16px'>共{{item.sumGoods}}件商品</a>实付款 <a style='font-size: 24px;color: red;'>{{item.sumPrice}} 元</a></li>
								<br/><br/>
						</div>
						</div>

			        </div>
			        <div class="order_top_box" style='background-color: white;'>
			            <div class="order_left" >
			                <span>


			                </span>
			            </div>
			        </div>

	    </li>
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
				_this.orders = [
				{
						shop_id: 1,
						goodsImgUrl: 'https://img.alicdn.com/imgextra/i2/676387207/TB2_DILjXXXXXabXpXXXXXXXXXX_!!676387207.jpg_430x430q90.jpg',
						shop_name: 'Evan 自营专卖店',
						sumGoods: 10,
						sumPrice: 230, 
				},
				];
				// if(window.sessionStorage.userInfo){
				// 	let uObj = JSON.parse(window.sessionStorage.userInfo);
				// 	let useId = uObj.user_id;
				// 	_this.$http.get('/userinfo',{
				// 		params:{
				// 			uId:useId
				// 		}
				// 	}).then((res)=>{
				// 		_this.uInfs = res.data;
				// 		console.log(_this.uInfs);
				// 	},(err)=>{
				// 		console.log(err);
				// 	});
				// }else{
				// 	_this.$router.push({
				// 		path:'/login',
				// 	})
				// }
			}
		}
	}
</script>