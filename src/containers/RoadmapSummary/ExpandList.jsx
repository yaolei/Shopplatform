
import 'fixed-data-table-2/dist/fixed-data-table.css';
import React from 'react';
import { Column, Cell } from 'fixed-data-table-2';
import PropTypes from "prop-types";
import CellBreakout, {CellBreakoutData} from "./CellBreakOut";
import CellNumber, {CellNumberData} from "./CellNumber";
import {Tooltip, Loading} from "../../vendors/reactW3DS";
import TableIBM from "../../vendors/reactW3DS/tableIBM";

class ExpandList extends React.Component {

    _ShowW = '_currentWidth';
    _StoreW = '_defaultWidth';
    _HScrollBarW = 16;                      // width of scroll bar at right table
    _percentageW = 1;
    _blankColumnW = 3;                      // width of blank column which used for resize column in its left

    constructor(props) {
        super(props);

        let state = {};
        state.columnWidth = {};
        for (let i = 0; i < props.data.header.length; i ++) {
            let obj = props.data.header[i];
            state.columnWidth[obj.key+this._ShowW] = obj.width;
            state.columnWidth[obj.key+this._StoreW] = obj.width;
        }
        this.state = state;
    }

    componentWillReceiveProps(props) {
        
        var colWidth = this.state.columnWidth;
        for (let i = 0; i < props.data.header.length; i ++) {
            let obj = props.data.header[i];
            colWidth[obj.key+this._ShowW] = obj.width;
            colWidth[obj.key+this._StoreW] = obj.width;
        }
        this.setState({columnWidth: colWidth});
    }

