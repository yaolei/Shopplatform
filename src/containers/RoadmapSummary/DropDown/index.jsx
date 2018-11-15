import React from 'react'
import PropTypes from "prop-types";
import { Loading } from '../../../vendors/reactW3DS';
import '../index.less';

export default class RSDown extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            dropTitle: '',
            dropId: '1'
        }
    }

    componentWillReceiveProps(props){
        if(this.props.optionData.length === 0 && props.optionData.length>0){
            this.setState({dropTitle:props.optionData[0].name,dropId:'1'})
        }
    }

    handleClick = () => {
        if (!this.state.isVisible) {
            this.setState({
                isVisible: true
            });
        } else {
            this.setState({
                isVisible: false
            });
        }
    }

    handleNameCancel = (event) => {
        if (this.state.isVisible && !event.currentTarget.contains(event.relatedTarget)) {
            this.setState({
                isVisible: false
            });
        }
    }

    handleOptionClick = (event) => {
        let dataIndex = event.target.getAttribute('index');
        let obj = this.props.optionData[dataIndex];
        if(obj.id !== this.state.dropId) {
            this.setState({
                isVisible: false,
                dropTitle: obj.name,
                dropId:obj.id
            });
            //TODO: Default node is clicking node.
            if (this.props.onClickOption){
                this.props.onClickOption(obj.id);
            }
        } else {
            this.setState({
                isVisible: false
            });
        }
    }

    render() {
        let dropClass = this.state.isVisible ? 'ds-dropdown rs-drop-title ds-basic ds-open' : 'ds-dropdown ds-width-auto rs-drop-title ds-basic';
        let ariaHidden = this.state.isVisible ? 'false' : 'true';
        let optionTypeIndex = this.state.isVisible ? '0' : '-1';
        let optionStyle = this.state.isVisible ? 'auto' : '0px';

        let titleClass = 'ds-title';
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
        this.setState.dropTitle = this.props.dropTitle

        let allGrids = [];
        if (this.props.optionData.length <= 0) {
            allGrids.push(
                <div key={0} tabIndex={optionTypeIndex}>
                    <Loading key={0} style={{fontSize: '13px'}} widthExp={'autoWidth'}/>
                </div>
            );
        } else {
            for (let i = 0; i < this.props.optionData.length; i++) {
                let obj = this.props.optionData[i];
                allGrids.push(
                    <li className="rs-dropdown-option" key={i} onClick={this.handleOptionClick.bind(this)} index={i}>
                        { obj.name }
                    </li>
                );
            }
            if (this.props.optionData.length === 0) 
            allGrids.push(
                <div key={9} className='noValueWaring'>{this.props.noDataWaring}</div>
            );
        }

        return (
        	<div className={dropClass} tabIndex="0" role="menu" aria-label="w3DS Auto Width Dropdown" onBlur={this.handleNameCancel.bind(this)}>
                {this.state.dropTitle.length === 0 ? '' : 
                    <div id={titleId} className={titleClass} onClick={this.handleClick.bind(this)}>
                        {this.state.dropTitle}
                    </div>
                }
                {this.state.isVisible ?
	                <div id={titleDropDown} className="ds-options ds-options-override rs-dropdown-options" role="group" aria-hidden={ariaHidden}
                     style={{height: optionStyle}}>
                        { allGrids }
	                </div> : <div id={titleDropDown}></div>
                }
            </div>
        );
    };
}

RSDown.propTypes = {
    dropTitle: PropTypes.string,
    optionData: PropTypes.array,
    titleId: PropTypes.string,
    titleDropDownId: PropTypes.string,
    titleClass: PropTypes.string
};

RSDown.defaultProps = {
    dropTitle: '',
    optionData: [],
    titleId: '',
    titleDropDownId: '',
    titleClass: ''
};