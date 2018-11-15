import Home from './components/Home.vue'
import UserInforSet from './components/UserInforSet.vue'
import AddressList from './components/AddressList.vue'
import CreateAddress from './components/CreateAddress.vue'
import MyOrders from './components/MyOrders.vue'
import OrdersGoods from './components/OrdersGoods.vue'
import OrdersCompleted from './components/OrdersCompleted.vue'
import shopManager from './components/shopManager.vue'
import OrdersCanle from './components/OrdersCanle.vue'
import Orders from './components/Orders.vue'
import Xstj from './components/Xstj.vue'
import XstjList from './components/XstjList.vue'
import AllOrders from './components/AllOrders.vue'
import UserInforModif from './components/UserInforModif.vue'
import RecommendGoods from './components/RecommendGoods.vue'
import RecommendTecGoods from './components/RecommendTecGoods.vue'
import CreateRecGoods from './components/CreateRecGoods.vue'
import Category from './components/Category.vue'
import HadBuy from './components/HadBuy.vue'
import NoBuy from './components/NoBuy.vue'
import Cart from './components/Cart.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import SearchPage from './components/SearchPage.vue'
import Mine from './components/Mine.vue'
import CreatOrder from './components/CreatOrder.vue'
import TuiJianGoods from './components/TuiJianGoods.vue'
import PayStyle from './components/PayStyle.vue'
import Login from './components/Login.vue'
import Reg from './components/Reg.vue'
import UserPayMoney from './components/UserPayMoney.vue'
import ChongValue from './components/ChongValue.vue'
import LiuS from './components/LiuS.vue'
import TxValue from './components/TxValue.vue'
import SuccessPay from './components/SuccessPay.vue'
import CreateFeedBack from './components/CreateFeedBack.vue'
import AddNewBlank from './components/AddNewBlank.vue'
import AddCardNum from './components/AddCardNum.vue'
import AddCardPhone from './components/AddCardPhone.vue'
import AddCardComplete from './components/AddCardComplete.vue'
import PayInforlist from './components/PayInforlist.vue'
import CreatePalyNum from './components/CreatePalyNum.vue'
import SetPayPassWord from './components/SetPayPassWord.vue'
import ConfPassWord from './components/ConfPassWord.vue'
import ModifPassWord from './components/ModifPassWord.vue'
import completeTx from './components/completeTx.vue'
export default [{
    path: '/home',
    component: Home
}, {
    path: '/catgory',
    component: Category
}, {
    path: '/cart',
    component: Cart
}, {
    path: '/search',
    component: SearchPage
}, {
    path: '/mine',
    component: Mine
}, {
    path: '/login',
    component: Login
}, {
    path: '/register',
    component: Reg
},{
    path: '/AddNewBlank',
    component: AddNewBlank
},{
    path: '/AddCardNum',
    component: AddCardNum
},{
    path: '/AddCardComplete',
    component: AddCardComplete
},{
    path: '/AddCardPhone',
    component: AddCardPhone
}, {
    path: '/userInforSet/:id',
    component: UserInforSet
}, {
    path: '/AddressList/:id',
    component: AddressList
}, {
    path: '/CreateAddress/:id/:obj/:prname/:cityname/:disname',
    component: CreateAddress
}, {
    path: '/RecommendGoods',
    component: RecommendGoods
}, {
    path: '/RecommendTecGoods',
    component: RecommendTecGoods
},{
    path: '/Xstj',
    component: Xstj
},{
    path: '/HadBuy/:sid/:gid/:cid/:pid/:status',
    component: HadBuy
},{
    path: '/NoBuy/:sid/:gid/:cid/:pid/:status',
    component: NoBuy
},{
    path: '/XstjList/:sid/:gid/:cid/:pid',
    component: XstjList
}, {
    path: '/CreateRecGoods/:id/',
    name:'CreateRecGoods',
    component: CreateRecGoods
}, {
    path: '/MyOrders/:id/:obj',
    component: MyOrders
},{
    path: '/PayInforlist/',
    component: PayInforlist
}, {
    path: '/Orders/:id/:state',
    component: Orders
}, {
    path: '/AllOrders/:id/:state',
    component: AllOrders
}, {
    path: '/OrdersGoods/:id/:state',
    component: OrdersGoods
},  {
    path: '/OrdersCompleted/:id/:state',
    component: OrdersCompleted
},  {
    path: '/OrdersCanle/:id/:state',
    component: OrdersCanle
}, {
    path: '/catgory/:id',
    component: Category
},{
    path: '/detail/:id',
    component: GoodsDetail
},{
    path: '/shopManager/:id',
    component: shopManager
},{
    path: '/TuiJianGoods/:id',
    component: TuiJianGoods
},{
    path: '/PayStyle/:id/:num/:name/:gid/:gradeid/:classid',
    component: PayStyle
},{
    path: '/CreatOrder/:id/:num',
    component: CreatOrder
}, {
    path: '/UserInforModif/',
    component: UserInforModif
}, {
    path: '/UserPayMoney',
    component: UserPayMoney
},{
    path: '/ConfPassWord',
    component: ConfPassWord
},{
    path: '/ChongValue',
    component: ChongValue
},{
    path: '/CreatePalyNum',
    component: CreatePalyNum
},{
    path: '/SetPayPassWord',
    component: SetPayPassWord
},{
    path: '/completeTx',
    component: completeTx
},{
    path: '/TxValue',
    component: TxValue
},{
    path: '/CreateFeedBack',
    component: CreateFeedBack
},{
    path: '/ModifPassWord',
    component: ModifPassWord
},{
    path: '/LiuS',
    component: LiuS
},{
    path: '/SuccessPay',
    component: SuccessPay
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '*',
    redirect: '/home'
}]
