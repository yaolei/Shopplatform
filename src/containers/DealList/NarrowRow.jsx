
import React from 'react';
import {Col} from '../../vendors/reactW3DS'
import DealListGrid from './DealListGrid';

import './index.less';

const dataList = [
    {'sum_title':'Total Opportunity Amount', 'sum_value':'435k'},
    {'sum_title':'Total Transactional Amount', 'sum_value':'336k'},
];

class NarrowRow extends React.Component {

    renderGrid() {
        let allGrids = [];
        dataList.forEach(function (value, index, array) {
            allGrids.push(
                <Col span={4} key={index}>
                    <DealListGrid sum_title={value.sum_title} sum_value={value.sum_value}/>
                </Col>
            );
        });
        return allGrids;
    }

    render() {
        return (
            this.renderGrid()
        );
    }
}

export default NarrowRow;