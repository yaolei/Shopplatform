import { DEAL_LIST_FILTER_DATA ,ROADMAP_HYPERLINK_TIME, DEAL_LIST_FILTER_STATUS, DEAL_LIST_BASICSEARCH_DATA} from '../actions/dealListAction';

export function getDealListFilterData(state=[], action){
    switch (action.type) {
        case DEAL_LIST_FILTER_DATA:
            return action.data;
        default:
            return state;
    }
}

export function getDealListFilterStatus(state={open:false,apply:true}, action){
    switch (action.type) {
        case DEAL_LIST_FILTER_STATUS:
            return action.data;
        default:
            return state;
    }
}

export function getBasicSearchText(state='', action){
    switch (action.type) {
        case DEAL_LIST_BASICSEARCH_DATA:
            return action.data;
        default:
            return state;
    }
}

export function getRoadMapHyperLinkTime(state=null, action){
    switch (action.type) {
        case ROADMAP_HYPERLINK_TIME:
            return action.data;
        default:
            return state;
    }
}