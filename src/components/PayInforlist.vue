
<template>
<div>
	<header class="top_bar" style ='    z-index: 3;'>
		<a onclick="window.history.go(-1)" class="icon_back"></a>
		<h3 class="cartname">提现历史</h3>
	</header>
		<main class="mine_layout">       
	    <section class="my_order_box" style='height: auto;' v-for="(item, index) in mainDatas" :key="index">
			<el-row :gutter="24">				
				<el-col :span="8" style='text-align:center'>
					<div class="grid-content bg-purple topPdding" style='text-align: center;'>
						{{item.date}}
					</div>
					<div style='color:#b7b7b7'> ¥{{item.total}}</div>
				</el-col>
			</el-row>			
			<el-row :gutter="24"  v-for="(item1, ind) in item.list" :key="ind">	
				<el-col :span="2">
						<div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
				</el-col>			
				<el-col :span="16" style='text-align:center'>
					<div class="grid-content bg-purple topPdding" style='text-align: center;'>
						提现-{{item1.bank_Name}}({{item1.bank_Number}})
					</div>
				</el-col>
				<el-col :span="4" style='padding:0'>
						<div class="grid-content bg-purple topPdding" style='text-align: left;'>
							¥{{item1.money}}
						</div>
				</el-col>
					<div style='padding-left:25.3%;color:#b7b7b7;font-size:14px'>{{item1.curDate}}</div>
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
					page:1,
				}
				_this.$http.post('/Finance/Withdrawal/List',
                	JSON.stringify(payInfor)
                	,{
                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
                	}).then((res)=>{
                        this.mainDatas = res.data.resultData;

                        for (var i = 0; i < this.mainDatas.length; i++) {
                        	for (var j = 0; j < _this.mainDatas[i]['list'].length; j++) {
                        		var date = new Date(_this.mainDatas[i]['list'][j]['date_Time']);
                        		_this.mainDatas[i]['list'][j]['curDate'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                        	}
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



