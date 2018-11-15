import React from 'react';
import PropTypes from 'prop-types'
import {Col, MultiDrop} from '../../vendors/reactW3DS'
import CellAmount from './CellAmount'
import CellDate from './CellDate'
import {getTranslateLanguage} from "../../util/BaseLanguage";
import HighlightMatchingDropdownList from "../../vendors/reactW3DS/dropdown/highlightList";
export default class ConditionQuery extends React.Component {
    _seOptionsDatas = null;
    _currentOpenTarget = null;
    _sedCondition=null;
    _isBetweenArray=[];
    displayDateArray = [];
    _datasJson = {};
    _DateQueryVal=null;
    _selectedVal='';
    _dateJsonArray = [];
    _isChangeCondition = false;
    constructor(props) {
        super(props);
        this.state = {
            _openFristCondition: true,
            _openSecondCondition: true,
            _openThirdCondition: true,         
            _openFristConditionDraw: false,
            _openSecondConditionDraw: false,
            _openThirdConditionDraw: false,
            filterFieldSearchText: '',
            FirstDefaultIndex: this.props.firstDefaultVal

        }
        if (this.props.curId === 999) {
            this._seOptionsDatas = this.getOptionsDatas(this.props.tagsEditJson.querNameId);
        } else {
            this._seOptionsDatas = JSON.parse(JSON.stringify(this.props.filterOptionsData[this.props.curId]))
        }
        if (this._seOptionsDatas.type === 'date' && this._seOptionsDatas.default === 'next_7_days') {
            this._datasJson = {};
            this._datasJson = {
                'id': this._seOptionsDatas.id,
                'querNameId': this._seOptionsDatas.vname,
                'conditionId': this._seOptionsDatas.default,
                'displayValue': '',
                'queryName': this._seOptionsDatas.name,
                'filedType': this._seOptionsDatas.type,
                'conditionName': this.getSecondConditionText(),
            };
            this.props.getTagsGroup(this._datasJson);
            this.setApplyButtonState(false);
        }
    }
    getOptionsDatas = (cid) => {
        for (let i = 0; i < this.props.filterOptionsData.length; i++) {
            if (this.props.filterOptionsData[i].vname === cid) {
                 return this.props.filterOptionsData[i];
            }
        }
    }
    handleClickFristList (event) {
        if (this.state._openFristConditionDraw) {
            this.doConditionClose();
            return;
        }

        this._currentOpenTarget = event.target;
        this.setState({
            closeAllDarw:false,
            _openFristCondition: true,
            _openFristConditionDraw: true,
            _openSecondCondition: false,
            _openThirdCondition: false
        })
        this.props.isHiddenBottomButton(true);
    }

    // divide handleClickOptions into handleFieldOptionClicked and handleOperatorOptionClicked
    // to make code more clear
    handleFieldOptionClicked(event, index, obj) {
        this.setApplyButtonState(true, true);
        this._seOptionsDatas = JSON.parse(JSON.stringify(this.props.filterOptionsData[index]));
        this.handleConditionClose(event);
        this.setState({
            FirstDefaultIndex: this.props.displayOptions[index]
        })
        this._isChangeCondition = true
    }

    handleOperatorOptionClicked(event, key) {
        this.setApplyButtonState(true, true);
        this.resetStatus();
        this._seOptionsDatas.default = key;
        //set the third field to null
        this.upDataTags(this._seOptionsDatas);
        this.handleConditionClose(event);
        this._isChangeCondition = true
    }

    handleClickSecondList (event) {
        if (this.state._openSecondConditionDraw) {
            this.doConditionClose();
            return;
        }
        this._currentOpenTarget = event.target;
        this.setState({
            _openFristCondition: false,
            _openSecondCondition: true,
            _openSecondConditionDraw: true,
            _openThirdCondition: false
        })
        document.getElementsByTagName('input')[1].focus();
        this.props.isHiddenBottomButton(true);
    }    
    handleClickThirdList (event) {
        this.setState({
            _openFristCondition: false,
            _openSecondCondition: false,
            _openThirdCondition: true,
            _openThirdConditionDraw: true
        })
    }

