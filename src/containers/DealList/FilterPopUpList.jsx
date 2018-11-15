import React from 'react';
import PropTypes from 'prop-types'
import {Col, IconInput,Tooltip,Icon} from '../../vendors/reactW3DS'
import {connect} from 'react-redux';
import CellAddFilter from "./CellAddFilter";
import CellTags from "./CellTags";
import {setFilterApplyStatus, setFilterStatus, setInputText } from '../../actions/dealListAction'

class FilterPopUpList extends React.Component {
    queryText='';
    tagsArrayDatas = [];
    filterListData = [];
    addButtonStyle = false
    constructor(props) {
        super(props);
        this.state = {
            displayAddButton: true,
            openDraw: false,
            queryText:'',
            showTagsDates: false,
            buttonWidthNum: 5,
            buttonaddWidth: 5,
            isFromTags:false,
            reRender:1,
            clickClearButton: false
        }
    }

    componentWillReceiveProps(Props) {
        if(Props.getDealListFilterData && Props.getDealListFilterData.length>0 && this.state.displayAddButton){
            this.setState({
                displayAddButton:false,
                clickClearButton: true});
            this.props.dispatch(setInputText(''));
        }
    }

    componentDidUpdate(){

    }
    getMultiData (multiKey, multiVal) {
        this.props.getMultiDatas(multiKey, multiVal);
    }
    handleClickFilterFiled (event) {
        //open one edit draw and add button disable
        // if (this.addButtonStyle) return;
        if(this.props.getDealListFilterStatus.open){
            return;
        }
        if (event.target.tagName === 'SPAN') {
            event.target.nextElementSibling.style.backgroundColor='#d1d1d1';
        } else {
            event.target.style.backgroundColor='#d1d1d1';
        }
        this.setState({
            openDraw: true
        })
        this.props.dispatch(setFilterStatus({open:true, apply:true}));     
    }

    getQueryDatas () {
        let queryArrayJson = {}
        if (this.tagsArrayDatas.length > 1) {
            for (let i = 0; i < this.tagsArrayDatas.length; i++) {
                if (queryArrayJson[this.tagsArrayDatas[i].querNameId]) {
                    queryArrayJson[this.tagsArrayDatas[i].querNameId].push({
                        'operator': this.tagsArrayDatas[i].conditionId,
                        'parameters': typeof this.tagsArrayDatas[i].displayValue === 'string' ?
                            [this.tagsArrayDatas[i].displayValue]: this.tagsArrayDatas[i].displayValue 
                    })
                } else {
                    queryArrayJson[this.tagsArrayDatas[i].querNameId] = [{
                        'operator': this.tagsArrayDatas[i].conditionId,
                        'parameters': typeof this.tagsArrayDatas[i].displayValue === 'string' ?
                            [this.tagsArrayDatas[i].displayValue]: this.tagsArrayDatas[i].displayValue 
                    }]
                }
            }
        }
        return queryArrayJson;
    }

    changeAddButtonStyle () {
        this.setState({
            showTagsDates:true,
            buttonText:'',
            buttonWidthNum: 1,
            buttonaddWidth:8
        })
    }

    updateCustomTagDatas (tagDatas) {
        for (var i = 0; i < this.tagsArrayDatas.length; i++) {
            if (this.tagsArrayDatas[i].tagId === tagDatas.tagId) {
                this.tagsArrayDatas[i] = tagDatas
            }
        }
    }
    getInputContent (inputContent, isClear) {
        if (this.state.clickClearButton && inputContent === undefined) {
            isClear = '';
        }
    }

    handleClickFilterCancel (isFromTags) {
        if(document.getElementsByClassName('addStyle')[0]) {
            document.getElementsByClassName('addStyle')[0].style.backgroundColor='';
        } else {
            document.getElementsByClassName('addSysbro')[0].style.backgroundColor='';
        }

        this.props.dispatch(setFilterApplyStatus(true));
        this.setState({
            openDraw: false,
            isFromTags: isFromTags
        })
    }

    getFilters (inputContent) {
        this.queryText = inputContent;
        if (this.queryText !== '') {
            this.setState({
                clickClearButton: false                
            });
        }
        return this.props.getfilterTextChange(inputContent);
    }

    handleCutomSearchClick (e) {
        if(this.props.getDealListFilterStatus.open){
            return;
        }
        let tagsDatas = this.props.setTagsArray()
        if (tagsDatas.length > 0) {
            this.tagsArrayDatas = {}
            this.tagsArrayDatas = tagsDatas;
            this.changeAddButtonStyle()
        }
        this.setState(prevState => ({
          displayAddButton: !prevState.displayAddButton,
            queryText:'',
            openDraw: false,
            clickClearButton: true
        }));
        if(e.target.getAttribute('data-id')) {
            this.props.cancelFilterQuery();
        } else {
            this.getFilters('');
            this.setState({
                clickClearButton:true
            })
            this.props.dispatch(setInputText(''));
        }
    }
        


    updateAddButtonState(state) {
        this.addButtonStyle = state
    }

