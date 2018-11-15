
import React from 'react';
import { Icon} from '../../vendors/reactW3DS'
import './index.less';

class SummaryGrid  extends React.Component {

    render() {
        if (this.props.need_tips)
        {
            return (
                <div>
                    <div className="sum-value">{this.props.sum_value}</div>
                    <div className="sum-title">
                        {this.props.sum_title}
                        &nbsp;
                        <Icon type="info" />
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <div className="sum-value">{this.props.sum_value}</div>
                    <div className="sum-title">
                        {this.props.sum_title}
                    </div>
                </div>
            );
        }
    }
}

export default SummaryGrid;