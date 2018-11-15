
import 'fixed-data-table-2/dist/fixed-data-table.css';
import React from 'react';
import { Column, Cell } from 'fixed-data-table-2';
import PropTypes from "prop-types";
import CellContent, {CellContentData} from "./CellContent";
import {Tooltip, Loading} from "../../vendors/reactW3DS";
import TableIBM from "../../vendors/reactW3DS/tableIBM";

export default class DLByOpportunity extends React.Component {

    _CW = '_currentWidth';
    _DW = '_defaultWidth';
    _HScrollBarW = 16;
    _percentageW = 1;
    _blankColumnW = 3;                      // width of blank column which used for resize column in its left
    _showScrollY = true;

    constructor(props) {
        super(props);

        let state = {};
        for (let i = 0; i < this.props.data.header.length; i ++) {
            let obj = this.props.data.header[i];
            state[obj.key+this._CW] = obj.width;
            state[obj.key+this._DW] = obj.width;
        }
        this.state = state;
    }

    /**
     * get how many rows will be in the list view
     * @return {number}
     */
    getRowsCount() {
        if (this.props.data && this.props.data.body && this.props.data.body.length > 0) {
            let moreLoading = this.props.hasMore ? 1 : 0;
            return this.props.data.body.length + moreLoading;
        }
        return 0;
    }

    /**
     * calculate table view height
     * @return {number}
     */
    getTableHeight() {
        let height = this.props.rowHeight;
        if (this.props.data && this.props.data.body && this.props.data.body.length > 0) {
            height = (this.props.data.body.length + 1) * this.props.rowHeight + 20;
        }
        if (height > this.props.maxTableHeight && this.props.maxTableHeight > 0) {
            height = this.props.maxTableHeight;
        }
        return height;
    }

    /**
     * need to get next page data
     */
    getMoreData() {
        this.props.onGetMoreData();
    }

    onNumberClicked(index, key, data) {
        this.props.onItemClicked(index, key, data);
    }

    /**
     * Calculate width if table is very width
     */
    calculateColumnWidth() {
        let totalColumnWidth = 0;
        for (let i = 0; i < this.props.data.header.length; i++) {
            let obj = this.props.data.header[i];
            totalColumnWidth += (obj.isHide ? 0 : this.state[obj.key+this._CW]);
        }
        let containerWidth = this.props.tableWidth - this._blankColumnW - (this._showScrollY?this._HScrollBarW:0);
        

        if (totalColumnWidth < containerWidth) {
            this._percentageW = containerWidth / totalColumnWidth;
        } else {
            this._percentageW = 1;
        }

        for (let i = 0; i < this.props.data.header.length; i++) {
            let obj = this.props.data.header[i];
            this.state[obj.key+this._CW] = this.state[obj.key+this._CW] * this._percentageW;
        }
    }
    /**
     * prepare data for deal list by opportunity by index and key
     * @param index
     * @param key
     * @param kind
     * @param align
     * @param showTooltip
     * @param hideArrow
     * @param isJudgeGetMore
     * @returns {CellContentData}
     */
    getContentData(index, key, kind, align, showTooltip, hideArrow=false, isJudgeGetMore=false) {
        let data = new CellContentData();
        if (index > 0 && index >= this.props.data.body.length && this.props.hasMore) {
            if (isJudgeGetMore === true) {
                this.getMoreData();
            }
            data.displayContent = key==='opportunityOwner' ? <Loading key={0} style={{marginTop: '-47px', marginLeft: '-26px', position: 'absolute'}}/> : '';
            data.hideArrow = false;
            data.displayKind = 5;
            data.textAlign = 'center';
            data.showTooltip = false;
            return data;
        }

        let obj = this.props.data.body[index];
        if (obj) {
            data.hideArrow = hideArrow;
            data.displayContent = this.props.data.body[index][key];
            data.displayKind = kind;
            data.textAlign = align;
            data.showTooltip = showTooltip ? showTooltip : this.state[key+this._CW]<this.state[key+this._DW];
            data.onClick = this.onNumberClicked.bind(this);
        }
        return data;
    }

    getColumns() {
        let columns = [];

        for (let i = 0; i < this.props.data.header.length; i ++) {
            let obj = this.props.data.header[i];
            let cqBackgroundColor = 'ds-bg-neutral-1';
            let titleAlign = obj.title_align === 'left' ? 'title-left' : 'title-center';
            let judgeGetMore = (i===0);
            let header = (obj.title_tip ? obj.title_tip : this.state[obj.key+this._CW]<this.state[obj.key+this._DW])
                ? <Tooltip title={obj.title} placement={'top'} fontSize={13}><div className={titleAlign}>{obj.title}</div></Tooltip>
                : <div className={titleAlign}>{obj.title}</div>;
            columns.push(
                <Column
                    key={obj.key}
                    columnKey={obj.key}
                    header={
                        <Cell className={cqBackgroundColor}>
                            {header}
                        </Cell>
                    }
                    cell={props => (
                        <CellContent {...props}
                                     data={this.getContentData(props.rowIndex, obj.key, obj.kind, obj.cell_align, obj.cell_tip, obj.hideArrow, judgeGetMore)}
                                     className={cqBackgroundColor}/>
                    )}
                    fixed={obj.fixed}
                    width={this.state[obj.key+this._CW]}
                    isResizable={true}
                />
            );
        }

        columns.push(
            <Column
            columnKey="blankColumn"
            header={<Cell key={'blankColumn'}></Cell>}
            cell=''
            width={this._blankColumnW}
            key={'blankColumn'}
          />
        );
        
        return columns;
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {

        let minWidth = columnKey==='opportunityOwner' ? 72 : 36;
        newColumnWidth = newColumnWidth < minWidth ? minWidth : newColumnWidth;
        this.setState({[columnKey+this._CW]:newColumnWidth});
        if (this.props.onCellResize) {
            this.props.onCellResize(true, columnKey, newColumnWidth);
        }
    }

    render() {

        this._showScrollY = !(document.body.clientWidth <= 475);

        this.calculateColumnWidth();

        return (
            <div id='dealListByOpportunity-table'>
                <TableIBM
                    rowHeight={this.props.rowHeight}
                    rowsCount={this.getRowsCount()}
                    headerHeight={this.props.rowHeight}
                    width={this.props.tableWidth}
                    height={this.props.tableHeight ? this.props.tableHeight : this.getTableHeight()}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback.bind(this)}
                    showScrollbarY={this._showScrollY}
                    isColumnResizing={false}
                    touchScrollEnabled={true}
                    stopScrollPropagation={true}
                    onRowTouchStart={() => {
                        document.getElementById('root').style.overflow = 'hidden';
                    }}
                    onRowTouchEnd={() => {
                        document.getElementById('root').style.overflow = 'scroll';
                    }}
                    {...this.props}>

                    {this.getColumns()}
                </TableIBM>
            </div>
        );
    }
}

DLByOpportunity.propTypes = {
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    maxTableHeight: PropTypes.number,
    data: PropTypes.object.isRequired,

    onItemClicked: PropTypes.func,
    onGetMoreData: PropTypes.func,
    onCellResize: PropTypes.func
};
DLByOpportunity.defaultProps = {
    tableWidth: 0,
    tableHeight: 0,
    rowHeight: 50,
    maxTableHeight: 0,
    data: {
        header: [],
        body: [],
    },

    onItemClicked: () => {},
    onGetMoreData: () => {},
    onCellResize: () => {}
};