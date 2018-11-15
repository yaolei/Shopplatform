<template>
	<div class="home_h">
		 <header class="m_header" style='position: absolute;'>
                <div class="m_header_box" id="my_search">
                    <form action="#">
                        <!-- <span class="icon_search"></span> -->
                        <!-- <input type="search" class="search" placeholder="点击搜索" @click="goSearch($event)"> -->
                        <input type="search" class="search" placeholder="搜索">
                    </form>
<!--                     <div  v-if='this.showLogin'>
                    <div v-if='this.loginState'><router-link to="/login" class="logo_btn">登录</router-link></div>
                    <div v-else ><p @click='loginout()' class="logo_btn">登出</p></div>
                    </div> -->

                </div>
            </header>
	</div>
</template>
<script>
    export default{
         data(){
            return{
                orders:{},
                showLogin: true
            }
        },
        created () {
            this.setLoginOrOut();
        },
        mounted(){
          this.setLoginOrOut()
        },
        methods:{
            goSearch(event){
                this.$router.push('/search');
                window.event? window.event.returnValue = false : event.preventDefault();
            },
            setLoginOrOut () {
                let _this = this;
                if (location.search !== '') {
                  window.sessionStorage.clear();
                    this.loginDate = JSON.parse(unescape(decodeURI(location.search)).split('=')[1]);
                      window.sessionStorage.userInfo = this.loginDate.userInfo;
                      window.sessionStorage.token = this.loginDate.access_Token;
                      window.sessionStorage.user_Name = this.loginDate.user_Info.user_Name;
                      window.sessionStorage.user_Id = this.loginDate.user_Info.user_Id;
                      window.sessionStorage.user_Type = this.loginDate.user_Info.user_Type;
                      window.sessionStorage.face_Path = this.loginDate.user_Info.face_Path;

                      if (this.loginDate.user_School.length == 0) {
                        window.sessionStorage.user_Type = 0
                      } else {
                        window.sessionStorage.school_Name = this.loginDate.user_School[0].school_Name;
                        window.sessionStorage.school_Id = this.loginDate.user_School[0].school_Id;
                        window.sessionStorage.user_Type = this.loginDate.user_School[0].user_Type;
                      }
                      _this.showLogin = false
                }
                if (window.sessionStorage.length === 0) {
                    this.loginState = true
                } else {
                    this.loginState = false
                }
            },
            loginout() {
                let _this = this;
                let r=confirm("您确认退出登录吗？");
                if (r==true) {
                    _this.loginState = true
                    window.sessionStorage.clear();
                     for (var key in window.sessionStorage) {
                        delete window.sessionStorage[key]
                     }

                     // let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                      _this.$router.push({
                        path: '/login'
                        });
                } else {

                }
            }
        }
    }
</script>

<style type="text/css">
    .home_h {
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
  z-index: 1000;
}
</style>
