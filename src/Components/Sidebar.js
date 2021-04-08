import '../index.css';
import React, {Component} from 'react';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Sidebar extends React.Component {
  render() {
    return (
      <Col className="col-lg-2 col-md-2 d-none d-md-block ">
        <div className="sidebar">
          <Row className="row">
            <i className="fab fa-twitter" id="logo"></i>
          </Row>
          {/*
          <div className="sidebar-item">
            <Row className="row align-items-center">
              <i className="fas fa-home d-flex justify-content-center"></i><h2> Home </h2>
            </Row>
          </div>
          <div className="sidebar-item">
            <Row className="row align-items-center">
              <i className="fas fa-user d-flex justify-content-center"></i><h2> Profile </h2>
            </Row>
          </div>
          */}
        </div>
      </Col>

    );
  }
}

export default Sidebar;
