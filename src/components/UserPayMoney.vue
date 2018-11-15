<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/UserPayMoney/'">
		    <a href="#" class="icon_back"></a>
            <h3 class="cartname">我的天成币</h3>
		</router-link>
		</header>
		<main class="mine_layout">
            <section class="my_order_box" style='height: auto;'>
            <el-row :gutter="24">
                <el-col :span="24"  style='padding-left: 0px;'>
                    <img src="../assets/images/tcb.png" alt="" class="" style='width: 100%;height:100%;margin-left: 15px;'>
                </el-col>
            </el-row>
            <el-row :gutter="23">
                <el-col :span="5"  style='padding-left: 0px;'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 00px;'>
                    </div>
                </el-col>                
                <el-col :span="4"  style='padding-left: 0px;'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 0px;font-size:18px; text-align:center'>
                        余额:
                    </div>
                </el-col>                
                <el-col :span="3" style='padding-left: 0px;'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 0px;
                    font-size:18px;color:#57aa7c'>
                        0.00
                    </div>
                </el-col>                
                <el-col :span="5"  style='padding-left: 0px;'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 0px;font-size:18px'>
                        天成币
                    </div>
                </el-col>
            </el-row>
        </section>			

        <section class="my_order_box" style='height: auto;'>
			<li class="" style="list-style-type:none;">

			<el-row :gutter="23">
                <el-col :span="1" style='padding-left: 0px;padding-right: 0px;'>
                    <div class="grid-content bg-purple topPdding ">
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/h3.png" alt="" class="banner_pic2" >
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/s7.png" alt="" class="banner_pic2" >
                    </div>
                </el-col> 
				<el-col :span="5">
				  	<div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
				  		<img src="../assets/images/s1.png" alt="" class="banner_pic2" >
				  	</div>
				</el-col>
<!--                 <el-col :span="5">
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/z2.png" alt="" class="banner_pic2" >
                    </div>
                </el-col>  -->
                <el-col :span="5">
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/a6.png" alt="" class="banner_pic2" >
                    </div>
                </el-col>               
			</el-row>
	   			 </li>
	    </section>

		<section class="my_order_box" style='height: auto;margin-top: 0px;!important'>
			<li class="" style="list-style-type:none;">
            <el-row :gutter="23">
                <el-col :span="1" style='padding-left: 0px;padding-right: 0px;'>
                    <div class="grid-content bg-purple topPdding ">
                    </div>
                </el-col>
                <el-col :span="5">
                    <router-link tag="li" to="/ChongValue" class="tabItem">
                        <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                            <img src="../assets/images/c4.png" alt="" class="banner_pic2" >
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="5">
                    <router-link tag="li" to="/TxValue" class="tabItem">
                        <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                            <img src="../assets/images/t8.png" alt="" class="banner_pic2" >
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="5">
                    <!-- <router-link tag="li" to="/PayInforlist" class="tabItem" > -->
                        <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                            <img src="../assets/images/l5.png" alt="" class="banner_pic2" >
                        </div>
                    <!-- </router-link> -->
                </el-col>                
                <el-col :span="5">
                    <router-link tag="li" to="/CreatePalyNum" class="tabItem" v-if='this.payPassWord == false'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/m6.png" alt="" class="banner_pic2 pic3" >
                    </div>
                    </router-link>                    
                    <router-link tag="li" to="/ConfPassWord" class="tabItem" v-if='this.payPassWord == true'>
                    <div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
                        <img src="../assets/images/m6.png" alt="" class="banner_pic2 pic3" >
                    </div>
                    </router-link>
                </el-col>
            </el-row>
	   	   </li>
	    </section>

<!-- 	    <section class="my_order_box" style='height: auto;margin-top: 0px;!important'>
			<li class="" style="list-style-type:none;">
			<el-row :gutter="20">
				<el-col :span="23">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;padding-left:20px'>

				  	</div>
				</el-col>

			</el-row>
			<el-row :gutter="23">
				<el-col :span="5">
					<router-link tag="li" to="/LiuS" >
				  	<div class="grid-content bg-purple topPdding" style='padding-left: 20px;'>
				  		<img src="../assets/images/y9.png" alt="" class="banner_pic2" >
				  	</div>
				  </router-link>
				</el-col>
				<el-col :span="5">
				  	<div class="grid-content bg-purple topPdding " style='padding-left: 20px;'>
				  		<img src="../assets/images/e10.png" alt="" class="banner_pic2" >
					</div>
				</el-col>
			</el-row>
	   			 </li>
	    </section> -->

	    <section class="my_order_box" style='height: 100px;margin-top: 0px;!important'>

			<el-row :gutter="20">
				<el-col :span="23">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;padding-left:20px'>
				  	</div>
				</el-col>
			</el-row>

	    </section>
		</main>
<!-- 		<div class="footer">
  	<footer class="fixBottomBox1">
        <ul>
           
            <router-link tag="li" to="/UserPayMoney" class="tabItem">
            	<a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/zf-g.png"  id='zf-g' index='0' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                   <img src="../assets/images/zf.png" style='display:none' id='zf' index='0' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                </a>
            </router-link>
            <router-link tag="li" to="/ChongValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/ck.png" id ='ck-g' alt="" index='1' class="tab-item-icon payIcon" @click="checkClickEvent($event)">                    
                    <img src="../assets/images/ck-g.png" id ='ck' style='display:none' alt="" index='1' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                </a>
            </router-link>

 
