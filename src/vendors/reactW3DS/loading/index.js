import React from 'react'
import PropTypes from "prop-types"
import './index.css';

export default class Loading extends React.Component {

    render() {
        let containerClass = 'ds-loader-container';
        if (this.props.blue) {
            containerClass += ' ds-loader-blue';
        }

        if (this.props.widthExp === 'autoWidth') {
            containerClass += ' lodingDeafultWidth';
        }

        let loaderClass = 'ds-loader';
        if (this.props.small) {
            loaderClass += ' ds-loader-sm';
        }
        return (  
            <div className={containerClass} style={this.props.style}>
                <div className={"ds-loader-header"}>
                    {this.props.text}
                </div>
                <div className={loaderClass} />
            </div>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string,
    blue: PropTypes.bool,
    small: PropTypes.bool,
};

Loading.defaultProps = {
    text: '',
    blue: false,
    small: false,
};