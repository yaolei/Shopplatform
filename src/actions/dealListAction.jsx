export const DEAL_LIST_FILTER_DATA = "DEAL_LIST_FILTER_DATA";
export const DEAL_LIST_FILTER_STATUS = "DEAL_LIST_FILTER_STATUS";
export const DEAL_LIST_BASICSEARCH_DATA = "DEAL_LIST_BASICSEARCH_DATA";
export const ROADMAP_HYPERLINK_TIME = "ROADMAP_HYPERLINK_TIME"

export function setFilterData(fiterData) {
    return {
        type: DEAL_LIST_FILTER_DATA,
        data: fiterData
    }
}

export function addFilterData(data) {
    return (dispatch, getState) => {
        const currentValue = getState();
        let newData = currentValue.getDealListFilterData.concat(data)
        dispatch(setFilterData(newData))
    }
}

export function removeFilterData(index) {
    return (dispatch, getState) => {
        const currentValue = getState();
        let newData = currentValue.getDealListFilterData.slice(0);
        newData.splice(index, 1)
        dispatch(setFilterData(newData));
    }
}

export function updateFilterData(index , data) {
    return (dispatch, getState) => {
        const currentValue = getState();
        let newData = currentValue.getDealListFilterData.slice(0);
        let originData = newData[index];
        if(originData.querNameId !== data.querNameId || originData.conditionId !== data.conditionId || originData.displayValue !== data.displayValue || originData.filedType !== data.filedType){
            newData[index] = data ;
            dispatch(setFilterData(newData))
        }
    }
}

export function setFilterStatus(fiterStatusData={
    open: false,
    apply: false
}) {
    return {
        type: DEAL_LIST_FILTER_STATUS,
        data: fiterStatusData
    }
}
export function setFilterOpenStatus(status){
    return (dispatch, getState) => {
        const currentValue = getState();
        let newData = Object.assign({},currentValue.getDealListFilterStatus,{open:status});
        dispatch(setFilterStatus(newData))
    }
}

export function setFilterApplyStatus(status){
    return (dispatch, getState) => {
        const currentValue = getState();
        let newData = Object.assign({},currentValue.getDealListFilterStatus,{apply:status});
        dispatch(setFilterStatus(newData))
    }
}
export function setInputText(textData) {
    return {
        type: DEAL_LIST_BASICSEARCH_DATA,
        data: textData
    }
}
export function updateRoadMapHyperLinkTime(time) {
    return {
        type: ROADMAP_HYPERLINK_TIME,
        data: time
    }
}
export function clearDeaListData(time) {
    return (dispatch, getState) => {
        dispatch(setInputText(''));
        dispatch(setFilterData([]));
    }
}