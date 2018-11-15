import React from 'react';
import { Table } from '../../fixedDataTable/fixed-data-table';
import PropTypes from "prop-types";
import {Loading} from "../index";
import './index.less';

export default class TableIBM extends React.Component {

    getLoadingComponent() {
        return <Loading key={0} style={{fontSize: '26px', paddingBottom: '10px'}}/>
    }

    getNoResultComponent() {
        return <div style={{textAlign: 'center', fontSize: '13px', padding: '10px'}}>{this.props.noResultMessage}</div>;
    }

    getExtraComponents() {
        if (this.props.isLoading) {
            return this.getLoadingComponent();
        } else if (this.props.isNoResult) {
            return this.getNoResultComponent();
        }
    }

    render() {
        let showScrollbarX = true;
        if (this.props.rowsCount === 0 || this.props.isLoading || this.props.isNoResult) {
            showScrollbarX = false;
        }
        return (
            <div>
                <Table {...this.props} showScrollbarX={showScrollbarX}/>
                {this.getExtraComponents()}
            </div>
        );
    }
}

TableIBM.propTypes = {
    isLoading: PropTypes.bool,
    isNoResult: PropTypes.bool,
    noResultMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

TableIBM.defaultProps = {
    isLoading: false,
    isNoResult: false,
    noResultMessage: 'No results were found.'
};