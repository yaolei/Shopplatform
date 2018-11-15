import React from 'react'
import { Card, Row, Col } from '../../vendors/reactW3DS';
import { connect } from 'react-redux';
import BaseNetwork from "../../util/BaseNetwork";
import { Tooltip, Loading } from '../../vendors/reactW3DS';
import { thousandsSeparate } from '../../util/utility';
import {URL} from '../../util/URL'

import './index.less'

class TotalSummary extends React.Component {

    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            isLoading: true,
            data: {
                wonSolidAtrisk: 0,
                attainment: 0,
                keyStretch: 0,
                stretch: 0
            },
            allFontSize: ""
        };
    }

    componentDidMount() {
        // this.getTotalData();
    }

    componentWillReceiveProps(props) {
        if(props.briefInfo.nodeId && props.briefInfo.quarter && props.briefInfo.revenueType){
            if(props.briefInfo.nodeId !== this.props.briefInfo.nodeId || props.briefInfo.quarter !== this.props.briefInfo.quarter 
            || props.briefInfo.revenueType!== this.props.briefInfo.revenueType){
                this.getTotalData(props.briefInfo);
            }
        }
    }

    getTotalData(props) {
        this.setState({ isLoading: true });
        this._networkInstance.postDataRequest(URL.totalSummary.getTotalData, {nodeId:props.nodeId,revenueType:props.revenueType,timePeriodId:props.quarter},
            (res) => {                
                this.setState({ data: res.data },()=>{
                    this.checkLength();
                });
                this.setState({ isLoading: false });
            },
            (err) => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }

    getNumber(num){
        let number = Math.round(parseInt(num) / 1000);
        if ( number < 0 ) {
            number = 0 - number;
            number = '$(' + thousandsSeparate(number) + 'k)';
        } else {
            number = '$' + thousandsSeparate(number) + 'k';
        }
        return number;
    }

    checkLength(){
        if(this.getNodeOwnerNameLength(this.state.data.wonSolidAtrisk) 
        || this.getNodeOwnerNameLength(this.state.data.attainment)
        || this.getNodeOwnerNameLength(this.state.data.keyStretch)
        || this.getNodeOwnerNameLength(this.state.data.stretch) )
        {
            this.setState({
                allFontSize: "bodyFont"
            });
        }
        else {
            this.setState({
                allFontSize: ""
            });
        }
    }

    getNodeOwnerNameLength(num) {
        num = Math.round(parseInt(num) / 1000);
        let numString = num.toString();
        if (numString.length < 5) {
            return false;
        }
        if (numString.length >= 5) {
            return true;
        }
    }

    render() {
        let attainmentStyle = "TotalCountStyle CountStyle "
        if(this.state.data.attainment >= 100 ){
            attainmentStyle = attainmentStyle + 'positiveColor'
        }else if(this.state.data.attainment < 100){
            attainmentStyle = attainmentStyle + 'negativeColor'
        }
        return (
            <Row className={'sub-layout'}>
                <div className={this.state.isLoading ? 'hideblock' : ''}>
                    <Card id={"totalinfo"} otherClass=" totalHeight " bodyFontSizeClass= {this.state.allFontSize}>
                        <Col span={3} span_xl={3} span_l={6} span_m={6} span_s={6} span_xs={6} otherClass='totalCard'>
                            <div className='ds-col-12'>
                                <div href='#/' className="TotalCountStyle CountStyle">
                                    <Tooltip title={this.getNumber(this.state.data.wonSolidAtrisk)} placement={'top'} fontSize={13}>                                 
                                        <div className={ "ellipsis TotalAmountDown5Chars" }>{this.getNumber(this.state.data.wonSolidAtrisk)}</div>
                                    </Tooltip>
                                </div>
                                <div className='descriptText'>WSR</div>
                            </div>
                        </Col>
                        <Col span={3} span_xl={3} span_l={6} span_m={6} span_s={6} span_xs={6} otherClass='totalCard'>
                            <div className='ds-col-12'>
                                <div href='#/' className={attainmentStyle}>
                                    <div className='percent ellipsis TotalAmountDown5Chars'>
                                    {this.state.data.attainment}
                                        <span>%</span>
                                    </div>
                                </div>
                                <div className='descriptText'>WSR Attainment</div>
                            </div>
                        </Col>
                        <Col span={3} span_xl={3} span_l={6} span_m={6} span_s={6} span_xs={6} otherClass='totalCard'>
                            <div className='ds-col-12'>
                                <div href='#/' className="TotalCountStyle CountStyle">
                                    <Tooltip title={this.getNumber(this.state.data.keyStretch)} placement={'top'} fontSize={13}> 
                                        <div className={ "ellipsis TotalAmountDown5Chars" }>{this.getNumber(this.state.data.keyStretch)}</div>
                                    </Tooltip>
                                </div>
                                <div className='descriptText'>Key Stretch</div>
                            </div>
                        </Col>
                        <Col span={3} span_xl={3} span_l={6} span_m={6} span_s={6} span_xs={6} otherClass='totalCard'>
                            <div className='ds-col-12'>
                                <div href='#/' className="TotalCountStyle CountStyle">
                                    <Tooltip title={this.getNumber(this.state.data.stretch)} placement={'top'} fontSize={13}> 
                                        <div className={ "ellipsis TotalAmountDown5Chars" }>{this.getNumber(this.state.data.stretch)}</div>
                                    </Tooltip>
                                </div>
                                <div className='descriptText'>Stretch</div>
                            </div>
                        </Col>
                    </Card>
                </div>
                <div className={this.state.isLoading ? '' : 'hideblock'}>
                    <Card id={'totalinfo'} otherClass=' totalHeight loadingContainer '>
                        <div><Loading key={0} style={{ fontSize: '26px', marginTop: '-1rem' }}></Loading></div>
                    </Card>
                </div>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        briefInfo: state.brifInfo,
    }
}

export default connect(mapStateToProps)(TotalSummary);
