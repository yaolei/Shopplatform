<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/AddNewBlank/'">
		    <a href="#" class="icon_back"></a>
		</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;'>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:14px;color:#c3c3c3'>
                        请绑定持卡人本人的银行卡
                    </div>
                </el-col>
            </el-row>              
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>                
                <el-col :span="5" style="padding-right:0px">
                    <div class="grid-content bg-purple " style='padding-top: 5px;text-align: center;font-size:16px;color:#c3c3c3'>持卡人</div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:24px;'>
                    <el-input v-model="carOwner"  id='me'>
                        </el-input>
                    </div>
                </el-col>
            </el-row>  
         
  <!--           <div class="grid-content bg-purple" style='width: 80%;font-size:18px;padding-left: 15px;min-height:0px;padding-top: 5px;'>
                        <hr></hr>
            </div>  -->          
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple " style='text-align: center;'></div>
                </el-col>
                <el-col :span="5" style="padding-right:0px">
                    <div class="grid-content bg-purple " style='padding-top: 5px;text-align: center;font-size:16px;color:#c3c3c3'>卡号</div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content bg-purple"
                     style='text-align: left;font-size:24px;'>
                        <el-input  v-model="carNum" type="number"  label="" id='me1'>
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
				  		<el-button type="success"  size='medium' style='width:180%'>下一步</el-button>
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
                carNum:'',
                radio:'1',
                dialogFormVisible: false,
                radio1:'',
                radio2:'',
                radio3:'',
                carOwner:'',
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
             },
            init() {
             let _this = this;

            },
			hiddFooter () {

			},
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
                if (this.carNum == '' || this.carOwner == '')  {
                    this.$message('银行卡信息必须填写完整');
                } else {
                    let _this = this;
                    //验证银行卡号是否正确
                    var pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
                    if (pattern.test(this.carNum)) {
                        window.sessionStorage.bankCardNum = this.carNum;
                        window.sessionStorage.bankCardOwner = this.carOwner;

                    let recGoodsData = {
                          Card_Number: this.carNum,
                          Card_Holder: this.carOwner
                      }
                      _this.$http.post('/Finance/Banks/UserbankSave',
                          JSON.stringify(recGoodsData)
                      , {
                               headers: {
                                  'Content-Type': 'application/json;charset=UTF-8'
                          }
                      }).then((res)=>{
                          if (res.data.status) {
                            this.$message('保存成功');
                              let redirect = decodeURIComponent(_this.$route.query.redirect || '/AddCardPhone');
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
                    } else {
                        this.$message('银行卡号错误,请输入正确银行卡号');
                        this.carNum = '';
                        return false;
                    }

                }

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










