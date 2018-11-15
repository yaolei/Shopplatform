<!--底部显示-->
<template>
  <div class="footer">
  	<footer class="fixBottomBox">
        <ul>
           
            <router-link tag="li" to="/home" class="tabItem">
            	<a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/a-home.png"  id='index' index='0' class="tab-item-icon" @click="checkClickEvent($event)">
                   <img src="../assets/images/index1.png" style='display:none' id='index1' index='0' class="tab-item-icon" @click="checkClickEvent($event)">
                </a>
            </router-link>
            <router-link tag="li" to="/catgory" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/n-catergry.png" id ='catergry' alt="" index='1' class="tab-item-icon" @click="checkClickEvent($event)">                    
                    <img src="../assets/images/catge1.png" id ='catergry1' style='display:none' alt="" index='1' class="tab-item-icon" @click="checkClickEvent($event)">
                </a>
            </router-link>
            <router-link tag="li" to="/home" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/n-cart.png" id='cart' alt="" index='2' class="tab-item-icon">
                    <img src="../assets/images/car1.png" id='cart1' alt="" style='display:none' index='2' class="tab-item-icon">
                </a>
            </router-link>
            <router-link tag="li" to="/mine" class="tabItem">
                <a href="javascript:;" class="tab-item-link">
                    <img src="../assets/images/n-me.png" id='userInfor' alt="" index='3' class="tab-item-icon"  @click="checkClickEvent($event)">      
                    <img src="../assets/images/person1.png" id='userInfor1' style='display:none' alt="" index='3' class="tab-item-icon"  @click="checkClickEvent($event)">
                </a>
            </router-link>
        </ul>
    </footer>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                goodsData: [],
                noChangeImgArr:[],
            }
        },
        created () {
            this.init()
        },

        methods:{
            init() {
             let _this = this;
                _this.changeImgsArr = [
                        'index1.png',
                        'car1.png',
                        'person1.png',
                        'catge1.png'
                    ];
                 _this.noChangeImgArr = [
                    'a-home.png',
                    'n-catergry.png',
                    'n-cart.png',
                    'n-me.png'
                ]
            },
            checkClickEvent(event){

                document.getElementById('index').style.display='none'
                document.getElementById('catergry').style.display='none'
                document.getElementById('cart').style.display='none'
                document.getElementById('userInfor').style.display='none'

                document.getElementById('index1').style.display='none'
                document.getElementById('catergry1').style.display='none'
                document.getElementById('cart1').style.display='none'
                document.getElementById('userInfor1').style.display='none'

                if (event.target.id === 'index') {
                    document.getElementById('index').style.display=''
                    document.getElementById('cart').style.display=''
                    document.getElementById('catergry').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'catergry') {
                    document.getElementById('catergry1').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('cart').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'cart') {
                    document.getElementById('cart1').style.display=''
                    document.getElementById('catergry').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'userInfor') {
                    document.getElementById('userInfor1').style.display=''
                    document.getElementById('catergry').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('cart').style.display=''
                }

                if (event.target.id === 'index1') {
                    document.getElementById('index').style.display=''
                    document.getElementById('catergry').style.display=''
                    document.getElementById('cart').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'catergry1') {
                    document.getElementById('catergry1').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('cart').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'cart1') {
                    document.getElementById('catergry').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('cart1').style.display=''
                    document.getElementById('userInfor').style.display=''
                }

                if (event.target.id === 'userInfor1') {
                    document.getElementById('catergry').style.display=''
                    document.getElementById('index1').style.display=''
                    document.getElementById('cart').style.display=''
                    document.getElementById('userInfor1').style.display=''
                }

                event.target.getAttribute('index')

            }
        }
    }
</script>


