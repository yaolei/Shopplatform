import React from 'react'
import './index.less';
import {Row, Col, Card} from '../../vendors/reactW3DS';
import ReactEcharts from 'echarts-for-react';

export  default class linearGraph extends React.Component {

    getDemoOption(number) {
        let retArray = {
            1: {
                title: {
                    text: 'By Week',
                    textStyle: {
                        color: '#655b5e'
                    }
                },
                grid: {
                    show: true,
                },
                xAxis: {
                    type: 'category',
                    name: 'Weeks',
                    nameLocation: 'middle',
                    data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
                },
                yAxis: {
                    // type: 'category',
                    // data: ['$0k', '$10k', '$20k', '$30k']
                },
                series: [{
                    name: 'Sale',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 30, 12, 32, 11, 5, 52, 34, 13]
                }]
            },
            2: {
                title: {
                    text: 'Breakdown',
                    textStyle: {
                        color: '#655b5e'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name:'Breakdown',
                        type:'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'Won'},
                            {value:310, name:'Solid'},
                            {value:274, name:'At Risk'},
                            {value:235, name:'NIR'},
                            {value:400, name:'KEY'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            },
            3: {
                title: {
                    text: 'By Industry',
                    textStyle: {
                        color: '#655b5e'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Banking', 'Energy & Utilities', 'Life Sciences', 'Retail'],
                    bottom: '10px',
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['', '', '', '', '', '', '']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Banking',
                        type: 'line',
                        stack: 'Sum',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Energy & Utilities',
                        type: 'line',
                        stack: 'Sum',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Life Sciences',
                        type: 'line',
                        stack: 'Sum',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Retail',
                        type: 'line',
                        stack: 'Sum',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [320, 332, 301, 334, 390, 330, 320]
                    }
                ]
            }
        }
        return retArray[number];
    }
    hidStatus = true;
    constructor(props) {
        super(props);
        this.state = {
          isDisplay: true,
          isSDisplay: true,
          isTDisplay: true,
        };
    }

    setWorldStatus (key, status) {
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        switch (key) {
            case 'fir':
                this.timer = setTimeout(() => {
                  self.setState({
                    isDisplay: self.hidStatus
                  });
                }, 2000);
            break;            
            case 'sec':
                this.timer = setTimeout(() => {
                  self.setState({
                    isSDisplay: self.hidStatus
                  });
                }, 2000);
            break;            
            case 'thr':
                this.timer = setTimeout(() => {
                  self.setState({
                    isTDisplay: self.hidStatus
                  });
                }, 2000);
            break;
            default:
            break;
        }
    }
    handleMouseOver (e) {
        this.hidStatus = false
        this.setWorldStatus(e.target.getAttribute('cuid'));
    }
    handleMouseOut (e) {
        this.hidStatus = true
        this.setWorldStatus(e.target.getAttribute('cuid'));
    }
    render() {
        let chartStyle = {height: '346px'};
        return(
            <Row className={'sub-layout'}>
                <Col className="chart-row" span={12} id='linearGraph'>
                    <Card id={'byIndustry-Chart'} otherClass=' ds-thirdPanel'>
                        <div className = 'noticeWorld' id='admi' cuid= 'thr' onMouseOver={this.handleMouseOver.bind(this)}
                    onMouseOut={this.handleMouseOut.bind(this)}
                    style={{ display: !!this.state.isTDisplay ? "flex" : "none" }}>
                            What would you like to see here ?<br/>
                            Use Feedback button to tell us.
                        </div>
                        <ReactEcharts option={this.getDemoOption(3)} style={chartStyle}/>
                    </Card>
                </Col>
            </Row>
        );
    }
}



