import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import Less from 'Less'
import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import Loading from './components/loading'
import md5 from 'js-md5'
import qs from 'qs'
import VueScroller from 'vue-scroller'
import Avatar from 'vue-avatar'
import Mint from 'mint-ui';
import { Loadmore } from 'mint-ui';
import wx from 'weixin-js-sdk';
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import { AreaCascader } from 'vue-area-linkage';

Vue.component(Loadmore.name, Loadmore);
require('./assets/css/base.css'); //全局引入
Vue.use(ElementUI);
Vue.use(wx);
Vue.use(Avatar);
Vue.use(Less);
Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(Mint);
Vue.use(qs);
Vue.use(AreaCascader);
Vue.use(VueScroller);
Vue.use(VueAreaLinkage)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/images/err.png'),
    loading: require('./assets/images/loading.gif'),
    attempt: 1,
    listenEvents: ['scroll']
});
const router = new VueRouter({
    mode: 'history',
    scorllBehavior: () => ({
        y: 0

    }),
    routes
});
Vue.prototype.$md5 = md5;
let server = 'api/'
axios.defaults.baseURL = 'http://hltc-test.shoresoft.cn/';
// axios.defaults.baseURL = 'http://hltc-test.shoresoft.cn/';
// axios.defaults.baseURL = 'http://shop.hltc.net.cn/';
axios.defaults.baseURL += server;
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function(config) { //配置发送请求的信息
    store.dispatch('showLoading');
    config.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.token
      if (config.method === 'post') {
        // if(!window.sessionStorage.token) {
        //     config.data = qs.stringify(config.data)
        // }
        // 
      }
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
    store.dispatch('hideLoading');
    return response;
}, function(error) {
    return Promise.reject(error);
});

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';// application/json
Vue.prototype.$http = axios;
/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
    // store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.userInfo.user_id) {
            next();
        } else {
            next({
                path: '/User/member/login',
                query: { redirect: to.fullPath }
            });
        }
        console.log("================");
    } else {
        console.log("nnnnnnnnnnnnnnnnnn");
        next();
    }
});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
