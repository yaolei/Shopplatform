import React from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Col, Row} from '../../../vendors/reactW3DS'
import CellAddFilter from ".././CellAddFilter";
import {removeFilterData, setFilterApplyStatus} from '../../../actions/dealListAction'
import { setFilterOpenStatus} from '../../../actions/dealListAction';

class CellTags extends React.Component {
    isAddTags=true
    tagData=null
    constructor(props) {
        super(props);
        this.state = {
            openDraw: this.props.isTagsOpen,
            isFromTags:true,
            enableApply: true
        }
        this.tagData = this.props.TagsArray;
    }
    componentWillMount() {
        this.props.dispatch(setFilterApplyStatus(false));
    }
    // format money
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
    formatMoney (value) {
        
        let number = Math.round(parseInt(value,10) / 1000);
        if (number === 0) {
            number = '1k';
        } else {
            number = this.thousandsSeparate(number) + 'k';
        }
        return number;
    }
    removeTags (event) {
        if(this.props.getDealListFilterStatus.open){
            return;
        }
        this.props.dispatch(removeFilterData(parseInt(this.props.removeTags)));
    }
    handleOpenDarw(event) {
        if(this.props.getDealListFilterStatus.open){
            return;
        }
        this.tagData = this.props.TagsArray;
        this.tagData.isEdit = true;
        this.setState({
            openDraw: true,
            isFromTags:true
        })
        this.props.upButtonState(true)
        this.props.dispatch(setFilterOpenStatus(true));
    }

    cancelTags (event) {
        this.tagData.isEdit = false;
        this.setState({
            openDraw:false,
            isFromTags:false,
        })
        this.props.upButtonState(false)
    }
    getCustomFilterQuery (event) {
        if (this.isAddTags) {
            this.props.getFilterJsonData(event);
        }
    }

    getTagsData (tagsData = true) {
        if (!tagsData.isEdit) {
            this.isAddTags = tagsData
        }
    }
    getTagsMultiDatas (multiKey, multiVal) {
        this.props.getMultiDatas(multiKey, multiVal)
    }
    render() {
        let displayText =''
        if (this.props.TagsArray.filedType === 'multi') {
            displayText = this.props.TagsArray.displayText;
        } else if (this.props.TagsArray.queryName === 'Date' && this.props.TagsArray.conditionId === 'is_between') {
            displayText = this.props.TagsArray.displayValue[0] +' and '+ this.props.TagsArray.displayValue[1];
        } else if (this.props.TagsArray.queryName === 'Amount') {
            if (this.props.TagsArray.conditionId === 'is_between') {
                displayText = '$' + this.formatMoney(this.props.TagsArray.displayValue[0]) +' and $'+
                this.formatMoney(this.props.TagsArray.displayValue[1]) + ' USD';
            } else {
                displayText = '$' + this.formatMoney(this.props.TagsArray.displayValue) + ' USD'
            }
        } else {
            displayText = this.props.TagsArray.displayValue;
        }
        if (this.props.TagsArray.querNameId === 'LBS_NEWFORECASTING_BRANCH' && displayText.indexOf('(') === -1) {
                displayText = displayText + ' ('+ this.props.TagsArray.displayValue +')';
        }
        let closeStyle = this.state.openDraw ? 'ds-close ds-button ds-flat ds-close-button clearIcon editClearIconSty':
            'ds-close ds-button ds-flat ds-close-button clearIcon';
        return (
            <Row key={this.props.TagsArray.id} otherClass='paddingTopUnset'>
                <Col span={12} otherClass='queryNoLeft micsoftPadding' key={this.props.TagsArray.id}>
                    <div className="ds-tag ds-color ds-dismissible ds-col-12 tagLineHei tagBorder" role="tag" aria-label="tag"
                       
                        data-id={this.props.TagsArray.tagId}>
                        <Row otherClass='paddingTopUnset'>
                            <div  onClick={this.handleOpenDarw.bind(this)} className='tagDivEdit'>
                                <Col span={3} span_xl={2} otherClass='tagsQueryName tagHeadSty'>{this.props.TagsArray.queryName}</Col>
                                <Col span={1} span_xl={1} otherClass='tagsCondition tagBodySty'>{this.props.TagsArray.conditionName}</Col>
                                {displayText !==''?
                                    <Col span={8} span_xl={6} otherClass='tagsQueryVal tagFootSty'>{displayText}</Col>:''}
                                <Col span={1} span_xl={1} otherClass='minWidthStyle'>
                                    <button type='button'
                                        onClick={this.handleOpenDarw.bind(this)}
                                        className="ds-icon-size-default ds-icon-caret-down-fill ds-icon-style addHandIcon addIconSty">
                                    </button>
                                </Col>
                            </div>
                            <Col span={1} span_xls={1}>
                                <button className={closeStyle}
                                    style={{height:20+'px'}}
                                    tabIndex={this.props.TagsArray.id}
                                    tagid={this.props.TagsArray.tagId}
                                    index={this.props.TagsArray.id} onClick={this.removeTags.bind(this)}>
                                    <span className="ds-icon-close" role="text"  aria-label="close" 
                                    tabIndex={this.props.TagsArray.id}
                                    tagid={this.props.TagsArray.tagId}
                                    index={this.props.TagsArray.id} ></span>
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                {this.state.openDraw ? 
                    <Col span={12}>
                        <CellAddFilter filterListData={this.props.filterListData}
                            cancelDarw={this.cancelTags.bind(this)}
                            openDraws={this.state.openDraw}
                            filterOptionsDatas={this.props.filterListDatas}
                            isFromTags={this.state.isFromTags}
                            getMultiDatas={this.tagData}
                            filterArryIndex={this.props.removeTags}
                            getMultiOptionDatas={this.props.getMultiOptionDatas}
                            getTagsData={this.getTagsData.bind(this)}
                            getTagsMultiData={this.getTagsMultiDatas.bind(this)}
                            getFilterJsonData={this.getCustomFilterQuery.bind(this)}
                            showNoResult={this.props.showNoResult}
                        />
                </Col>:''}
            </Row>
        );
    }
}
function mapStateToProps(state) {
    return{
        getDealListFilterData: state.getDealListFilterData,
        getDealListFilterStatus: state.getDealListFilterStatus
}}
export default connect(mapStateToProps)(CellTags);

CellTags.propTypes = {
    isTagsOpen: PropTypes.bool
};

CellTags.defaultProps = {
    isTagsOpen: false
};