    showIsBetween () {
        let arr = [];
        if (this._seOptionsDatas.default === 'is_between' && this._seOptionsDatas.type === 'currency') {
            arr.push (
                <Col span={12} otherClass='queryLeft' key={'cu_1'}>
                    <Col span={12} otherClass='nullPadding InputFiledsBorder' ref={(ref)=>this.focusInput=ref}>
                        <CellAmount key={4} isBetweenCurry={this} isEnableApplyButton={this.setApplyButtonState.bind(this)}
                            isTagsFrom={this.props.isTagsFrom}
                            tagsDatas={this.props.tagsEditJson}
                            isChangeAction={this._isChangeCondition}
                            applyCurrencyJson={this.getCurrencyData.bind(this)}/>
                    </Col>
                </Col>
            )
        } else if (this._seOptionsDatas.default === 'is_between' && this._seOptionsDatas.type === 'date') {
            arr.push (
                <Col span={12} otherClass='queryLeft InputFiledsBorder InputDateSecBorder' key={'date'}>
                    <Col span={12} otherClass='nullPadding InputDateFirBorder' ref={(ref)=>this.focusInput=ref}>
                        <CellDate  placesHoders={'End Date'} SecondIds={'secondeFiled'}
                            SecondIndx={this._seOptionsDatas.default} 
                            getDateVal={this.getDatesVal.bind(this)}
                            isTagsFrom={this.props.isTagsFrom}
                            tagsDatas={this.props.tagsEditJson}
                            isChangeAction={this._isChangeCondition}
                            isEnableApplyButton={this.setApplyButtonState.bind(this)}/>
                    </Col>
                </Col>
                )
        }
        return arr;
    }

    enableApplyButton (event) {
        if (event.target.value.length > 0) {
            this.setApplyButtonState(false);
            this.saveApplyArray(event, false);
        } else {
            this.setApplyButtonState(true);
            this.saveApplyArray(event, true);
        }
    }
    getCurrencyData (event, isSecond) {
        event = event.replace(/[\$,]/g, '');
        let currencyJson = [];
            if (this._seOptionsDatas.default === 'is_between') {
                if (isSecond === 'first') {
                    this._isBetweenArray[0] = parseInt(event,10);
                } else {
                    this._isBetweenArray[1] = parseInt(event,10);
                }
                currencyJson['target']={'value':this._isBetweenArray};
            } else {
                currencyJson['target']={'value':event};
            }
        this.saveApplyArray(currencyJson, false);
    }

    upDataTags (updateObj) {
        let constructorVal = {}
        if (this.props.isTagsFrom) {
            constructorVal['target'] = {'value':this.props.tagsEditJson.displayValue}
            this._sedCondition = this.getSecondConditionText()
            this.saveApplyArray(constructorVal)
        }
    }

    saveApplyArray (objArray, isClear = false) {
        let tagsGroup = {};
        if (!isClear || this.props.isTagsFrom) {
            let isTagEdit = false,
                tagMarkId = 0
            if (this.props.isTagsFrom) {
                isTagEdit = this.props.tagsEditJson.isEdit;
                 tagMarkId = this.props.tagsEditJson.tagId
            }
            tagsGroup = {
                id: this._seOptionsDatas.id,
                queryName: this.state.FirstDefaultIndex,
                querNameId:this._seOptionsDatas.vname,
                conditionName:this._sedCondition,
                conditionId: this._seOptionsDatas.default,
                filedType: this._seOptionsDatas.type,
                displayValue: objArray.target.value,
                displayText: this._selectedVal,
                isEdit: isTagEdit,
                tagId: tagMarkId
            };
        }
        this.props.getTagsGroup(tagsGroup);
    }

    handleClickCaretDown (event) {
        this.refs.getChildOpen.handleInputClick();
    }

    getMulti (event=false) {
        let arry = [];
            arry['target'] = {'value':event};
        this.saveApplyArray(arry, !event);
    }
    getMutiText (event=false) {
        if (event) {
            this._selectedVal = event;
        }
    }
    setApplyButtonState (displayState, isRemoveDataNull =false) {
        this.props.isDisplayApple(displayState, isRemoveDataNull);
    }

