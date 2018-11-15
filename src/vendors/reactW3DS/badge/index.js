import React from 'react'
import PropTypes from 'prop-types'

export default class Badge extends React.Component {

    render() {

        let className = 'ds-badge';
        if (this.props.isSmall) {
            className += '-small';
        }

        if (this.props.type) {
            className += ' ds-' + this.props.type;
        }
        if (this.props.isSecondary) {
            className += ' ds-secondary';
        }

        return (
            <div className={className}>{this.props.text}</div>
        )
    }
}

Badge.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number,]),
    type: PropTypes.oneOf(['default', 'neutral', 'success', 'warning', 'danger']),
    isSecondary: PropTypes.bool,
    isSmall: PropTypes.bool,
};

Badge.defaultProps = {
    text: '',
    type: 'default',
    isSecondary: false,
    isSmall: false,
};