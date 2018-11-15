import React from 'react';
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import closeIcon from '../../assets/close.png';
import BaseNetwork from "../../util/BaseNetwork";
import { thousandsSeparate } from '../../util/utility';
import budgetDeltaIcon from '../../assets/budgetDeltaIcon.png';
import budgetDeltaIconDisabled from '../../assets/budgetDeltaIconDisabled.png';

import "./index.less"

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            showModal: true,
            legendSelected: {}
        };
    }

    componentWillMount() {
        let chartEvents = {
            'click': (params) => {
                this.props.createFilter(params);
            },
            'legendselectchanged': (params) => {
                this.setState({ legendSelected: params.selected });
                this.props.clickLargerChartStatus("largerChartStatus", params.selected);
            }
        };
        this.setState({
            chartEvents: chartEvents,
            legendSelected: this.props.chartStatus
        });
    }

    calculateDelta(legends) {
        try {
            if (this.props.chartData.atRisk.data.length === 13 && this.props.chartData.solid.data.length === 13 && this.props.chartData.won.data.length === 13) {
                let arr = [];
                for (let i = 0; i < 13; i++) {
                    let delta = this.props.chartData.budget[0];
                    if (legends["At Risk"]) {
                        delta = delta - this.props.chartData.atRisk.data[i];
                    }
                    if (legends["Won"]) {
                        delta = delta - this.props.chartData.won.data[i];
                    }
                    if (legends["Solid"]) {
                        delta = delta - this.props.chartData.solid.data[i];
                    }
                    if (legends["Key Stretch"]) {
                        delta = delta - this.props.chartData.keyStretch.data[i];
                    }
                    if (legends["Stretch"]) {
                        delta = delta - this.props.chartData.stretch.data[i];
                    }
                    if (legends["NIR"]) {
                        delta = delta - this.props.chartData.NIR.data[i];
                    }
                    if (delta > 0) {
                        arr[i] = delta;
                    } else {
                        arr[i] = 0;
                    }
                }
                return arr;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    setTooltip(series) {
        let arr = series;
        let that = this;
        arr.forEach((item, index) => {
            if (item.name === 'Key Stretch') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.keyStretch.data[params.dataIndex] / 1000);
                        let result =
                            `<div>
                                <div>Key Stretch: `+ thousandsSeparate(value) + `k (` + that.props.chartData.keyStretch.deals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                };
            } else if (item.name === 'Stretch') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.stretch.data[params.dataIndex] / 1000);
                        let result =
                            `<div>
                            <div>Stretch: `+ thousandsSeparate(value) + `k (` + that.props.chartData.stretch.deals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                };
            } else if (item.name === 'NIR') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.NIR.data[params.dataIndex] / 1000);
                        let result =
                            `<div>
                            <div>NIR: `+ thousandsSeparate(value) + `k (` + that.props.chartData.NIR.deals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                };
            } else if (item.name === 'At Risk') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.atRisk.data[params.dataIndex] / 1000);

                        let result =
                            `<div>
                            <div>At Risk: `+ thousandsSeparate(value) + `k (` + that.props.chartData.atRisk.deals[params.dataIndex] + ` deals)</div>
                            <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.props.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.props.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                }
            } else if (item.name === 'Solid') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.solid.data[params.dataIndex] / 1000);
                        let result =
                            `<div>
                            <div>Solid: `+ thousandsSeparate(value) + `k (` + that.props.chartData.solid.deals[params.dataIndex] + ` deals)</div>
                            <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.props.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.props.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                };
            } else if (item.name === 'Won') {
                arr[index].tooltip = {
                    formatter: function (params) {
                        let value = Math.round(that.props.chartData.won.data[params.dataIndex] / 1000);
                        let result =
                            `<div>
                            <div>Won: `+ thousandsSeparate(value) + `k (` + that.props.chartData.won.deals[params.dataIndex] + ` deals)</div>
                                <div style='margin-top:10px'>WSR: `+ thousandsSeparate(Math.round(that.props.chartData.WSR[params.dataIndex] / 1000)) + `k (` + that.props.chartData.WSRDeals[params.dataIndex] + ` deals)</div>
                            </div>`;
                        return result;
                    }
                };
            } else if (item.name === 'Budget & Delta') {
                arr[index].data = that.delta;
                arr[index].tooltip = {
                    formatter: function (params) {
                        let result = '<div>Delta: $' + thousandsSeparate(Math.round(that.delta[params.dataIndex] / 1000)) + 'k</div>';
                        return result;
                    }
                };
            }
        });
        return arr;
    }

    handleAfterCloseFunc = () => {
        this.props.close();
    }

    render() {
        let budgetDelta = budgetDeltaIcon;
        if(this.state.legendSelected['Budget & Delta'] === false) {
            budgetDelta = budgetDeltaIconDisabled;
        }
        let chartStyle = { height: '100%' };
        let chartOption = JSON.parse(JSON.stringify(this.props.chartOptions));
        let legendsSelected = this.state.legendSelected ? this.state.legendSelected : {};
        let deltaData = this.calculateDelta(legendsSelected);
        chartOption.title = {
            left: 'center',
            text: 'Weekly Forecast - QTD',
            textStyle: {
                color: '#655b5e',
                fontSize: 37
            },
            padding: [0, 50, 0, 0]
        };
        chartOption.grid = { left: 70, top: 95, bottom: 45, right: 20 };
        chartOption.legend = {
            data: [
                {name: 'Budget & Delta', icon: 'image://'+budgetDelta}, 
                {name: 'Won'}, 
                {name: 'Solid'}, 
                {name: 'At Risk'}, 
                {name: 'Key Stretch'}, 
                {name: 'Stretch'}, 
                {name: 'NIR'}
            ],
            align: 'left',
            right: 20,
            top: 57,
            selected: legendsSelected,
            inactiveColor: "#ababab"
        };
        chartOption.yAxis.axisLabel = {
            formatter: function (value, index) {
                value = value / 1000;
                return thousandsSeparate(Math.round(value)) + 'k';
            }
        };
        chartOption.yAxis.nameTextStyle = {
            fontSize: 13,
            lineHeight: 15,
            padding: [0, 0, 40, 0]
        };

        this.delta = deltaData;
        chartOption.series = this.setTooltip(chartOption.series);
        if (!this.props.isopen) {
            this.state.showModal = this.props.isopen;
        }
        return (
            <ReactModal className="content ds-fade-in weeklyChart" ariaHideApp={false} overlayClassName="overlay"
                isOpen={this.props.isopen} closeTimeoutMS={200} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true}
                onRequestClose={this.handleAfterCloseFunc}>
                <button onClick={this.props.close} className="btn-control cancelSelect">
                    <a href="javascript:void(0);" className="close_button"><img className="close_button_icon" src={closeIcon}></img></a>
                </button>
                <ReactEcharts option={chartOption} onEvents={this.state.chartEvents} style={chartStyle} />
            </ReactModal>
        )
    }
}

Modal.propTypes = {
    isopen: PropTypes.bool,
    close: PropTypes.func,
    clickStatus: PropTypes.func,
    chartStatus: PropTypes.object,
    clickLargerChartStatus: PropTypes.func,
    chartOptions: PropTypes.object
};

Modal.defaultProps = {
    isopen: false,
    close: () => {},
    clickStatus: () => {},
    chartStatus: {},
    clickLargerChartStatus: () => {},
    chartOptions: {}
};
function mapStateToProps(state) {
    return {
        loginUser: state.loginUser
    }
}
export default connect(mapStateToProps)(Modal);