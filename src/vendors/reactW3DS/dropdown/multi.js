import React from 'react'
import PropTypes from "prop-types";
import { Loading, Col, Row} from '../index'
import HighlightMatchingDropdownList from "./highlightList";

export default class MultiDrop extends React.Component {
    tagsGrids = [];
    tagsInfor = [];
    TagsTexts=[];
    tagsClickedArray = [];
    displayTagArray=[];
    isEditAction  = false
    constructor(props) {
        super(props);
        this.typeAheadReqSource = 0;
        this.state = {
            renderCounter : 0,
            dropTitle: props.dropTitle,
            curClassName: 'NodeList',
            isVisible: false,
            filterValue: '',
            placeholder: 'Type to filter list ...',
            filterChanged: false,
            showTags: false
        }
    }
    handleOptionCancel = (event) => {
        if (this.state.isVisible && !event.currentTarget.contains(event.relatedTarget)) {
            this.setState({
                isVisible: false,
                filterValue: '',
                filterChanged: false,
                placeholder:'Type to filter list ...'
            });
        }
    }

    handleInputChange = (event) => {
        let inputContent = event.target.value;
        let queryNum = 2;
        if (this.props.queryKey === 'LBS_NEWFORECASTING_SALES_STAGE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_LEVEL_10'
            || this.props.queryKey === 'LBS_NEWFORECASTING_DEAL_SIZE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_GEOGRAPHY'
            || this.props.queryKey === 'LBS_NEWFORECASTING_MARKET'
            || this.props.queryKey === 'LBS_NEWFORECASTING_ROADMAP_STATUS'
            || this.props.queryKey === 'LBS_NEWFORECASTING_COV_CLIENT_TYPE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_INDUSTRY'
            || this.props.queryKey === 'LBS_NEWFORECASTING_ISU_SECTOR'
            || this.props.queryKey === 'LBS_NEWFORECASTING_CHANNEL'
            || this.props.queryKey === 'LBS_NEWFORECASTING_CONTRACT_TYPE') {
            queryNum = 1
        } 
        if (inputContent.length >= queryNum) {
            this.setState({
                filterValue:inputContent,
                filterChanged: true,
                isVisible: true}, () => {
                    this.props.multiQueryChange(this.props.queryKey, inputContent);
                });
            
        } else {
            this.setState({
                filterValue: event.target.value,
                filterChanged:false
            });
        }
    }
    handleInputClick = (event) => {
        if (this.props.queryKey === 'LBS_NEWFORECASTING_SALES_STAGE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_LEVEL_10'
            || this.props.queryKey === 'LBS_NEWFORECASTING_DEAL_SIZE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_GEOGRAPHY'
            || this.props.queryKey === 'LBS_NEWFORECASTING_MARKET'
            || this.props.queryKey === 'LBS_NEWFORECASTING_ROADMAP_STATUS'
            || this.props.queryKey === 'LBS_NEWFORECASTING_COV_CLIENT_TYPE'
            || this.props.queryKey === 'LBS_NEWFORECASTING_INDUSTRY'
            || this.props.queryKey === 'LBS_NEWFORECASTING_ISU_SECTOR'
            || this.props.queryKey === 'LBS_NEWFORECASTING_CHANNEL'
            || this.props.queryKey === 'LBS_NEWFORECASTING_CONTRACT_TYPE') {
            this.setState({
                filterChanged: true,
                isVisible: true,});
            this.props.multiQueryChange(this.props.queryKey, '');
        }
    }

    handleOptionClick(event, index, obj) {
        this.tagsInfor['id'] = obj.id;
        this.tagsInfor['value'] = obj.name;
        if (this.props.isTagsFrom) {
            this.isEditAction = true
            if (typeof this.tagsClickedArray === 'string') {
                let tempId = this.tagsClickedArray
                //only one string tag change to array
                this.tagsClickedArray = []
                this.tagsClickedArray.push(tempId)
            }
            //resset the change status
            this.props.resetStatus();
        }
        this.tagsClickedArray.push(this.tagsInfor['id'])
        this.TagsTexts.push(this.tagsInfor['value'])
        if (this.tagsClickedArray.length === 1) {
            this.props.getMutiText(this.tagsInfor['value'])
            this.props.getMultiDatas(this.tagsInfor['id'])
        } else {
            this.props.getMutiText(this.TagsTexts.join(', '))
            this.props.getMultiDatas(this.tagsClickedArray)
        }
        
        this.props.isEnableApplyButton(false)
        this.setTagsComponent()
            this.setState({
            isVisible: false,
            filterValue: '',
            filterChanged: false,
            placeholder: ''
        });
    } 

