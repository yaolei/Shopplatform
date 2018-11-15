import React from 'react'
import PropTypes from "prop-types"
import Icon from '../icon'
let img = new Image();
export default class Img extends React.Component {

    constructor(props) {
        super(props);
        this.handleError = this.handleError.bind(this);
        this.state = {
            picStyle: 'radius',
        }
    }

    handleError = () => {
        this.setState({
            error: true,
        });
    }

    render() {
        let idName = '';

        if (this.props.id) {
            idName = this.props.id;
        }

        let disStyle = this.props.picStyle === this.state.picStyle ? '50%' : '0%',
            avatarStyle = 'ds-icon-profile-l ds-icon-size-' + this.props.imgSize;
        if (this.props.src === '1') {
            return <Icon id={idName} className={avatarStyle}type={this.props.brokenUrl}  />
        } else {
            return <img className="ds-media-list-img" id={idName} src={this.props.src} style={{borderRadius: disStyle, width:this.props.width}} alt=''/>
        }
    }
}

Img.propTypes = {
    id: PropTypes.string,
    url: PropTypes.string,
    brokenUrl: PropTypes.string,
    imgSize: PropTypes.string
};

Img.defaultProps = {
    id: '',
    width: '100%',
    imgSize:'default',
    url: '1'
};