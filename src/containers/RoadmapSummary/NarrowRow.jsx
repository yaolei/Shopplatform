
import React from 'react';
import SummaryGrid from './SummaryGrid';
import {Loading, Col} from '../../vendors/reactW3DS'

import './index.less';

class NarrowRow extends React.Component {

    renderGrid() {
        let allGrids = [];

        if (this.props.dataList.length === 0) {
            allGrids.push(
                <Col span={12} key={0}>
                    <Loading/>
                </Col>
            );
        }
        else {
            let gridWidth = 1 / this.props.dataList.length * 100;
            this.props.dataList.forEach(function (value, index, array) {
                allGrids.push(
                    <Col span={1} key={index} style={{width: gridWidth.toString()+'%', textAlign: 'center'}}>
                        <SummaryGrid
                            sum_title={value.sumTitle}
                            sum_value={value.sumValue}
                            need_tips={value.needTips}
                            tips_words={value.tipsWords}
                        />
                    </Col>
                );
            });
        }

        return allGrids;
    }

    render() {
        return (
             this.renderGrid()
        );
    }
}

export default NarrowRow;