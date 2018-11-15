import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import DLByOpportunity from './DLByOpportunity';
import DLByLineItem from './DLByLineItem';
import FilterPopUpList from './FilterPopUpList';
import BaseNetwork from "../../util/BaseNetwork";
import { getTranslateLanguage } from "../../util/BaseLanguage";
import NarrowRow from './NarrowRow';
import { Row, Col, Icon, Card, Dropdown } from '../../vendors/reactW3DS'
import './index.less';
import { setFilterData, setInputText } from '../../actions/dealListAction'
import TotalAmount from './TotalAmount';
import {URL} from '../../util/URL'

class DealList extends React.Component {
    _storageKeyIsSelectedOpportunity = 'deallist_selected_opportunity_tab';
    _storageKeyCellWidth = 'deallist_cell_width_info';
    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        const isOppty = !!this.getSelectedTabFromLocalStorage();
        // this.DLByLineItemReqSource = 0;
        // this.totalAmountReqSource = 0;
        this.typeAheadReqSource = 0;
        this.status = {
            opportunity: 0,
            lineItem: 0
        };
        this.state = {
            _expand: true,
            _isOpportunity: isOppty,
            width: 0,
            renderCounter: 0,
            pageCount: 30,
            filterListData: [],
            OpptyListData: {
                header: [],
                body: [],
            },
            DLByLineItemData: {
                header: [],
                body: []
            },
            OpptyFilters: {
                nodeId: '',
                quarter: '',
                revenue: '',
            },
            LineFilters: {
                nodeId: '',
                quarter: '',
                revenue: '',
            },
            DLByOpportunityLoading: false,
            DLByLineitemLoading: false,
            DLBLIQueryDataLoading: false,
            queryMultiDatas: [],
            totalAmount: ''
        };
        this.lineHeader = [
            {
                key: 'lineItemOwnerName', title: getTranslateLanguage('lineItemOwnerName', 'deal-list'),
                fixed: true, kind: 1, cell_align: 'left', width: 100, title_tip: true, cell_tip: true
            },
            {
                key: 'opportunityId', title: getTranslateLanguage('opportunityId', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 110, title_tip: true, cell_tip: true
            },
            {
                key: 'opportunityName', title: getTranslateLanguage('opportunityName', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 150, title_tip: true, cell_tip: true
            },
            {
                key: 'accountName', title: getTranslateLanguage('accountName', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 150, title_tip: true, cell_tip: true
            },
            {
                key: 'level15Name', title: getTranslateLanguage('level15Name', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 150, title_tip: true, cell_tip: true
            },
            {
                key: 'level30Name', title: getTranslateLanguage('level30Name', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 150, title_tip: true, cell_tip: true
            },
            {
                key: 'opportunitySalesStage', title: getTranslateLanguage('opportunitySalesStage', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 90, title_tip: true, cell_tip: true
            },
            {
                key: 'p2c', title: getTranslateLanguage('p2c', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'center', width: 45, title_tip: false, cell_tip: false
            },
            {
                key: 'rliBillDate', title: getTranslateLanguage('rliBillDate', 'deal-list'),
                fixed: false, kind: 2, cell_align: 'center', width: 100, title_tip: false, cell_tip: false
            },
            {
                key: 'manRoadmapStatus', title: getTranslateLanguage('manRoadmapStatus', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 90, title_tip: true, cell_tip: true
            },
            {
                key: 'manRevenueAmount', title: getTranslateLanguage('manRevenueAmount', 'deal-list'),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: false, cell_tip: false
            },
            {
                key: 'manComments', title: getTranslateLanguage('manComments', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 375, title_tip: true, cell_tip: true,
                title_align: 'left', hideArrow: true
            },
        ]


    }
    componentWillReceiveProps(Props) {
        this.checkFilterChange(Props);
    }

    componentDidUpdate() {
        setTimeout(this.updateSize.bind(this), 10);
    }
    componentDidMount() {
        setTimeout(this.updateSize.bind(this), 10);
        let filterListData = [];
        this._networkInstance.getDataRequest(URL.dealList.getDealListFilter, JSON.constructor(),
            (res) => {
                if (res && res.data) {
                    filterListData = res.data.filters;
                    this.setState({ filterListData: filterListData });
                }
                // this.forceUpdate();
            },
            (error) => {
            });
        this.retrieveHideColumnsFromServer();

        window.addEventListener('resize', this.updateSize.bind(this));
    }
    /**
 * check if global filters have changed. If changed, fetch new data according to the new filter.
 */
    checkFilterChange(props) {
        let filter = props.briefInfo;
        if (filter.nodeId && filter.quarter && filter.revenueType) {
            if (this.state.OpptyFilters.nodeId !== filter.nodeId ||
                this.state.OpptyFilters.quarter !== filter.quarter ||
                this.state.OpptyFilters.revenue !== filter.revenueType) {
                this.status.opportunity = 0;
                this.setState({
                    OpptyFilters: {
                        nodeId: filter.nodeId,
                        quarter: filter.quarter,
                        revenue: filter.revenueType
                    },
                    OpptyListData: {
                        header: [],
                        body: []
                    }
                }, () => {
                    this.setState({ DLByOpportunityLoading: true }, () => {
                        this.getRoadMapDatas(filter.nodeId, filter.revenueType, filter.quarter);
                    });
                })
                this.refreshLineItemData(filter);
            } else {
                if (props.getRoadMapHyperLinkTime !== this.props.getRoadMapHyperLinkTime) {
                    this.scrollToDealList();
                }
                if (this.state._isOpportunity && props.getDealListFilterData && props.getDealListFilterData.length > 0) {
                    this.setState({ _isOpportunity: false });
                    this.setSelectedTabIntoLocalStorage(false);
                }
                if (props.getBasicSearchText && props.getBasicSearchText !== this.props.getBasicSearchText) {
                    let i = props.getBasicSearchText.length;
                    if (i >= 2 || i === 0) {
                        if (this.timeout) {
                            clearTimeout(this.timeout);
                        }
                        this.timeout = setTimeout(() => {
                            this.refreshLineItemData(filter, true);
                        }, 500)
                    }
                } else {
                    this.refreshLineItemData(filter, true);
                }
            }
        }
    }

    refreshLineItemData(filter, fromRoadMap = false) {
        this.status.lineItem = 0;
        this.setState({
            LineFilters: {
                nodeId: filter.nodeId,
                quarter: filter.quarter,
                revenue: filter.revenueType
            },
            DLByLineItemData: {
                header: [],
                body: []
            },
            DLByLineitemLoading: true
        }, () => {
            this.getDeallistLineDatas(filter.nodeId, filter.revenueType, filter.quarter, 0, fromRoadMap);
            this.setState({ totalAmount: '' })
            this.requestTotalByLineItem(filter);
        });
    }


    getRoadMapDatas = (nodeId, revenueTypeId, quarterId, startIndex = 0) => {
        if (this.status.opportunity === 0) {
            this.status.opportunity = 1;
            this._networkInstance.postDataRequest(URL.dealList.dealListByOpportunity,
                {
                    nodeId: nodeId,
                    revenueType: revenueTypeId,
                    timePeriodId: quarterId,
                    start: startIndex,
                    count: this.state.pageCount,
                },
                (res) => {
                    if (res && res.data) {
                        this.setState({ OpptyListData: Object.assign({}, this.state.OpptyListData, { body: this.state.OpptyListData.body.concat(res.data) }), DLByOpportunityLoading: false })
                    }
                    if (!res.data || res.data.length < this.state.pageCount) {
                        this.setState({ DLByOpportunityLoading: false })
                        this.status.opportunity = 2;
                    } else {
                        this.setState({ DLByOpportunityLoading: false })
                        this.status.opportunity = 0;
                    }
                    this.forceUpdate();

                },
                (error) => {
                    console.log(error);
                    this.setState({ DLByOpportunityLoading: false })
                    this.status.opportunity = 0;
                });
        }
    }

    getDeallistLineDatas = (nodeId, revenueTypeId, quarterId, startIndex = 0, fromRoadMap = false) => {
        if (this.status.lineItem === 0) {
            this.status.lineItem = 1;
            let param = {
                nodeId: nodeId,
                revenueType: revenueTypeId,
                timePeriodId: quarterId,
                start: startIndex,
                count: this.state.pageCount,
            }
            if (!this.state._isOpportunity) {
                param.condition = this.props.getBasicSearchText;
                if (this.props.getDealListFilterData && this.props.getDealListFilterData.length > 0) {
                    let filters = this.getQueryDatas();
                    param = Object.assign(param, filters);
                }
            }
            return this._networkInstance.postDataRequest(URL.dealList.dealListByLineItem, param,
                (res) => {
                    if (!res.data || res.data.length < this.state.pageCount) {
                        this.setState({ DLByLineitemLoading: false })
                        this.status.lineItem = 2;
                    } else {
                        this.setState({ DLByLineitemLoading: false })
                        this.status.lineItem = 0;
                    }
                    if (res && res.data) {
                        this.setState({ DLByLineItemData: Object.assign({}, this.state.DLByLineItemData, { body: this.state.DLByLineItemData.body.concat(res.data) }), DLByLineitemLoading: false })
                    }
                    this.forceUpdate();
                    if (fromRoadMap) {
                        this.scrollToDealList();
                    }

                },
                (error) => {
                    console.log(error);
                    if (!this._networkInstance.requestToken[URL.dealList.dealListByLineItem]) {
                        this.setState({ DLByLineitemLoading: false })
                    }
                    this.status.lineItem = 0;
                });
        }
    }
    getQueryDatas() {
        let queryArrayJson = {};
        for (let i = 0; i < this.props.getDealListFilterData.length; i++) {
            if (queryArrayJson[this.props.getDealListFilterData[i].querNameId]) {
                queryArrayJson[this.props.getDealListFilterData[i].querNameId].push({
                    'operator': this.props.getDealListFilterData[i].conditionId,
                    'parameters': typeof this.props.getDealListFilterData[i].displayValue === 'string' ?
                        [this.props.getDealListFilterData[i].displayValue] : this.props.getDealListFilterData[i].displayValue
                })
            } else {
                queryArrayJson[this.props.getDealListFilterData[i].querNameId] = [{
                    'operator': this.props.getDealListFilterData[i].conditionId,
                    'parameters': typeof this.props.getDealListFilterData[i].displayValue === 'string' ?
                        [this.props.getDealListFilterData[i].displayValue] : this.props.getDealListFilterData[i].displayValue
                }]
            }
        }
        return queryArrayJson;
    }
    /**
     * expand list requires nex page of data
     */
    onGetNextPageDataByOpportunity() {
        let filter = this.state.OpptyFilters,
            length = this.state.OpptyListData.body.length;
        this.getRoadMapDatas(filter.nodeId, filter.revenue, filter.quarter, length);
    }

    tagsArrayData(event = false) {
        let tagesArray = {};
        if (this.props.getDealListFilterData && this.props.getDealListFilterData.length > 0) {
            tagesArray = Object.assign({}, this.props.getDealListFilterData)
        }
        // if (event) {
        //     this.model.tagsArray = {}
        //     this.model.tagsArray = event;
        // }
        // return this.model.tagsArray

        return tagesArray;
    }
    /**
     * resize the view, for responsive ui
     */
    updateSize() {
        const dom = ReactDOM.findDOMNode(this.div);
        if (dom && this.state.width !== dom.clientWidth) {
            this.setState({ width: dom.clientWidth });
        }
    }
    /**
     * get deal list table cell width info from local storage
     * @return {{}}
     */
    getDealListCellWidthFromLocalStorage() {
        let storage = localStorage[this._storageKeyCellWidth];
        if (!storage) {
            storage = '{}';
        }
        let ret = JSON.parse(storage);
        // build a default structure
        if (!ret) {
            ret = {};
        }
        if (!ret.opp) {
            ret.opp = {}
        }
        if (!ret.li) {
            ret.li = {};
        }
        return ret;
    }
    /**
     * update deal list table cell width info
     * @param isOpportunity - true: is opportunity table cell; false: is line item table cell
     * @param cellKey: the key/name of table column
     * @param widthValue: the new width value
     */
    setDealListCellWidthIntoLocalStorage(isOpportunity, cellKey, widthValue) {
        if (parseFloat(widthValue) <= 0) {
            return;
        }
        let storage = this.getDealListCellWidthFromLocalStorage(),
            obj = isOpportunity ? storage.opp : storage.li;
        obj[cellKey] = parseFloat(widthValue);
        localStorage[this._storageKeyCellWidth] = JSON.stringify(storage);
    }
    /**
     * get selected tab, true for opportunity, false for line item
     * @return {bool}
     */
    getSelectedTabFromLocalStorage() {
        let value = localStorage[this._storageKeyIsSelectedOpportunity];
        if (value === true || value === 'true') {
            value = true;
        } else {
            value = false;
        }
        return value;
    }
    onTableCellResize(isOpportunity, resizeCellName, newWidth) {
        this.setDealListCellWidthIntoLocalStorage(isOpportunity, resizeCellName, newWidth);
    }

    onClickExpand() {
        this.setState({ _expand: !this.state._expand });
    }
    getFilterNameListData() {
        const filterListGrid = [];
        if (this.state.filterListData && this.state.filterListData.length > 0) {
            for (let i = this.state.filterListData.length - 1; i >= 0; i--) {
                filterListGrid[i] = getTranslateLanguage(this.state.filterListData[i].vname, 'deallist-filterlist');
            }
        }
        return filterListGrid;
    }
    getFilterOptionsListData() {
        return this.state.filterListData;
    }
    requestDLByLineItemQueryData(queryKey, queryVal) {
        this.setState({ DLBLIQueryDataLoading: false });
        this.setState({ queryMultiDatas: [] });
        return this._networkInstance.postDataRequest(URL.dealList.typeahead,
            {
                key: queryKey,
                value: queryVal
            },
            (response) => {
                if (response && response.data.length != 0) {
                    this.setState({ queryMultiDatas: response.data, DLBLIQueryDataLoading: false });
                } else {
                    this.setState({ queryMultiDatas: [], DLBLIQueryDataLoading: true });
                }
            },
            (error) => {
                console.log(error);
                this.setState({ DLBLIQueryDataLoading: false });
            });
    }



    getMultiQueryDatas(multiKey, multiVal) {
        if (multiVal === '') {
            if (multiKey === 'LBS_NEWFORECASTING_SALES_STAGE'
                || multiKey === 'LBS_NEWFORECASTING_LEVEL_10'
                || multiKey === 'LBS_NEWFORECASTING_DEAL_SIZE'
                || multiKey === 'LBS_NEWFORECASTING_GEOGRAPHY'
                || multiKey === 'LBS_NEWFORECASTING_MARKET'
                || multiKey === 'LBS_NEWFORECASTING_ROADMAP_STATUS'
                || multiKey === 'LBS_NEWFORECASTING_COV_CLIENT_TYPE'
                || multiKey === 'LBS_NEWFORECASTING_INDUSTRY'
                || multiKey === 'LBS_NEWFORECASTING_ISU_SECTOR'
                || multiKey === 'LBS_NEWFORECASTING_CHANNEL'
                || multiKey === 'LBS_NEWFORECASTING_CONTRACT_TYPE') {
                this.requestDLByLineItemQueryData(multiKey, multiVal);
            }
        } else {
            if (this.typeAheadReqSource) {
                this.typeAheadReqSource.cancel('Cancel for Type-Ahead');
                this.typeAheadReqSource = 0;
            } else {
                this.timeout = setTimeout(() => {
                    this.requestDLByLineItemQueryData(multiKey, multiVal);
                }, 600);
            }
            this.typeAheadReqSource = this.requestDLByLineItemQueryData(multiKey, multiVal);
        }
        this.setState({ renderCounter: this.state.renderCounter + 1 });
    }
    getQueryMultiData() {
        if (this.state.queryMultiDatas.length > 0) {
            return this.state.queryMultiDatas;
        }
    }

    onClickSwitchList(isOpportunity) {
        this.setState({ _isOpportunity: isOpportunity });
        this.setSelectedTabIntoLocalStorage(isOpportunity);
    }
    /**
     *
     * @param isOpportunity
     */
    setSelectedTabIntoLocalStorage(isOpportunity) {
        localStorage[this._storageKeyIsSelectedOpportunity] = !!isOpportunity;
    }

    filterTextChange = (inputText) => {
        let i = inputText.length;
        if (i >= 2 || i === 0) {
            // this.model.refreshDLByLineItemData(inputText);
            this.setState({ renderCounter: this.state.renderCounter + 1 });
        }
    }

    removeFilterTags() {
        // this.model.refreshTagsArray();
        // this.model.refreshDLByLineItemData('');
        this.props.dispatch(setFilterData([]))
        this.setState({ renderCounter: this.state.renderCounter + 1 });
    }

    requestTotalByLineItem(filter) {
        let param = {
            nodeId: filter.nodeId,
            revenueType: filter.revenueType,
            timePeriodId: filter.quarter,
            condition: this.props.getBasicSearchText
        }

        if (!param.condition && (!this.props.getDealListFilterData || this.props.getDealListFilterData.length <= 0)) return;

        if (this.props.getDealListFilterData && this.props.getDealListFilterData.length > 0) {
            let filters = this.getQueryDatas();
            param = Object.assign(param, filters);
        }

        return this._networkInstance.postDataRequest(URL.dealList.totalAmount, param,
            (response) => {
                if (response && response.data) {
                    let Amount = this.formatMoney(response.data.totalAmount);
                    this.setState({ totalAmount: Amount });
                }
            },
            (error) => {
                console.log(error);
            });
    }

    thousandsSeparate(num) {
        var result = '';
        let ThousandsSeparator = ',';
        num = (num || 0).toString();

        while (num.length > 3) {
            result = ThousandsSeparator + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return result;
    }
    formatMoney(value) {

        let number = Math.round(parseInt(value, 10) / 1000);
        if (number === 0) {
            number = '0k';
        } else {
            number = this.thousandsSeparate(number) + 'k';
        }
        return number;
    }

    /**
     * prepare display data for deal list by opportunity view
     * The data in model is store as hierarchical structure.
     * But display data should be a simple grid. So re-structure the data here.
     * @return {{}}
     */
    prepareDataForDLByOpportunity() {
        let filter = this.props.briefInfo;
        let data = {},
            originData = this.state.OpptyListData;
        data.header = [
            {
                key: 'opportunityId', title: getTranslateLanguage('opportunityId', 'deal-list'),
                fixed: true, kind: 1, cell_align: 'left', width: 110, title_tip: true, cell_tip: true
            },
            {
                key: 'opportunityName', title: getTranslateLanguage('opportunityName', 'deal-list'),
                fixed: true, kind: 1, cell_align: 'left', width: 150, title_tip: true, cell_tip: true
            },
            {
                key: 'accountName', title: getTranslateLanguage('accountName', 'deal-list'),
                fixed: true, kind: 1, cell_align: 'left', width: 95, title_tip: true, cell_tip: true
            },
            {
                key: 'opportunitySalesStage', title: getTranslateLanguage('opportunitySalesStage', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 90, title_tip: true, cell_tip: true
            },
            {
                key: 'decisionDate', title: getTranslateLanguage('decisionDate', 'deal-list'),
                fixed: false, kind: 2, cell_align: 'center', width: 100, title_tip: false, cell_tip: true
            },
            {
                key: 'opportunityOwner', title: getTranslateLanguage('opportunityOwner', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'left', width: 110, title_tip: true, cell_tip: true
            },
            {
                key: 'totalOpportunityAmount', title: getTranslateLanguage('totalOpportunityAmount', 'deal-list'),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: true, cell_tip: true
            },
            {
                key: 'totalTsAmount', title: ('Total ' + getTranslateLanguage(filter.revenueType, 'revenue-Type') + this.addAmount(filter.revenueType)),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: true, cell_tip: true
            },
            {
                key: 'managerWonSolidAtrisk', title: getTranslateLanguage('managerWonSolidAtrisk', 'deal-list'),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: true, cell_tip: true
            },
            {
                key: 'manKeyStretch', title: getTranslateLanguage('manKeyStretch', 'deal-list'),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: true, cell_tip: true
            },
            {
                key: 'manStretch', title: getTranslateLanguage('manStretch', 'deal-list'),
                fixed: false, kind: 0, cell_align: 'right', width: 77, title_tip: false, cell_tip: true
            },
            {
                key: 'winPlanProgress', title: getTranslateLanguage('winPlanProgress', 'deal-list'),
                fixed: false, kind: 3, cell_align: 'right', width: 77, title_tip: true, cell_tip: true
            },
            {
                key: 'oppStepsToClosureSum', title: getTranslateLanguage('oppStepsToClosureSum', 'deal-list'),
                fixed: false, kind: 1, cell_align: 'center', width: 150, title_tip: true, cell_tip: true
            },
        ];

        this.adjustTableCellWidth(true, data.header);

        data.body = [];
        // make the hierarchical data into a flat structure
        for (let i = 0; i < originData.body.length; i++) {
            data.body.push(originData.body[i]);
        }

        return data;
    }

    addAmount(type) {
        return type === 'Volumes' ? '' : ' Amount'
    }

    /**
     * expand list requires nex page of data
     */
    onGetNextPageDataByLineItem() {
        let filter = this.state.LineFilters,
            length = this.state.DLByLineItemData.body.length;
        this.getDeallistLineDatas(filter.nodeId, filter.revenue, filter.quarter, length);
    }

    /**
     * prepare display data for deal list by opportunity view
     * The data in model is store as hierarchical structure.
     * But display data should be a simple grid. So re-structure the data here.
     * @return {{}}
     */
    prepareDataForDLByLineItem() {
        let data = {},
            originData = [];
        originData = this.state.DLByLineItemData;
        data.header = [];
        for (let i = 0; i < this.lineHeader.length; i++) {
            if (!this.lineHeader[i].isHide) {
                data.header.push(this.lineHeader[i]);
            }
        }
        this.adjustTableCellWidth(false, data.header);

        data.body = [];

        // make the hierarchical data into a flat structure
        for (let i = 0; i < originData.body.length; i++) {
            data.body.push(originData.body[i]);
        }

        return data;
    }

    /**
     * adjust table cell width according to the local storage
     * @param isOpportunity
     * @param data
     */
    adjustTableCellWidth(isOpportunity, data) {
        const storage = this.getDealListCellWidthFromLocalStorage(),
            widthData = isOpportunity ? storage.opp : storage.li;
        for (var i = 0; i < data.length; i++) {
            let obj = data[i];
            if (parseFloat(widthData[obj.key]) > 0) {
                obj.width = parseFloat(widthData[obj.key]);
            }
        }
    }

    prepareSwitchBtnListData() {
        let data = [];
        for (let i = 0; i < 2; i++) {
            data[i] = {};
            data[i].key = i.toString();
            data[i].value = i === 0 ? 'BY OPPORTUNITY' : 'BY LINE ITEM';
        }
        return data;
    }
    onSwitchBtnChanged(key, name) {
        this.onClickSwitchList((key === '0'));
    }

    scrollToDealList() {
        const dom = ReactDOM.findDOMNode(this.div);
        if (dom) {
            dom.scrollIntoView();
        }
    }
    getSwitchButton() {
        if (this.state.width <= 520) {
            let switchBtnClass = 'ds-col-xs-9 ds-col-sm-6 ds-col-md-6 ds-col-lg-4 ds-col-xl-3';
            let defaultKey = '1',
                defalutDisplay = 'BY LINE ITEM';
            if (this.state._isOpportunity) {
                defalutDisplay = 'BY OPPORTUNITY'
                defaultKey = '0';
            }
            return (
                <div id="switchType" className={switchBtnClass}>
                    <Dropdown
                        defaultValue={defalutDisplay}
                        defaultKey={defaultKey}
                        optionList={this.prepareSwitchBtnListData()}
                        onSelectOptionChanged={this.onSwitchBtnChanged.bind(this)} />
                </div>
            );

        } else {
            let currentDisplayTab = 'ds-button ds-flat tray-nav-close';
            let displayClass = currentDisplayTab + ' ds-current switch-button-bottom-line ds-button-current';
            let currentDisplayOpptClass = currentDisplayTab,
                currentDisplayDealListClass = currentDisplayTab
            if (this.state._isOpportunity) {
                currentDisplayOpptClass = displayClass;
            } else {
                currentDisplayDealListClass = displayClass;
            }
            return (
                <div className="switch-button-container">
                    <div className="switch-button-by-opportunity">
                        <a id="dealList-button-byOpportunity" className={currentDisplayOpptClass}
                            onClick={(e) => this.onClickSwitchList(true)}>
                            BY OPPORTUNITY
                            </a>
                    </div>
                    <div className="switch-button-by-line-item">
                        <a id="dealList-button-byLineItem" className={currentDisplayDealListClass}
                            onClick={(e) => this.onClickSwitchList(false)}>
                            BY LINE ITEM
                            </a>
                    </div>
                </div>
            );
        }
    }

    hideColumn(i) {
        this.lineHeader[i].isHide = !this.lineHeader[i].isHide;
        this.forceUpdate();
    }

    /**
     * set column hide/show
     * @param key is required, it is the accurate param to update the column display status
     * @param index is used for fast seeking
     * @param shouldHide is optional, if it is not assigned, we should find the target and set it versa
     * */
    hideColumn(key, index, shouldHide) {
        let target = null;
        if (index >= 0 && this.lineHeader[index].key === key) {
            // this is fast but not safe, we need double check
            target = this.lineHeader[index];
        } else {
            // if the index and key are not matched, use key to update the correct one
            for (let i = 0; i < this.lineHeader.length; i++) {
                let item = this.lineHeader[i];
                if (item.key === key) {
                    target = item;
                    break;
                }
            }
        }

        if (target) {
            if (typeof (shouldHide) === undefined) {
                target.isHide = !target.isHide;
            } else {
                target.isHide = shouldHide;
            }

            this.saveHideColumnsToServer();
            this.forceUpdate();
        }
    }

    retrieveHideColumnsFromServer() {
        if (this.props.userConfig.dealListLiColumnSettings && this.props.userConfig.dealListLiColumnSettings.length > 0) {
            this.props.userConfig.dealListLiColumnSettings.forEach((data) => {
                this.hideColumn(data.key, -1, data.hide);
            });
        }
    }

    saveHideColumnsToServer() {
        let settings = [];
        this.lineHeader.forEach((item, index) => {
            if (item.isHide === true) {
                settings.push({
                    key: item.key,
                    hide: true
                });
            }
        });
        let configsTemp = this.props.userConfig;
        configsTemp.dealListLiColumnSettings = settings
        this._networkInstance.postDataRequest(URL.profile.setUserSetting, configsTemp,
            (res) => {

            },
            (error) => {
            });
    }

    getRoadmapList() {
        let totalDisplay = false;
        if (((this.props.getDealListFilterData && this.props.getDealListFilterData.length > 0) || this.props.getBasicSearchText) && this.state.totalAmount) {
            totalDisplay = true;
        }
        let pageCurrWidth = document.body.clientWidth;
        return (
            <div>
                <div className={this.state._isOpportunity ? '' : 'hideblock'} id='deal-list-by-opportunity'>
                    <div id="dealList-title" className="switch-button-title">Deal List</div>
                    <div className="ds-hr ds-border-bottom-neutral-2 ds-lineStyle" style={{ width: this.state.width }}></div>
                    {this.getSwitchButton()}
                    <DLByOpportunity
                        tableWidth={this.state.width ? this.state.width : 0}
                        maxTableHeight={document.documentElement.clientHeight * 0.87}
                        data={this.prepareDataForDLByOpportunity()}
                        isLoading={this.state.DLByOpportunityLoading}
                        isNoResult={this.state.OpptyListData.body.length <= 0}
                        hasMore={this.status.opportunity === 0}
                        noResultMessage={<div className="no-result">{getTranslateLanguage('NoResultMessage')}</div>}
                        onGetMoreData={this.onGetNextPageDataByOpportunity.bind(this)}
                        onCellResize={this.onTableCellResize.bind(this)} />
                </div>
                <div className={this.state._isOpportunity ? 'hideblock' : ''} id='deal-list-by-line-item'>
                    <div id="dealList-title" className="switch-button-title">Deal List</div>
                    <div className="ds-hr ds-border-bottom-neutral-2 ds-lineStyle" style={{ width: this.state.width }}></div>
                    {this.getSwitchButton()}
                    <TotalAmount
                        totalClass={'dealList_total_up'}
                        filterAndData={totalDisplay}
                        totalData={this.state.totalAmount} />
                    <FilterPopUpList
                        getfilterTextChange={this.filterTextChange.bind(this)}
                        filterListData={this.getFilterNameListData()}
                        filterOptionsData={this.getFilterOptionsListData()}
                        getMultiDatas={this.getMultiQueryDatas.bind(this)}
                        getMultiOptionsDatas={this.getQueryMultiData()}
                        setTagsArray={this.tagsArrayData.bind(this)}
                        removeTagsData={this.removeFilterTags.bind(this)}
                        showNoResult={this.state.DLBLIQueryDataLoading}
                        cancelFilterQuery={this.removeFilterTags.bind(this)}
                    />
                    <TotalAmount
                        totalClass={'dealList_total_down'}
                        filterAndData={totalDisplay}
                        totalData={this.state.totalAmount} />
                    <DLByLineItem
                        tableWidth={this.state.width ? this.state.width : 0}
                        maxTableHeight={document.documentElement.clientHeight * 0.78}
                        data={this.prepareDataForDLByLineItem()}
                        isLoading={this.state.DLByLineitemLoading}
                        isNoResult={this.state.DLByLineItemData.body.length <= 0}
                        hasMore={this.status.lineItem === 0}
                        noResultMessage={<div className="no-result">{getTranslateLanguage('NoResultMessage')}</div>}
                        onGetMoreData={this.onGetNextPageDataByLineItem.bind(this)}
                        onCellResize={this.onTableCellResize.bind(this)}
                        columnNames={this.lineHeader}
                        hideColumn={this.hideColumn.bind(this)}
                    />
                </div>
            </div>)
    }

    getCardContent() {
        if (this.state._expand === true) {
            return (
                <div>
                    <Card id={'dealList-Card'} ref={(ref) => this.div = ref}>
                        {this.getRoadmapList()}
                    </Card>
                    {/*<Icon type="caret-circle-up" className="narrow-expand-icon" onClick={this.onClickExpand.bind(this)}/>*/}
                </div>
            );
        }
        else {
            return (
                <div>
                    <Card ref={(ref) => this.div = ref} title="Deal List" extra={<Icon type="list-unordered" />}>
                        <Row>
                            <NarrowRow />
                        </Row>
                    </Card>
                    {/*<Icon type="caret-circle-down" className="narrow-expand-icon" onClick={this.onClickExpand.bind(this)}/>*/}
                </div>
            );
        }
    }

    render() {
        if(!this.props.briefInfo){
            return null;
        }
        return (
            <div id='module_deal_list'>
                <Row className={'sub-layout'}>
                    <Col id='col_deal_list' className="narrow-row" span={12}>
                        {this.getCardContent()}
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        briefInfo: state.brifInfo,
        loginUser: state.loginUser,
        getDealListFilterData: state.getDealListFilterData,
        getBasicSearchText: state.getBasicSearchText,
        getRoadMapHyperLinkTime: state.getRoadMapHyperLinkTime,
        userConfig: state.userConfig
    }
}
export default connect(mapStateToProps)(DealList);