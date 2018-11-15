<template>
	<div class="goods_detail" style='    overflow-y: auto;
    height: 100%;
    padding-bottom: 20%;'>
		<header class="top_bar">
            <a onclick="window.history.go(-1)" class="icon_back"></a>
            <h3 class="cartname" style="float:right; padding-right:5%">商品详情</h3>
            <a href="#"></a>
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <div class="block">
                    <el-carousel trigger="click" height="200px" :interval='5000' @change='setActiveItem($event)'>
                        <el-carousel-item v-for="(item, index) in goodsImages" :key="index" >
                            <img v-lazy="item.pic" alt='' class="banner_pic" style='width:100%;height: 100%;'>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="banner_count">
                    <em id="slide-nub" class="fz18">2</em>
                    <em class="nub-bg">/</em>
                    <em id="slide-sum" class="fz12">{{this.SumGoodImgs}}</em>
                </div>
            </section>
            <section class=" clearfix">
                <section class='sectionBc'>
                <el-row >
                    <el-col :span="2"><div class="grid-content bg-purple-left"></div></el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple titleName topPdding">{{goodsData.product_Name}}</div>
                    </el-col>
   <!--                  <el-col :span="14">
                        <div class="grid-content bg-purple topPdding titleName">({{goodsData.product_Summary}})</div>
                    </el-col> -->
                </el-row>
                <el-row >
                    <el-col :span="2"><div class="grid-content bg-purple-left"></div></el-col>
                    <el-col :xs="6" :sm="4" :md="4" :lg="4" :xl="4" :span="4">
                        <div class="grid-content bg-purple titleName" style='color:#c3c3c3'>销量: {{goodsData.sale_Count}}</div>
                    </el-col>
                    <el-col :xs="9" :sm="15" :md="15" :lg="15" :xl="4" :span="1">
                        <div class="grid-content bg-purple titleName"></div>
                    </el-col>                    
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :span="4" style="float: right;">
                        <img src="../assets/images/scicon.png" alt='' class="tab-item-icon"  >
                    </el-col>
                </el-row>
            </section>
            <div class="placeStyle"></div>
            <section class='sectionBc'>
                <el-row >
                    <el-col :span="2"><div class="grid-content bg-purple-left"></div></el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple topPdding" style='color:#c3c3c3'>规格: 中班课程</div>
                    </el-col>
                </el-row>
                <el-row v-if='role === 3 && this.isBest == true'>
                <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 3'></div></el-col>  
                  <el-col :span="4" v-if='role === 3'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>原价:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 3'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric"  v-if='role === 3'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>

                <el-row v-if='role === 0'>
                <el-col :span="2" style="height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 0'></div></el-col>  
                  <el-col :span="4" v-if='role === 0'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>价格:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 0'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric"  v-if='role === 0'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>

                <el-row v-if='role === 3 && this.isBest == false'>
                <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 3'></div></el-col>  
                  <el-col :span="4" v-if='role === 3'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>零售价:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 3'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric"  v-if='role === 3'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>                
                <el-row v-if='role === 2 && this.isBest == true'>
                <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 2'></div></el-col>  
                  <el-col :span="3" v-if='role === 2'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>原价:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 2'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric" v-if='role === 2'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>                 
                <el-row v-if='role === 1 && this.isBest == true'>
                <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 1'></div></el-col>  
                  <el-col :span="3" v-if='role === 1'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>原价:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 1'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric" v-if='role === 1'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>              

                <el-row v-if='role === 2 && this.isBest == false'>
                <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;" v-if='role === 2'></div></el-col>  
                  <el-col :span="3" v-if='role === 2'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>零售价:</div></el-col>
                    <el-col :span="4" style='height: 25px;' v-if='role === 2'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric" v-if='role === 2'>
                                {{goodsData.product_Price0}} 元
                            </div>
                        </div>
                    </el-col> 
                </el-row>

                <el-row v-if='this.isBest == true'>
                    <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;"></div></el-col>                 
                    <el-col :span="4" v-if='role === 3'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>会员价:</div></el-col>                    
                    <el-col :span="3" v-else><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'>价格 :</div></el-col>

                    <el-col :span="4" style='height: 25px;'>
                        <div class="grid-content bg-purple" style="color:red">
                            <div class="product_pric" v-if='role === 0'>
                                {{goodsData.product_Price0}} 元
                            </div>
                            <div class="product_pric" v-if='role === 1'>
                                <div v-if='isBest && role == 1'>
                                    {{goodsData.product_Price1}} 元
                                </div>
                                <div v-else-if='role == 1'>
                                    {{goodsData.product_Price0}} 元
                                </div>
                            </div>
                            <div class="product_pric" v-if='role === 2'>
                                <div v-if='isBest && role == 2'>
                                    {{goodsData.product_Price1}}元
                                </div>
                                <div v-else-if='role == 2'>
                                    {{goodsData.product_Price0}}元
                                </div>
                            </div>
                            <div class="product_pric" v-if='role === 3'>
                                <div v-if='isBest && role == 3'>
                                    {{goodsData.product_Price3}} 元
                                </div>
                                 <div v-else-if='role == 3'>
                                    {{goodsData.product_Price0}} 元
                                </div>
                                
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row v-if='role == 3 && this.isBest == false'>
                    <el-col :span="2" style="    height: 25px;"><div class="grid-content bg-purple-left topPdding" style="    height: 25px;"></div></el-col>                 
                    <el-col :span="4" v-if='role === 3'><div class="grid-content bg-purple-light" style='color:#c3c3c3;    height: 25px;'></div></el-col>                    
                    <el-col :span="3" v-else>
                        <div class="grid-content bg-purple-light" style='color:#c3c3c3;height: 25px;'></div>
                    </el-col>

                    <el-col :span="4" style='height: 25px;'>

                    </el-col>
                    <el-col :span="5" style='height: 25px;' v-if='role === 3'>
                    </el-col>
                     <el-col :span="4" style='height: 25px;margin-top: -20px;'>
                        <div class="grid-content bg-purple-light" v-if='role === 3' @click='addToRecList()'>
                            <el-button type="primary">推荐商品</el-button>
                        </div>
                    </el-col>
                </el-row>



                <el-row v-if='role === 3 && this.isBest == true'>
                    <el-col :span="2"><div class="grid-content bg-purple-left topPdding"></div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light" style='color:#c3c3c3'>
                        由于您是 {{School_name}} 幼儿园的园长 可享受会员价
                    </div></el-col>
                </el-row>                
                <el-row v-if='role === 2 && this.isBest == true' >
                    <el-col :span="2"><div class="grid-content bg-purple-left topPdding"></div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light" style='color:#c3c3c3'>
                        由于您是 {{School_name}} 幼儿园的老师 可享受会员价
                    </div></el-col>
                </el-row>                 
                <el-row v-if='role === 1 && this.isBest == true' >
                    <el-col :span="2"><div class="grid-content bg-purple-left topPdding"></div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light" style='color:#c3c3c3'>
                        由于您是 {{School_name}} 幼儿园的家长 可享受会员价
                    </div></el-col>
                </el-row>                 
                <el-row>
                    <el-col :span="2"><div class="grid-content bg-purple-left topPdding"></div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple-light" style='color:#c3c3c3'>数量 :</div></el-col>
                </el-row>                
                <el-row>
                    <el-col :span="2"><div class="grid-content bg-purple-left topPdding"></div></el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple" style='margin-top: -10px;'>
                             <el-input-number v-model="num1" size="small" @change="handleChange" :min="1" :max="999" label="" >
                             </el-input-number>
                        </div>
                    </el-col>
                </el-row>
            </section>
            <div class="placeStyle"></div>

            </section>
