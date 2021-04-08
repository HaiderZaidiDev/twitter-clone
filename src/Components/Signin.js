import './static/signin.css';
import React, {Component} from 'react';

//Firebase
import firebase from './Firebase';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SignIn() {
  /* Firebase Google Sign in */
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <Container fluid style={{padding:0}}>
      <Row>
        <Col col-lg={7} col-md={7} col-sm={6} col-xs={6} className="twitter-bg d-flex align-items-center justify-content-center">
          <i id="logo" className="fab fa-twitter"></i>
        </Col>
        <Col col-lg={5} col-md={5} col-sm={6} col-xs={6} className="pt-3 d-flex align-items-center justify-content-center">
          <div className="header">
            <h1> A twitter clone. </h1>
            <h2 className="secondary"> Made by <a href="https://haiderzaidi.ca" target="_blank">Haider Zaidi</a>, with <span id="stack">React</span>, <span id="stack">Node.js</span>, <span id="stack">Firebase</span>, <span id="stack">Bootstrap</span>, <span id="stack">HTML/CSS</span> </h2>
            <div className="secondary disclaimer">
              <p>Disclaimer: This is for educational and project-based purposes, and not an actual competitior/infridgement of Twitter’s brand, respectively.</p>
            </div>
            <div className="google-btn" onClick={signInWithGoogle}>
              <div className="google-icon-wrapper">
                <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p className="btn-text"><b>Sign in with Google</b></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignIn;
