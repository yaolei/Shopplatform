import Axios from 'axios';
import BaseErrorHandler from './BaseErrorHandler';
import Cookies from 'js-cookie';

export default class BaseNetwork {

    /**
     * Axios instance
     * @type {AxiosInstance}
     * @private
     */
    _axios = null;

    /**
     * api version
     * @type {string}
     * @private
     */
    _APIVersion = 'v1';
    constructor(props) {
        let baseURL = document.location.origin;
        if (document.location.origin.indexOf('localhost') >= 0 ||
            document.location.origin.indexOf('127.0.0.1') >= 0 ||
            document.location.origin.indexOf('galaxykubernetes01') >= 0 ||
            document.location.origin.indexOf('0.0.0.0') >= 0) {
            // local environment
            baseURL = 'https://dpydalapp02.sl.bluecloud.ibm.com';
            // baseURL = 'https://tpydalapp01.sl.bluecloud.ibm.com';
        }
        let patchPar = '/';
        let serverURL = baseURL + patchPar +this._APIVersion;
        this._axios = Axios.create({
            baseURL: serverURL,
            timeout: 60000,
            headers: {'Csrf-Token':'nocheck'}
        });
        this._errorHandler = BaseErrorHandler.getErrorHandler();
        this.requestToken={};
    }

    /**
     * set an OAuth-Token to the http header
     * @param token
     */
    setOAuthToken(token) {
        this._axios.defaults.headers.common['OAuth-Token'] = token;
    }

    /**
     * Send a GET request
     * @param url
     * @param parameter
     * @param success
     * @param failed
     * @return {CancelTokenSource}
     */
    getDataRequest(url, parameter, success, failed) {
        if(this.requestToken[url]){
            this.requestToken[url].cancel('cancel for repeat request');
            this.requestToken[url] = 0;
        }
        let CancelToken = Axios.CancelToken;
        let source = CancelToken.source();
        let self = this;
        this._axios.get(
            url,
            {
                cancelToken: source.token,
                params: parameter,
            }
        )
            .then(function (response) {
                if (success) {
                    success(response);
                }
            })
            .catch(function (error) {
                if(error && error.response && error.response.status && error.response.status === 602 || error.response.status === '602'){
                    Cookies.set('at','')
                    self.setOAuthToken('');
                    self.getEvnParameter();
                }else{
                    if (failed) {
                        failed(error);
                    }
                }
            });
        this.requestToken[url] = source;
        return source;
    }

    /**
     * @desc send network request
     * @param url suffix is enough
     * @param parameter format is {ID:123, Name:'abc'}
     * @param success call back function for success
     * @param failed call back function for failed
     * @returns {{token, cancel}} cancel function for cancel request
     */
    postDataRequest(url, parameter, success, failed) {
        if(this.requestToken[url]){
            this.requestToken[url].cancel('cancel for repeat request');
            this.requestToken[url] = 0;
        }
        this._reqCounter = this._reqCounter++ % 20000;
        let CancelToken = Axios.CancelToken;
        let source = CancelToken.source();
        let self = this;
        this._axios.post(
            url,
            parameter,
            {cancelToken: source.token}
            // {
            //     cancelToken: source.token, // TODO: need another way to set cancel token hear
            //     params: parameter,
            // }
        )
            .then(function (response) {
                if (success) {
                    success(response);
                }
            })
            .catch(function (error) {
                if(error && error.response && error.response.status && error.response.status == 602){
                    Cookies.set('at','')
                    self.setOAuthToken('');
                    self.getEvnParameter();
                }else{
                    if (failed) {
                        failed(error);
                    }
                }
            });
        this.requestToken[url] = source;
        return source;
    }

    getEvnParameter() {
        let url = '/forecast-login/runningEnv';
        let targetEnv = '';
        let self = this;
        this.getDataRequest(url,{},
            (response)=>{
                targetEnv = response.data;
                self.fetchSelData(targetEnv);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    fetchSelData = (env) => {
        let _this = this;
        let url = "/ssoConfig/"+env.toLowerCase()+'/ssoConfig.json';
        if (window.location.pathname != '') {
            url = window.location.pathname + "ssoConfig/"+env.toLowerCase()+'/ssoConfig.json';
        }

        fetch(url, {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }).then((res) => {
            return res.json();
        })
        .then((data) => {
            this._ssoJsonDatas = data;
            this.redirectUrl();
        })
        .catch((e) => {
            this._ssoJsonDatas = false
        });
    } 
            

    redirectUrl () {
        if (JSON.stringify(this._ssoJsonDatas) !== '{}' && this._ssoJsonDatas.client_id) {
            let baseURL = this._ssoJsonDatas.Authorization_Endpoint;
            let clientID = this._ssoJsonDatas.client_id;
            let redirectURL = document.location.origin;
            document.location.href = baseURL + '?response_type=token&scope=openid&client_id='+clientID+'&redirect_uri='+redirectURL;
        }
    }
}

let _sharedNetworkInstance = null;
BaseNetwork.getNetWorkInstance = () => {
    if (!_sharedNetworkInstance) {
        _sharedNetworkInstance = new BaseNetwork();
    }
    return _sharedNetworkInstance;
};
