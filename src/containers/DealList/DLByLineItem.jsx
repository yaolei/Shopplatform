
import 'fixed-data-table-2/dist/fixed-data-table.css';
import React from 'react';
import { Column, Cell } from 'fixed-data-table-2';
import PropTypes from "prop-types";
import CellContent, {CellContentData} from "./CellContent";
import {Tooltip, Loading} from "../../vendors/reactW3DS";
import TableIBM from "../../vendors/reactW3DS/tableIBM";
import HideColumn from '../../components/HideColumn';
import ColumnList from '../../components/HideColumn/ColumnList'

export default class DLByLineItem extends React.Component {

    _ShowW = '_currentWidth';
    _StoreW = '_defaultWidth';
    _HScrollBarW = 16;                      // width of scroll bar at right table
    _percentageW = 1;
    _blankColumnW = 3;                      // width of blank column which used for resize column in its left
    _hideButtonW = 45;
    _showScrollY = true;

    constructor(props) {
        super(props);

        let state = {};
        for (let i = 0; i < this.props.data.header.length; i ++) {
            let obj = this.props.data.header[i];
            state[obj.key+this._ShowW] = obj.width;
            state[obj.key+this._StoreW] = obj.width;
        }
        this.state = state;
        this.state.showColumnList=false;
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
            totalColumnWidth += (obj.isHide ? 0 : this.state[obj.key+this._StoreW]);
        }
        let containerWidth = this.props.tableWidth - this._blankColumnW - this._hideButtonW - (this._showScrollY?this._HScrollBarW:0);
        

        if (totalColumnWidth < containerWidth) {
            this._percentageW = containerWidth / totalColumnWidth;
        } else {
            this._percentageW = 1;
        }

        for (let i = 0; i < this.props.data.header.length; i++) {
            let obj = this.props.data.header[i];
            this.state[obj.key+this._ShowW] = this.state[obj.key+this._StoreW] * this._percentageW;
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
            data.displayContent = key==='accountName' ? <Loading key={0} style={{marginTop: '-47px', marginLeft: '-26px', position: 'absolute'}}/> : '';
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
            data.showTooltip = showTooltip ? showTooltip : this.state[key+this._ShowW]<this.state[key+this._StoreW];
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
            let header = (obj.title_tip ? obj.title_tip : this.state[obj.key+this._ShowW]<this.state[obj.key+this._StoreW])
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
                    width={this.state[obj.key+this._ShowW]}
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

        columns.push(
            <Column
            columnKey="custom"
            header={
                <Cell id="column_setting" key={'hideBtnColumn'}>
                    <HideColumn key={'hideBtn'}
                                showStatus={this.state.showColumnList}
                                hideColumnClick={this.toggleColumnDisplaySettingList.bind(this)}/>
                </Cell>
            }
            cell=''
            fixedRight={true}
            width={this._hideButtonW}
            key={'hideBtnColumn'}
          />
        );

        return columns;
    }

    toggleColumnDisplaySettingList(){
        this.setState({
            showColumnList:!this.state.showColumnList
        })
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        let minWidth = columnKey==='accountName' ? 72 : 36;
        newColumnWidth = newColumnWidth < minWidth ? minWidth : newColumnWidth;

        this.setState({[columnKey+this._ShowW]:newColumnWidth});

        if (this.props.onCellResize) {
            newColumnWidth /= this._percentageW;
            this.setState({[columnKey+this._StoreW]:newColumnWidth});
            this.props.onCellResize(false, columnKey, newColumnWidth);
        }
    }

    render() {

        this._showScrollY = !(document.body.clientWidth <= 475);

        this.calculateColumnWidth();

        return (
            <div id='dealListByLineItem-table'>
                <TableIBM
                    key='DLByLineItemTable'
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
                <ColumnList key={'columnList'} showColumnList={this.state.showColumnList}
                            columnNames={this.props.columnNames} hideColumn={this.props.hideColumn}
                            dismissHandler={this.toggleColumnDisplaySettingList.bind(this)}/>
            </div>
        );
    }
}

DLByLineItem.propTypes = {
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    maxTableHeight: PropTypes.number,
    data: PropTypes.object.isRequired,

    onItemClicked: PropTypes.func,
    onGetMoreData: PropTypes.func,
    onCellResize: PropTypes.func
};
DLByLineItem.defaultProps = {
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