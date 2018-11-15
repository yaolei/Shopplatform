import React from 'react';
import {Icon} from '../../vendors/reactW3DS'
import './index.less';
import icon from './icon.jpeg';
import logoSrc from "../../assets/header_logo.png";
import logoOnlySrc from "../../assets/header_logo_only.png"

class HearderBar extends React.Component {
    
    render() {
        return (
            <div key="1" className="header">
                <div className="header_logo"/>
                {/* <div className="header_right_item">
                    <div className="headerButton" >
                        <a href="#/"><Icon type="settings" colorClass="curClass"/></a>
                    </div>
                    <div className="headerButton" >
                        <a href="#/"><Icon type="dashboard" colorClass="curClass"/></a>
                    </div>
                    <div className="headerButton" >
                        <a href="#/"><Icon type="notification" colorClass="curClass"/></a>
                    </div>
                    <div className="headerIcon" >
                        <img src={icon} alt='' style={{borderRadius: '50%', width: '41px'}}/>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default HearderBar;
