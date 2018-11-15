export const LOGIN_TOKEN = "LOGIN_TOKEN";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_STATUS = "LOGIN_STATUS";
export const LOGIN_ACCESS = "LOGIN_ACCESS";
export const USER_CONFIG = "USER_CONFIG";

export function setLoginToken(token) {
    return {
        type: LOGIN_TOKEN,
        data: token
    };
}
export function setLoginUser(user) {
    return {
        type: LOGIN_USER,
        data: user
    };
}
export function setLoginStatus(status) {
    return {
        type: LOGIN_STATUS,
        data: status
    };
}
export function setLoginAccess(accessData) {
    return {
        type: LOGIN_ACCESS,
        data: accessData
    };
}
export function setuserConfig(userConfig) {
    return {
        type: USER_CONFIG,
        data: userConfig
    };
}