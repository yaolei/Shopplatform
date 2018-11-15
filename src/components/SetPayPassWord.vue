<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/TxValue/'">
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

                    </div>
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
			<el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
				<el-col :span="18">
                    <div class="grid-content bg-purple topPdding" style='height:10px; font-size:20px;    text-align: center;'>
                      设置支付密码
                    </div>				  	
                    <div class="grid-content bg-purple topPdding" style='height:10px; font-size:16px;    text-align: center;color:#c3c3c3'>
            请设置支付密码,用于支付验证
				  	</div>
				</el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                    </div>
                </el-col>
                  <el-col :span="4" style='padding-left:20px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                         <el-input v-model="input1" :maxlength="1" id='num1'></el-input>
                    </div>
                  </el-col>                  
                  <el-col :span="3" style='padding-left:5px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <el-input v-model="input2" :maxlength="1" id='num2'></el-input>
                    </div>
                  </el-col>                  
                  <el-col :span="3" style='padding-left:5px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <el-input v-model="input3" :maxlength="1" id='num3'></el-input>
                    </div>
                  </el-col>                  
                  <el-col :span="3" style='padding-left:5px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <!-- <el-input   size="small" :min="0" :max="9"  id='num4'></el-input> -->
                        <el-input  v-model="input4" :maxlength="1" id='num4'></el-input>
                    </div>
                  </el-col>                  
                  <el-col :span="3" style='padding-left:5px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <el-input v-model="input5" :maxlength="1" label="" id='num5'></el-input>
                    </div>
                  </el-col>                  
                  <el-col :span="3" style='padding-left:5px;padding-right:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <el-input  v-model="input6" :maxlength="1" label="" id='num6'></el-input>
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
				  		<el-button type="success"  size='medium' style='width:180%'>确认</el-button>
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

		},
		mounted(){
			this.getaddressDatas();
		},
		methods:{
            handleOptionsCli(obj){
                console.log(obj);
                let _this = this;
                // let redirect = decodeURIComponent(_this.$route.query.redirect || '/TuiJianGoods/' + useid);
                // _this.$router.push({
                //     path: redirect
                // });
            },
            clickitem (e) { 
                 e === this.radio2 ? this.radio2 = '' : this.radio2 = e
                 debugger
             },

			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
        let ifFillOut = this.input1 == '' || this.input2 == '' || this.input3 == '' ||
            this.input4 == '' || this.input5 == '' || this.input6 == ''
        if (ifFillOut) {
          this.$message('密码必须填写完整');
          return false;
        } else {
          let _this = this;
          let payPass = this.input1+this.input2+this.input3+this.input4+this.input5+this.input6;
          window.sessionStorage.bankPayNum = payPass;
          let recGoodsData = {
              pay_password: payPass
          }
          _this.$http.post('User/Member/SetPayPassword',
              JSON.stringify(recGoodsData)
          , {
                   headers: {
                      'Content-Type': 'application/json;charset=UTF-8'
              }
          }).then((res)=>{
              if (res.data.status) {
                  this.$message('保存成功');
                  let redirect = decodeURIComponent(_this.$route.query.redirect || '/UserPayMoney');
                  _this.$router.push({
                      path: redirect
                  });
              } else {
                  _this.$message(res.data.message);
                  return false;
              }

          },(err)=>{
              console.log('左侧数据' + err);
          })
        }
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










