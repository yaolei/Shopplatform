<template>
	<div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">{{shopDatas.store_Name}}</h3>
		</header>
		<main class="user_login_box">
			<section class="my_order_box">
				<li class="" style="list-style-type:none;">
					<div class=" order_top_box" style='height: auto !important;background-color: white;'>
						<a style='font-weight:bold;font-size:16px'>&nbsp; &nbsp;{{shopDatas.product_Name}}&nbsp;</a>
						{{shopDatas.product_Summary}}
	                             <p class="not_eng_text" v-if='role === 0' style='width: 100%;'>
                            零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price0}}</span>
                        </p>                                            
                        <p class="not_eng_text" v-if='role === 1' style='width: 100%;'>
                            会员价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price1}}</span><br>
                            零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price0}}</span>
                        </p>                                            
                        <p class="not_eng_text" v-if='role === 2' style='width: 100%;'>
                           老师价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price2}}</span><br>
                           会员价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price1}}</span><br>
                            <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price0}}</span>
                        </p>                                            
                        <p class="not_eng_text" v-if='role === 3' style='width: 100%;'>
                            园长价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price3}}</span><br/>
                            老师价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price2}}</span><br/>
                            会员价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                    <span class="more_info_price_txt">{{shopDatas.product_Price1}}</span>
                        </p>

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
				role:parseInt(window.sessionStorage.user_Type),
				shopDatas:[]
			}
		},
		mounted(){
			this.getaddressDatas();
		},

		methods:{
			getaddressDatas(){
				let _this = this;
				_this.$http.get('/Mall/Product/Detail', {
       				params: {
                        id: this.$route.params.id
                    }
				}).then((res)=>{
					// debugger;tag
					_this.shopDatas = res.data.resultData;
				},(err)=>{
					console.log('左侧数据' + err);
				})
			},
			delAddress () {
				let r=confirm("您确认要删除当前地址吗？");
				if (r==true) {
					 alert("删除成功");
				} else {
					alert("取消成功");
				}
			}
		}
	}
</script>












