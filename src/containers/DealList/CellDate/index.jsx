import React from 'react'
import {Row, Col} from '../../../vendors/reactW3DS'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CellDate extends React.Component {
    DateVal=null;
    dataArray = [];
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            showPlaceValue:props.placesHoders
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate () {
        this.refs.datepicker.input.setAttribute('data-val', this.refs.datepicker.input.value);
    }

    handleChange = (date) => {
        let self = this;
        if (this.props.placesHoders !=='') {
            if (this.props.SecondIndx === 'is_between') {
                if (this.refs.datepicker.input.id === 'firstFiled') {
                    self.dataArray[0] = date.format('MM/DD/YYYY');
                } else {
                    self.dataArray[1] = date.format('MM/DD/YYYY');
                }
                this.props.getDateVal(date.format('MM/DD/YYYY'),this.refs.datepicker.input.id, this.props.SecondIndx);
            }

            if (self.dataArray[0]  === '' || self.dataArray[1] === '') {
                this.props.isEnableApplyButton(true);
            } else {
                this.props.isEnableApplyButton(false);
            }
        } else {
            if (date !== null) {
                this.DateVal = date.format('MM/DD/YYYY');
                this.props.getDateVal(this.DateVal);
                this.props.isEnableApplyButton(false);
            } else {
                this.props.isEnableApplyButton(true);
            }
        }

        this.setState({
            startDate: date
        });
    }

    handleChangeRaw (event) {
        if (event === '') {
            this.props.isEnableApplyButton(true);
        }
    }
    toggleCalendar (e) {
        this.refs.datepicker.onInputClick();
    }
    render() {
        let placeHolder = this.state.showPlaceValue
        if (this.props.isTagsFrom && !this.props.isChangeAction) {
            placeHolder = JSON.parse(JSON.stringify(this.props.tagsDatas.displayValue))
            if (this.props.SecondIndx === 'is_between') {
                if (this.props.SecondIds === 'firstFiled') {
                    placeHolder = JSON.parse(JSON.stringify(this.props.tagsDatas.displayValue[0]))
                } else {
                    placeHolder = JSON.parse(JSON.stringify(this.props.tagsDatas.displayValue[1]))
                }
            } else if (this.props.displayDateArray.indexOf(this.props.SecondIndx) === -1 && this.props.isChangeAction) {
                placeHolder = this.state.showPlaceValue
            }
        }
        return (
            <div type="text" className="ds-input ds-input-dateBorder" name="search-input" >
                <Row>
                    <Col span={11} otherClass='DateInput'>
                        <DatePicker className='DataInputBorder ds-input'
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    placeholderText={placeHolder}
                                    onChangeRaw={(event) =>
                                        this.handleChangeRaw(event.target.value)}
                                    ref="datepicker"
                                    id={this.props.SecondIds}

                        />
                    </Col>
                     <Col span={1}>
                        <span className="ds-icon-size-default ds-icon-calendar ds-calendar-style"
                            onClick={this.toggleCalendar.bind(this)}>
                        </span>
                    </Col>

                </Row>
            </div>
        );
    }
}

CellDate.propTypes = {

};

CellDate.defaultProps = {

};
