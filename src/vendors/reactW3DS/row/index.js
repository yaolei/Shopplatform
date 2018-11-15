import React from 'react'
import PropTypes from "prop-types"

export default class Row extends React.Component {

    render() {
        let className = 'ds-grid';
        if (this.props.otherClass) {
            className += ' ' + this.props.otherClass;
        }
        if (this.props.paddingTop) {
            className += ' ds-padding-top-' + this.props.paddingTop;
        }
        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}

Row.propTypes = {
    paddingTop: PropTypes.number,
    otherClass: PropTypes.string
};

Row.defaultProps = {
    paddingTop: 1,
    otherClass:''
};