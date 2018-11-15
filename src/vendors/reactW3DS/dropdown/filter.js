import React from 'react'
import PropTypes from "prop-types";
import './index.css';
import HighlightMatchingDropdownList from "./highlightList";

export default class FilterDrop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            renderCounter : 0,
            dropTitle: props.dropTitle,
            curClassName: 'NodeList',
            isVisible: false,
            filterValue: '',
            filterChanged: false,
        }
    }

    handleNameClick = () => {
        if (!this.state.isVisible) {
            this.setState({
                isVisible: true,
                filterChanged: false,
            });
            if ((this.props.optionList.length <= 0) && this.props.onReqDropData)
                this.props.onReqDropData();
        }
        else {
            this.setState({
                isVisible: false,
                filterValue: '',
                filterChanged: false,
            });
        }
    }

    handleNameCancel = (event) => {
        if (this.state.isVisible && !event.currentTarget.contains(event.relatedTarget)) {
            if (this.state.filterValue) {
                this.props.filterChange();
            }
            this.setState({
                isVisible: false,
                filterValue: '',
                filterChanged: false,
            });
        }
    }

    componentWillMount() {
        this.timer = null;
    }
    triggerChange() {
        this.props.filterChange(this.state.filterValue);
    }
    handleInputChange = (event) => {
        let inputContent = event.target.value;
        this.setState({
            filterValue:inputContent,
            filterChanged: true
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(this.triggerChange.bind(this), this.props.inputDelay);
    }

    handleOptionClick = (event, index, obj) => {
        this.setState({
            isVisible: false,
            filterValue: '',
            filterChanged: false,
        });
        //TODO: Default node is clicking node.
            this.setState({dropTitle: obj['Title']});

            if (this.props.onClickOption)
                this.props.onClickOption(obj['ID']);
    } 

    handleTooltipGetfocus = (e) => {
        document.getElementById(e).removeAttribute('hidden');
    }
    handleTooltipLostfocus = (e) => {

        document.getElementById(e).setAttribute('hidden', "");
    }

    /**
     * If the responed data over 7 and display the filter filed
     * @returns {boolean}
     */
    componentDidUpdate = () => {
        let inputDom = document.getElementById('dropdown-advanced-menu-text');
            if (inputDom) inputDom.focus();
    }
    displayFilterFiled = () => {
        return (this.props.optionList.length > 7 || this.state.filterValue !== '' || this.state.filterChanged);
    }


    render() {

        let dropClass = this.state.isVisible ? 'ds-dropdown ds-basic ds-open' : 'ds-dropdown ds-basic';
        let ariaHidden = this.state.isVisible ? 'false' : 'true';
        let optionTypeIndex = this.state.isVisible ? '0' : '-1';
        let optionStyle = this.state.isVisible ? 'auto' : '0px';

        let titleClass = 'ds-title ds-title-override ds-title-dropdown-branch';
        if (this.props.titleClass) {
            titleClass += ' ' + this.props.titleClass;
        }

        let titleId = '';
        if (this.props.titleId) {
            titleId = this.props.titleId;
        }

        let titleDropDown = '';
        if (this.props.titleDropDownId) {
            titleDropDown = this.props.titleDropDownId;
        }

        return (
            <div className={dropClass} tabIndex="0" role="menu" aria-label="w3DS Advanced Dropdown" onBlur={this.handleNameCancel.bind(this)}>
                <div id={titleId} className={titleClass} onClick={this.handleNameClick.bind(this)}>
                    {this.props.dropTitle}
                 </div>
                {this.state.isVisible ?
                    <div id={titleDropDown} className="ds-options ds-options-override" role="group" aria-hidden={ariaHidden}
                        style={{height: optionStyle}}>
                        {this.displayFilterFiled() ?
                            <div className="ds-input-container ds-padding-1 ds-margin-bottom-0" role="menuitem">
                                <input type="text"
                                    className="ds-input ds-inputText"
                                    id="dropdown-advanced-menu-text"
                                    placeholder={this.props.placeholder}
                                    onChange={this.handleInputChange}
                                    value={this.state.filterValue}
                                />
                            </div>
                            : ''}
                        <div className='filterScrollTop'>
                            <HighlightMatchingDropdownList onOptionClicked={this.handleOptionClick.bind(this)}
                                                           optionList={this.props.optionList}
                                                           idKey={'ID'}
                                                           nameKey={'Option'}
                                                           matchingText={this.state.filterValue}
                                                           showLoadingIcon={true}/>
                        </div>
                    </div> : <div id={titleDropDown}></div>}
            </div>
        );
    }
}

FilterDrop.propTypes = {
    placeholder: PropTypes.string,
    optionList: PropTypes.array,
    filterChange: PropTypes.func,
    dropTitle: PropTypes.string,
    titleId: PropTypes.string,
    titleDropDownId: PropTypes.string,
    titleClass: PropTypes.string,
    highlightMatchedResult: PropTypes.bool,
    inputDelay: PropTypes.number,
};

FilterDrop.defaultProps = {
    placeholder: 'Type to filter list',
    optionList: ['Mary Smith(ClientCoverage-flm-Node)', 'option two', 'option three', 'option four', 'option five', 'option six', 'option seven'],
    filterChange: (value) => { console.log(value) },
    dropTitle: '',
    titleId: '',
    titleDropDownId: '',
    titleClass: '',
    highlightMatchedResult: true,
    inputDelay: 500,
};