import React from 'react';
import './index.less';
import {Icon} from '../../vendors/reactW3DS'

class HideColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // !!! IMPORTANT
        // className 'hideIcon' and 'settingIcon' are used in ColumnList.jsx
        // please make sure it exists
        let divClass = 'hideIcon';
        let iconClass = 'settingIcon';

        if (this.props.showStatus) {
            divClass += ' show';
            iconClass += ' show';
        } else {
            divClass += ' hide';
            iconClass += ' hide';
        }

        return (
            <div id="hideColumn">
                <div className={divClass} onClick={()=>this.props.hideColumnClick()}>
                    <Icon type="settings" className={iconClass}/>
                </div>
            </div>
        );
    }
}

export default HideColumn;
