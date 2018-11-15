import React from 'react'
import PropTypes from "prop-types";
import '../index.less';

export default class TotalAmount extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    render() {
        let totalClass = 'ds-col-3 dealList-Total ds-slide-right';
        if(this.props.totalClass) {
            totalClass += ' ' + this.props.totalClass;
        }
        if(!this.props.filterAndData) {
            totalClass += ' totalDisplay' 
        }
        return (
            <div className={ totalClass }>
                <div className="ds-panel dealList-panel">
                    <div className="ds-panel-container">
                        <p className="dealList-text">Total:&nbsp;{ this.props.totalData }</p>
                    </div>
                </div>
            </div>
        );
    };
}

TotalAmount.propTypes = {
    filterAndData: PropTypes.bool,
    total: PropTypes.string,
    totlaClass: PropTypes.string,
    totalData: PropTypes.string
};

TotalAmount.defaultProps = {
    filterAndData: false,
    total: '',
    totlaClass: '',
    totalData: ''
};