import React from 'react'
import PropTypes from "prop-types";
import { Cell } from 'fixed-data-table-2';
import {Tooltip} from "../../../vendors/reactW3DS";

export class CellNumberData {
    breakoutData = {};
    displayNumber = 0;
    key = '';
    couldExpand = false;
    isHyperLink = false;
    onClick = (index) => {};
}

export default class CellNumber extends React.Component {

    // MAXNumberDigit = 7; // 9,999,9... or (99,999... ; "k" is not calculated
    MAXNumberDigit = 9999; // the display rule has changed in feature 130930
    ThousandsSeparator = ',';

    thousandsSeparate(num) {
        var result = '';
        num = (num || 0).toString();

        while (num.length > 3) {
            result = this.ThousandsSeparator + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return result;
    }

    formatNumber(isLink = false) {
        let number = Math.round(parseInt(this.props.data.displayNumber) / 1000),
            element = '';
        if (number < 0) {
            number = 0 - number;
            number = '(' + this.thousandsSeparate(number) + 'k)';
        } else {
            number = this.thousandsSeparate(number) + 'k';
        }

        let delta = 0;
        if (this.props.data.key === 'manDeltaToTarget') {
            delta = 2;
        }
        let isLinkCss = isLink ? 'divDerLine': '';
        if (number.length > this.MAXNumberDigit + 1 + delta) {
            element = number.substr(0, this.MAXNumberDigit + delta) + '...';
            element = <Tooltip title={number} fontSize={13}>
                <div style={{display: 'inline-block'}} className={isLinkCss}>{element}</div>
            </Tooltip>;
        } else {
            element =
                <Tooltip title={number} fontSize={13}>
                    <div style={{display: 'inline-block'}} className={isLinkCss + ' ellipsis'}>{number}</div>
                </Tooltip>
        }

        return element;
    }

    render() {
        const {rowIndex, ...props} = this.props;
        let className = 'cellNumber ds-align-text-right ';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (this.props.data.couldExpand) {
            className += ' ds-font-weight-bold';
        }

        // text color ds-text-contextual-red-4 is red, ds-text-blue-6 is blue,
        if (parseInt(this.props.data.displayNumber) < 0) {
            className += ' ds-text-contextual-red-4';
        } else {
            className += ' cellGrayText';
        }
        if (rowIndex === 0) {
            className += ' ds-bg-neutral-3';
        }
        return (
            <Cell {...props} className={className}>
                {this.props.data.isHyperLink ?
                    <a className={'ds-clickable'}
                       onClick={() => this.props.data.onClick(rowIndex, this.props.data)}>
                        {this.formatNumber(true)}
                    </a> : this.formatNumber()}
            </Cell>
        );
    }
}

CellNumber.propTypes = {
    data: PropTypes.instanceOf(CellNumberData),
    className: PropTypes.string
};

CellNumber.defaultProps = {
    data: new CellNumberData(),
    className: ''
};
