<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/UserPayMoney/'">
		    <a href="#" class="icon_back"></a>
		</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;'>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                    </div>
                </el-col>
            </el-row>              
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:24px;'>
                  <div style="height: 300px;"></div>
                </el-col>
            </el-row>              
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="6" style='padding-right:0px'>
                    <div class="grid-content bg-purple"
                     style='text-align: left;height:14px;font-size:14px;padding-left:0px;padding-right:0px'>

                    </div>
                </el-col>              
                <el-col :span="12" style='padding-left:0px' >
                    <div class="grid-content bg-purple"
                     style='text-align: left;height:14px;font-size:14px;
                     padding-right:0px;padding-left:0px;color:#a1a8b8'>
                    </div>
                </el-col>
            </el-row>
      <hr> 
      <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                        提现金额
                    </div>
                </el-col>                
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;'>
                    </div>
                </el-col>                
                <el-col :span="4" style='padding:0px'>
                    <div class="grid-content bg-purple topPdding" style='height:20px;font-size:14px;'>¥ {{this.txVal}}
                    </div>
                </el-col>
      </el-row>       
      <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                        手续费
                    </div>
                </el-col>                
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;'>
                    </div>
                </el-col>                
                <el-col :span="4" style='padding:0px'>
                    <div class="grid-content bg-purple topPdding" style='height:20px;font-size:14px;'>¥ 0.00
                    </div>
                </el-col>
      </el-row>      
      <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                        到账银行卡
                    </div>
                </el-col>                
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;'>
                    </div>
                </el-col>                
                <el-col :span="4" style='padding:0px'>
                    <div class="grid-content bg-purple topPdding" style='height:20px;font-size:14px;'>
                      {{this.bankName}}
                    </div>
                </el-col>
      </el-row>              
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:24px;'>
                    </div>
                </el-col>
      </el-row>       
            <el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
				  	</div>
				</el-col>
				<el-col :span="20" >
                    <div class="grid-content bg-purple topPdding" style='text-align: center;font-size:18px'>
                        <hr></hr>
                     </div>				  	
                     <div class="grid-content bg-purple" style='font-size:14px;color:#c3c3c3'>
				  	 </div>
				</el-col>
			</el-row>
	    </section>

	    <section>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;height:20px'>
				  	</div>
				</el-col>
				<el-col :span="12">
				  	<div class="grid-content bg-purple topPdding"
				  	 style='text-align: center;height:20px' @click='submitVal()'>
				  		<el-button type="success"  size='medium' style='width:180%'>完成</el-button>
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
				mainDatas:[],
                radio:'1',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                txVal: window.sessionStorage.txValue,
                bankName: window.sessionStorage.bankName,
                currentdate:'',
                form: {
                  name: '',
                  region: '',
                  date1: '',
                  date2: '',
                  delivery: false,
                  type: [],
                  resource: '',
                  desc: ''
                },
                formLabelWidth: '80%'
			    }
		},
		created () {
      this.getNowFormatDate();
		},
		mounted(){
			this.getaddressDatas();
		},
		methods:{
            handleOptionsCli(obj){
                let _this = this;
                // let redirect = decodeURIComponent(_this.$route.query.redirect || '/TuiJianGoods/' + useid);
                // _this.$router.push({
                //     path: redirect
                // });
            },
            clickitem (e) { 
                 e === this.radio2 ? this.radio2 = '' : this.radio2 = e
             },

			getaddressDatas() {
				let _this = this;
				  document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
      getNowFormatDate() {
          let _this = this;
          let recGoodsData = {
              Money: window.sessionStorage.txValue,
              Bank_Id: window.sessionStorage.bankId
          }
          _this.$http.post('/Finance/Withdrawal/Apply',
              JSON.stringify(recGoodsData)
          , {
                   headers: {
                      'Content-Type': 'application/json;charset=UTF-8'
              }
          }).then((res)=>{

          },(err)=>{
              console.log('左侧数据' + err);
          })



        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate() +1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
         this.currentdate = year + seperator1 + month + seperator1 + strDate;
      },
			submitVal () {
          let _this = this;
          let redirect = decodeURIComponent(_this.$route.query.redirect || '/UserPayMoney/');
          _this.$router.push({
              path: redirect
          });
			},
		}
	}
</script>

<style type="text/css">
    .orderImg {
	  	width: 180px;
	    height: 120px;
	    padding-left: 20px;
    }
    .androidStyle {
    	width: 90% !important;
    }
    .boderIfr {
    	border: 1px solid;
    }
    .banner_pic1 {
    	width: 130px;
    }
    .fixBottomBox1 {
    width: 100%;
    height: 50px;
    box-shadow: 0 -2px 10px #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
	}

	.fixBottomBox1 ul {
	    display: flex;
	    justify-content: space-around;
	}

	.fixBottomBox1 .tabItem {
	    width: 18%;
	    height: 100%;
	    text-align: center;
	}
    .dislogStyle {
        height:50% !important;
        margin-top: 52vh !important;
        margin-bottom: 0 !important;
        /*margin:52vh auto 0px !important;*/
    }
    .el-dialog__body {
        padding-top: 0px !important;
    }
</style>