<!-- <section class="product_info" style='padding-top: 15%'>
<div class="banner_item" style='float: left;padding-left: 5px;width: 100%;' v-if='showSchoolAddress === true'>
    送至: <p style='float: right;width: 90%;font-size: 14px;' v-for="(item, index) in addressDatas" @click='popUp(index)'>
        <el-radio v-model="radio" :label=index >
            {{item.school_Name}}
            {{item.grade_Name}}
            {{item.class_Name}}
        </el-radio>
    </p>
</div>
<div class="banner_item" style='float: left;padding-left: 5px;width: 100%;' v-if='showSchoolAddress === false'>
    送至: <p style='float: right;width: 90%;font-size: 14px;'>
            {{addressDatas.country}}
            {{addressDatas.province}}
            {{addressDatas.city}}
            {{addressDatas.address}}
    </p>
</div>
</section> -->
            <section class="product_intro" style='width: 100%'>
                <el-tabs type="border-card">
                  <el-tab-pane>
                    <span slot="label" style='color:#c3c3c3'>商品详情</span>
                        <p class="pro_det" v-html="goodsData.product_Detail" style='overflow-y: auto; height: 100%; padding-bottom: 20%;'>
                        </p>
                  </el-tab-pane>
                </el-tabs>

           </section>
          
        </main>
        <footer class="cart_d_footer" style='z-index:16 !important'>
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a class="m_item_link" style='width: 100%;' :href="'hltc://service.in/?user_Id='+ goodsData.user_Id">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name" style='color:#c3c3c3;'>联系商家</span>
                        </a>
                 
                        <a href="#" class="m_item_link">
                             <router-link :to="'/shopManager/' + this.$route.params.id">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name" style='color:#c3c3c3;'>进店</span>
                            </router-link>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >

                    <a href="#" class="buy_now">加入购物车</a>
                    <!-- <a href="#" class="buy_now" v-if='role === 3' @click='addToRecList()'>加入推荐商品</a> -->
                    <a href="#" class="buybuy">
                        <router-link :to="'/CreatOrder/' +  this.goodsData.id +'/' + this.num1 "  style='width: 65%;'>立即购买</router-link>
                        </a>
                </div>
            </div>
        </footer>
	</div>
