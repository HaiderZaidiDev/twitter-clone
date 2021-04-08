import '../index.css';
import React, {Component} from 'react';

//Firebase
import firebase from './Firebase';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Sidebar extends React.Component {
  SignOut() {
    firebase.auth().signOut()
  }
  render() {
    return (
      <Col className="col-lg-2 col-md-2 d-none d-md-block ">
        <div className="sidebar">
          <Row className="row">
            <i className="fab fa-twitter" id="logo"></i>
          </Row>
          <div className="sidebar-item">
            <Row className="align-items-center">
              <a href="https://github.com/HaiderZaidiDev/twitter-clone"><h2> Github </h2></a>
            </Row>
          </div>
          <div className="sidebar-item">
            <Row className="align-items-center">
              <a href="#" onClick={this.SignOut}><h2> Signout</h2></a>
            </Row>
          </div>
        </div>
      </Col>

    );
  }
}

export default Sidebar;
