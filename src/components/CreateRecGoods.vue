<template>
	<div class="my_l">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">修改推荐商品</h3>
		</header>
		<main class="user_login_box">
			<section class="my_order_box">
				<li class="" style="list-style-type:none;">
					<div class=" order_top_box" style='height: auto !important;background-color: white;'>
						<a style='font-weight:bold;font-size:14px'>{{this.mainDatas.product_Name}} &nbsp;&nbsp;({{this.mainDatas.product_Summary}})</a>  
						 <div style='width:auto'>
						 	<img v-lazy="this.mainDatas.goodImg_url" alt="" class="category_detail_item_pic" style='width: 20%;height: 20%;float: left;border-style: solid;border-width: 5px;border-color: #f3f3f3;'>
						 <div style='flont: left;width:100%;margin-left: 20%;'>
							<li style="list-style-type:none;line-height: 40px">
								<a style='font-weight:bold;font-size:16px'>商品零售价格</a>： <a style='font-size: 24px;color: red;'>{{this.mainDatas.product_Price0}} </a><span style='font-weight:bold;font-size:16px'>元</span>
							</li>							
							<li style="list-style-type:none;line-height: 40px">
								<a style='font-weight:bold;font-size:16px'>我的购买价格(p3)</a>： <a style='font-size: 24px;color: red;'>{{this.mainDatas.product_Price3}} </a><span style='font-weight:bold;font-size:16px'>元</span>
							</li>
				<li style="list-style-type:none;line-height: 40px">
								<a style='font-weight:bold;font-size:16px'>老师购买价格(p2)</a>： <a style='font-size: 24px;color: red;'>{{this.mainDatas.product_Price2}} </a><span style='font-weight:bold;font-size:16px'>元</span>
							</li>
				<li style="list-style-type:none;line-height: 40px">
								<a style='font-weight:bold;font-size:16px'>家长购买价格(p1)</a>： <a style='font-size: 24px;color: red;'>{{this.mainDatas.product_Price1}} </a><span style='font-weight:bold;font-size:16px'>元</span>
							</li>
							<li style="list-style-type:none;    line-height: 40px">
								<span style='font-weight:bold;font-size:16px'>我可获得的利润(p2-p3):<a style='font-size: 24px;color: red;'>{{this.mainDatas.goods_unit}} </a>元</span>
							</li>
							<li style="list-style-type:none;    line-height: 40px">
								<div style='font-weight:bold;font-size:16px;float: left;'>总利润(p1-p3):</div>
								<input type='number' id='TeahterInput' style='font-size: 16px;color: red;width: 25%;padding-left:10%' :value="this.mainDatas.goods_unit_me" @change='changePrice($event)'><span style='font-weight:bold;font-size:16px'>元</span>
							</li>
							<li style="list-style-type:none;    line-height: 40px">
								<div style='font-weight:bold;font-size:16px;float: left;'>老师提成金额(p1-p2):</div>
								<input type='number' id='TeahterInput' style='font-size: 16px;color: red;width: 25%;padding-left:10%' :value="this.mainDatas.goods_unit_tec" @change='changePrice($event)'><span style='font-weight:bold;font-size:16px'>元</span>
							</li>								
							<li style="list-style-type:none;    line-height: 40px">
								<div style='font-weight:bold;font-size:16px;float: left;'>是否显示首页:</div>
 					<input type="checkbox" name="defalutAddress" style='-webkit-appearance: checkbox;width:20%;height: 30px;' :checked="this.mainDatas.status" id='display_state'>
							</li>		
							<li style="list-style-type:none;    line-height: 40px" >
								<a style='font-weight:bold;font-size:18px'>家长购买价格</a>: <a style='font-weight:bold;font-size: 14px;color: red;'id='lastPrice' >{{this.mainDatas.goods_unit_sum}} </a><span style='font-weight:bold;font-size:16px'>元</span>
							</li>

						</div>
						</div>

			        </div>
			        <div class="order_top_box" style='background-color: white;'>
			            <div class="order_left" >
			                <span>


			                </span>
			            </div>
			            <div class="order_right" style='height: 40px;'>
	
			            </div>
			        </div>
	   			 </li>
		        <div style='text-align: center;width: 90%;margin-left: 5%;margin-top: 5%;background-color: red;'>
		        	<div style='font-size: 18px;' @click='checkSubmit($event)' >保存修改</div>
		        </div>
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
		created () {
			this.setTitleName();
		},
		methods:{
			setTitleName() {
				let _this = this;
				// this.$route.params.id
			},
			changePrice(event) {
				let curDom = 'DeanInput',
					curSum = 0;
				if (event.target.id === 'DeanInput') {
					curSum = parseFloat(document.getElementById('TeahterInput').value) + parseFloat(event.target.value);
				} else if(event.target.id === 'TeahterInput'){
					curSum = parseFloat(document.getElementById('DeanInput').value) + parseFloat(event.target.value);
				}
				// if (parseFloat(event.target.value) >= parseFloat(this.mainDatas.goods_unit) || parseFloat(curSum) >= parseFloat(this.mainDatas.goods_unit)) {
				// 	alert('提成价格不能超出该商品的最大提成价格！');

				// 	event.target.value = event.target._value;
				// 	return false
				// }
				document.getElementById('lastPrice').innerText = parseFloat(document.getElementById('TeahterInput').value) + parseFloat(document.getElementById('DeanInput').value) + parseFloat(this.mainDatas.product_Price3);
			},
			getaddressDatas() {
				let _this = this;
				_this.goodId = this.$route.params.id;
				_this.$http.post('/Mall/Product/BestList').then((res)=>{
                    // _this.mainDatas = res.data.resultData;
                    for (var i = res.data.resultData.dataList.length - 1; i >= 0; i--) {
                    	if (res.data.resultData.dataList[i]['id'] == _this.goodId) {
                    		_this.mainDatas = res.data.resultData.dataList[i];
                    		//一共可用提成价格
                    		_this.mainDatas['goods_unit'] = parseFloat(parseFloat(_this.mainDatas['product_Price2']) - parseFloat(_this.mainDatas['product_Price3'])).toFixed(2)
                    		//院长的提成金额
                    		_this.mainDatas['goods_unit_me'] = parseFloat(parseFloat(_this.mainDatas['product_Price1']) -parseFloat(_this.mainDatas['product_Price3'])).toFixed(2)
                    		//老师的提成金额
                    		_this.mainDatas['goods_unit_tec'] = parseFloat(parseFloat(_this.mainDatas['product_Price1']) - parseFloat(_this.mainDatas['product_Price2'])).toFixed(2)              		
                    		//最后价格
                    		_this.mainDatas['goods_unit_sum'] = _this.mainDatas['product_Price1']

                    	}
                    }
                    console.log(_this.mainDatas)
                },(err)=>{
                    _this.mainDatas = 0
                    console.log(err);
                })
			},
			checkSubmit(event) {
				let _this = this;
			let r=confirm("是否保存修改信息？");
				if (r==true) {
					let recGoodsData ={
					Product_Id: this.$route.params.id,
					Product_Price2: parseFloat(this.mainDatas['product_Price3']) + parseFloat(document.getElementById('DeanInput').value), //老师价格
					Product_Price1: parseFloat(document.getElementById('lastPrice').innerText),
					Status:document.getElementById('display_state').checked,
					Sort:'1'

				};
				_this.$http.post('Mall/Product/ChooseProduct',
                	JSON.stringify(recGoodsData)
                , {
                	     headers: {
            				'Content-Type': 'application/json;charset=UTF-8'
        			}
                }).then((res)=>{
                let useid = this.mainDatas['user_Id'];
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/recommendGoods/userid');
                _this.$router.push({
                    path: redirect
                });
				},(err)=>{
					console.log('左侧数据' + err);
				})
				} else {
					alert("取消成功");
				}
			}
		}
	}
</script>