    handleTooltipGetfocus = (e) => {
        document.getElementById(e).removeAttribute('hidden')
    }

    handleTooltipLostfocus = (e) => {

        document.getElementById(e).setAttribute('hidden', "")
    }

    componentDidUpdate = () => {
        let inputDom = document.getElementById('dropdown-advanced-menu-text');
            if (inputDom) inputDom.focus()
    }
    closeTags (event) {
        //use for firfox not support span click
        let tempArray = [];
        if (event.target.tagName === 'BUTTON') {
            event.target.parentElement.parentElement.remove();
        } else if (event.target.tagName === 'SPAN'){
            event.target.parentElement.parentElement.parentElement.remove();
        }
        
        if (Object.prototype.toString.apply(this.tagsClickedArray) === '[object Array]' && 
            this.tagsClickedArray.length > 0) {
            for (let i = 0; i < this.tagsClickedArray.length; i++) {
                if (this.tagsClickedArray[i] === event.target.getAttribute('index')) {
                    this.tagsClickedArray.splice(i, 1);
                    i = i--;
                }
            }
        } else if (typeof this.tagsClickedArray === "string") {
            this.tagsClickedArray = '';
            this.props.isEnableApplyButton(true);
        }

        // remove date form the tag list
        this.tagsInfor['value'] = event.target.getAttribute('data-text');
        for (var i = 0; i < this.TagsTexts.length; i++) {
            if (this.tagsInfor['value'] === this.TagsTexts[i]) {
                 this.TagsTexts.splice(i, 1);
            }
        }
        if (this.TagsTexts.length === 1) {
            this.props.getMutiText(this.TagsTexts[0])
            this.props.getMultiDatas(this.tagsClickedArray[0])
        } else if (this.TagsTexts.length === 0) {
            this.tagsClickedArray=[];
            this.props.isEnableApplyButton(true, true)
        } else {
            this.props.getMutiText(this.TagsTexts.join())
            this.props.getMultiDatas(this.tagsClickedArray)
        }
        if (this.props.isTagsFrom) {
            this.isEditAction = true
        }
        if (this.tagsClickedArray.length === 0) {
            this.props.isEnableApplyButton(true)
        }
    }
    setTagsComponent (editTagData=false) {
        let key = (new Date()).valueOf()
        //open the edit tag darw display the tag filed
        if (editTagData) {
            if (editTagData.querNameId === 'LBS_NEWFORECASTING_BRANCH' && editTagData.displayText.indexOf('(') === -1) {
                    editTagData.displayText = editTagData.displayText + ' ('+ editTagData.displayValue +')';
            } 
            this.tagsInfor.value = editTagData.displayText
            this.tagsInfor.id = editTagData.displayValue
            key = key + editTagData.displayValue
        }
        this.tagsGrids.push(
            <Col otherClass='queryNoLeft queryTagsWidth' key={key}>
                <div className="ds-tag ds-color ds-dismissible tagLineHei filterWidth tagBorderSty optionFontSize" role="tag" aria-label="tag">
                    {this.tagsInfor.value}
                    <button className="ds-close ds-button ds-flat ds-close-button reTagBtn" 
                    style={{height:20+'px'}}
                    data-text={this.tagsInfor.value} index={this.tagsInfor.id} onClick={this.closeTags.bind(this)}>
                        <span className="ds-icon-close reTagBtn optionTagsIcon" role="text" index={this.tagsInfor.id} data-text={this.tagsInfor.value} aria-label="close"></span>
                    </button>
                </div>
            </Col>
        )

        return this.tagsGrids;
    }
    getArray () {
        let arr = []
        if (this.props.isTagsFrom && !this.props.isChangeAction) {
            this.splitTagArray();
        }

        if (this.tagsGrids.length > 0) {
            for (var i = 0; i < this.tagsGrids.length; i++) {
                 arr[i] = this.tagsGrids[i];
            }
        }
        return arr
    }
    //only init edit darw
    splitTagArray () {
        let tagTextArray =[]
        //on the init delet duplicate date
        if (!this.isEditAction) {
            this.tagsClickedArray =  JSON.parse(JSON.stringify(this.props.tagsDatas.displayValue))
            // this.TagsTexts.push(JSON.parse(JSON.stringify(this.props.tagsDatas.displayText)))
        }
        
        if (this.tagsGrids.length === 0 && typeof this.tagsClickedArray === 'string') {
            //init edit darw,only one tag show this
            if (this.TagsTexts.length === 0) {
                let displayText = this.props.tagsDatas.displayText;
                if (this.props.tagsDatas.querNameId === 'LBS_NEWFORECASTING_BRANCH' && displayText.indexOf('(') === -1) {
                    displayText = displayText + ' ('+ this.props.tagsDatas.displayValue +')';
                    this.TagsTexts.push(displayText);
                } else {
                    this.TagsTexts.push(this.props.tagsDatas.displayText);
                }
            }
            this.setTagsComponent(this.props.tagsDatas)
        } 
        if (this.props.tagsDatas.filedType === 'multi'  && typeof this.props.tagsDatas.displayValue !== 'string' && 
            this.props.tagsDatas.displayText.indexOf(',') !== -1 && !this.isEditAction) {
            this.tagsGrids = [];
            tagTextArray = this.props.tagsDatas.displayText.split(',');
            this.TagsTexts = tagTextArray;
            for (let i = 0; i < this.props.tagsDatas.displayValue.length; i++) {
                this.displayTagArray[i] = JSON.parse(JSON.stringify(this.props.tagsDatas))
                this.displayTagArray[i].displayText = tagTextArray[i]
                this.displayTagArray[i].displayValue = this.props.tagsDatas.displayValue[i]
                this.setTagsComponent(this.displayTagArray[i])
            }
        }         
    }