    /**
     * get how many rows will be in the list view
     * @return {number}
     */
    getRowsCount() {
        if (this.props.data && this.props.data.body && this.props.data.body.length > 0) {
            return this.props.data.body.length;
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
     * calculate breakout column width
     * @return {number}
     */
    getBreakoutCellWidth() {
        let width = this.props.tableWidth / 6 + 90;
        if (width < 150) {
            width = 150;
        } else if (width > 300) {
            width = 300;
        }
        return width;
    }

    /**
     * calculate number column width
     * @param cellKey
     * @return {number}
     */
    getNumberCellWidth(cellKey) {
        // the amount should exclude breakout
        const columnAmount = this.props.data.header.length - 1,
            scrollBarWidth = this.getTableHeight() === this.props.maxTableHeight ? 16 : 1,
            areaWidth = this.props.tableWidth - this.getBreakoutCellWidth() - scrollBarWidth; // 16 is vertical scroll bar
        let width = 150;
        if (areaWidth > 0) {
            // if the screen is wide enough, show all the columns
            width = areaWidth / columnAmount;

            // if the column is too small, set it to MIN value
            let min = 95;
            if (cellKey === 'manDeltaToTarget') {
                min = 105;
            }
            if (width < min) {
                width = min;
            }
        }
        return width;
    }

    /**
     * be triggered when user clicked a breakout cell.
     * @param index
     * @param data
     */
    onBreakoutClicked(index, data) {
        this.props.onItemClicked('Breakout', data);
    }

    /**
     * be triggered when hyper link is clicked
     * @param index
     * @param data
     */
    onHyperLinkClicked(index, data) {
        this.props.onItemClicked('BreakoutHyperLink', data);
    }

    /**
     * need to get next page data
     */
    getMoreData() {
        this.props.onGetMoreData();
    }

    /**
     * prepare data for breakout by index and key
     * @param index
     * @param key
     * @return {CellBreakoutData}
     */
    getBreakoutData(index, key) {
        let data = new CellBreakoutData(),
            obj = this.props.data.body[index];
        if (obj) {
            data.breakoutNumber = obj.breakoutNumber;
            data.isExpanded = obj.isExpanded ? obj.isExpanded : false;
            data.breakout1Index = obj.breakout1Index;
            data.breakout2Index = obj.breakout2Index;
            data.breakout3Index = obj.breakout3Index;
            data.isHyperLink = obj.filterClickable;
            if (obj.hideBreakOut1Key === 'TOTAL') {
                data.isHyperLink = false;
            }
            switch (data.breakoutNumber) {
                case 1:
                    data.displayName = obj.hideBreakOut1Disp;
                    data.couldExpand = !!obj.hasBreakOut2;
                    break;
                case 2:
                    data.displayName = obj.hideBreakOut2Disp;
                    data.couldExpand = !!obj.hasBreakOut3;
                    break;
                case 3:
                    data.displayName = obj.hideBreakOut3Disp;
                    data.couldExpand = false;
                    break;
                default:
                    data.displayName = obj.hideBreakOut1Disp;
                    data.couldExpand = false;
                    break;
            }
            data.onClick = this.onBreakoutClicked.bind(this);
            data.onHyperLinkClick = this.onHyperLinkClicked.bind(this);
        }
        if (index > 0 && index >= this.props.data.body.length - 1) {
            this.getMoreData();
        }
        return data;
    }

    onNumberClicked(index, data) {
        this.props.onItemClicked(index, data);
    }

    /**
     * prepare data for breakout numbers by index and key
     * @param index
     * @param key
     * @return {CellNumberData}
     */
    getNumberData(index, key) {
        let data = new CellNumberData(),
            obj = this.props.data.body[index];
        data.key = key;
        data.breakoutData = this.getBreakoutData(index, 'Breakout');
        if (obj) {
            data.displayNumber = this.props.data.body[index][key];
            data.isHyperLink = obj.filterClickable;
            if (key === 'budgetAmount' ||
                key === 'manDeltaToTarget' ||
                key === 'managerWsrCqAmount' ||
                key === 'managerKeyCqAmount') {
                data.isHyperLink = false;
            }
            data.onClick = this.onNumberClicked.bind(this);
            switch (obj.breakoutNumber) {
                case 1:
                    data.couldExpand = !!obj.hasBreakOut2;
                    break;
                case 2:
                    data.couldExpand = !!obj.hasBreakOut3;
                    break;
                case 3:
                    data.couldExpand = false;
                    break;
                default:
                    data.couldExpand = false;
                    break;
            }
        }
        return data;
    }

    getColumns() {
        let columns = [];
        for (let i = 0; i < this.props.data.header.length; i ++) {
            let obj = this.props.data.header[i];
            let cqBackgroundColor = 'ds-bg-neutral-1';
            if (obj.key === 'managerWsrCqAmount' || obj.key === 'managerKeyCqAmount') {
                cqBackgroundColor = 'ds-bg-neutral-2';
            }
            if (i === 0) {
                columns.push(
                    <Column
                        key={obj.key}
                        columnKey={obj.key}
                        header={<Cell>
                            <Tooltip title={obj.title} placement={'top'} fontSize={13}>
                                <div className={'ellipsis'}>{obj.title}</div>
                            </Tooltip>
                        </Cell>}
                        cell={props => (
                            <CellBreakout {...props} data={this.getBreakoutData(props.rowIndex, obj.key)}/>
                        )}
                        fixed={obj.fixed}
                        width={this.state.columnWidth[obj.key+this._ShowW]}
                        isResizable={true}
                    />
                );
            } else {
                columns.push(
                    <Column
                        key={obj.key}
                        columnKey={obj.key}
                        header={<Cell className={cqBackgroundColor}>
                            <Tooltip title={obj.title} placement={'top'} fontSize={13}>
                                <div className={'ellipsis'}>{obj.title}</div>
                            </Tooltip>
                        </Cell>}
                        cell={props => (
                            <CellNumber {...props} data={this.getNumberData(props.rowIndex, obj.key)}
                                className={cqBackgroundColor}/>
                        )}
                        fixed={obj.fixed}
                        width={this.state.columnWidth[obj.key+this._ShowW]}
                        isResizable={true}
                    />
                );
            }
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
        let minWidth = 43;
        newColumnWidth = newColumnWidth < minWidth ? minWidth : newColumnWidth;

        var colWidth = this.state.columnWidth;
        colWidth[columnKey+this._ShowW] = newColumnWidth;
        if (this.props.onCellResize) {
            newColumnWidth /= this._percentageW;
            colWidth[columnKey+this._StoreW] = newColumnWidth;            
            this.props.onCellResize(columnKey, newColumnWidth);
        }
        this.setState({columnWidth: colWidth});
    }

    /**
     * Calculate width if table is very width
     */
    calculateColumnWidth() {
        let totalColumnWidth = 0;
        for (let i = 0; i < this.props.data.header.length; i++) {
            let obj = this.props.data.header[i];
            totalColumnWidth += this.state.columnWidth[obj.key+this._StoreW];
        }
        let containerWidth = this.props.tableWidth - this._HScrollBarW - this._blankColumnW;
        

        if (totalColumnWidth < containerWidth) {
            this._percentageW = containerWidth / totalColumnWidth;
        } else {
            this._percentageW = 1;
        }

        for (let i = 0; i < this.props.data.header.length; i++) {
            let obj = this.props.data.header[i];
            this.state.columnWidth[obj.key+this._ShowW] = this.state.columnWidth[obj.key+this._StoreW] * this._percentageW;
        }
    }

    render() {

        this.calculateColumnWidth();

        return (
            <div>
                <TableIBM
                    rowHeight={this.props.rowHeight}
                    rowsCount={this.getRowsCount()}
                    headerHeight={this.props.rowHeight}
                    width={this.props.tableWidth}
                    height={this.props.tableHeight ? this.props.tableHeight : this.getTableHeight()}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback.bind(this)}
                    isColumnResizing={false}
                    touchScrollEnabled={true}
                    stopScrollPropagation={true}
                    onRowTouchStart={() => {
                        document.getElementById('root').style.overflow = 'hidden';
                    }}
                    onRowTouchEnd={() => {
                        document.getElementById('root').style.overflow = 'scroll';
                    }}
                    isLoading={this.props.status === 1}
                    {...this.props}>

                    {this.getColumns()}
                </TableIBM>
            </div>
        );
    }
}

export default ExpandList;

ExpandList.propTypes = {
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    maxTableHeight: PropTypes.number,
    data: PropTypes.object.isRequired,
    onItemClicked: PropTypes.func,
    onGetMoreData: PropTypes.func,
    status:PropTypes.number
};
ExpandList.defaultProps = {
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
};