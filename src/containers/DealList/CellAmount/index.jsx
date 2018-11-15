import React from 'react'
import {Row, Col} from '../../../vendors/reactW3DS'


export default class CellAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyVal:''
        }
    }

    handleFormatCurrency (event) {

            let regVal = event.target.value.substr(1).replace(/[^\d,]/g,'');
            let secondVal = event.target.value.substr(1, 2).replace(/[^\d,]/g,'');
            let fistregVal = event.target.value.substr(0, 1).replace(/[^\d$]/g,'');
            let finSting = fistregVal+regVal
            let regx = /\d+/;
            this.setState({
                currencyVal: finSting
            })

            if (finSting.length > 0 && secondVal !== ',' && regx.test(finSting)) {
                this.props.isEnableApplyButton(false)
            } else if (finSting.length === 1 && fistregVal === '$') {
                this.props.isEnableApplyButton(true)
            } else if (finSting.length === 2  && fistregVal === '$' && secondVal === ',') {
                this.props.isEnableApplyButton(true)
            } else {
                this.props.isEnableApplyButton(true)
            }
            event.target.value = finSting;
            let isSecond = this.props.isBetweenCurry ? 'second': 'first';
            this.props.applyCurrencyJson(finSting, isSecond);
    }
    render() {
        let secondField = this.props.isBetweenCurry ? 'second': 'first'
        let displayVal = this.state.currencyVal;
        if (this.props.isTagsFrom) {

            displayVal = this.props.tagsDatas.displayValue;
            if (this.props.tagsDatas.conditionId === 'is_between') {
                if (secondField === 'first') {
                    displayVal = displayVal[0]
                } else {
                    displayVal = displayVal[1]
                }
            }
            
            if (this.props.isChangeAction) {
                displayVal = ''
            }
        }
        let setFocus = false
        if (secondField === 'first') {
            setFocus = 'autofocus'
        }
        return (
            <div type="text" className="ds-input filterBorder" name="search-input" >
                <Row>
                    <Col span={2} id='editWidth'>
                        <div className='usdStyle usdMulStyle'>$(USD)</div>
                    </Col>
                    <Col span={10} otherClass='AmountInput' id='amountWidth'>
                        <input type="text" className="ds-input amountBorder amountStyle" 
                            onChange={this.handleFormatCurrency.bind(this)}
                            maxLength='25'
                            id={secondField}
                            autoFocus={setFocus}
                            defaultValue={displayVal}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
