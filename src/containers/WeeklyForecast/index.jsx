import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import { Row, Col, Card, Icon, Tooltip } from '../../vendors/reactW3DS';
import ReactEcharts from 'echarts-for-react';
import Modal from './model';
import BaseNetwork from "../../util/BaseNetwork";
import { getTranslateLanguage } from "../../util/BaseLanguage";
import { thousandsSeparate } from '../../util/utility';
import { setFilterData, updateRoadMapHyperLinkTime } from "../../actions/dealListAction"
import { setuserConfig } from '../../actions/loginAction';
import {URL} from '../../util/URL'

class WeeklyForecast extends React.Component {

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            isDisplay: true,
            isSDisplay: true,
            isTDisplay: true,
            showModal: false,
            chartData: {
                budget: [],
                atRisk: {
                    data: [],
                    deals: []
                },
                solid: {
                    data: [],
                    deals: []
                },
                won: {
                    data: [],
                    deals: []
                },
                keyStretch: {
                    data: [],
                    deals: []
                },
                stretch: {
                    data: [],
                    deals: []
                },
                NIR: {
                    data: [],
                    deals: []
                },
                delta: {
                    data: []
                },
                dateRange: [],
                WSR: [],
                WSRDeals: [],
            },
            chartOptions: {},
            dateRange: [],
            WSR: [],
            WSRDeals: [],
            disableActions: {},
            displayActions: true,
            actionsColor: {
                'Budget & Delta': 'unset',
                'Won': '#27aa7c',
                'Solid': '#367aa3',
                'At Risk': '#e3b602',
                'Key Stretch': '#eb7800',
                'Stretch': '#940a00',
                'NIR': '#606060'
            },
            largerStatus: {}
        };
    }

    componentWillReceiveProps(props) {
        let filter = props.briefInfo;
        if (filter.nodeId && filter.quarter && filter.revenueType) {
            this.getChartData({
                nodeId: filter.nodeId,
                revenueType: filter.revenueType,
                timePeriodId: filter.quarter
            });
        }
        this.setState({displayActions: true});
    }

    componentWillMount() {
        this.renderChart({});
        let events = {
            'click': (params) => {
                this.createFilter(params);
            },
        };
        this.setState({
            chartEvents: events,
            disableActions: this.props.userConfig.weeklySmallChartStatus,
            largerStatus: this.props.userConfig.largerChartStatus
        });
    }

    createFilter(params) {
        let parameters = '';
        let stringText = '';
        switch (params.seriesName) {
            case 'Won':
                parameters = 'WON';
                stringText = 'WON';
                break;
            case 'Solid':
                parameters = 'SOL';
                stringText = 'SOL';
                break;
            case 'At Risk':
                parameters = 'ATR';
                stringText = 'ATR';
                break;
            case 'Key Stretch':
                parameters = 'KEY';
                stringText = 'Key stretch';
                break;
            case 'Stretch':
                parameters = 'STR';
                stringText = 'STR';
                break;
            case 'NIR':
                parameters = 'NIR';
                stringText = 'NIR';
                break;
            default:
                break;
        }
        if (parameters) {
            if (this.state.showModal) {
                this.closeModal();
            }
            this.props.dispatch(setFilterData([
                {
                    conditionId: 'is_any_of',
                    conditionName: 'is any of',
                    displayValue: parameters,
                    displayText: getTranslateLanguage(stringText, 'roadmap-summary'),
                    filedType: 'multi',
                    querNameId: 'LBS_NEWFORECASTING_ROADMAP_STATUS',
                    queryName: getTranslateLanguage('LBS_NEWFORECASTING_ROADMAP_STATUS', 'deallist-filterlist'),
                    isEdit: false,
                    id: 999,
                    tagId: 1
                }, {
                    conditionId: 'is_between',
                    conditionName: 'is between',
                    displayValue: this.state.chartData.dateRange[params.dataIndex],
                    filedType: 'date',
                    querNameId: 'LBS_NEWFORECASTING_DATE',
                    queryName: getTranslateLanguage('LBS_NEWFORECASTING_DATE', 'deallist-filterlist'),
                    isEdit: false,
                    id: 999,
                    tagId: 2
                }
            ]));
            this.props.dispatch(updateRoadMapHyperLinkTime(new Date().getTime()));
        }
    }

    getChartData(params) {
        this._networkInstance.postDataRequest(URL.weeklyForecase.roadmapStatByWeek, params,
            (res) => {
                let chartData = {
                    budget: [res.data.budget],
                    atRisk: res.data.atRisk,
                    solid: res.data.solid,
                    won: res.data.won,
                    keyStretch: res.data.key,
                    stretch: res.data.str,
                    NIR: res.data.nir,
                    delta: {
                        data: []
                    },
                    dateRange: res.data.dateRange,
                    WSR: res.data.WSR,
                    WSRDeals: res.data.WSRDeals
                };
                this.setState({ chartData: chartData }, () => {
                    if (this.props.userConfig) {
                        this.calculateDelta(this.props.userConfig.weeklySmallChartStatus);
                        this.renderChart(this.props.userConfig.weeklySmallChartStatus);
                    }
                });
            },
            (error) => {
                console.log(error);
            });
    }

    renderChart(legends) {
        try {
            var xAxisData = Array.from({ length: 13 }, (v, k) => k + 1);
            let that = this;
            let data = {
                title: {
                    text: 'Weekly Forecast - QTD',
                    textStyle: {
                        fontSize: 30,
                        height: 43,
                        lineHeight: 1.43,
                        color: '#555555',
                        fontFamily: 'IBMPlexSans',
                        fontWeight: 'normal',
                    },
                    padding: [22, 0, 0, 43],
                    left: 10,
                    show: false
                },
                grid: {
                    left: 85,
                    top: 10,
                    bottom: 45,
                    right: 20
                },
                backgroundColor: '#fdfdfd',
                legend: {
                    data: [
                        {name: 'Budget & Delta', icon: ''},  
                        {name: 'Won'}, 
                        {name: 'Solid'}, 
                        {name: 'At Risk'}, 
                        {name: 'Key Stretch'}, 
                        {name: 'Stretch'}, 
                        {name: 'NIR'}
                    ],
                    align: 'left',
                    itemGap: 5,
                    itemWidth: 40,
                    left: 80,
                    top: 60,
                    selected: legends,
                    orient: 'vertical',
                    show: false,
                    textStyle: {
                        fontSize: 20
                    }
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    name: 'Week (Cumulative)',
                    nameLocation: 'center',
                    data: xAxisData,
                    axisLine: { onZero: true },
                    nameTextStyle: {
                        fontSize: 13,
                        lineHeight: 15,
                        padding: [10, 0, 0, 0]
                    }
                },
                yAxis: {
                    type: 'value',
                    inverse: false,
                    axisLabel: {
                        formatter: function (value) {
                            value = value / 1000;
                            return thousandsSeparate(Math.round(value)) + 'k';
                        }
                    },
                    name: 'Amount Closing',
                    nameLocation: 'center',
                    nameRotate: 90,
                    splitArea: { show: false },
                    nameTextStyle: {
                        fontSize: 13,
                        lineHeight: 15,
                        padding: [0, 0, 45, 0]
                    }
                },
                series: [
                    {
                        name: 'Budget & Delta',
                        type: 'line',
                        symbol: "none",
                        smooth: false,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    opacity: 0,
                                }
                            }
                        },
                        markLine: {
                            silent: false,
                            symbol: 'none',
                            label: {
                                show: false
                            },
                            lineStyle: {
                                width: 3,
                                color: '#492172',
                            },
                            data: [{
                                yAxis: this.state.chartData.budget
                            }]
                        },
                        stack: 'two',
                        data: this.state.chartData.budget,
                        silent: true
                    },
                    {
                        name: 'Won',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.won.data,
                        itemStyle: {
                            normal: {
                                color: '#27aa7c',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.won.data[params.dataIndex] / 1000);
                                let result =
                                    `<div>
                                <div>Won: `+ thousandsSeparate(value) + `k (` + that.state.chartData.won.deals[params.dataIndex] + ` deals)</div>
                                    <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.state.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.state.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            }
                        }
                    },
                    {
                        name: 'Solid',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.solid.data,
                        itemStyle: {
                            normal: {
                                color: '#367aa3',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.solid.data[params.dataIndex] / 1000);
                                let result =
                                    `<div>
                                <div>Solid: `+ thousandsSeparate(value) + `k (` + that.state.chartData.solid.deals[params.dataIndex] + ` deals)</div>
                                <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.state.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.state.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            }
                        }
                    },
                    {
                        name: 'At Risk',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.atRisk.data,
                        itemStyle: {
                            normal: {
                                color: '#c69f36',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.atRisk.data[params.dataIndex] / 1000);

                                let result =
                                    `<div>
                                <div>At Risk: `+ thousandsSeparate(value) + `k (` + that.state.chartData.atRisk.deals[params.dataIndex] + ` deals)</div>
                                <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.state.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.state.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            },
                        },
                    },
                    {
                        name: 'Key Stretch',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.keyStretch.data,
                        itemStyle: {
                            normal: {
                                color: '#eb7800',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.keyStretch.data[params.dataIndex] / 1000);
                                let result =
                                    `<div>
                                    <div>Key Stretch: `+ thousandsSeparate(value) + `k (` + that.state.chartData.keyStretch.deals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            },
                        },
                    },
                    {
                        name: 'Stretch',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.stretch.data,
                        itemStyle: {
                            normal: {
                                color: '#940a00',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.stretch.data[params.dataIndex] / 1000);
                                let result =
                                    `<div>
                                <div>Stretch: `+ thousandsSeparate(value) + `k (` + that.state.chartData.stretch.deals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            },
                        },
                    },
                    {
                        name: 'NIR',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.NIR.data,
                        itemStyle: {
                            normal: {
                                color: '#606060',
                                barBorderRadius:2,
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let value = Math.round(that.state.chartData.NIR.data[params.dataIndex] / 1000);
                                let result =
                                    `<div>
                                <div>NIR: `+ thousandsSeparate(value) + `k (` + that.state.chartData.NIR.deals[params.dataIndex] + ` deals)</div>
                                </div>`;
                                return result;
                            },
                        },
                    },
                    {
                        name: 'Budget & Delta',
                        type: 'bar',
                        stack: 'one',
                        data: this.state.chartData.delta.data,
                        itemStyle: {
                            normal: {
                                color: '#e2e2e2'
                            }
                        },
                        tooltip: {
                            formatter: function (params) {
                                let result = '<div>Delta: $' + thousandsSeparate(Math.round(that.state.chartData.delta.data[params.dataIndex] / 1000)) + 'k</div>';
                                return result;
                            }
                        }
                    }
                ]
            };
            this.setState({ chartOptions: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleClickActionChats(e) {
        let actionStatusList = this.state.disableActions;
        if (e.target.innerText === '') {
            actionStatusList[e.target.nextElementSibling.innerText] = !actionStatusList[e.target.nextElementSibling.innerText];
        } else {
            actionStatusList[e.target.innerText] = !actionStatusList[e.target.innerText];
        }
        if (e.target.innerText !== 'Budget & Delta') {
            this.calculateDelta(actionStatusList);
        }
        this.forceUpdate();
        this.renderChart(actionStatusList);
        this.clickChartStatus("weeklySmallChartStatus", actionStatusList);
        this.setState({ disableActions: actionStatusList });
    }

    clickChartStatus(chartName, ChartStatus) {
        let userSettingTemp = this.props.userConfig;
        userSettingTemp[chartName] = ChartStatus;
        this.setState({
            largerStatus: ChartStatus
        })

        this.props.dispatch(setuserConfig(userSettingTemp));

        this._networkInstance.postDataRequest(URL.profile.setUserSetting, userSettingTemp);
    }

    componentDidUpdate() {
        this.actionsListData();
    }
    calculateDelta(legends) {
        try {
            if (this.state.chartData.atRisk.data.length === 13 && this.state.chartData.solid.data.length === 13 && this.state.chartData.won.data.length === 13) {
                let arr = [];
                for (let i = 0; i < 13; i++) {
                    let delta = this.state.chartData.budget[0];
                    if (legends["At Risk"]) {
                        delta = delta - this.state.chartData.atRisk.data[i];
                    }
                    if (legends["Won"]) {
                        delta = delta - this.state.chartData.won.data[i];
                    }
                    if (legends["Solid"]) {
                        delta = delta - this.state.chartData.solid.data[i];
                    }
                    if (legends["Key Stretch"]) {
                        delta = delta - this.state.chartData.keyStretch.data[i];
                    }
                    if (legends["Stretch"]) {
                        delta = delta - this.state.chartData.stretch.data[i];
                    }
                    if (legends["NIR"]) {
                        delta = delta - this.state.chartData.NIR.data[i];
                    }
                    if (delta > 0) {
                        arr[i] = delta;
                    } else {
                        arr[i] = 0;
                    }
                }
                this.state.chartData.delta.data = arr;
            }
        } catch (error) {
            console.log(error);
        };
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    toogleModel(e) {
        this.setState({ showModal: true });
    }

    closeDropListPan(e) {
        if (![...e.target.classList].includes('charsActionList') && ![...e.target.classList].includes('whiteColor')) {
            this.setState({
                displayActions: true
            })
        }
    }
    enableActionButtons(e) {
        e.stopPropagation();
        this.setState(prevState => ({
            displayActions: !this.state.displayActions
        }));
    }

    actionsListData() {
        let tempList = [],
            index = 0;
        for (let [key, val] of Object.entries(this.state.actionsColor)) {
            let enableDefAction = '';
            let IconClass = 'charActionIcon';
            index++;
            // add a style for disable default action 
            if (!this.state.disableActions[key]) {
                if (Object.is('Budget & Delta', key)) {
                    IconClass = 'charActionIcon expandDisBudgetIcon';
                    val= 'unset';
                } else {
                    val= '#ababab';
                }
                enableDefAction = 'disableActionOptions ds-float-left column-list-'+index;
                
            } else {
                if (Object.is('Budget & Delta', key)) {
                    IconClass = 'charActionIcon expandBudgetIcon';
                    val= 'unset';
                }
                enableDefAction = 'enableActionOptions ds-float-left column-list-'+index;
            }

            tempList.push(
                <div className={enableDefAction} key={key} onClick={this.handleClickActionChats.bind(this)}>
                    <div className={IconClass} style={{ backgroundColor: val }}></div>
                    <div className="charActionText">{key}</div>
                </div>
            );
        }
        return tempList;
    }

    render() {
        let showModalValue = this.state.showModal;
        let settingIconStatus = this.state.displayActions ? 'expandSetIcon close' : 'expandSetIcon show';
        let accordionShow = this.state.displayActions ? '38px' : '0px';
        let settingIconColor = this.state.displayActions ? 'BlueColor' : ' whiteColor';
        let toolTipText = this.state.displayActions ? 'Hide Legend' : 'Show Legend';
        let chartStyle = this.state.displayActions ? { height: '260px' }: { height: '298px' };


        return (
            <Row className={'sub-layout'}>
                <Col className="chart-row" span={12} id='eCharts'>
                    <Card id={'byWeek-Chart'}>
                        <div className='weeklyTitle'><span>Weekly Forecast - QTD</span></div>
                        <Tooltip title={toolTipText} placement={'bottom'} fontSize={13}><div className={settingIconStatus} ref={this.chartContainer} onClick={this.enableActionButtons.bind(this)}>
                        </div></Tooltip>
                        <Tooltip title='Expand to Larger View' placement={'bottom'} fontSize={13}><div className="expandIcon" onClick={this.toogleModel.bind(this)}></div></Tooltip>
                        <div aria-expanded={this.state.displayActions} className='accordionOutSide'>
                            <div className='ds-accordion-container ds-expand-all ds-margin-top-0' id="accordion-example-1" aria-label="W3DS Accordion Expand All Example">
                                <div className="ds-row ds-accordion-item ds-open" aria-controls="ds-accordion-slidedown" aria-expanded={this.state.displayActions} role="accordion item" tabIndex="0" style={{border: 'unset'}}>
                                    <div className="ds-accordion-slidedown ds-open accordionBackcolor ds-float-right" aria-hidden={!this.state.displayActions} role="region" style={{height: accordionShow}}>
                                        <div className="chartListContainer ds-margin-bottom-0 cancelSelect ds-col-12">
                                            {this.actionsListData()}
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        <ReactEcharts option={this.state.chartOptions} onEvents={this.state.chartEvents} style={chartStyle} />
                    </Card>
                </Col>
                <Modal isopen={showModalValue} chartData={this.state.chartData} chartOptions={this.state.chartOptions} close={this.closeModal.bind(this)} chartStatus={this.state.largerStatus} clickLargerChartStatus={this.clickChartStatus.bind(this)} createFilter={this.createFilter.bind(this)}></Modal>
            </Row>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        briefInfo: state.brifInfo,
        userConfig: state.userConfig
    }
}
export default connect(mapStateToProps)(WeeklyForecast);