<router-link tag="li" to="/TxValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                	<img src="../assets/images/tx.png" id='tx-g' alt="" index='2' class="tab-item-icon payIcon">
                    <img src="../assets/images/tx-g.png" id='tx' alt="" style='display:none' index='2' class="tab-item-icon payIcon">

                </a>
            </router-link>

            <router-link tag="li" to="/ChongValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/yc.png" id='yc-g' alt="" index='2' class="tab-item-icon payIcon">
                    <img src="../assets/images/yc-g.png" id='yc' alt="" style='display:none' index='2' class="tab-item-icon payIcon">
                </a>
            </router-link>
            <router-link tag="li" to="/ChongValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/ye.png" id='ye-g' alt="" index='3' class="tab-item-icon payIcon"  @click="checkClickEvent($event)">      
                    <img src="../assets/images/ye-g.png" id='ye' style='display:none' alt="" index='3' class="tab-item-icon payIcon"  @click="checkClickEvent($event)">
                </a>
            </router-link>
        </ul>
    </footer>
</div> -->
	</div>
</template>
<script>
	export default{
		data(){
			return{
				mainDatas:[],
                payPassWord:false,
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
			init() {
             let _this = this;
              let bankData = {
                }
                 _this.$http.post('User/Member/userinfo',
                    JSON.stringify(bankData)
                , {
                         headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    this.payPassWord = res.data.resultData.payPassword_Status;
                });
                _this.changeImgsArr = [
                    'zf.png',
                    'ck.png',
                    'tx.png',
                    'yc.png',
                    'ye.png',
                    ];
                 _this.noChangeImgArr = [
                    'zf-g.png',
                    'ck-g.png',
                    'tx-g.png',
                    'yc-g.png',
                    'ye-g.png',

                ]
            },
			hiddFooter () {
                let _this = this;
                if (location.search !== '') {
                  window.sessionStorage.clear();
                  _this.loginDate = JSON.parse(unescape(decodeURI(location.search)).split('=')[1]);
                      window.sessionStorage.userInfo = _this.loginDate.userInfo;
                      window.sessionStorage.token = _this.loginDate.access_Token;
                      window.sessionStorage.user_Name = _this.loginDate.user_Info.user_Name;
                      window.sessionStorage.user_Id = _this.loginDate.user_Info.user_Id;
                      window.sessionStorage.user_Type = _this.loginDate.user_Info.user_Type;
                      window.sessionStorage.face_Path = _this.loginDate.user_Info.face_Path;
                      if (_this.loginDate.user_School == undefined) {
                        window.sessionStorage.user_Type = 0
                      } else {
                        window.sessionStorage.user_Type = _this.loginDate.user_School[0].user_Type;
                      }
                      _this.showLogin = false
                }
                if (window.sessionStorage.length === 0) {
                    _this.loginState = true
                } else {
                    _this.loginState = false
                }
			},
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},

			checkClickEvent(event){

                document.getElementById('zf-g').style.display='none'
                document.getElementById('ck-g').style.display='none'
                document.getElementById('tx-g').style.display='none'
                document.getElementById('yc-g').style.display='none'
                document.getElementById('ye-g').style.display='none'

                document.getElementById('zf').style.display='none'
                document.getElementById('ck').style.display='none'
                document.getElementById('tx').style.display='none'
                document.getElementById('yc').style.display='none'
                document.getElementById('ye').style.display='none'

                if (event.target.id === 'zf-g') {
                    document.getElementById('zf').style.display=''
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('tx-g').style.display=''
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('ye-g').style.display=''
                }

                if (event.target.id === 'ck-g') {
                    document.getElementById('ck').style.display=''
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('tx-g').style.display=''
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('ye-g').style.display=''
                }

                if (event.target.id === 'tx-g') {
                    document.getElementById('tx').style.display=''
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('ye-g').style.display=''
                }

                if (event.target.id === 'yc-g') {
                    document.getElementById('yc').style.display=''
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('tx-g').style.display=''
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('ye-g').style.display=''
                }                
                if (event.target.id === 'ye-g') {
                    document.getElementById('ye').style.display=''
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('tx-g').style.display=''
                }

                if (event.target.id === 'zf') {
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('ye').style.display=''
                }

                if (event.target.id === 'tx') {
                    document.getElementById('tx-g').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('ye').style.display=''
                }

                if (event.target.id === 'ck') {
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                }

                if (event.target.id === 'yc') {
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('ye').style.display=''
                    document.getElementById('ck').style.display=''
                }
                if (event.target.id === 'ye') {
                    document.getElementById('ye-g').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                }

                event.target.getAttribute('index')

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
    .banner_pic2 {
    	width: 50px;
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
	.payIcon {
		width: 70% !important;
	}
    .pic_3 {
        min-height: auto;
    }
    .pic3 {
        width: 60px;
    }
</style>










