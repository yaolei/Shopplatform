import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ExpandList from './ExpandList';
import NarrowRow from './NarrowRow';
import BaseNetwork from "../../util/BaseNetwork";
import { Row, Col, Card, Loading } from '../../vendors/reactW3DS';
import { getTranslateLanguage } from "../../util/BaseLanguage";
import './index.less';
import { setFilterData, addFilterData , updateRoadMapHyperLinkTime } from "../../actions/dealListAction"
import RSDown from './DropDown'
import {URL} from '../../util/URL'

class RoadmapSummary extends React.Component {

    _storageKeyCellWidth = 'roadmap_cell_width_info';

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            _expand: true,
            width: 0,
            pageCount: 30,
            breakoutListData: {
                header: [],
                body: [],
            },
            breakoutFilters: {
                nodeId: '',
                quarter: '',
                revenue: '',
            },
            breakoutGroup: {
                data: [],
                value: '1'
            },
            status: 0
        }
        this.status = 0;
    }

    componentDidMount() {
        setTimeout(this.updateSize.bind(this), 10);
        window.addEventListener('resize', this.updateSize.bind(this));
    }

    componentWillReceiveProps(props) {
        this.checkFilterChange(props);
    }

    componentDidUpdate() {
        setTimeout(this.updateSize.bind(this), 10);
    }

    updateSize() {
        const dom = ReactDOM.findDOMNode(this.div);
        if (dom && this.state.width !== dom.clientWidth) {
            this.setState({ width: dom.clientWidth });
        }
    }

    checkFilterChange(props) {
        let filter = props.briefInfo;
        if (filter && filter.nodeId && filter.quarter && filter.revenueType) {
            if (this.state.breakoutFilters && (this.state.breakoutFilters.nodeId !== filter.nodeId ||
                this.state.breakoutFilters.quarter !== filter.quarter ||
                this.state.breakoutFilters.revenue !== filter.revenueType)) {
                this.setState({
                    breakoutFilters: {
                        nodeId: filter.nodeId,
                        quarter: filter.quarter,
                        revenue: filter.revenueType
                    },
                    breakoutListData: {
                        header: [],
                        body: []
                    },
                    breakoutGroup: {
                        data: [],
                        value: 1
                    },
                }, () => {
                    this.status = 0;
                    this.getBreakoutGroupData();
                    this.requestSource = this.requestBreakout1ListData(filter.nodeId, filter.revenueType, filter.quarter);
                })
            }
        }
    }

    getBreakoutGroupData() {
        this._networkInstance.postDataRequest(URL.roadmapSummary.loadBreakOutGroup, { nodeId: this.state.breakoutFilters.nodeId, },
            (res) => {
                if (res && res.data && res.data.length > 0) {
                    this.setState({breakoutGroup:{
                        data: res.data,
                        value: res.data[0].id,
                    }})
                }
            },
            (err) => {
                console.log(err);
            });
    }

    switchGroup(id) {
        this.setState({ breakoutGroup: Object.assign({}, this.state.breakoutGroup, { value: id }),                    breakoutListData: {
                        header: [],
                        body: []
                    } }, () => {
            this.status = 0;
            this.requestSource = this.requestBreakout1ListData(this.state.breakoutFilters.nodeId, this.state.breakoutFilters.revenue, this.state.breakoutFilters.quarter);
        })
    }

    requestBreakout1ListData(nodeId, revenueTypeId, quarterId, startIndex = 0) {
        if (this.status === 0) {
            if(this.requestSource){
                this.requestSource.cancel('Cancel for RoadMap Data');
            }
            this.status = 1;
            this.forceUpdate();
            return this._networkInstance.postDataRequest(URL.roadmapSummary.loadRoadmapSummary,
                {
                    nodeId: nodeId,
                    revenueType: revenueTypeId,
                    timePeriodId: quarterId,
                    start: startIndex,
                    count: this.state.pageCount,
                    breakoutGroup: this.state.breakoutGroup.value
                },
                (res) => {
                    if (res && res.data) {
                        this.setState({ breakoutListData: Object.assign({}, this.state.breakoutListData, { body: this.state.breakoutListData.body.concat(res.data.list) }) })
                    }
                    if (!res.data.list || res.data.list.length < this.state.pageCount) {
                        this.status = 2;
                    } else {
                        this.status = 0;
                    }
                    this.forceUpdate();
                },
                (err) => {
                    if(!this.requestSource){
                        this.status = 0;
                        this.forceUpdate();
                    }
                });
        }
    }

    /**
     * expand list requires nex page of data
     */
    onExpandListGetNextPageData() {
        let filter = this.state.breakoutFilters,
            length = this.state.breakoutListData.body.length;
        this.requestSource = this.requestBreakout1ListData(filter.nodeId, filter.revenue, filter.quarter, length);
    }

    /**
     * triggered if any element in expand list is clicked
     * We ignore the clicked index.
     * Because the list is generated by prepareDataForExtendList(), which is not same with the data in model.
     * We could find the element by breakout1Index, breakout2Index and breakout3Index in item
     * @param key
     * @param item
     */
    onExpandListItemClicked(key, item) {
        if (key === 'Breakout') {
            this.handleBreakoutExpand(item);
        } else if (key === 'BreakoutHyperLink') {
            this.handleBreakoutHyperLinkClicked(item);
        } else { // numbers
            this.handleNubmerHyperLinkClicked(item);
        }
    }

    handleBreakoutExpand(item) {
        let obj = null;
        if (item.breakout1Index >= 0) {
            obj = this.state.breakoutListData.body[item.breakout1Index];
        }
        if (item.breakout2Index >= 0 && obj) {
            obj = obj.breakout2ListData[item.breakout2Index];
        }
        if (item.breakout3Index >= 0 && obj) {
            obj = obj.breakout3ListData[item.breakout3Index];
        }
        if (obj) {
            // update expande state
            obj.isExpanded = !obj.isExpanded;

            if (obj.isExpanded) {// if it will expand
                // check breakout index
                let breakoutIndex = item.breakoutNumber;
                if (breakoutIndex === 1) {
                    this.getBreakout2ListData(item.breakout1Index);
                } else if (breakoutIndex === 2) {
                    this.getBreakout3ListData(item.breakout1Index, item.breakout2Index);
                }
            }
            this.forceUpdate();
        }
    }

    getBreakout2ListData(breakout1Index) {
        const obj = this.state.breakoutListData.body[breakout1Index];
        if (!obj.breakout2ListData || obj.breakout2ListData.length === 0) {
            // fetch data
            const filter = this.state.breakoutFilters,
                isTotal = obj.hideBreakOut1Key === 'TOTAL';
            this.requestBreakout2ListData(filter.nodeId, filter.revenue, filter.quarter,
                obj.hideBreakOut1Value, breakout1Index, isTotal);
        } else {
            this.forceUpdate();
        }
    }

    getBreakout3ListData(breakout1Index, breakout2Index) {
        const b1 = this.state.breakoutListData.body[breakout1Index];
        const obj = b1.breakout2ListData[breakout2Index];
        if (!obj.breakout3ListData || obj.breakout3ListData.length === 0) {
            // fetch data
            const filter = this.state.breakoutFilters,
                isTotal = b1.hideBreakOut1Key === 'TOTAL';
            this.requestBreakout3ListData(filter.nodeId, filter.revenue, filter.quarter,
                b1.hideBreakOut1Value, obj.hideBreakOut2Value, breakout1Index, breakout2Index, isTotal);
        } else {
            this.forceUpdate();
        }
    }

    handleBreakoutHyperLinkClicked(item) {
        if (this.props.filterStatus.open) {
            return;
        }
        this.props.dispatch(setFilterData([]));
        let obj = null;
        if (item.breakout1Index > 0) {
            obj = this.state.breakoutListData.body[item.breakout1Index];
        }
        if (item.breakout2Index >= 0 && obj) {
            obj = obj.breakout2ListData[item.breakout2Index];
        }
        if (item.breakout3Index >= 0 && obj) {
            obj = obj.breakout3ListData[item.breakout3Index];
        }
        if (obj) {
            // here is for breakout 1 only.
            // TODO: click breakout 2&3, numbers should modify the filter generation logic
            // id 999 is create from roamap breakout
            let conditionId = 'is_any_of',
                conditionName = 'is any of',
                displayValue =  obj.hideBreakOut1Value,
                displayText = obj.hideBreakOut1Disp;

            if (obj.filterType === 'date') {
                conditionId = 'is_between';
                conditionName = 'is between';
                displayValue  = [];
                displayValue[0] = obj.startDate;
                displayValue[1] = obj.endDate;
                displayText = '';
            }
            this.props.dispatch(addFilterData(
                {
                    conditionId: conditionId,
                    conditionName: conditionName,
                    displayValue: displayValue,
                    displayText: displayText,
                    filedType: obj.filterType,
                    querNameId: obj.clickField,
                    isEdit: false,
                    queryName: getTranslateLanguage(obj.clickField, 'deallist-filterlist'),
                    id: 999,
                    tagId: 1,
                }
            ))
            this.props.dispatch(updateRoadMapHyperLinkTime(new Date().getTime()))
        }
    }

    handleNubmerHyperLinkClicked(item) {
        if (this.props.filterStatus.open) {
            return;
        }
        // get breakout filter first.
        this.handleBreakoutHyperLinkClicked(item.breakoutData, false);

        // add number filters
        let parameters = [];
        let stringText = '';
        switch (item.key) {
            case 'manWonSolidAtrisk':
                parameters = ['WON', 'SOL', 'ATR'];
                stringText = 'WON,SOL,ATR';
                break;
            case 'managerKeyAmount':
                parameters = 'KEY';
                stringText = 'Key stretch';
                break;
            case 'managerBestAmount':
                parameters = ['WON', 'SOL', 'ATR', 'KEY'];
                stringText = 'WON,SOL,ATR,KEY';
                break;
            case 'managerWorstAmount':
                parameters = ['WON', 'SOL'];
                stringText = 'WON,SOL';
                break;
            case 'managerWonAmount':
                parameters = 'WON';
                stringText = 'WON';
                break;
            case 'managerSolAmount':
                parameters = 'SOL';
                stringText = 'SOL';
                break;
            case 'managerAtrAmount':
                parameters = 'ATR';
                stringText = 'ATR';
                break;
            case 'managerStrAmount':
                parameters = 'STR';
                stringText = 'STR';
                break;
            case 'managerNirAmount':
                parameters = 'NIR';
                stringText = 'NIR';
                break;
            default:
                break;
        }
        this.props.dispatch(addFilterData({
            conditionId: 'is_any_of',
            conditionName: 'is any of',
            displayValue: parameters,
            displayText: this.translateDisplayValue(stringText),
            filedType: 'multi',
            querNameId: 'LBS_NEWFORECASTING_ROADMAP_STATUS',
            queryName: getTranslateLanguage('LBS_NEWFORECASTING_ROADMAP_STATUS', 'deallist-filterlist'),
            isEdit: false,
            id: 999,
            tagId: 2,
        }))
        this.props.dispatch(updateRoadMapHyperLinkTime(new Date().getTime()))
    }

    translateDisplayValue(parameter){
        let displayTextArray = [],
            text= '';
        if ( parameter.indexOf(',') !== -1 ) {
            displayTextArray = parameter.split(',');
            for (let i = 0; i < displayTextArray.length; i++) {
                text += getTranslateLanguage(displayTextArray[i], 'roadmap-summary');
                if (i === (displayTextArray.length-1))
                    break;
                    text += ',';
            }
        }
        else {
            text = getTranslateLanguage(parameter, 'roadmap-summary');
        }
        return text;
    }

    getClickedFiltersFromRoadmapSummary() {
        let ret = this.state._filtersGeneratedByClickRoadmapSummaryItem;
        this._filtersGeneratedByClickRoadmapSummaryItem = {};
        return ret;
    }

    requestBreakout2ListData(nodeId, revenueTypeId, quarterId, breakout1, index1, isTotal = false) {
        let url = URL.roadmapSummary.loadBreakOut2,
            params = {
                nodeId: nodeId,
                revenueType: revenueTypeId,
                timePeriodId: quarterId,
                breakOut1Value: breakout1,
                breakoutGroup: this.state.breakoutGroup.value
            };
        if (isTotal) {
            url = URL.roadmapSummary.loadTotalBreakOut2;
            params = {
                nodeId: nodeId,
                revenueType: revenueTypeId,
                timePeriodId: quarterId,
                breakoutGroup: this.state.breakoutGroup.value
            };
        }
        this._networkInstance.postDataRequest(url, params,
            (res) => {
                if (res && res.data) {
                    let data = this.state.breakoutListData;
                    data.body[index1].breakout2ListData = res.data.list;
                    this.setState({ breakoutListData: data })
                }
            },
            (err) => {
                console.log(err)
            });
    }

    requestBreakout3ListData(nodeId, revenueTypeId, quarterId, breakout1, breakout2, index1, index2, isTotal = false) {
        let url = URL.roadmapSummary.loadBreakOut3,
            params = {
                nodeId: nodeId,
                revenueType: revenueTypeId,
                timePeriodId: quarterId,
                breakOut1Value: breakout1,
                breakOut2Value: breakout2,
                breakoutGroup: this.state.breakoutGroup.value
            };
        if (isTotal) {
            url =  url = URL.roadmapSummary.loadTotalBreakOut3;;
            params = {
                nodeId: nodeId,
                revenueType: revenueTypeId,
                timePeriodId: quarterId,
                breakOut2Value: breakout2,
                breakoutGroup: this.state.breakoutGroup.value
            };
        }
        this._networkInstance.postDataRequest(url, params,
            (res) => {
                if (res && res.data) {
                    let data = this.state.breakoutListData;
                    data.body[index1].breakout2ListData[index2].breakout3ListData = res.data.list;
                    this.setState({ breakoutListData: data });
                }
            },
            (err) => {
                this.forceUpdate();
            });
    }

    /**
     * get roadmap summary table cell width info from local storage
     * @return {{}}
     */
    getRoadmapCellWidthFromLocalStorage() {
        let storage = localStorage[this._storageKeyCellWidth];
        if (!storage) {
            storage = '{}';
        }
        let ret = JSON.parse(storage);
        // build a default structure
        if (!ret) {
            ret = {};
        }
        return ret;
    }
    /**
     * update roadmap summary table cell width info
     * @param cellKey: the key/name of table column
     * @param widthValue: the new width value
     */
    setRoadmapCellWidthIntoLocalStorage(cellKey, widthValue) {
        if (parseFloat(widthValue) <= 0) {
            return;
        }
        let storage = this.getRoadmapCellWidthFromLocalStorage();
        storage[cellKey] = parseFloat(widthValue);
        localStorage[this._storageKeyCellWidth] = JSON.stringify(storage);
    }

    onTableCellResize(resizeCellName, newWidth) {
        this.setRoadmapCellWidthIntoLocalStorage(resizeCellName, newWidth);
    }

    /**
     * prepare display data for expand list view
     * The data in model is store as hierarchical structure.
     * But display data should be a simple grid. So re-structure the data here, make breakout 123 store to one array.
     * @return {{}}
     */
    prepareDataForExtendList() {
        let data = {},
            originData = this.state.breakoutListData;
        data.header = [
            { key: 'Breakout', title: getTranslateLanguage('Breakout', 'roadmap-summary'), fixed: true, width: 200 },
            { key: 'budgetAmount', title: getTranslateLanguage('Budget', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'manWonSolidAtrisk', title: getTranslateLanguage('WSR', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'manDeltaToTarget', title: getTranslateLanguage('Delta', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerKeyAmount', title: getTranslateLanguage('KEY', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerBestAmount', title: getTranslateLanguage('Best Case', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerWorstAmount', title: getTranslateLanguage('Worst Case', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerWonAmount', title: getTranslateLanguage('WON', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerSolAmount', title: getTranslateLanguage('SOL', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerAtrAmount', title: getTranslateLanguage('ATR', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerStrAmount', title: getTranslateLanguage('STR', 'roadmap-summary'), fixed: false, width: 150 },
            { key: 'managerNirAmount', title: getTranslateLanguage('NIR', 'roadmap-summary'), fixed: false, width: 150 },
        ];
        if (this.state.breakoutFilters.revenue === 'Signings') {
            let cq = this.props.briefInfo.quarterName;
            cq = cq.substr(0, 2);
            cq += ' ';
            data.header.push({
                key: 'managerWsrCqAmount', title: cq + getTranslateLanguage('WSR Revenue', 'roadmap-summary'), fixed: false, width: 150
            });
            data.header.push({
                key: 'managerKeyCqAmount', title: cq + getTranslateLanguage('Key Stretch Revenue', 'roadmap-summary'), fixed: false, width: 150
            });
        }
        // adjust width depend on storage
        const storage = this.getRoadmapCellWidthFromLocalStorage();
        for (var i = 0; i < data.header.length; i++) {
            let obj = data.header[i];
            if (parseFloat(storage[obj.key]) > 0) {
                obj.width = parseFloat(storage[obj.key]);
            }
        }

        data.body = [];

        // make the hierarchical data into a flat structure
        for (let i = 0; i < originData.body.length; i++) {
            let b1 = originData.body[i];
            b1.breakoutNumber = 1;
            b1.breakout1Index = i;
            data.body.push(b1);

            // if breakout 1 is expanded, add breakout 2 items into the list
            if (b1.isExpanded && b1.breakout2ListData) {
                for (let j = 0; j < b1.breakout2ListData.length; j++) {
                    let b2 = b1.breakout2ListData[j];
                    b2.breakoutNumber = 2;
                    b2.breakout1Index = i;
                    b2.breakout2Index = j;
                    data.body.push(b2);

                    // if breakout 2 is expanded, add breakout 3 items into the list
                    if (b2.isExpanded && b2.breakout3ListData) {
                        for (let k = 0; k < b2.breakout3ListData.length; k++) {
                            let b3 = b2.breakout3ListData[k];
                            b3.breakoutNumber = 3;
                            b3.breakout1Index = i;
                            b3.breakout2Index = j;
                            b3.breakout3Index = k;
                            data.body.push(b3);
                        }
                    }
                }
            }
        }
        return data;
    }

    render() {
        return (
            <div id='module_roadmap_summary'>
                <Row className={'sub-layout'}>
                    <Col className="narrow-row" span={12} order={1} id='col_roadmap_summary'>
                        <div>
                            <Card id={'roadmap_summary'} ref={(ref) => this.div = ref}>
                                <div id='roadmapSummary-title' className="ds-col-12 ds-col-sm-12 ds-col-md-4 ds-col-lg-6 ds-col-xl-6 panel-title">
                                    {getTranslateLanguage('Roadmap Summary', 'roadmap-summary')}
                                </div>
                                <div className="ds-col-md-6 roadmapSummary_breakoutDropDown">
                                    <RSDown titleId={'rs-title'}
                                            titleDropDownId={'rs-title-dropdown'}
                                            titleClass={'rs-drop'}
                                            optionData={this.state.breakoutGroup.data}
                                            onClickOption = {this.switchGroup.bind(this)}
                                            noDataWaring={getTranslateLanguage('NoValsWaring')}/>
                                </div>
                                <div id='roadmapSummary-list' className={this.state._expand ? '' : 'hideblock'} >
                                    <ExpandList
                                        id={'roadmapSummary-list-body'}
                                        tableWidth={this.state.width ? this.state.width : 0}
                                        maxTableHeight={document.documentElement.clientHeight * 0.94}
                                        data={this.prepareDataForExtendList()}
                                        onItemClicked={this.onExpandListItemClicked.bind(this)}
                                        onGetMoreData={this.onExpandListGetNextPageData.bind(this)}
                                        status={this.status}
                                        onCellResize={this.onTableCellResize.bind(this)}
                                    />
                                </div>
                                <div className={this.state._expand ? 'hideblock' : ''} >
                                    <Row>
                                        <NarrowRow dataList={[]} />
                                    </Row>
                                </div>
                            </Card>
                            {/*<Icon type="caret-circle-down" className="narrow-expand-icon" onClick={this.onClickExpand.bind(this)}/>*/}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        briefInfo: state.brifInfo,
        filterStatus: state.getDealListFilterStatus
    }
}

export default connect(mapStateToProps)(RoadmapSummary);