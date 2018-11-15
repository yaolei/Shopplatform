<template>
  <div  class="page-loadmore">
    <!-- <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> -->
    <div class="page-loadmore-wrapper">
      <!-- <mt-spinner v-show="list<1 && InitialLoading" color="#26a2ff"></mt-spinner> -->
 <!--      <mt-loadmore  @translate-change="translateChange"       
        :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" 
        :auto-fill="false" ref="loadmore">   -->    
        <!-- <mt-loadmore> -->
        <HomeBannerView></HomeBannerView>
        <ul  class=" share_quality_left not_eng_box" >
          <li v-for="(items,index) in commentGoodsList" :key="index" class="not_eng_item">
              <router-link  class="not_eng_link" :to="'/detail/'+items.id">
                  <img v-lazy="items.default_Pic" alt="" class="not_eng_pic lazy-img-fadein">
              </router-link>
              <div class="not_eng_info" style='height: 70px;'>
                  <p class="not_eng_title">{{items.product_Name}}</p>
                  <p class="not_eng_title" >{{items.product_Summary}}</p>
                  <p class="not_eng_text" v-if='role == 0' style='width: 100%;'>
                      零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                      <span class="more_info_price_txt">{{items.product_Price0}}</span>
                  </p>                                            
                  <p class="not_eng_text" v-if='role == 1' style='width: 100%;'>
                    <div v-if='items.best_Id !=0 && role == 1'>
                      零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                      <span class="more_info_price_txt line-through">{{items.product_Price0}}</span>
                      会员价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                      <span class="more_info_price_txt">{{items.product_Price1}}</span><br>
                    </div>
                     <div v-else-if='role == 1'>
                          零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                          <span class="more_info_price_txt">{{items.product_Price0}}</span>
                      </div>

                  </p>                                            
                  <p class="not_eng_text" v-if='role == 2' style='width: 100%;'>
                      <div v-if='items.best_Id !=0 && role == 2'>
                          零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                        <span class="more_info_price_txt line-through">{{items.product_Price0}}</span>
                          会员价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                        <span class="more_info_price_txt">{{items.product_Price1}}</span><br>
                      </div>
                      <div v-else-if='role == 2'>
                          零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                          <span class="more_info_price_txt">{{items.product_Price0}}</span>
                      </div>

                    </p>                                            
                    <p class="not_eng_text" v-if='role == 3' style='width: 100%;'>
                      <div v-if='items.best_Id !=0 && role == 3'>
                        零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                      <span class="more_info_price_txt line-through">{{items.product_Price0}}</span>
                        会员价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                        <span class="more_info_price_txt">{{items.product_Price1}}</span><br/>
                        批发价 <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                        <span class="more_info_price_txt">{{items.product_Price3}}</span>
                      </div>
                      <div v-else-if='role == 3'>
                          零售价<i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                          <span class="more_info_price_txt">{{items.product_Price0}}</span>
                      </div>
                    </p>
                </div>
          </li>

        </ul>
        
<!--         
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
          </span>
        </div> -->
      <!-- </mt-loadmore> -->

    </div>
<div style="text-align:center; height:100px"></div>
  </div>


</template>
<script>
import HomeBannerView from './HomeBanner.vue';
import {bindEvent,scrollPic} from '../assets/js/index.js'
  export default {
    data(){
      return {
        pageNum: 1,//页码
        InitialLoading: true,//初始加载
        list: 0,//数据
        allLoaded: false,//数据是否加载完毕
        bottomStatus: '',//底部上拉加载状态
        wrapperHeight: 0,//容器高度
        topStatus: '',//顶部下拉加载状态
        translate: 0,//
        moveTranslate: 0,
        pagesize:1000,
        role:parseInt(window.sessionStorage.user_Type),
        isBest:false,
        commentGoodsList:[], 
      }
    },
    components:{
        HomeBannerView
       },
    mounted(){
       bindEvent();
       scrollPic();
      let windowWidth = document.documentElement.clientWidth;//获取屏幕高度

      if(windowWidth>968){//这里根据自己的实际情况设置容器的高度
        this.wrapperHeight = windowWidth;
      }else{
        this.wrapperHeight = 1200;
      }
      this.comInitData();
    },
    methods:{
         comInitData() {     
            let _this = this;
              _this.textV = decodeURI(location.search)
            _this.$http.get('/Mall/Product/ProductList',{
                params: {
                      page: 1,
                      pagesize:this.pagesize,
                }
            }).then((res)=>{
            if (res.data.resultData.dataList.length <= 0) {
                this.getData();
            } 

            _this.commentGoodsList = res.data.resultData.dataList;

            if (_this.commentGoodsList[0].best_Id == 0) {
                _this.isBest = false;
            } else {
              _this.isBest = true;
            }
            
            this.pagesize = parseInt(this.pagesize) + 10
            },(err)=>{
                _this.commentGoodsList = 0;
                    console.log(err);
            })
          }, 
      handleBottomChange(status) {
        this.moveTranslate = 1;
        this.bottomStatus = status;
      },
      loadBottom() {
        this.handleBottomChange("loading");//上拉时 改变状态码
        this.pageNum += 1;
        setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
          if(this.pageNum <= 6){//最多下拉三次
            this.comInitData();
          }else{
            this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
          }
          this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
        this.handleTopChange("loading");//下拉时 改变状态码
        this.pageNum = 1;
        this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
        setTimeout(() => {
          this.list = 12;//下拉刷新 数据初始化
          this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
    }  
  }
</script>
<style scoped>
@import '../assets/css/index.css';
  .page-title,
.page-footer {
  text-align: center;
  position: absolute;
}
.page-title {
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.page-footer {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.page-title+* {
  /*margin-top: 50px;*/
}
@media (min-width: 768px){
  .page-title {
    height: 90px;
    line-height: 90px;
  }
  .page-title+* {
    margin-top: 90px;
  }
}
.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
}

.page-loadmore-listitem {
    border-top: 1px solid #eee
}

.page-loadmore-wrapper {
    overflow: scroll
}
.page-loadmore-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;

}
.not_eng_title {
  height: auto;
  margin-bottom:0px;
}
.not_eng_pic {
  border: solid 1px #b5b7b7;
  width: 94%;
  height: 130px;
}
.not_eng_item {
  border: 1px solid #b5b7b7;
  padding-bottom: 10px;
}
.line-through {
  text-decoration:line-through;
}
</style>