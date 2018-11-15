
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)" class="icon_back"></a>
		<h3 class="cartname">流水信息</h3>
	</header>
		<main class="mine_layout">
	
        <section class="my_order_box" style='height: auto;' v-if='this.isNodata == true'>
			<el-row :gutter="24">				
				<el-col :span="24" style='text-align:center'>
				  	<div class="grid-content bg-purple topPdding" style='font-size:17px'>
				  		没有支付流水信息</div>
				</el-col>
			</el-row>
	    </section>        
	    <section class="my_order_box" style='height: auto;' v-if='this.isNodata == false'>
			<el-row :gutter="24">				
			<el-col :span="8" style='text-align:center'>
				<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			        支付类别<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item>微信</el-dropdown-item>
			        <el-dropdown-item>支付宝</el-dropdown-item>
			        <el-dropdown-item>天成</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			</el-col>			
			<el-col :span="8" style='text-align:center'>
				<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			        买卖<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item>全部</el-dropdown-item>
			        <el-dropdown-item>购买</el-dropdown-item>
			        <el-dropdown-item>销售</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			</el-col>			
			<el-col :span="8" style='text-align:center'>
				<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			        时间<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item>
			        	  <div class="block">
						    <span class="demonstration">选择时间</span>
						    <el-date-picker
						      v-model="value6"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期">
						    </el-date-picker>
						  </div>
			        </el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
				</el-col>
			</el-row>
	    </section>
	    <div class="placeStyle1"></div>
	    <section class="my_order_box" style='height: 100px;'>
			<el-row :gutter="20">
				<el-col :span="24">

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
				payMoney:this.$route.params.id,
				radio: '1',
				ip:'',
                mainDatas:[],
                isNodata:true,
                value6:'',
			}
		},
		mounted(){
            this.getaddressDatas();
			this.confirmOrd();
		},
		created () {
			this.init();
		},
		methods:{
			confirmOrd() {
				// this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			 //          confirmButtonText: '确定',
			 //          cancelButtonText: '取消',
			 //          type: 'warning'
			 //        }).then(() => {
			 //          this.$message({
			 //            type: 'success',
			 //            message: '删除成功!'
			 //          });
			 //        }).catch(() => {
			 //          this.$message({
			 //            type: 'info',
			 //            message: '已取消删除'
			 //          });          
			 //    });

			},

			init() {
				let _this = this;
				let payInfor = {
					 "page": 1,
					  //类型，wechat-微信，alipay-支付宝，balance-余额，不选择留空
					 "method:": 'wechat',
					  //收支方向，0-支出，1-收入（或充值）。-1为不选择
					 "out_in": -1,
					 "start_date": "2018-08-10",
					 //不选择留空，为当前日期
					 "end_date":""
				}
				_this.$http.post('/Finance/Money/SerialList',
                	JSON.stringify(payInfor)
                	,{
                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
                	}).then((res)=>{
                        this.mainDatas = res.data.resultData;
                        if (this.mainDatas == null) {
                            this.isNodata = true;
                        } else {
                            this.isNodata = false;
                        }

                },(err)=>{
                    console.log('数据' + err);
                })
			},
            getaddressDatas() {
                let _this = this;
                document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
            },

			getPay() {

			},

		}
	}
</script>

<style rel="stylesheet/scss">

  .lineStyle {

  }
</style>



