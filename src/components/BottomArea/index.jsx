import React from 'react'
import {Row, Col} from '../../vendors/reactW3DS'
import './index.less'

class BottomArea extends React.Component {
    constructor(props) {
        super(props);
        this.Equ = this.Equ.bind(this);
        this.state = { // define this.state in constructor
          equstatus: true
        }
        let height = window.innerHeight;
        let hei = document.getElementById("root").scrollHeight;
        window.addEventListener('resize',this.Equ);
        window.addEventListener('scroll',this.Equ);
        this.state.equstatus= (height < hei) ? false :true;
    }

    Equ(event) {
      let height = window.innerHeight;
      let hei = document.getElementById("root").scrollHeight;
      this.setState({
        equstatus: (height < hei) ? false :true
      });
    }
    render() {
      let Footer= this.state.equstatus ? {position: 'fixed',bottom: 0,zIndex: 998}: {};
      return(
        <Row className='footer-bottomall' style={Footer}>
          <Col span={2}><span className='footer-conf footer-label'>IBM Forecasting</span></Col>
          {/*<Col span={8}>
            <div className='footer-links'>
              <a href="#/" className='foot_but'>Terms of use</a>
              <a href="#/" className='foot_but'>Business Conduct Guidelines</a>
              <a href="#/" className='foot_but'>Feedback</a>
              <a href="#/" className='foot_but'>Accessibility</a>
              <a href="#/" className='foot_but'>Support</a>
            </div>
          </Col>
          <Col span={2}>
            <a className='footer-help'>Home Help</a>
          </Col>*/}
        </Row>
        );
    }
}

export default BottomArea;