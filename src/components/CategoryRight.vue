<template>
	<div id="cate_right">
		<div class="category_right">
	            <div class="category_banner">
	                <a href="#">
	                    <img src="../assets/images/banner_1.png" alt="">
	                </a>
	            </div>
	            <div class="category_detail">
	                <h3 class="category_n">Hot Category Goods</h3>
	                <ul>
	                    <li class="category_detail_item classStyle" v-for="item in cateGoodsData">
	                        <router-link :to="'/detail/'+item.product_id"class="category_detail_item_link">
	                            <img v-lazy="item.product_img_url" alt="" class="category_detail_item_pic">
	                            <p class="category_detail_item_name">{{item.product_name}}</p>
	                        </router-link>
	                    </li>
	                
	                </ul>
	            </div>
	        </div>
	</div>
</template>
<script>
export default{
		mounted(){
			this.fetchData(this.$route.params.id);
		},
		data(){
			return {
				cateGoodsData:[]
			}
		},
		watch:{
			$route(to){
				//console.log(to);
				var reg=/catgory\/\d+/;
				if(reg.test(to.path)){
					var categotyId=this.$route.params.id || 0;
					this.fetchData(categotyId);
				}
			}
		},
		methods:{
			fetchData(id){
				var _this=this;
					_this.cateGoodsData = [
				{
				  product_id:'3',
				  product_img_url:'https://gd1.alicdn.com/bao/uploaded/i1/2254228937/TB2pqExhpXXXXXkXXXXXXXXXXXX_!!2254228937.jpg', 
				  product_name: '素缕2015冬装新款文艺百搭羊毛毛呢外套女九分袖短款SL546031栐'
				},				
				{
				  product_id:'4',
				  product_img_url:'https://gd1.alicdn.com/bao/uploaded/i1/TB100kJKFXXXXbIXVXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '2015冬装淑女衣坊女装韩版蘑菇街韩范羊绒尼子大衣中长款毛呢外套'
				},				
				{
				  product_id:'5',
				  product_img_url:'https://gd1.alicdn.com/bao/uploaded/i1/TB1xmimJFXXXXXJXpXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '七七之缘2015秋冬新款女装韩版 黑色v领蕾丝修身显瘦背带裙连衣裙'
				},				
				{
				  product_id:'6',
				  product_img_url:'https://gd3.alicdn.com/bao/uploaded/i3/TB1VKOcKXXXXXXZXXXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '七七之缘诗钎姿锦女装2015秋冬新款代购旗舰店高斯雪岚羽绒服'
				},				
				{
				  product_id:'7',
				  product_img_url:'http://gd3.alicdn.com/bao/uploaded/i3/TB1Xjs9JpXXXXXVXFXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '2015冬季新款韩版羽绒服女中长款加厚修身大毛领棉衣女装外套潮'
				},				
				{
				  product_id:'8',
				  product_img_url:'https://gd2.alicdn.com/bao/uploaded/i2/TB1WRi9GpXXXXagaXXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '2015冬装淑女衣坊女装韩版蘑菇街韩范羊绒尼子大衣中长款毛呢外套'
				}

				];
				// _this.$http.get('/categorygoods',{
				// 	params: {
				// 		mId: id
				// 	}
				// }).then((res)=>{
				// 	_this.cateGoodsData = res.data;
				// },(err)=>{
				// 	console.log(err);
				// })
			}
		}
	}
</script>
<style type="text/css">
	.classStyle {
		width: 50%;
	}
</style>