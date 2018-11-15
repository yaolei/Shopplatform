import React from 'react'
import PropTypes from "prop-types";
import { Cell } from 'fixed-data-table-2';
import {Tooltip} from "../../../vendors/reactW3DS";

export class CellContentData {
    displayContent = 0;
    couldExpand = false;
    textAlign = 'left';
    showTooltip = false;
    hideArrow = false;

    /**
     * 0-number 1-string 2-date 3-percent 4-switch button
     * @type {number}
     */
    displayKind = 0;

    onClick = (index) => {};
}

export default class CellContent extends React.Component {

    thousandsSeparate(num) {
        var result = '';
        num = (num || 0).toString();

        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return result;
    }

    formatNumber() {
        switch (this.props.data.displayKind) {
            case 0:
                let number = Math.round(parseInt(this.props.data.displayContent) / 1000);
                if (number < 0) {
                    number = 0 - number;
                    number = '(' + this.thousandsSeparate(number) + 'k)';
                } else {
                    number = this.thousandsSeparate(number) + 'k';
                }
                return number;
            case 1:
                return this.props.data.displayContent;
            case 2:
                let date = new Date(this.props.data.displayContent);
                let month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
                let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
                return [month, day, date.getFullYear()].join('-');
            case 3:
                return (this.props.data.displayContent + '%');
            case 4:
                return (
                    <div className="ds-input-container ds-margin-bottom-2">
                        <label htmlFor="input-toggle-1" className="ds-input-toggle">
                            <input type="checkbox"
                                   checked={(this.props.data.displayContent===1)}
                                   id="input-toggle-1"
                                   role="switch"
                                   aria-label="toggle"/>
                            <div className="ds-input-control">

                            </div>
                        </label>
                    </div>
                );
            case 5:
            return this.props.data.displayContent;
            default:
                return this.props.data.displayContent;
        }
    }

    render() {
        const {rowIndex, ...props} = this.props;
        let className = 'cellNumber';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        if (this.props.data.couldExpand) {
            className += ' ds-font-weight-bold';
        }

        // text color ds-text-contextual-red-4 is red, ds-text-blue-6 is blue,
        if (parseInt(this.props.data.displayContent) < 0) {
            className += ' ds-text-contextual-red-4';
        } else {
            className += ' cellGrayText';
        }

        if (this.props.data.textAlign === 'center') {
            className += ' text-center';
        } else if (this.props.data.textAlign === 'right') {
            className += ' text-right';
        } else {
            className += ' text-left';
        }

        let format = this.formatNumber();
        if(!format){
            format= ''
        }
        let content = this.props.data.showTooltip
            ? <Tooltip title={format} placement={'bottom'} fontSize={13} hideArrow={this.props.data.hideArrow}>
                <div className='ellipsis'>{format}</div>
            </Tooltip>
            : <div className='ellipsis'>{format}</div>;

        return (
            <Cell {...props} className={className} onClick={() => this.props.data.onClick(rowIndex, this.props.data)}>
                {content}
            </Cell>
        );
    }
}

CellContent.propTypes = {
    // data: PropTypes.instanceOf(CellContentData),
    className: PropTypes.string
};

CellContent.defaultProps = {
    // data: new CellContentData(),
    className: ''
};