    getDatesVal (queryDateVal=false, filedId = false, type = false) {
        this._datasJson = {};
        if (!queryDateVal) {
            queryDateVal = '';
        } else if (type === 'is_between') {
            // when edit the date between and use the 
            if (this.props.tagsEditJson && this.props.tagsEditJson.filedType  === 'date' && 
                this.props.tagsEditJson.conditionId === 'is_between' && 
                this.props.tagsEditJson.isEdit && this.props.tagsEditJson.displayValue != '') {
                this._dateJsonArray = this.props.tagsEditJson.displayValue;
            }

            if (filedId === 'firstFiled') {
                this._dateJsonArray[0] = queryDateVal;
            } else if (filedId === 'secondeFiled') {
                this._dateJsonArray[1] = queryDateVal;
            }
            queryDateVal = this._dateJsonArray;
        }
        this._datasJson = {
            'id': this._seOptionsDatas.id,
            'querNameId': this._seOptionsDatas.vname,
            'conditionId': this._seOptionsDatas.default,
            'displayValue': queryDateVal,
            'queryName': this._seOptionsDatas.name,
            'filedType': this._seOptionsDatas.type,
            'conditionName': this.getSecondConditionText(),
        };
        if (this.props.isTagsFrom) {
            this._datasJson.isEdit = this.props.tagsEditJson.isEdit;
            this._datasJson.tagId = this.props.tagsEditJson.tagId;
        }
        this.props.getTagsGroup(this._datasJson);
    }
    resetStatus () {
        this._isChangeCondition = false
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

    getSecondConditionText() {
        let sencondText = ''
        for (let j = 0; j < this._seOptionsDatas.condtion.length; j++) {
            let seObject = this._seOptionsDatas.condtion[j],
                seVal = Object.values(seObject)[0],
                seKey = Object.keys(seObject)[0]
            if (seKey === this._seOptionsDatas.default) {
                sencondText = seVal
            }
        }
        return sencondText
    }
    handleConditionClose (event) {
        if(!event.currentTarget.parentElement.parentElement.contains(event.relatedTarget)) {
            this.doConditionClose();
        }
    }
    doConditionClose () {
        this.setState({
            _openFristConditionDraw: false,
            _openSecondConditionDraw: false,
            _openFristCondition: true,
            _openSecondCondition: true,
            _openThirdCondition: true,
            filterFieldSearchText: ''
        })
        this._isChangeCondition = true;
        if (this.displayDateArray.length > 0 && this._seOptionsDatas.type === 'date'
            && this.displayDateArray.indexOf(this._seOptionsDatas.default) !== -1) {
            this.getDatesVal();
            this.setApplyButtonState(false);
        }
        //reset the apply button state and display the apply button
        this.props.isHiddenBottomButton(false);
    }
    multiQueryChange (multiKey, multiVal) {
        this.props.getMultiQueryDatas(multiKey, multiVal);
    }
    render() {
        let conditionFrHeight = this.state._openFristConditionDraw ? 'auto' : '0px',
            conditionSecHidden = this.state._openFristConditionDraw ? 'queryLeft fieldsOptionsList InputHe' : 'queryLeft InputNullHe ',
            condition = this.state._openSecondConditionDraw ? 'queryLeft filterScrollTop' : 'queryLeft',
            conditionFrHidden = this.state._openFristConditionDraw ? 'block' : 'none',
            conditionFrZindex = this.state._openFristConditionDraw ? '999' : '-1',

            conditionSeHeight = this.state._openSecondConditionDraw ? 'auto' : '0px',
            conditionSeHidden = this.state._openSecondConditionDraw ? 'block' : 'none',
            conditionSeZindex = this.state._openSecondConditionDraw ? '999' : '-1',

            conditionThHeight = this.state._openThirdConditionDraw ? 'auto' : '0px',
            conditionThHidden = this.state._openThirdConditionDraw ? 'block' : 'none',
            conditionThZindex = this.state._openThirdConditionDraw ? '999' : '-1';
        this.displayDateArray = ['last_7_days','next_7_days','last_30_days','next_30_days',
                                'last_month','this_month','next_month','last_quarter',
                                'this_quarter','next_quarter','next_quarter','last_year',
                                'this_year','next_year'];
        let dateIconWidth = this._seOptionsDatas.type === 'date'? 12: 11;

        const filterSeDatas = [];
        let seDefaultVal = '';
        //only open edit tag darw don't modif the second val
        if (this.props.isTagsFrom && !this._currentOpenTarget) {
            this._seOptionsDatas.default = this.props.tagsEditJson.conditionId
        }
        if (this._seOptionsDatas) {
            for (let j = 0; j < this._seOptionsDatas.condtion.length; j++) {
                let seObject = this._seOptionsDatas.condtion[j],
                    seVal = Object.values(seObject)[0],
                    seKey = Object.keys(seObject)[0]
                if (seKey === this._seOptionsDatas.default) {
                    seDefaultVal = seVal
                    this._sedCondition = seDefaultVal;
                }
                let sel = this;
                filterSeDatas.push(
                        (function (index) {
                            // we need a scope to record correct click index
                            return <li key={j} className='filterLiStyle optionTextSty optionFontSize'
                                       onClick={(e) => {
                                           sel.handleOperatorOptionClicked(e, seKey)
                                       }}>{seVal}</li>;
                        })(j)
                );
            }
        }

        const filterThDatas = [];
        switch (this._seOptionsDatas.type) {
            case 'multi' :
                filterThDatas.push(
                    <MultiDrop key={'type0'} queryKey={this._seOptionsDatas.vname}
                        multiQueryChange={this.multiQueryChange.bind(this)}
                        multiQueryOptions={this.props.getMultiOptionsData}
                        getMultiDatas={this.getMulti.bind(this)}
                        isTagsFrom={this.props.isTagsFrom}
                        tagsDatas={this.props.tagsEditJson}
                        isChangeAction={this._isChangeCondition}
                        isEnableApplyButton={this.setApplyButtonState.bind(this)}
                        getMutiText={this.getMutiText.bind(this)}
                        resetStatus={this.resetStatus.bind(this)}
                        ref="getChildOpen"
                        showNoResult={this.props.showNoResult}
                        />
                );
            break;
            case 'text' :
            if (this.props.isTagsFrom) {
                let tempDafultVal = JSON.parse(JSON.stringify(this.props.tagsEditJson.displayValue))
                if (this._isChangeCondition) {
                    tempDafultVal = ''
                    this.resetStatus();
                }
                filterThDatas.push(
                    <input type="text" className="ds-input filterBorder" name="search-input"
                    key={'q1'}
                    index='3'
                    data-val='3'
                    id='ThInputFiled'
                    autoFocus="autofocus"
                    defaultValue={tempDafultVal}
                    onChange={this.enableApplyButton.bind(this)}
                    data-value="input" tabIndex="1" />
                );
            } else {
                filterThDatas.push(
                    <input type="text" className="ds-input filterBorder" name="search-input"
                    key={'q1'}
                    index='3'
                    data-val='3'
                    id='ThInputFiled'
                    autoFocus="autofocus"
                    onChange={this.enableApplyButton.bind(this)}
                    data-value="input" tabIndex="1" />
                )
            }
            break;            
            case 'date' :
                let displayVal = ''
                if (this._seOptionsDatas.default === 'is_between') {
                displayVal = 'Start Date'
                }

                filterThDatas.push(
                    <CellDate  key={'date7'} placesHoders={displayVal} SecondIds={'firstFiled'}
                    SecondIndx={this._seOptionsDatas.default}
                    isTagsFrom={this.props.isTagsFrom}
                    tagsDatas={this.props.tagsEditJson}
                    displayDateArray={this.displayDateArray}
                    isChangeAction={this._isChangeCondition}
                    getDateVal={this.getDatesVal.bind(this)}
                    isEnableApplyButton={this.setApplyButtonState.bind(this)}/>
                );
            break;            
            case 'currency' :
                if (this.props.isTagsFrom && this.props.tagsEditJson.conditionId === 'is_between') {
                    if (this._isBetweenArray.length === 0) {
                        this._isBetweenArray = JSON.parse(JSON.stringify(this.props.tagsEditJson.displayValue));
                    }
                }
                filterThDatas.push(
                    <CellAmount key={3} isEnableApplyButton={this.setApplyButtonState.bind(this)}
                        isTagsFrom={this.props.isTagsFrom}
                        tagsDatas={this.props.tagsEditJson}
                        isChangeAction={this._isChangeCondition}
                        resetStatus={this.resetStatus.bind(this)}
                        applyCurrencyJson={this.getCurrencyData.bind(this)}/>
                );
            break;
            default:
            break;
        }
        let dateInputSty = 'nullPadding' + (this._seOptionsDatas.type==='date'?' InputDateFirBorder':' ds-col-xs-11');

        /**
         * Remove dropdown icon for fields that user entry is necessary
         */
        let thirdConditionDrop = 'ds-icon-size-default ds-icon-caret-down-fill';
        if (this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_SALES_STAGE'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_LEVEL_10'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_DEAL_SIZE'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_GEOGRAPHY'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_MARKET'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_ROADMAP_STATUS'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_COV_CLIENT_TYPE'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_INDUSTRY'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_ISU_SECTOR'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_CHANNEL'
            || this._seOptionsDatas.vname === 'LBS_NEWFORECASTING_CONTRACT_TYPE') {
        }
        else {
            thirdConditionDrop += ' hideDropIcon';
        }

        return (
            <div onBlur={this.handleConditionClose.bind(this)}>
                <Col span={12} otherClass='queryLeft InputFiledsBorder'>
                    <Col span={11} otherClass='nullPadding ds-col-xs-11'>
                        <input type="text" className="ds-input filterBorder ds-input-firBorder" name="search-input"
                            readOnly='value'
                            index='1'
                            data-val='1'
                            onClick={this.handleClickFristList.bind(this)}
                            data-value="input" tabIndex="1" 
                            value={this.state.FirstDefaultIndex}
                            />
                    </Col>
                    <Col span={1} otherClass='iconNoPadding ds-col-xs-1'>
                        <span className='ds-icon-size-default ds-icon-caret-down-fill'
                        index='1'
                        onClick={this.handleClickFristList.bind(this)}
                        data-value='icon-query'></span>
                    </Col>
                </Col>

                <Col span={12} otherClass={conditionSecHidden}>
                    {this.state._openFristConditionDraw ?
                        <input type={'text'} autoFocus
                               className={'ds-input ds-inputText'}
                               placeholder={getTranslateLanguage('TypeToFilterList')}
                               onChange={this.handleCustomFilterFieldSearchBoxChanged.bind(this)}
                               style={{display: conditionFrHidden, zIndex: conditionFrZindex}}
                               value={this.state.filterFieldSearchText}
                        /> : []}
                    <div className="ds-options ds-options-override filterScrollTop" role="group"
                         style={{height: conditionFrHeight, display: conditionFrHidden, zIndex: conditionFrZindex}}>
                        <HighlightMatchingDropdownList
                            optionList={this.props.displayOptions}
                            onOptionClicked={this.handleFieldOptionClicked.bind(this)}
                            matchingText={this.state.filterFieldSearchText}
                            optionItemClassName={'filterLiStyle'}/>
                    </div>
                </Col>
                {this.state._openSecondCondition ?
                    <div>
                        <Col span={12} otherClass='queryLeft  InputFiledsBorder'>
                            <Col span={11} otherClass='nullPadding ds-col-xs-11' ref={(ref)=>this.seInput=ref}>
                                <input type="text" className="ds-input filterBorder ds-input-secBorder" name="search-input"
                                    index='2'
                                    readOnly='value'
                                    data-val='2'
                                    value={seDefaultVal}
                                    onClick={this.handleClickSecondList.bind(this)}
                                    data-value="input" tabIndex="1" />
                            </Col>
                            <Col span={1} otherClass='iconNoPadding ds-col-xs-1'>
                                <span className='ds-icon-size-default ds-icon-caret-down-fill'
                                index='2' 
                                onClick={this.handleClickSecondList.bind(this)}
                                data-value='icon-query'></span>
                            </Col>
                        </Col>
                        <Col span={12} otherClass={ condition } >
                            <div className="ds-options ds-options-override" role="group"
                                style={{height:conditionSeHeight,display:conditionSeHidden, zIndex:conditionSeZindex}}>
                                {filterSeDatas}
                            </div>
                        </Col>
                    </div>:[]}
                {this.state._openThirdCondition && this.displayDateArray.indexOf(this._seOptionsDatas.default) === -1 ?
                <div>
                        <Col span={12} otherClass='queryLeft InputFiledsBorder'>
                            <Col span={dateIconWidth} otherClass={dateInputSty} ref={(ref)=>this.focusInput=ref}>
                            {filterThDatas}
                        </Col>
                        {this._seOptionsDatas.type !== 'currency' && this._seOptionsDatas.type !== 'date' && this._seOptionsDatas.type !== 'text' ?
                            <Col span={1} otherClass='iconNoPadding ds-col-xs-1'>
                                <span className={thirdConditionDrop}
                                 onClick={this.handleClickCaretDown.bind(this)}
                                data-value='icon-query'></span>
                            </Col>:''}
                    </Col>
                    {this.showIsBetween()}
                    <Col span={12} otherClass='queryLeft'>
                        <div className="ds-options ds-options-override" role="group"
                            style={{height:conditionThHeight,display:conditionThHidden, zIndex:conditionThZindex}}>
                        </div>
                    </Col>
                </div>:[]}
            </div>
        );
    }
}

ConditionQuery.propTypes = {
    displayOptions: PropTypes.array,
};

ConditionQuery.defaultProps = {
    displayOptions: [],
};




