import { combineReducers } from 'redux';

import {loginToken, loginAccess, loginUser, loginStatus, userConfig} from './loginReducer';
import {brifInfo} from './briefReducer';
import {getDealListFilterData, getDealListFilterStatus, getBasicSearchText, getRoadMapHyperLinkTime} from './dealListReducer';

const rootReducer = combineReducers({
    loginToken,
    loginAccess,
    loginUser,
    loginStatus,
    brifInfo,
    getDealListFilterData,
    getDealListFilterStatus,
    getBasicSearchText,
    getRoadMapHyperLinkTime,
    userConfig
});

export default rootReducer;