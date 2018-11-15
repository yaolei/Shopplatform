
import React from 'react';

import './index.less';

class DealListGrid  extends React.Component {

    render() {
        return (
            <div>
                <div className="sum-value">{this.props.sum_value}</div>
                <div className="sum-title">{this.props.sum_title}</div>
            </div>
        );
    }
}

export default DealListGrid;