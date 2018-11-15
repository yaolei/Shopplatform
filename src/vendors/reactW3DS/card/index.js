import React from 'react'
import PropTypes from 'prop-types'

export default class Card extends React.Component {

    header() {

        if (this.props.title || this.props.extra) {
            return (
                <div className={"ds-panel-header"}>
                    <h2 className={"ds-margin-top-0 ds-margin-bottom-0 ds-display-inline-block"}>
                        {this.props.title}
                    </h2>
                    <div className={"ds-display-inline-block ds-float-right"}>{this.props.extra}</div>
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    container() {
        let className = "ds-panel-container";
        if( this.props.bodyFontSizeClass )
        {
            className = className + " " + this.props.bodyFontSizeClass;
        } 
        return (
            <div className={ className }>
                {this.props.children}
            </div>
        );
    }

    footer() {
        if (this.props.footer) {
            return (
                <div className={"ds-panel-footer"}>
                    <p className={"ds-text-small ds-margin-bottom-0"}>{this.props.footer}</p>
                </div>
            );
        } else {
            return(<div></div>);
        }
    }

    render() {

        let idName = '';
        if (this.props.id) {
            idName = this.props.id;
        }

        let panelClass = 'ds-panel';

        if (this.props.otherClass) {
            panelClass += this.props.otherClass;
        }

        if (this.props.border === 'none') {
            panelClass += ' ds-no-border';
        } else if (this.props.border === 'bent') {
            panelClass += ' ds-panel-bent';
        } else if (this.props.border === 'round') {
            panelClass += ' ds-panel-rounded';
        } else { // flat

        }

        if (this.props.float) {
            panelClass += ' ds-panel-floating';
        } else if (this.props.raised) {
            panelClass += ' ds-panel-raised';
        }

        return (
            <div id={idName} className={panelClass}>
                {this.header()}
                {this.container()}
                {this.footer()}
            </div>
        )
    }
}

Card.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    extra: PropTypes.node,
    hover: PropTypes.bool,
    raised: PropTypes.bool, // float but not too much
    float: PropTypes.bool, // absolutely float up
    border: PropTypes.oneOf(['none', 'flat', 'bent', 'round']),
    footer: PropTypes.node,
    otherClass: PropTypes.string,
    bodyFontSizeClass: PropTypes.string
};

Card.defaultProps = {
    id: '',
    title: '',
    extra: '',
    hover: false,
    raised: false,
    float: false,
    border: 'flat',
    footer: '',
    otherClass: '',
    bodyFontSizeClass: ""
}



