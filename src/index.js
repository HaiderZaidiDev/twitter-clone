import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Components
import CreateTweet from './Components/CreateTweet';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed'

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from './Components/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function SignIn() {
  /* Firebase Google Sign in */
  const signInWithGoogle= () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <button onClick={signInWithGoogle}> Sign in with Google.</button>
  );
}

function Home(props) {
  /* Returns home page of the app. */
  return (
    <Container fluid>
      <Row>
        <Sidebar/>
        <Col lg={10} md={10} sm={12} xs={12}>
          <div className="main">
            <h1> Home</h1>
            <CreateTweet user={props.user}/>
            <Feed user={props.user}/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  /* Monitors the auth state using react-firebase-hooks.
   https://github.com/csfrequency/react-firebase-hooks/tree/aeadd15b3f8ca642f52776edf2e4dad62a00d449/auth */

  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <div className="App">
      {/* Condiitonal rendering to check if the user is logged in.

        Here we pass the user object as a prop to our home page function.

        */}
      {user ? <Home user={user}/> : <SignIn/>}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
