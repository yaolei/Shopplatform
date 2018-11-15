<template>
    <div class="my_l">
        <header class="top_bar">
            <router-link :to="'/UserPayMoney/'">
            <a href="#" class="icon_back"></a>
        </router-link>
        </header>
        <main class="mine_layout">
            <section class="my_order_box" style='height: auto;'>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="100"></el-table-column>
                    <el-table-column prop="name" label="消费产品" width="100"></el-table-column>
                    <el-table-column prop="address" label="消费金额"></el-table-column>
            </el-table>
        </section>

        </main>
        <div class="footer">
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
</div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                mainDatas:[],
                tableData: [{
                    date: '2016/05/02',
                    name: '大象',
                    address: '20.00'
                  }, {
                    date: '2016/05/04',
                    name: '坦克',
                    address: '10002'
                  }, {
                    date: '2016/05/01',
                    name: '航母',
                    address: '34.22'
                  }, {
                    date: '2016/05/03',
                    name: '书',
                    address: '58.00'
                  }]
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