    /**
     * exclude selected options from list
     * @returns {Array}
     */
    getOptionsList() {
        let list = [];

        if (this.state.filterChanged) {
            for (let i = 0; i < this.props.multiQueryOptions.length; i++) {
                let obj = this.props.multiQueryOptions[i];
                if (this.props.isTagsFrom && typeof this.tagsClickedArray === 'string') {
                    if (obj.id === this.tagsClickedArray) {
                        obj = false
                    }
                } else if (this.tagsClickedArray.length > 0) {
                    for(let h of this.tagsClickedArray) {
                        if (obj.id === h) {
                            obj = false
                        }
                    }
                }

                if (obj) {
                    list.push(obj);
                }
            }
        }
        return list;
    }

    render() {

        let dropClass = this.state.isVisible ? 'ds-dropdown ds-basic ds-open' : 'ds-dropdown ds-basic',
            ariaHidden = this.state.isVisible ? 'false' : 'true',
            optionStyle = this.state.isVisible ? 'auto' : '0px',
            optionPosition = this.state.isVisible ? 'unset' : '',
            options = this.getOptionsList(); //

        return (
            <div className={dropClass} tabIndex="0" role="menu" style={{padding:'0'}} onBlur={this.handleOptionCancel.bind(this)}>
               <Row otherClass='nullPaddingTop'>
                    {this.getArray()}
                   <Col span={12}>
                       <input type="text"
                            className="ds-input multiQueryInput"
                            id="dropdown-advanced-menu-text"
                            placeholder={this.state.placeholder}
                            onChange={this.handleInputChange}
                            autoFocus="autofocus"
                            value={this.state.filterValue}
                            onClick={this.handleInputClick.bind(this)}
                        />
                    </Col>
                </Row>
                <div className="ds-options ds-options-override typeAWidth" role="group ds-col-12"
                    aria-hidden={ariaHidden} style={{height: optionStyle, position:optionPosition}}>
                    <div className='filterScrollTop'>
                        <HighlightMatchingDropdownList
                            optionList={options}
                            onOptionClicked={this.handleOptionClick.bind(this)}
                            matchingText={this.state.filterValue}
                            isLoading={!this.props.showNoResult}
                            nameKey={'name'}/>
                    </div>
                </div>
            </div>
        )
    }
}

MultiDrop.propTypes = {
    isTagsFrom:PropTypes.bool,
    multiQueryOptions: PropTypes.array,
    showNoResult:PropTypes.bool
};

MultiDrop.defaultProps = {
    isTagsFrom:false,
    multiQueryOptions: [],
    showNoResult:false
};
