import React from 'react'
import PropTypes from 'prop-types'

export default class Col extends React.Component {

    render() {
        let span = this.props.span;
        if (span > 12) {
            span = 12;
        }
        let className = 'ds-col-' + span;

        if (this.props.span_xs) {
            className += ' ds-col-xs-' + this.props.span_xs;
        }
        if (this.props.span_s) {
            className += ' ds-col-sm-' + this.props.span_s;
        }
        if (this.props.span_m) {
            className += ' ds-col-md-' + this.props.span_m;
        }
        if (this.props.span_l) {
            className += ' ds-col-lg-' + this.props.span_l;
        }
        if (this.props.span_xl) {
            className += ' ds-col-xl-' + this.props.span_xl;
        }

        if (this.props.otherClass) {
            className += ' ' + this.props.otherClass
        }

        if (this.props.noGutter) {
            className += ' ds-no-gutter';
        }

        if (this.props.offset) {
            className += ' ds-offset-' + this.props.offset;
        }
        return (
            <div className={className} id={this.props.id}>
                {this.props.children}
            </div>
        )
    }
}

/*
xs: less than 475px
s: 475 - 778px
m: 779 - 1158px
l: 1159 - 1539px
xl: greater than 1539px
 */
const availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
Col.propTypes = {
    span: PropTypes.oneOf(availableNumbers).isRequired,
    span_xs: PropTypes.oneOf(availableNumbers),
    span_s: PropTypes.oneOf(availableNumbers),
    span_m: PropTypes.oneOf(availableNumbers),
    span_l: PropTypes.oneOf(availableNumbers),
    span_xl: PropTypes.oneOf(availableNumbers),
    noGutter: PropTypes.bool,
    offset: PropTypes.number,
    otherClass: PropTypes.string,
    id:PropTypes.string
};

Col.defaultProps = {
    span: 0,
    span_xs: 0,
    span_s: 0,
    span_m: 0,
    span_l: 0,
    span_xl: 0,
    noGutter: false,
    offset: 0,
    otherClass:'',
    id:''
};