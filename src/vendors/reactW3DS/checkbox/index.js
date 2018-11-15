import React from 'react'
import PropTypes from 'prop-types'

export default class Checkbox extends React.Component {

    onCheckboxClicked(e) {
        if (!this.props.isDisabled && this.props.onCheckboxClicked) {
            this.props.onCheckboxClicked(!this.props.isChecked, e);
        }
    }

    render() {

        let className = 'ds-input-checkbox-group';
        if (this.props.className) {
            className += ' ' + className;
        }

        let inputClass = 'ds-input';
        if (this.props.isDisabled) {
            inputClass += ' ds-disabled';
        }

        return (
            <div className={className}>
                <label className={"ds-input-checkbox"}>
                    <input type={"checkbox"} className={inputClass}
                           value={this.props.title}
                           checked={this.props.isChecked}
                           disabled={this.props.isDisabled}
                           onChange={()=>{}}
                           onClick={this.onCheckboxClicked.bind(this)}/>
                    <div className={"ds-input-control"} style={{outline: 'none'}} />
                    <span className={this.props.fontClass}>
                        {this.props.title}
                    </span>
                </label>
            </div>
        )
    }
}

Checkbox.propTypes = {
    isDisabled: PropTypes.bool,
    title: PropTypes.string,
    isChecked: PropTypes.bool.isRequired,
    fontClass: PropTypes.string,
    className: PropTypes.string,
    onCheckboxClicked: PropTypes.func
};

Checkbox.defaultProps = {
    isDisabled: false,
    title: '',
    isChecked: true,
    fontClass: '',
    className: '',
    onCheckboxClicked: () => {},
};