</template>
<script>
   export default{
        mounted(){
            // this.fetchData(this.$route.params.id);
            this.fetchData(this.$route.params.id);
            this.hiddenFooter();
        },
        created() {
            setTop();
        },
        data(){
            return {
                role:parseInt(window.sessionStorage.user_Type),
                goodsImages:[],
                goodsData:[],
                addressDatas:[],
                SumGoodImgs:0,
                count: undefined,
                num1: 1,
                radio: 0,
                School_name: window.sessionStorage.School_Name,
                showSchoolAddress: true,
                isBest: false
            }
        },
        watch:{
            $route(to){
                //console.log(to);
                var reg=/detail\/\d+/;
                if(reg.test(to.path)){
                    var categotyId=this.$route.params.id || 0;
                    this.fetchData(categotyId);
                }
            }
        },
        methods:{
            popUp(e) {
                let _this = this
                for (let i = 0; i < _this.addressDatas.length; i++) {
                    if (i == e && _this.showSchoolAddress) {
                        window.sessionStorage.School_Id = _this.addressDatas[i].school_Id;
                        window.sessionStorage.Grade_Id = _this.addressDatas[i].grade_Id;
                        window.sessionStorage.Class_Id = _this.addressDatas[i].class_Id;
                        window.sessionStorage.Grade_Name = _this.addressDatas[i].grade_Name;
                        window.sessionStorage.Class_Name = _this.addressDatas[i].class_Name;
                        window.sessionStorage.True_Name = _this.addressDatas[i].true_Name;
                        window.sessionStorage.School_Name = _this.addressDatas[i].school_Name;
                    }
                }
            },
            setActiveItem(index) {
                let carIndex = document.getElementById('slide-nub');
                carIndex.innerText = parseInt(index) + 1;
            },
            addToRecList () {
                let _this = this;
                // // if (!_this.goodsData.isBest) {
                //    let recGoodsData = {
                //     Product_Id:_this.$route.params.id,
                //     Product_Price2:_this.goodsData.product_Price2
                // }
                // _this.$http.post('Mall/Product/ChooseProduct',
                //     JSON.stringify(recGoodsData)
                // , {
                //          headers: {
                //             'Content-Type': 'application/json;charset=UTF-8'
                //     }
                // }).then((res)=>{
                let useid = _this.goodsData.id;
                // // let redirect = decodeURIComponent(_this.$route.query.redirect || '/recommendGoods/userid');
  
                // },(err)=>{
                //     console.log('左侧数据' + err);
                // })
                // }
                let redirect = decodeURIComponent(_this.$route.query.redirect || '/TuiJianGoods/' + useid);
                _this.$router.push({
                    path: redirect
                });
                // }
            },
            setTop() {
                window.scrollTo({top:0});
            },
            fetchData(id){
                var _this=this;
                _this.$http.get('/Mall/Product/Detail',{
                    params: {
                        id: this.$route.params.id
                    }
                }).then((res)=>{
                    _this.goodsImages = res.data.resultData.pic_List;
                    for (var i = 0; i < _this.goodsImages.length; i++) {
                        // _this.goodsImages[i].pic = 'http://hltc-test.shoresoft.cn' + _this.goodsImages[i].pic ;  
                        _this.goodsImages[i].pic = 'http://shop.hltc.net.cn' + _this.goodsImages[i].pic ;
                    }
                    _this.SumGoodImgs = _this.goodsImages.length;
                    _this.goodsData = res.data.resultData;
                if (_this.goodsData.best_Id == 0) {
                    _this.isBest = false;
                } else {
                  _this.isBest = true;
                }
                    },(err)=>{
                        console.log(err);
                })

                _this.$http.post('/Mall/Member/ShippingAddressList').then((res)=>{
                    if (res.data.status) {
                        if (res.data.resultData.school.length > 0) {
                        _this.showSchoolAddress = true;
                        _this.addressDatas = res.data.resultData.school;
                        if ( _this.addressDatas.length == 1) {
                            window.sessionStorage.School_Id = _this.addressDatas[0].school_Id;
                            window.sessionStorage.Grade_Id = _this.addressDatas[0].grade_Id;
                            window.sessionStorage.Class_Id = _this.addressDatas[0].class_Id;
                            window.sessionStorage.Grade_Name = _this.addressDatas[0].grade_Name;
                            window.sessionStorage.Class_Name = _this.addressDatas[0].class_Name;
                            window.sessionStorage.True_Name = _this.addressDatas[0].true_Name;
                            window.sessionStorage.School_Name = _this.addressDatas[0].school_Name;
                        } else {
                            _this.showSchoolAddress = false;
                            if (true) {}
                            for (let i = res.data.resultData.post.length - 1; i >= 0; i--) {
                                if(res.data.resultData.post[i]['isDefaultaddress']) {
                                    _this.addressDatas = res.data.resultData.post[i];
                                }
                            }
                        } 
                    }
                } else {

                }

                },(err)=>{
                    console.log('地址数据' + err);
                })
            },

            hiddenFooter() {
                this.$store.dispatch('hideNav');
            },
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>
<style>
@import '../assets/css/detail.css';

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .titleName {
    font-size: 16px;
  }
  .placeStyle {
    height: 10px;
  }
  .descriptStyle {
    margin-left: -10px;
  }
  .el-col {
    border-radius: 4px;
  }
  .sectionBc {
    background-color: #fff;
  }
/*  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }*/
  .bg-purple-light {
    min-height: 20px !important;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    
  }
  .topPdding {
    padding-top: 10px;
  }
  .el-input-number {
    line-height: 28px !important;
  }
  .el-input__inner {
    color:#c3c3c3 !important;
  }
  .product_intro {
    padding: 10px 6px 10px 6px !important;
  }
    .pro_det img{
        width:100%;
        height:100%;
    }
</style>