import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './index.css';
import { setInputText } from '../../../actions/dealListAction'
import { Col } from '../index'
class IconInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            filterChanged: false,
        }
    }
    textInputChange = (event) => {
        let inputContent = event.target.value;
        this.setState({
            filterValue:inputContent,
            filterChanged:true
        });
        this.props.getInputText(inputContent, inputContent);
        this.props.filterTextChange(inputContent);
        this.props.dispatch(setInputText(inputContent));
    }
    componentDidMount() {

    }

    render() {
        let containerClass = 'ds-icon-size-default ds-search-icon ds-icon-' + this.props.type;
        let inputid = '';
        if(this.props.inputid) {
            inputid = this.props.inputid;
        }
        return (
            <Col span={12} otherClass='queryNLeft'>
                <Col span={1}>
                    <span className={containerClass} data-value={this.props.iconInput}></span>
                </Col>
                <Col span={10} otherClass='nullPadding'>
                    <input id={inputid} type="text" className="ds-input ds-input-style" name="search-input" 
                    readOnly={this.props.isReadOnly}
                        data-value="input"  placeholder={this.props.placeholder} tabIndex="1" 
                        onChange={this.textInputChange.bind(this)} 
                        value={this.props.getBasicSearchText}/>
                </Col>
            </Col>

        );
    }
}

function mapStateToProps(state) {
    return{
        getBasicSearchText: state.getBasicSearchText
    }
}

export default connect (mapStateToProps)(IconInput);
 
IconInput.propTypes = {
    inputid: PropTypes.string,
    type: PropTypes.string,
    iconInput: PropTypes.string,
    placeholder: PropTypes.string,
    isReadOnly: PropTypes.string,
    queryCurText:PropTypes.string
};

IconInput.defaultProps = {
    inputid: '',
    type: 'search',
    iconInput: 'icon-input',
    placeholder: '',
    isReadOnly: '',
    queryCurText: ''
};