import React from 'react'
import PropTypes from "prop-types"

/**
 * refer to https://pages.github.ibm.com/w3/w3ds/documentation/icons
 */
export default class Icon extends React.Component {

    click(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        let className = 'ds-icon-' + this.props.type;

        if (this.props.flat) {
            className += '-m';
        }
        if (this.props.light) {
            className += '-l';
        }
        if (this.props.colorClass) {
            className += ' ' + this.props.colorClass;
        }
        className += ' ds-icon-size-';
        switch (this.props.size) {
            case 1:
                className += 'medium';
                break;
            case 2:
                className += 'large';
                break;
            case 0:
            default:
                className += 'default';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return(
            <i className={className} onClick={(e) => {this.click(e)}}></i>
        );
    }
}

Icon.propTypes = {
    type: PropTypes.string,
    size: PropTypes.number,
    flat: PropTypes.bool,
    light: PropTypes.bool,
    onClick: PropTypes.func,
    colorClass: PropTypes.string,
    className: PropTypes.string,
}

Icon.defaultProps = {
    type: '',
    size: 0,
    flat: false,
    light: false,
    onClick: null,
    colorClass: '',
    className: '',
}