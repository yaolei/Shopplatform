import React from 'react'
import PropTypes from "prop-types";
import { Cell } from 'fixed-data-table-2';
import {Icon, Row, Col, Tooltip} from "../../../vendors/reactW3DS";

export class CellBreakoutData {
    displayName = '';
    breakoutNumber = 1;
    breakout1Index = -1;
    breakout2Index = -1;
    breakout3Index = -1;
    couldExpand = false;
    isExpanded = false;
    isHyperLink = false;
    onClick = (index) => {};
    onHyperLinkClick = (index) => {};
}

export default class CellBreakout extends React.Component {


    getIcon() {
        if (this.props.data.couldExpand) {
            if (this.props.data.isExpanded) {
                return <Icon type={'caret-circle-up'} onClick={() => {
                    this.props.data.onClick(this.props.rowIndex, this.props.data)
                }}/>
            } else {
                return <Icon type={'caret-circle-down'} onClick={() => {
                    this.props.data.onClick(this.props.rowIndex, this.props.data)
                }}/>
            }
        }
        return <span></span>;
    }

    getContent() {

        let columns = [],
            offset = 0;

        switch (this.props.data.breakoutNumber) {
            case 1:
                offset = 0;
                break;
            case 2:
                offset = 1;
                break;
            case 3:
                offset = 2;
                break;
            default:
                offset = 0;
                break;
        }

        let getDisplayName = function (self) {
            return (
                <Tooltip title={self.props.data.displayName} placement={'bottom'} fontSize={13}>
                    <span className={'ellipsis'}>
                        {self.props.data.isHyperLink && self.props.data.breakoutNumber === 1 ?
                            <a className={'ds-clickable'} onClick={() => {
                                self.props.data.onHyperLinkClick(self.props.rowIndex, self.props.data);
                            }}>
                                {self.props.data.displayName}
                            </a> :
                            self.props.data.displayName}
                    </span>
                </Tooltip>
            );
        };

        if (this.props.data.couldExpand) {
            columns.push(
                <Col key={1} className="gutter-row" span={2} span_xs={2} offset={offset} noGutter={true}>
                    {this.getIcon()}
                </Col>
            );
            columns.push(
                <Col key={2} className="gutter-row" span={12 - 2 - offset} span_xs={12 - 2 - offset}>
                    {getDisplayName(this)}
                </Col>
            )
        } else {
            offset += 2;
            columns.push(
                <Col key={2} className="gutter-row" span={12 - offset} offset={offset}>
                    {getDisplayName(this)}
                </Col>
            )
        }
        return columns;
    }

    render() {
        const {rowIndex, ...props} = this.props;
        let className = 'cellBreakout';
        if (this.props.data.couldExpand) {
            className += ' ds-font-weight-bold';
        }
        if (rowIndex === 0) {
            className += ' ds-bg-neutral-3';
        }
        className += ' ds-bg-neutral-1';
        return (
            <Cell {...props} className={className}>
                <Row gutter={16} paddingTop={0} type="flex" justify="center" align="top" className={'sub-layout'}>
                    {this.getContent()}
                </Row>
            </Cell>
        );
    }
}

CellBreakout.propTypes = {
    data: PropTypes.instanceOf(CellBreakoutData),
};

CellBreakout.defaultProps = {
    data: new CellBreakoutData(),
};
