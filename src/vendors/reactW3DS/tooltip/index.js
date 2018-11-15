import React from 'react'
import PropTypes from "prop-types"
import RcTooltip from 'rc-tooltip'
// import 'rc-tooltip/assets/bootstrap.css'
import './index.css';

// refer to rc-tooltip http://react-component.github.io/tooltip/

export default class Tooltip extends React.Component {

    containerId = '';

    getTooltipElement() {
        let direction = 'ds-tooltip-content-' + this.props.placement,
            className = 'ds-tooltip-content ds-dark tooltip-content ' + direction;

        if (this.props.hideArrow) {
            className += ' hide-tooltip-arrow';
        }

        if (this.props.showShadow) {
            className += ' ds-shadow';
        }
        let style = {};
        style.fontSize = this.props.fontSize;
        return (
            <div className={'ds-tooltip ds-align-text-center ds-open'}>
                <div className={className} style={style}>{this.props.title}</div>
            </div>
        );
    }

    componentWillUnmount() {
        this.removeContainer();
    }

    createContainer() {
        var div = document.createElement("div");
        const timestamp = new Date().getTime();
        this.containerId = 'tooltip_' + timestamp;
        div.id = this.containerId;
        document.body.appendChild(div);
    }

    removeContainer() {
        document.body.removeChild(this.getContainer());
        this.containerId = '';
    }

    getContainer() {
        if (!this.containerId) {
            this.createContainer();
        }
        var div = document.getElementById(this.containerId);
        if (!div) {
            this.createContainer();
            div = document.getElementById(this.containerId);
        }
        return div;
    }

    render() {

        let triggerEvents = [];
        if (this.props.hoverTrigger) {
            triggerEvents.push('hover');
        }
        if (this.props.clickTrigger) {
            triggerEvents.push('click');
        }

        return(
            <RcTooltip
                placement={this.props.placement}
                trigger={triggerEvents}
                mouseEnterDelay={this.props.showDelay}
                mouseLeaveDelay={0}
                overlayClassName={this.props.className}
                overlayStyle={this.props.style}
                overlay={<div style={{ height: 'auto', width: 'auto' }}>{this.getTooltipElement()}</div>}
                destroyTooltipOnHide={true}
                getTooltipContainer={this.getContainer.bind(this)}>{this.props.children}</RcTooltip>
        );
    }
}

Tooltip.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),//, 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'),
    hoverTrigger: PropTypes.bool,
    clickTrigger: PropTypes.bool,
    style: PropTypes.object,
    animation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    showShadow: PropTypes.bool,
    fontSize: PropTypes.number,
    showDelay: PropTypes.number,
    hideArrow: PropTypes.bool
};

Tooltip.defaultProps = {
    className: '',
    title: '',
    placement: 'bottom',
    hoverTrigger: true,
    clickTrigger: false,
    style: {},
    animation: '',
    showShadow: true,
    fontSize: 13,
    showDelay: 0.5,
    hideArrow: false
};