import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Img, Loading, FilterDrop, Dropdown } from '../../vendors/reactW3DS'
import BaseNetwork from "../../util/BaseNetwork";
import {getTranslateLanguage} from "../../util/BaseLanguage";
import { setBriefInfo } from '../../actions/briefAction'
import { setFilterOpenStatus,clearDeaListData } from '../../actions/dealListAction'
import "./index.less"
import { browserHistory } from 'react-router'
import {URL} from '../../util/URL'

class BriefInfo extends React.Component {
    constructor(props) {
        super(props);
        this._networkInstance = BaseNetwork.getNetWorkInstance();
        this.state = {
            selectedNodeId: null,
            selectedQuarter: null,
            selectedRevenueType: null,
            nodeData: {},
            nodeList: [],
            quarterList: [],
            revenueTypeList: [],
            getNodeOwnerNameLength: this.getNodeOwnerNameLength.bind(this),
            quarterName:''
        }
    }

    componentWillMount() {
        if (!this.props.loginStatus || !this.props.loginAccess) {
            browserHistory.push('/login')
        }
    }

    componentDidMount() {
        if (this.props.loginUser) {
            this.requestDefaultData();
        }
    }

    requestDefaultData() {
        let params = { userId: this.props.loginUser };
        this._networkInstance.postDataRequest(URL.briefInfo.getDefaultNode, params,
            (response) => {
                this.setState({
                    nodeData: response.data.node,
                    selectedQuarter: response.data.node.defaultTimeperiodId,
                    selectedNodeId: response.data.node.forecastNodeId,
                    quaterName: response.data.node.defaultTimeperiodName
                }, () => {
                    this.requestInfoByNodeID();
                    // this.setBriefInfoData();
                })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    requestInfoByNodeID() {
        this._networkInstance.postDataRequest(URL.briefInfo.loadNodeDetail, { nodeId: this.state.selectedNodeId },
            (response) => {
                this.setState({
                    quarterList: response.data.quarters,
                    revenueTypeList: response.data.revenueTypes,
                    nodeData: response.data.nodeDetail
                }, () => {
                    this.getUserAvatar(this.state.nodeData, response.data.nodeDetail.ownerPicture);
                    let quarter = null,
                        revenue = null,
                        newState ={},
                        quarterName =''
                    if (this.state.quarterList.length > 0) {
                        quarter = this.state.quarterList[0].timeperiodId;
                        quarterName = this.state.quarterList[0].timeperiodName;
                        for (let i = 0; i < this.state.quarterList.length; i++) {
                            let obj = this.state.quarterList[i];
                            if (obj.timeperiodId === this.state.selectedQuarter) {
                                quarter = this.state.selectedQuarter;
                                quarterName = obj.timeperiodName;
                            }
                        }
                        newState.selectedQuarter = quarter;
                        newState.quarterName = quarterName
                    }
                    if (this.state.revenueTypeList.length > 0) {
                        revenue = this.state.revenueTypeList[0];
                        for (let i = 0; i < this.state.revenueTypeList.length; i++) {
                            if (this.state.revenueTypeList[i] === this.state.selectedRevenueType) {
                                revenue = this.state.selectedRevenueType;
                            }
                        }
                        newState.selectedRevenueType = revenue;
                    }
                    if(quarter || revenue){
                        this.setState(newState, () => {
                            this.setBriefInfoData();
                        });
                    }else{
                        this.setBriefInfoData();
                    }
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getUserAvatar(nodeData, avtarId) {
        let obj = JSON.constructor();
        let url = URL.briefInfo.getNodePicture + avtarId;
        this._networkInstance.getDataRequest(url, JSON.stringify(obj),
            (response) => {
                if (response.data === '') {
                    this.setState({
                        nodeData: Object.assign({}, this.state.nodeData, { userAvatarbase64: '1' })
                    })
                } else {
                    this.setState({
                        nodeData: Object.assign({}, this.state.nodeData, { userAvatarbase64: response.data })
                    })
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * triggered when user select a node from node list
     * @param nodeID
     */
    onNodeListOptionClick = (nodeID) => {
        if(this.state.selectedNodeId === nodeID){
            return
        }
        this.setState({
            selectedNodeId: nodeID,
            nodeList: [],
            quarterList: [],
            revenueTypeList: [],
            nodeData: [],

        }, () => {
            // this.setBriefInfoData();
            this.requestInfoByNodeID();
            this.requestSetDefaultNode();
            this.forceUpdate();
        })
            this.props.dispatch(setFilterOpenStatus(false));
    }

    requestSetDefaultNode() {
        this._networkInstance.postDataRequest(URL.briefInfo.setDefaultNode, {
            'userId': this.props.loginUser,
            'nodeId': this.state.selectedNodeId,
        });
    }
    /**
     * triggered when node list request new data / change data
     * @param inputTxt
     */
    onRequestNodeListData = (inputTxt) => {
        if (inputTxt) {

        } else {
            if (this.props.loginUser) {
                this.requestNodeList();
            }
        }
    }

    requestNodeList() {
        let obj = JSON.constructor();
        let url = URL.briefInfo.loadForecastNodes + this.state.selectedNodeId + '/' + this.props.loginUser;
        this._networkInstance.getDataRequest(url, JSON.stringify(obj),
            (response) => {
                this.setState({ nodeList: response.data.nodes })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onQuarterChanged(key, name) {
        this.setState({ selectedQuarter: key, quarterName:name }, () => {
            this.setBriefInfoData();
        })
    }

    onRevenueTypeChanged(key) {
        this.setState({ selectedRevenueType: key }, () => {
            this.setBriefInfoData();
        })
    }

    /**
     * prepare display data for node list dropdown
     * @return {Array}
     */
    getNodeNameList() {
        let nameList = [];
        for (let i = 0; i < this.state.nodeList.length; i++) {
            let nodeNameInOption = this.state.nodeList[i].fullOwnerName ? this.state.nodeList[i].fullOwnerName : '';
            let obj = {};
            obj['ID'] = this.state.nodeList[i].nodeId;
            obj['Option'] = nodeNameInOption + ' (' + this.state.nodeList[i].nodeName + ')';
            obj['Title'] = nodeNameInOption === '' ? this.state.nodeList[i].nodeName : nodeNameInOption;
            nameList.push(obj);
        }
        return nameList;
    }
    prepareQuarterListData() {
        let data = [],
            originData = this.state.quarterList;
        for (let i = 0; i < originData.length; i++) {
            data[i] = {};
            data[i].key = originData[i].timeperiodId;
            data[i].value = originData[i].timeperiodName;
        }
        return data;
    }
    prepareRevenueTypeListData() {
        let data = [],
            originData = this.state.revenueTypeList;
        for (let i = 0; i < originData.length; i++) {
            data[i] = {};
            data[i].key = originData[i];
            data[i].value = getTranslateLanguage(originData[i], 'revenue-Type');
        }
        return data;
    }
    filterChange = (inputTxt) => {
        if (inputTxt) {
            this.requestFilterList(inputTxt);
        } else {
            if (this.props.loginUser) {
                this.requestNodeList();
            }
        }
    }

    requestFilterList(filterCondition) {
        this._networkInstance.postDataRequest(URL.briefInfo.filterNodes, {
            'userId': this.props.loginUser,
            'nodeId': this.state.selectedNodeId,
            'condition': filterCondition
        },
            (response) => {
                this.setState({ nodeList: response.data.nodes });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getNodeOwnerNameLength(name) {
        if (!name) {
            return 0;
        }
        let len = 0;
        for (let i = 0; i < name.length; i++) {
            if (name.charCodeAt(i) > 127 || name.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    }


    render() {
        let nodeOwnerName = '',
            ready = this.isDataReady(),
            nodeName = '',
            charNum = 0,
            nodeOwnerStyle = '';
        if (ready) {
            nodeOwnerName = this.state.nodeData.ownerFullName;
            nodeName = this.state.nodeData.nodeName;
            // if node owner name is blank, display node name at the top
            if (!nodeOwnerName) {
                nodeOwnerName = nodeName;
                nodeName = '';
            }
        }

        charNum = this.getNodeOwnerNameLength(nodeOwnerName);
        
        if (charNum <= 12) {
            nodeOwnerStyle = 'nodeOwnerName48Style'
        } else if (13 <= charNum && charNum <= 16) {
            nodeOwnerStyle = 'nodeOwnerName40Style'
        } else if (17 <= charNum && charNum <= 22) {
            nodeOwnerStyle = 'nodeOwnerName32Style'
        } else if (charNum >= 23) {
            nodeOwnerStyle = 'nodeOwnerName24Style'
        }
            
        return (
            <Row className={'sub-layout'}>
                <div className={ready ? '' : 'hideblock'}>
                    <Card id={'briefinfo'} otherClass=' totalHeight '>
                        <Col span={3} span_xs={5} span_s={4} span_m={4} span_l={3} span_xl={3} noGutter={true}>
                            <div className='avatarStyle'>
                                <Img id={'node-img'} src={this.state.nodeData.userAvatarbase64} imgSize='large' brokenUrl='profile' width={'6em'} picStyle='radius' />
                            </div>
                        </Col>
                        <Col span={9} span_xs={7} span_s={8} span_m={8} span_l={9} span_xl={9} otherClass='ds-max-width'>
                            <div className={ready ? '' : 'hideblock'}>
                                <Row key='542'>
                                    <div id='node-owner' className='nodeListyPadding'>
                                        <FilterDrop id={'node-filter'}
                                            dropTitle={nodeOwnerName}
                                            optionList={this.getNodeNameList()}
                                            titleId={'node-title'}
                                            titleDropDownId={'nl-title-dropdown'}
                                            titleClass={nodeOwnerStyle}
                                            onClickOption={this.onNodeListOptionClick.bind(this)}
                                            onReqDropData={this.onRequestNodeListData.bind(this)}
                                            filterChange={this.filterChange.bind(this)}
                                            noDataWaring={getTranslateLanguage('NoValsWaring')}
                                        />
                                        <div id="nl-nodeName" className='nodeNameStyle'>
                                            {nodeName}
                                        </div>
                                        <Col span={5} otherClass='nodeNullPaddingQuter'>
                                            <Dropdown id={'node-quarter'} defaultValue={''} key='22'
                                                title3Class={'title2Class'}
                                                defaultKey={this.state.selectedQuarter}
                                                optionList={this.prepareQuarterListData()}
                                                onSelectOptionChanged={this.onQuarterChanged.bind(this)} />
                                        </Col>
                                        <Row otherClass='nodeNullPadding'>
                                            <Col span={6} otherClass='nodeNullReun'>
                                                <Dropdown title3Class={'title3Class'} id={'node-revenueType'} defaultValue={''}
                                                    defaultKey={this.state.selectedRevenueType}
                                                    optionList={this.prepareRevenueTypeListData()}
                                                    onSelectOptionChanged={this.onRevenueTypeChanged.bind(this)} />
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Card>
                </div>
                <div className={ready ? 'hideblock' : ''}>
                    <Card id={'briefinfo'} otherClass=' totalHeight loadingContainer '>
                        <div><Loading key={0} style={{ fontSize: '26px', marginTop: '-1rem' }}></Loading></div>
                    </Card>
                </div>
            </Row>

        );
    }

    isDataReady() {
        if (this.state.selectedNodeId && this.state.selectedQuarter && this.state.selectedRevenueType &&
            Object.keys(this.state.nodeData).length > 0 &&
            this.state.quarterList.length > 0 &&
            this.state.revenueTypeList.length > 0
        ) {
            return true;
        }
        return false;
    }

    setBriefInfoData() {
        this.props.dispatch(clearDeaListData());
        this.props.dispatch(setBriefInfo({
            nodeId: this.state.selectedNodeId,
            quarter: this.state.selectedQuarter,
            revenueType: this.state.selectedRevenueType,
            quarterName: this.state.quarterName
        }));
    }
}

function mapStateToProps(state) {
    return {
        loginUser: state.loginUser,
        loginStatus: state.loginStatus,
        loginAccess: state.loginAccess,
    }
}

export default connect(mapStateToProps)(BriefInfo);