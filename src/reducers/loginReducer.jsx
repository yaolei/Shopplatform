import { LOGIN_USER, LOGIN_STATUS, LOGIN_ACCESS, LOGIN_TOKEN, USER_CONFIG } from '../actions/loginAction';

export function loginToken(state = '', action) {
    switch (action.type) {
        case LOGIN_TOKEN:
            return action.data;
        default:
            return state;
    }
}
export function loginAccess(state = false, action) {
    switch (action.type) {
        case LOGIN_ACCESS:
            return action.data;
        default:
            return state;
    }
}
export function loginStatus(state = false, action) {
    switch (action.type) {
        case LOGIN_STATUS:
            return action.data;
        default:
            return state;
    }
}

export function loginUser(state = null, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.data;
        default:
            return state;
    }
}

export function userConfig(state = null, action) {
    switch (action.type) {
        case USER_CONFIG:
            return action.data;
        default:
            return state;
    }
}
