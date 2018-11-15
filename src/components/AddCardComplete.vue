<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/AddCardPhone/'">
		    <a href="#" class="icon_back"></a>
		</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;'>
            <el-row :gutter="20">
                <el-col :span="1">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="19">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                        绑定银行卡需要短信确认,验证码以发送至手机:
                        <br/>
                        {{this.displayPhone}},请按提示操作
                    </div>
                </el-col>
            </el-row>               
         
  <!--           <div class="grid-content bg-purple" style='width: 80%;font-size:18px;padding-left: 15px;min-height:0px;padding-top: 5px;'>
                        <hr></hr>
            </div>  -->          
            <el-row :gutter="20" style='padding-top:20px'>
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="5" style="padding-right:0px">
                    <div class="grid-content bg-purple " style='padding-top: 5px;text-align: center;font-size:16px;color:#c3c3c3'>验证码</div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:24px;'>
                        <el-input  type="number"  label="" id='me1' placeholder="填写验证码">
                        </el-input>
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
                dialogFormVisible: false,
                displayPhone: '',
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
                let needmeg = window.sessionStorage.bankPhone.substring(3, 8);

                this.displayPhone = window.sessionStorage.bankPhone.replace(needmeg, '*****');
            },
			hiddFooter () {

			},
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
                this.dialogTableVisible = true;
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










