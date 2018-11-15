import React from 'react'
import PropTypes from "prop-types";

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _visibleDropList: false,
            selectedValue: '',
            selectedKey: '',
        }
    }

    componentDidMount() {
        this.prepareData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareData(nextProps);
    }

    prepareData(props) {
        if (props.optionList && props.optionList.length > 0) {
            let selectedKey = props.defaultKey,
                selectedValue = props.defaultValue;
            // situation 1 : no default key, only default value. The value acts as a title/description
            if (!selectedKey && selectedValue) {
                selectedKey = '';
            } else { // situation 2 : default key is assigned, default value is meaningless. We should find value out.
                selectedValue = '';
                // if assigned selectedKey is in the list. Set the corresponding value
                for (let i = 0; i < props.optionList.length; i ++) {
                    let obj = props.optionList[i];
                    if (obj.key === selectedKey) {
                        selectedValue = obj.value;
                    }
                }

                // at this moment, if selectedValue is empty it means the key is not in the option list.
                // set the first option in the list as the default value
                if (!selectedValue) {
                    selectedKey = props.optionList[0].key;
                    selectedValue = props.optionList[0].value;
                    if (this.props.onSelectOptionChanged) {
                        this.props.onSelectOptionChanged(selectedKey, selectedValue);
                    }
                }
            }

            this.setState({
                selectedValue: selectedValue,
                selectedKey: selectedKey,
            });
        }
    }

    onNameClicked() {
        this.setState({_visibleDropList: true});
    }

    onCancel(event) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.setState({
                _visibleDropList: false,
            });
        }
    }

    onOptionClicked(key, value) {
        if (key && this.state.selectedKey !== key ) {
            if (this.props.onSelectOptionChanged) {
                this.props.onSelectOptionChanged(key, value);
            }
            this.setState({
                selectedKey: key,
                selectedValue: value,
            });
        }
        this.setState({_visibleDropList: false});
    }

    getOptionComponent() {
        let component = [];
        if (this.props.optionList) {
            for (let i = 0; i < this.props.optionList.length; i++) {
                let obj = this.props.optionList[i];
                component.push(
                    <div className={"ds-option ds-optionvalue-width"}
                         role="menuitem"
                         key={obj.key}
                         onClick={(e) => this.onOptionClicked(obj.key, obj.value)}>
                        {obj.value}
                    </div>
                );
            }
        }
        return component;
    }

    render() {
        
        let id = '';
        let dropClass = this.state._visibleDropList ? 'ds-dropdown ds-basic ds-open' : 'ds-dropdown ds-basic';
        let ariaHidden = this.state._visibleDropList ? 'false' : 'true';
        let optionStyle = this.state._visibleDropList ? 'auto' : '0px';
        let titleClass = 'ds-title ds-title-override ds-title-branch ds-dropdown-branch '+this.props.title3Class;
        if (this.props.titleClass) {
            titleClass += ' ' + this.props.titleClass;
        }
        if (this.props.id) {
            id = this.props.id;
        }

        return (
            <div id={id} className={dropClass} tabIndex="0" role="menu" aria-label="w3DS RevenueType Dropdown" onBlur={this.onCancel.bind(this)}>
                <div className={titleClass} onClick={this.onNameClicked.bind(this)} id='switchWidth'>
                    {this.state.selectedValue}
                </div>
                <div className="ds-options ds-options-override" role="group" aria-hidden={ariaHidden} style={{height: optionStyle}}>
                    {this.getOptionComponent()}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    title3Class: PropTypes.string,
    id: PropTypes.string,
    optionList: PropTypes.array, // should be an array of objects, object : {key:'', value:''}
    defaultValue: PropTypes.string,
    defaultKey: PropTypes.string,
    titleClass: PropTypes.string,
    onSelectOptionChanged: PropTypes.func,
};

Dropdown.defaultProps = {
    title3Class: '',
    id: '',
    optionList: [],
    defaultValue: '',
    defaultKey: '',
    titleClass: '',
    onSelectOptionChanged: ()=>{},
};
