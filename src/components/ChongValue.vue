<template>
	<div class="my_l">
		<header class="top_bar">
			<router-link :to="'/UserPayMoney/'">
		    <a href="#" class="icon_back"></a>
		</router-link>
		</header>
		<main class="mine_layout">
			<section class="my_order_box" style='height: auto;'>
			<li class="" style="list-style-type:none;">

            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;font-size:16px'>
                        支付方式
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>                   
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;font-size:20px'>
                        <img src="../assets/images/Wechat.png" alt="" class="banner_pic"  ></div>
                </el-col>               
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
                        <a style='font-size: 20px;'>微信</a></div>
                </el-col>               
                <el-col :span="5">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
                            <el-radio v-model="radio" label="1" size='medium' border><i class="el-icon-success"></i></el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                
                <el-col :span="4">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;height:10px'></div>
                </el-col>
            </el-row>
<!-- 
            <div style="width:auto;height:1px;margin:0px auto;padding:0px;overflow:hidden;background-color: black;"></div>

            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;'></div>
                </el-col>                   
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: center;font-size:20px'>
                        <img src="../assets/images/chat.png" alt="" cchat.pnglass="banner_pic"></div>
                </el-col>               
                <el-col :span="7">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
                        <a style='font-size: 20px;'>支付宝</a></div>
                </el-col>               
                <el-col :span="5">
                    <div class="grid-content bg-purple topPdding" style='text-align: left;font-size:20px'>
                        <el-radio v-model="radio" label="2" size='medium' border><i class="el-icon-success"></i></el-radio>
                    </div>
                </el-col>
            </el-row> -->


			<el-row :gutter="20">
				<el-col :span="23">
				  	<div class="grid-content bg-purple topPdding" style='text-align: left;height:20px;padding-left:20px'>
				  		充值金额
				  	</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
				  	</div>
				</el-col>
				<el-col :span="6">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;font-size:18px'>
				  	 ¥:</div>
				  </el-col>
				  <el-col :span="10">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;'>
						<el-input  type="number" size="small" :min="1" label="" id='money'>
							<span slot="suffix">元</span>
                        </el-input>

				  	</div>
				  </el-col>
			</el-row>
	   			 </li>
	    </section>
	    <section>
			<el-row :gutter="20">
				<el-col :span="8">
				  	<div class="grid-content bg-purple topPdding" style='text-align: center;height:20px'>
				  	</div>
				</el-col>
				<el-col :span="4">
				  	<div class="grid-content bg-purple topPdding"
				  	 style='text-align: center;height:20px' @click='submitVal()'>
				  		<el-button type="success"  size='medium' >确认支付</el-button>
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
                    <img src="../assets/images/ck.png" id ='ck' alt="" index='1' class="tab-item-icon payIcon" @click="checkClickEvent($event)">                    
                    <img src="../assets/images/ck-g.png" id ='ck-g' style='display:none' alt="" index='1' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                </a>
            </router-link>

 
<router-link tag="li" to="/TxValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/tx.png" id='tx' alt="" index='2' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                    <img src="../assets/images/tx-g.png" id='tx-g' alt="" style='display:none' index='2' class="tab-item-icon payIcon" @click="checkClickEvent($event)">

                </a>
            </router-link>

            <router-link tag="li" to="/ChongValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/yc.png" id='yc' alt="" index='2' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                    <img src="../assets/images/yc-g.png" id='yc-g' alt="" style='display:none' index='2' class="tab-item-icon payIcon" @click="checkClickEvent($event)">
                </a>
            </router-link>
            <router-link tag="li" to="/ChongValue" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/ye.png" id='ye' alt="" index='3' class="tab-item-icon payIcon"  @click="checkClickEvent($event)">      
                    <img src="../assets/images/ye-g.png" id='ye-g' style='display:none' alt="" index='3' class="tab-item-icon payIcon"  @click="checkClickEvent($event)">
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
                radio:'1',
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

			},
			getaddressDatas() {
				let _this = this;
				document.getElementsByClassName('fixBottomBox')[0].style.display = 'none';
			},
			submitVal () {
                let _this = this;
                let val = parseInt(document.getElementById('money').value * 100);

                let oderInfor = {
                         "Shipping_Id":'-999',//所选的收货地址Id
                         "Amount":val,//充值金额*100
                         "Product_Id":'-999'//商品Id
                    }
                _this.$http.post('mall/order/Confirm',
                    JSON.stringify(oderInfor)
                    ,{
                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
                    }).then((res)=>{
                        let str = res.data.resultData;
                        window.sessionStorage.setItem('CzOrderId', str.order_id);
                        _this.getPay();
                    
                },(err)=>{
                    console.log('11' + err);
                })
			},

            getPay() {
                let _this = this;
                let orderId = window.sessionStorage.getItem('CzOrderId');
                let oderInfor = {
                         "order_id": orderId,
                         "pay_way:": 'wechat',
                    }
                _this.$http.post('mall/order/payment',
                    JSON.stringify(oderInfor)
                    ,{
                         headers: {'Content-Type': 'application/json;charset=UTF-8'}
                    }).then((res)=>{
                        window.sessionStorage.removeItem('CzOrderId')

                        window.location.href = res.data.resultData;
                },(err)=>{
                    console.log('数据' + err);
                })
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
                    document.getElementById('zf-g').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ye').style.display=''
                }

                if (event.target.id === 'ck-g') {
                    document.getElementById('ck-g').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ye').style.display=''
                }

                if (event.target.id === 'tx-g') {
                    document.getElementById('tx-g').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('ye').style.display=''
                }

                if (event.target.id === 'yc-g') {
                    document.getElementById('yc-g').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('tx').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('ye').style.display=''
                }                
                if (event.target.id === 'ye-g') {
                    document.getElementById('ye-g').style.display=''
                    document.getElementById('zf').style.display=''
                    document.getElementById('yc').style.display=''
                    document.getElementById('ck').style.display=''
                    document.getElementById('tx').style.display=''
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
                    document.getElementById('ye').style.display=''
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
</style>










