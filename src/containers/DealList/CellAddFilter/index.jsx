import React from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Col } from '../../../vendors/reactW3DS'
import ConditionQuery from '.././ConditionQuery';
import { addFilterData, setFilterApplyStatus, setFilterOpenStatus, updateFilterData } from '../../../actions/dealListAction'
import {getTranslateLanguage} from "../../../util/BaseLanguage";
import HighlightMatchingDropdownList from "../../../vendors/reactW3DS/dropdown/highlightList";

class CellAddFilter extends React.Component {
    tagsGroupArray = null;
    queryGroupArray = null;
    tagsQueryArray = [];
    constructor(props) {
        super(props);

        this.state = {
            isHiddenApply: false,
            queryName: '',
            isOpenFilter: !props.isFromTags && props.openDraws,
            isCondition: false,
            conditionFristFiled: '',
            currentId: 0,
            applyDisable: true,
            filterFieldSearchText: '',
            isRemoveDataNull: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isFromTags !== nextProps.isFromTags || this.props.openDraws !== nextProps.openDraws) {
            this.setState({
                isOpenFilter: !nextProps.isFromTags && nextProps.openDraws
            });
        }
    }

    handleGetQueryList(event) {
        this.setState({
            isOpenFilter: true
        });
    }
    handleSetTagsGroup(groupArray = false) {
        let queryArray = {},
            parametersVal = null;
        if (JSON.stringify(groupArray) !== '{}') {
            queryArray[groupArray['querNameId']] = [{
                'operator': groupArray['conditionId'],
                'parameters': typeof groupArray['displayValue'] === 'string' ? [groupArray['displayValue']] : groupArray['displayValue']
            }]
        }

        this.tagsGroupArray = groupArray;
        if(this.tagsGroupArray && this.tagsGroupArray.displayValue && this.tagsGroupArray.displayValue.length>0){
            this.props.dispatch(setFilterApplyStatus(false));
        }
        this.queryGroupArray = null;
        this.queryGroupArray = queryArray;
    }
    handleApplyClick(event) {
        //no modif the value only click apply button
        if (this.tagsGroupArray.isEdit) {
            this.props.dispatch(updateFilterData(this.props.filterArryIndex, this.tagsGroupArray));
        } else {
            this.props.dispatch(addFilterData(this.tagsGroupArray));
        }
        this.props.dispatch(setFilterOpenStatus(false));
        this.handleCannelClick();
    }
    handleDrawCancel(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.setState({
                isOpenFilter: false,
                filterFieldSearchText: ''
            });
        }
    }
    ApplayIsDiplay = (Isdisplay = true, isRemoveDataNull = false) => {

        this.props.dispatch(setFilterApplyStatus(Isdisplay));
        this.setState({
            isRemoveDataNull: isRemoveDataNull
        });
    }
    displayFilterFiled = () => {
        return this.props.openDraws;
    }
    handleCannelClick = () => {
        this.props.dispatch(setFilterOpenStatus(false));
        this.setState({
            isCondition: false,
            applyDisable: true,
            isFromTags: false,
            isOpenFilter: false,
            filterFieldSearchText: ''
        });
        this.props.cancelDarw(false);
    }
    displayApplyButton(isHidden) {
        isHidden ? isHidden : false;
        this.setState({
            isHiddenApply: isHidden
        })
    }
    handleClickFilterOptions(event, index, obj) {
        this.setState({
            isOpenFilter: false,
            filterFieldSearchText: '',
            isCondition: true,
            conditionFristFiled: this.props.filterListData[index],
            currentId: index
        })
    }

    /**
     * triggered when user enter text to filter/search Filter Field in Custom Filter
     * @param event
     */
    handleCustomFilterFieldSearchBoxChanged(event) {
        let filterText = '';
        if (event && event.target && event.target.value) {
            filterText = event.target.value;
        }
        if (this.state.filterFieldSearchText !== filterText) {
            this.setState({filterFieldSearchText: filterText});
        }
    }

    getMultiQueryData(multiKey, multiVal) {
        if (this.props.isFromTags) {
            this.props.getTagsMultiData(multiKey, multiVal)
        } else {
            this.props.getMultiDatas(multiKey, multiVal)
        }

    }

    componentDidMount() {
        if(typeof(this.props.getMultiDatas)==='object'){
            this.tagsGroupArray = JSON.parse(JSON.stringify(this.props.getMultiDatas))
        }
    }

    render() {
        let drawStyle = this.props.openDraws ? 'auto' : '0px',
            drawZindexStyle = this.props.openDraws ? '100' : '-1',
            buttonOrTagsCol = this.state.showTagsDraw ? 9 : 12,
            ariaHidden = this.state.isOpenFilter ? 'block' : 'none',
            optionStyle = this.state.isOpenFilter ? 'auto' : '0',
            openFilterDrawStyle = ' ds-row ds-tray ds-tray-click-open addFilterDarw-0 ',
            applyButtonDisplay = 'ds-button ds-small ds-disabledbutton ds-displaybutton';
        //use for tag edit
        let isFromCondition = this.state.isCondition,
            FirstVal = this.state.conditionFristFiled,
            currentId = this.state.currentId,
            isDisableButton = this.state.applyDisable
        // eidt tag control apply button state
        if (this.props.isFromTags) {
            isFromCondition = this.props.isFromTags;
            currentId = this.props.getMultiDatas.id;
            FirstVal = this.props.getMultiDatas.queryName;

            if (this.tagsGroupArray && this.tagsGroupArray.displayValue.length === 0) {
                isDisableButton = true
                if (this.tagsGroupArray.querNameId === 'LBS_NEWFORECASTING_DATE') {
                    isDisableButton = false
                }
            } else if (this.state.isRemoveDataNull) {
                isDisableButton = true
            } else {
                isDisableButton = false
            }

        }

        if (this.props.openDraws) {
            openFilterDrawStyle += 'ds-open';
        }
        if (this.props.getDealListFilterStatus.apply) {
            applyButtonDisplay += ' ds-disabled';
        }

        let openState = this.props.openDraws;
        if (!this.props.getDealListFilterStatus.open) {
            openState = false
        }
        return (
            <div>
                {openState ?
                    <div className="ds-col-12" onBlur={this.handleDrawCancel.bind(this)}>
                        <div id="tray-nav-click" className={openFilterDrawStyle}
                            aria-hidden={this.props.openDraws} style={{ height: drawStyle, zIndex: drawZindexStyle }} role="dialog" tabIndex="-1">
                            <div className="ds-col-xs-12" style={{ paddingLeft: '0px', paddingTop: '20px' }}>
                                {
                                    isFromCondition ?
                                        <ConditionQuery
                                            displayOptions={this.props.filterListData}
                                            firstDefaultVal={FirstVal}
                                            filterOptionsData={this.props.filterOptionsDatas}
                                            curId={currentId}
                                            isTagsFrom={this.props.isFromTags}
                                            tagsEditJson={this.props.getMultiDatas}
                                            getTagsGroup={this.handleSetTagsGroup.bind(this)}
                                            getMultiQueryDatas={this.getMultiQueryData.bind(this)}
                                            getMultiOptionsData={this.props.getMultiOptionDatas}
                                            isHiddenBottomButton={this.displayApplyButton.bind(this)}
                                            isDisplayApple={this.ApplayIsDiplay.bind(this)}
                                            showNoResult={this.props.showNoResult}
                                        />
                                        :
                                        <Col span={12} otherClass='queryLeft InputFiledsBorder'>
                                            <Col span={11} otherClass='nullPadding ds-col-xs-11'>
                                                <input id="DLByLineItem-Input" type="text" className="ds-input ds-condition multiQueryInput" name="search-input"
                                                    readOnly='value'
                                                    onClick={this.handleGetQueryList.bind(this)}
                                                    data-value="input" placeholder='    Select field...' tabIndex="1"
                                                    autoComplete="off" spellCheck="false" />
                                            </Col>
                                            <Col span={1} otherClass='ds-col-xs-1 iconNoPadding'>
                                                <span id="DLByLineItem-DownButton" className='ds-icon-size-default ds-icon-caret-down-fill' data-value='icon-query'
                                                    onClick={this.handleGetQueryList.bind(this)}
                                                ></span>
                                            </Col>
                                        </Col>
                                }
                                {this.state.isOpenFilter ?
                                    <Col span={12} otherClass='queryLeft fieldsOptionsList'>
                                        <input type={'text'}
                                               className={'ds-input ds-inputText'}
                                               placeholder={getTranslateLanguage('TypeToFilterList')}
                                               onChange={this.handleCustomFilterFieldSearchBoxChanged.bind(this)}
                                               value={this.state.filterFieldSearchText}
                                               autoFocus
                                        />
                                        <div id="DLByLineItem-FieldOption"
                                             className="ds-options ds-options-override filterScrollTop" role="group"
                                             style={{height: optionStyle, display: ariaHidden, zIndex: '999'}}>
                                            <HighlightMatchingDropdownList
                                                optionList={this.props.filterListData}
                                                matchingText={this.state.filterFieldSearchText}
                                                onOptionClicked={this.handleClickFilterOptions.bind(this)}
                                                optionItemClassName={'filterLiStyle'}/>
                                        </div>
                                    </Col>
                                    : []}
                                <Col span={12} otherClass='queryLeft' style={{ zIndex: '99' }}>
                                    <Col span={3} key={29} otherClass='queryApply queryNApply queryApplyStyle'>
                                        <button id="DLByLineItem-ApplyButton" className={applyButtonDisplay}
                                            disabled={this.props.getDealListFilterStatus.apply}
                                            onClick={this.handleApplyClick.bind(this)}
                                        >Apply</button>
                                    </Col>
                                    <Col span={5} key={39} otherClass='queryCancel queryCancelStyle'>
                                        <button id="DLByLineItem-CancelButton" className="ds-button ds-small ds-width-auto ds-cancle-button"
                                            onClick={this.handleCannelClick.bind(this)}>Cancel</button>
                                    </Col>
                                </Col>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <Col span={12} key={4}>

                        </Col>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        getDealListFilterStatus: state.getDealListFilterStatus
    }
}

export default connect(mapStateToProps)(CellAddFilter);

CellAddFilter.propTypes = {
    className: PropTypes.string,
    hiddenApply: PropTypes.bool,
    getMultiOptionDatas: PropTypes.array,
    isFromTags: PropTypes.bool
};

CellAddFilter.defaultProps = {
    className: '',
    hiddenApply: false,
    getMultiOptionDatas: [],
    isFromTags: false
};
