<template>
<el-container style="height: 100%; border: 1px solid #eee; padding-top:45px">
  <el-aside width="120px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']"   v-for=" (item, index) in leftDatas">
	    <el-submenu index={index}>
	        <template slot="title" @click='test'>{{item.category_Name}}</template>
<!-- 	        <el-menu-item-group>
	          <template slot="title" >分组一</template>
	          <el-menu-item index="1-1">选项1</el-menu-item>
	          <el-menu-item index="1-2">选项2</el-menu-item>
	        </el-menu-item-group> -->
	    </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;padding:0px;height: 113px;">
    		            <div class="category_banner">
	                <a href="#">
	                    <img src="../assets/images/banner_1.png" alt="" style="width:100%;height: 113px;">
	                </a>
	            </div>
    </el-header>
    
    <el-main style="padding-left:5px;padding-right:5px;padding-top: 10px;">
    <ul>
        <li class="not_eng_item classStyle" v-for="(item, index) in RightDatas">
            <router-link :to="'/detail/'+item.id"class="category_detail_item_link">
                <img v-lazy="item.default_Pic" alt="" class="category_detail_item_node not_eng_pic">
                <el-row :gutter="20">
                	<el-col :span="4">
					  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
					  	</div>
					</el-col>
					<el-col :span="16">
					  	<div class="grid-content bg-purple topPdding" style='text-align: center;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>
					  		{{item.product_Name}}
					  	</div>
					</el-col>
				</el-row>
            </router-link>
        </li>
    
    </ul>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
      	role:parseInt(window.sessionStorage.user_Type),
      	leftDatas:[],
      	RightDatas:[],
      	cateGoodsData:[],
      }
    },
	// watch:{
	// 	$route(to){
	// 		//console.log(to);
	// 		var reg=/catgory\/\d+/;
	// 		if(reg.test(to.path)){
	// 			var categotyId=this.$route.params.id || 0;
	// 			this.fetchData(categotyId);
	// 		}
	// 	}
	// },

	created() {
		let defaultLeftNum =0; //默认显示最上层分类
		this.initRightData(defaultLeftNum)
	},

    mounted(){
        this.getLeftDatas();
        // this.fetchData(this.$route.params.id);
    },


    methods: {
    	test() {
    		debugger
    	},
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          getLeftDatas(){
              let _this = this;
              _this.$http.post('Mall/category/list').then((res)=>{
                _this.leftDatas = res.data.resultData;
              },(err)=>{
                console.log('左侧数据' + err);
              })
          },
          initRightData (sId) {
          	let _this = this;
          	    let categoryData = {
                    page:1,
                    pagesize:20,
                    cat:1
                }
          	_this.$http.post('Mall/Product/ProductList',
          		JSON.stringify(categoryData),
          		{
                	headers: {'Content-Type': 'application/json;charset=UTF-8'}
                }).then((res)=>{
                _this.RightDatas = res.data.resultData.dataList;
            },(err)=>{
                console.log('左侧数据' + err);
            })
          },
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
				},
				{
				  product_id:'9',
				  product_img_url:'http://gd3.alicdn.com/bao/uploaded/i3/TB1Xjs9JpXXXXXVXFXXXXXXXXXX_!!0-item_pic.jpg', 
				  product_name: '2015冬季新款韩版羽绒服女中长款加厚修身大毛领棉衣女装外套潮'
				},				
				{
				  product_id:'10',
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
  };
</script>
<style type="text/css">
	.classStyle {
		margin-bottom: 0px;
	}
	.not_eng_pic {
  border: solid 1px #b5b7b7;
  width: 94%;
  height: 130px;
}
.category_detail_item_node {
	height: 120px;
	width: 120px;
}
</style>


