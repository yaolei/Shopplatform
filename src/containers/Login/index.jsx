import React from 'react';
import { connect } from 'react-redux';
import BaseNetwork from "../../util/BaseNetwork";
import Cookies from 'js-cookie';
import {setLoginAccess, setLoginToken, setLoginUser, setLoginStatus, setuserConfig} from '../../actions/loginAction'
import {Loading} from '../../vendors/reactW3DS'
import {URL} from '../../util/URL'

class Login extends React.Component {
    
    cookies = Cookies;

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.prepareData(this.props.param);
    }

    getUserConfig(loginUser) {
        this._networkInstance.postDataRequest(URL.profile.getUserSetting,
        {
            userId: loginUser
        },
        (res) => {
            let setting = {};
            if (res.data.dealListLiColumnSettings && res.data.dealListLiColumnSettings.length > 0 ) {
                setting.dealListLiColumnSettings = res.data.dealListLiColumnSettings;
            }
            if( res.data.weeklySmallChartStatus ) {
                setting.weeklySmallChartStatus = res.data.weeklySmallChartStatus
            } else {
                setting.weeklySmallChartStatus = {
                    'Budget & Delta':true,
                    'Won':true,
                    'Solid':true,
                    'At Risk':true,
                    'Key Stretch':false,
                    'Stretch':false,
                    'NIR':false
                }
            }
            if( res.data.largerChartStatus) {
                setting.largerChartStatus = res.data.largerChartStatus
            } else {
                setting.largerChartStatus = {
                    'Budget & Delta':true,
                    'Won':true,
                    'Solid':true,
                    'At Risk':true,
                    'Key Stretch':false,
                    'Stretch':false,
                    'NIR':false
                }
            }
            setting.userId = res.data.userId
            // console.log(setting)
            this.props.dispatch(setuserConfig(setting));
            this.props.dispatch(setLoginAccess(true));
        },
        (error) => {
            console.log(error)
            this.props.dispatch(setLoginAccess(true));
        });
    }

    prepareData(param){
        if (param.test) {
            let token ='fa9c15b6-6179-ed8c-6291-9320a66456f2'
            this.setData(token, true , param.test);
            this._networkInstance.setOAuthToken(token);
            this.cookies.set('at', token);
            this.requestAccessToForecast(param.test);
        }else{
            if(param.access_token){
                this.cookies.set('at', param.access_token);
                document.location.href = document.location.origin;
            }
            if(this.cookies.get('at')){
                this.props.dispatch(setLoginStatus(true));
                this._networkInstance.setOAuthToken(this.cookies.get('at'));
                this.requestAccessToForecast();
            }else{
                this._networkInstance.getEvnParameter();
            }
        }
    }

    setData(token, status, user){
        this.props.dispatch(setLoginToken(token));
        // this.props.dispatch(setLoginUser(user));
        this.props.dispatch(setLoginStatus(status));
    }

    requestAccessToForecast(username) {
        let param = {};
        if (username) {
            param.username = username;
        }
        // this._networkInstance.postDataRequest(URL.profile.accessibility, {username:'scmtest5@cn.ibm.com'}, (res) =>{
        this._networkInstance.postDataRequest(URL.profile.accessibility, param, (res) =>{
            if (res && res.data && res.data.user_id) {
                this.props.dispatch(setLoginUser(res.data.user_id));
                this.getUserConfig(res.data.user_id);
            }
        }, (err) => {
            if (err.request.status === 401 || err.request.status === 603) {
                this._networkInstance.getEvnParameter();
            } else if (err.request.status === 605) {
                this.props.dispatch(setLoginAccess(null));
            }
        });
    }


    componentDidMount() {
    }

    render() {
        return (
            <div id='login'>
            <div className={(this.props.loginStatus !== true || this.props.loginAccess !== null)?'':'hideblock'} >
                <Loading></Loading>
            </div>
            <div className={(this.props.loginStatus === true && this.props.loginAccess === null)?'':'hideblock'}>You have no access to Manager Forecast System</div>        
            </div>
        );
    }
}

function mapStateToProps(state) {return{
    loginToken: state.loginToken,
    loginStatus: state.loginStatus,
    loginAccess: state.loginAccess,
    loginUser: state.loginUser,
    userConfig: state.userConfig
}}

export default connect(mapStateToProps)(Login);