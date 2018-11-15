import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../components/HeaderBar';
import BottomArea from '../components/BottomArea';
import BriefInfo from './BriefInfo';
import TotalSummary from './TotalSummary';
import RoadmapSummary from './RoadmapSummary';
import DealList from './DealList';
import WeeklyForecast from './WeeklyForecast';
import PieCharts from './WeeklyForecast/pieCharts';
import LinearGraph from './WeeklyForecast/linearGraph';
import Login from './Login'


class MainView extends React.Component {

    _parseUrl(url) {
        let objURL = {};
        url.replace(
            new RegExp("([^#?=&]+)(=([^&]*))?", "g"),
            function ($0, $1, $2, $3) {
                objURL[$1] = $3;
            }
        );
        return objURL;
    }

    render() {
        let url = this.props.location.search ? this.props.location.search : this.props.location.hash;
        let param = this._parseUrl(url);
        let isLoggedin = this.props.loginStatus && this.props.loginAccess;
        let outerClassName= 'ds-row';

        let userAgent= navigator.userAgent;
        if(userAgent.indexOf('Firefox/')>-1){
            let version=userAgent.split('Firefox/')[1];
            if(version && version < 60){
                outerClassName = outerClassName + ' fireFox52'
            }
        }
        return (
            <div className={outerClassName} style={{margin:0}}>
                {isLoggedin ?
                    <div>
                        <HeaderBar />
                        <div className="ds-col-12 ds-bg-contextual-gray ds-no-gutter-xs">
                            <div className="ds-col-sm-12 ds-col-md-12 ds-col-lg-12 ds-col-xl-12">
                            </div>
                            <div className="ds-col-4 ds-col-sm-12 ds-col-md-6 ds-col-lg-6 ds-col-xl-4">
                                <div id="nodeList_BriefInfo"><BriefInfo /></div>
                            </div>
                            <div id="top_total_md" className="ds-col-8 ds-col-sm-12 ds-col-md-6 ds-col-lg-6 ds-col-xl-8">
                                <div id="top_total"><TotalSummary /></div>
                            </div>
                            <div className="ds-col-sm-12 ds-col-md-4 ds-col-lg-4 ds-col-xl-4">
                                <div id="e_charts_module"><WeeklyForecast /></div>
                            </div>
                            <div className="ds-col-sm-12 ds-col-md-4 ds-col-lg-4 ds-col-xl-4">
                                <div id="pie_charts_module"><PieCharts /></div>
                            </div>
                            <div className="ds-col-sm-12 ds-col-md-4 ds-col-lg-4 ds-col-xl-4">
                                <div id="linear_charts_module"><LinearGraph /></div>
                            </div>
                            <div className="ds-col-sm-12 ds-col-md-12 ds-col-lg-12 ds-col-xl-12">
                                <div><RoadmapSummary /></div>
                            </div>
                            <div className="ds-col-sm-12 ds-col-md-12 ds-col-lg-12 ds-col-xl-12">
                                <div><DealList /></div>
                            </div>
                            <BottomArea />
                        </div>
                    </div> : <Login param={param}></Login>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginStatus: state.loginStatus,
        loginAccess: state.loginAccess,
    }
}

export default connect(mapStateToProps)(MainView);