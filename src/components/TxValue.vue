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
                        余额
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
                        {{this.yueVal}}元
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
                    到账银行卡
                    </div>
                </el-col>              
                <el-col :span="12" style='padding-left:0px' >
                    <div class="grid-content bg-purple"
                     style='text-align: left;height:14px;font-size:14px;
                     padding-right:0px;padding-left:0px;color:#a1a8b8' @click="dialogFormVisible = true">
                    {{this.blankInfor}}
                    </div>
                </el-col>
            </el-row>        
			<el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
				<el-col :span="18">
				  	<div class="grid-content bg-purple topPdding" style='height:10px;'>
				  		金额
				  	</div>
				</el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                    </div>
                </el-col>
                <el-col :span="4" >
                    <div class="grid-content bg-purple topPdding" style='text-align: center;font-size:18px'>
                     ¥:</div>
                  </el-col>
                  <el-col :span="12" style='padding-left:0px'>
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'>
                        <el-input  v-model="txVal" type="number" :change='disCurVal()' size="small" :min="1" label="" id='me'>
                            <span slot="suffix">元</span>
                        </el-input>
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
                        当前可提现余额{{this.disVal}}元
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
				  		<el-button type="success"  size='medium' style='width:180%'>确认提现</el-button>
				  	</div>
				</el-col>
			</el-row>
	    </section>
        <section style=' top: 80%;position: absolute;width:100%'>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;height:20px'>
                    </div>
                </el-col>
                <el-col :span="9">
                    <router-link tag="li" to="/PayInforlist" class="tabItem removetabStyle" style={list-style:none} >
                        <div class="grid-content bg-purple topPdding"
                         style='text-align: center;height:20px;color:#7cbf50'>
                           提现记录
                        </div>
                     </router-link>                
                </el-col>                
                <el-col :span="9">
          <!--           <div class="grid-content bg-purple topPdding"
                     style='text-align: center;height:20px;color:#7cbf50' @click='submitVal()'>
                    </div>  -->                   
                </el-col>
            </el-row>
        </section>

<el-dialog title="请输入支付密码" 
:visible.sync="dialogPasswordVisible"
width="90%"
>
  <el-form :model="form">
            <el-row :gutter="20">
                <el-col :span="7">
                <div class="grid-content bg-purple topPdding">
                    </div>
                </el-col>
                <el-col :span="10" >
                    <div style='font-size: 14px;text-align: center;'>提现</div><br/>
                    <div style='font-size: 24px;text-align: center;font-weight:500'>¥ {{this.txVal}}</div>
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
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPasswordVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitTxInfo()">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="选择到账银行卡" :visible.sync="dialogFormVisible" 
custom-class='dislogStyle'
width="100%"
:append-to-body='true'
:lock-scroll="true"
:show-close = 'false'
:close-on-click-modal="false">
<div style='color:#c3c3c3'>请留意各银行到账时间</div>
  <el-form :model="form" :inline="true">
    <el-row :gutter="20">
        <el-radio-group v-model="radio1" style='width:100%' v-for="item in mainDatas">
        <el-col :span="18" style='padding-top: 10px;padding-bottom: 10px;font-size: 16px;'>
            {{item.bank_Name}} ({{item.card_Number}})
        </el-col>
        <el-col :span="2" style='padding-top: 10px;padding-bottom: 10px;'>
            <el-radio :v-model="item.id" :label=item.id @click.native.prevent="clickitem(item.id)"> &nbsp;</el-radio>
        </el-col>
        <el-col :span="24"><hr></hr></el-col>
        </el-radio-group>
        <el-col :span="18" style='padding-top: 10px;padding-bottom: 10px;font-size: 16px;'>
            <div @click="handleOptionsCli($event)">使用新卡充值</div>
        </el-col>
        <el-col :span="2" style='padding-top: 10px;padding-bottom: 10px;'>
                <el-radio :v-model="3" label="a4" @click.native.prevent="clickitem('a4')" >&nbsp;</el-radio>
        </el-col>
    </el-row>    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="subBanckInfor()">确 定</el-button>
  </div>
</el-dialog>
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
                dialogPasswordVisible:false,
                radio1:'',
                radio2:'',
                radio3:'',
                yueVal:'0',
                disVal:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                txVal: '',
                blankInfor: '暂未添加银行卡',
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
                 // e === this.radio2 ? this.radio2 = '' : this.radio2 = e
                this.radio = '';
                this.radio = e;
                let _this = this;
                if (e == 'a4') {
                    let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddNewBlank/');
                    _this.$router.push({
                        path: redirect
                    });
                }
             },
            init() {
             let _this = this;
              let bankData = {
                    // Product_Id:_this.$route.params.id,
                    // Product_Price2:parseFloat(this.numrec2)
                }
                _this.$http.post('User/Member/userinfo',
                    JSON.stringify(bankData)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    this.yueVal = res.data.resultData.balance;
                    this.disVal = this.yueVal
                });

                _this.$http.post('Finance/Banks/Userbanks',
                    JSON.stringify(bankData)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                this.mainDatas = res.data.resultData;
                    if (_this.mainDatas) {
                        for (var j = 0; j < _this.mainDatas.length; j++) {
                            if (_this.mainDatas[j]['isDefault']) {
                                _this.blankInfor = 
                                _this.mainDatas[j]['bank_Name'] + (_this.mainDatas[j]['card_Number']);
                                //默认银行
                                window.sessionStorage.bankName =  _this.blankInfor;
                                window.sessionStorage.bankId =   _this.mainDatas[j]['id'];
                            }
                        }
                    }
                });
            },
			hiddFooter () {

			},
            subBanckInfor () {
                //当前选中的银行信息
                if (this.radio != 'a4') {
                    let curBank = this.mainDatas[this.radio -1];
                    this.blankInfor = curBank['bank_Name'] + (curBank['card_Number']);
                    window.sessionStorage.bankName = this.blankInfor;
                }
                this.dialogFormVisible = false;
                
            },
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
                if (this.yueVal < this.txVal) {
                    this.$message('提现金额不能大于余额');
                    return false;
                } else if (this.txVal < 100) {
                    this.$message('提现金额必须大于100元');
                    return false;
                } else {
                    window.sessionStorage.txValue = this.txVal;
                    this.dialogPasswordVisible = true;
                }
                
                // this.dialogTableVisible = true
			},
            disCurVal(){
                this.disVal = this.yueVal-this.txVal;
            },
            submitTxInfo () {
                let _this = this;
                let ifFillOut = this.input1 == '' || this.input2 == '' || this.input3 == '' ||
                    this.input4 == '' || this.input5 == '' || this.input6 == ''
                if (ifFillOut) {
                  this.$message('密码必须填写完整');
                  return false;
                } else {
                    let payPass = this.input1+this.input2+this.input3+this.input4+this.input5+this.input6;
                        window.sessionStorage.bankPayNum = payPass;
                    let recGoodsData = {
                        Pay_Password: payPass
                    }
                  _this.$http.post('user/member/PayPasswordVerify',
                      JSON.stringify(recGoodsData)
                  , {
                           headers: {
                              'Content-Type': 'application/json;charset=UTF-8'
                      }
                  }).then((res)=>{
                      if (res.data.status) {
                          let redirect = decodeURIComponent(_this.$route.query.redirect || '/completeTx');
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
    .removetabStyle {
        list-style:none;
    }
    .el-input__inner {
        width:110% !important;
        padding: 0 12px !important;
    }
</style>