    createTagsAction() {
        let TagsArray = []
            for (var i = 0; i < this.props.getDealListFilterData.length; i++) {
                let tagCid = 'tag_' + this.props.getDealListFilterData[i]['tagId'];
                TagsArray.push(
                <Col span={6} id={tagCid} otherClass='queryTagsWidth queryNoLeft queryTag tagLine queryStyle' key={i}>
                        <CellTags
                            TagsArray={ this.props.getDealListFilterData[i]} 
                            filterListData={this.filterListData}
                            isTagsOpen={this.state.isFromTags}
                            upButtonState={this.updateAddButtonState.bind(this)}
                            getMultiOptionDatas={this.props.getMultiOptionsDatas}
                            filterListDatas={this.props.filterOptionsData}
                            editTagCancel={this.handleClickFilterCancel.bind(this)}
                            getMultiDatas={this.getMultiData.bind(this)}
                            showNoResult={this.props.showNoResult}
                            removeTags={i}/>
                </Col>
                )
            }
        return TagsArray;
    }
    sumTagMaxWidth (tagsArray = this.props.getDealListFilterData) {
        let bodyWidth = parseInt(document.getElementById('deal-list-by-line-item').offsetWidth,10);
        let addBtn = 0;
        if (document.getElementById('addBtn')) {
            addBtn = parseInt(document.getElementById('addBtn').getBoundingClientRect().left,10);
            if (bodyWidth - addBtn <= 474) {
                return true;
            } else {
                return false;
            }
        }
    }

    renderQuery () {
        let queryFilter = [],
            showText='',
            isRefresh=false;
        if (this.props.getDealListFilterData.length === 0) {
            showText = '+Add Filter';
            isRefresh=true;
        }
        else {
            showText = <Icon type="plus" className='plusIconButton'/>;
        }
        let addButton = isRefresh ? 'addFilterButton': 'addSys',
            addButtonBro = isRefresh ? 'ds-input addStyle': 'ds-input addSysbro';
        let classStr = 'popUpFilter';
        if (this.sumTagMaxWidth()) {
            classStr = classStr + ' maxButtonStyle';
        }
            queryFilter.push(
                <Col span={5} key={'qu_' + 1} otherClass={addButton}>
                    <Col otherClass={addButton}>
                        <div type='text' id='addBtn' className={addButtonBro} readOnly="value"
                        disabled
                        onClick={this.handleClickFilterFiled.bind(this)}
                            cutom-style='icon-button' defaultValue='Add Filter'tabIndex="2">{showText}</div>
                    </Col>
                    <Col span={12} otherClass={classStr}>
                        <CellAddFilter filterListData={this.props.filterListData}
                            key={'xu_' + 1}
                            openDraws={this.state.openDraw}
                            cancelDarw={this.handleClickFilterCancel.bind(this)}
                            filterOptionsDatas={this.props.filterOptionsData}
                            getMultiDatas={this.getMultiData.bind(this)}
                            getMultiOptionDatas={this.props.getMultiOptionsDatas}
                            showNoResult={this.props.showNoResult}
                        />
                    </Col>
                </Col>
            );
        return queryFilter;
    }

    render() {
        this.filterListData = '';
        this.filterListData = this.props.filterListData;
        return (
            <div>
                {this.state.displayAddButton ?
                <div id='filterSearch'>
                    <Col span={6} key={1} otherClass='queryLeft noFloat'>
                        <IconInput inputid={'DlByLineItem-Input'} type='search' filterTextChange={this.getFilters.bind(this)}
                            placeholder="Search by owner, opportunity, account, or product"
                                queryCurText={this.state.queryText}
                                getInputText={this.getInputContent.bind(this)}/>
                    </Col>
                        <Col span={5} otherClass='jumpButton'>
                        <a id="DlByLineItem-JumpButton" className="ds-jumbutton" 
                            onClick={this.handleCutomSearchClick.bind(this)}>
                            Custom Search >>
                        </a>
                    </Col>
                </div>
                :
                <div className='filterRow'>
                        <Col key={2} className="gutter-row" otherClass='tooltipStyle' span={1} span_xs={1} ></Col>
                        <Col span={1} className="gutter-row" otherClass='backButton' id='backButton'>
                            <Tooltip title='Back to Basic Search' placement={'bottom'} fontSize={13}>
                                <button id='DlByLineItem-backButton' type='button' data-id='backButton'
                                    onClick={this.handleCutomSearchClick.bind(this)}
                                    className="ds-icon-size-default ds-icon-first-page">
                                </button>
                            </Tooltip>
                        </Col>
                    {this.props.getDealListFilterData.length > 0? this.createTagsAction():''}
                    {this.renderQuery()}
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        getDealListFilterData: state.getDealListFilterData,
        getDealListFilterStatus: state.getDealListFilterStatus
}}

export default connect(mapStateToProps)(FilterPopUpList);


FilterPopUpList.propTypes = {
    isTagsFrom: PropTypes.bool,
    getMultiOptionsDatas: PropTypes.array
};

FilterPopUpList.defaultProps = {
    isTagsFrom: false,
    getMultiOptionsDatas: []
};