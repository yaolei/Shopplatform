<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/AddCardNum/'">
		    <a href="#" class="icon_back"></a>
		</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;' >
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                    银行卡信息
                    </div>
                </el-col>
            </el-row>              
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>                
                <el-col :span="5" style="padding-right:0px">
                    <div class="grid-content bg-purple " style='padding-top: 5px;text-align: center;font-size:16px;color:#c3c3c3'>银行</div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:14px;'>
                    {{mainDatas.fkh}}
                    </div>
                </el-col>
            </el-row>        
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="5" style="padding-right:0px">
                    <div class="grid-content bg-purple " style='padding-top: 5px;text-align: center;font-size:14px;color:#c3c3c3'>卡类型</div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:14px;'>
                        {{mainDatas.km}}({{mainDatas.kz}})
                    </div>
                </el-col>              
            </el-row>           
	    </section>

    <section>
                <el-row :gutter="20" style='padding-left:50px'>
                <el-col :span="20">
                    <div class="grid-content bg-purple"
                     style='text-align: center;font-size:14px;color:#c3c3c3'>
                        信息加密处理,仅用于银行验证
                    </div>
                </el-col>              
            </el-row>
    </section>    
    <section>
                <el-row :gutter="20" style='padding-left:50px'>
                <el-col :span="20">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:14px;color:#c3c3c3'>
                        <el-checkbox v-model="checked">同意《用户协议》</el-checkbox>
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
                bankPhone:'',
                bankName:'',
                bankType:'',
                bankDatas:[],
                dialogFormVisible: false,
                checked: true,
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
			this.hiddFooter();
			this.init()
		},
		mounted(){
			this.getaddressDatas();
		},
		methods:{
            handleOptionsCli(obj){
                console.log(obj);
            },
            clickitem (e) { 
                 e === this.radio2 ? this.radio2 = '' : this.radio2 = e
                let _this = this;
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddNewBlank/');
                _this.$router.push({
                    path: redirect
                });
             },
            init() {
             let _this = this;
            let recGoodsData = {
                  Card_Number: window.sessionStorage.bankCardNum,
              }
              _this.$http.post('/Finance/Banks/Bank',
                  JSON.stringify(recGoodsData)
              , {
                       headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                  }
              }).then((res)=>{
                this.mainDatas = res.data.resultData;
              },(err)=>{
                  console.log('左侧数据' + err);
              })
            },
			hiddFooter () {

			},
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
                let _this = this;
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/UserPayMoney/');
                        _this.$router.push({
                            path: redirect
                    });
                // if (this.bankType == '' || this.bankPhone == '' || this.bankName == '')  {
                //     this.$message('银行卡信息必须填写完整');
                // } else {
                //     let _this = this;

                    // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    // if (myreg.test(this.bankPhone)) {
                    //     window.sessionStorage.bankName = this.bankName;
                    //     window.sessionStorage.bankPhone = this.bankPhone;
                    //     window.sessionStorage.bankType = this.bankType;
                    //     let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddCardComplete/');
                    //     _this.$router.push({
                    //         path: redirect
                    //     });
                    // } else {
                    //     this.$message('电话号码,请输入正确电话号码');
                    //     this.bankPhone = '';
                    //     return false;
                    // }
                // }

			},
            checkClickEvent(event){

            }
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










