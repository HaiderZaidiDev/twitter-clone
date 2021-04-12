import '../index.css';
import React, {Component, useState} from 'react';

// Firebase
import firebase from './Firebase';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const db = firebase.firestore();

function AlertDismissible(props) {
  /* Returns alert (upon spam detection), and time remaining to post.  */
  const [show, setShow] = useState(true);

  if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>You're making tweets to fast!</Alert.Heading>
          <p>
            Please try again in {props.remainingToPost} seconds.
          </p>
        </Alert>
      );
  }
  // Note: We need to return an empty div here, as otherwise, there is
  // no return value, and an error is thrown.
  return <div></div>;
}

class CreateTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      spam: false,
      remainingToPost: 0,
    };

    // Binding handle submit to the class.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tweetPostDb = this.tweetPostDb.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  async spamFilter() {
    /* Spam filter, to ensure tweets from the user are not within < 15 seconds
    of eachother. */

    // Fetching the user's profile.
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection('users').doc(uid);
    var currentUser = await docRef.get();
    var lastPosted = await currentUser.data().lastPosted; //
    var lastPostedDate = lastPosted.toDate(); // Timestamp of previous post.
    var currentTime = new Date();

    // Elapsed time since current attempted tweet, and last tweet.
    var elapsedTime = Math.abs(currentTime - lastPostedDate)/1000

    if(elapsedTime <= 15) {
      // Spam was detected.
      const remainingToPost = 15 - elapsedTime;
      this.setState(
        {
          spam:true,
          remainingToPost:remainingToPost
        }
      );
    }
    else {
      // Spam was not detected.
      this.setState({spam:false})
    }
  }

  async userPostDb() {
    /* Posts the user's profile, and the time of their last tweet to the database. */
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection('users').doc(uid);
    const doc = await docRef.get()

    const userData = {
      uid:uid,
      lastPosted: firebase.firestore.FieldValue.serverTimestamp(),
    }

    if(doc.exists) {
      await docRef.update(userData);
    }
    else {
      await docRef.set(userData);
    }

  }

  async tweetPostDb() {
    /* Posts the created tweet to the database. */

    // Fetching the tweets collection.
    const docRef = db.collection('tweets').doc();
    const username = this.props.user.displayName.toLowerCase().replace(' ', '')

    const tweetData = {
      tweetId: docRef.id,
      photoURL: this.props.user.photoURL,
      displayName: this.props.user.displayName,
      username: username,
      message: this.state.message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      retweets: 0,
      likes: 0,
      likedBy: [],
      retweetedBy: [],
    }
    await docRef.set(tweetData);
  }

  async handleSubmit(event) {
    /* Handling form submission. */
    event.preventDefault(); // Prevents page reload, note: must be at top.

    var spamFilter = await this.spamFilter(); // Returns true if spam detected.
    if(!this.state.spam) {
      await this.tweetPostDb();
      await this.userPostDb();
    }
  }

  render() {
    return (
      <div className="create-tweet">
        {/* Conditionally rendering the alert message, if spam was detected. */}
        {this.state.spam ? <AlertDismissible remainingToPost={this.state.remainingToPost}/>:<div></div>}
        <Row className="align-items-center">
            <img src={this.props.user.photoURL} className="avatar"></img>
          <Col lg={6} md={6} className="d-flex justify-content-start no-padding">
            <form className="tweet-box no-padding" onSubmit={this.handleSubmit}>
              <input type='text' placeholder={"Hey " + this.props.user.displayName + ", what's happening?"} onChange={this.handleChange}/>
            </form>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <input className="tweet-button" type="submit" value="Tweet" onClick={this.handleSubmit}/>
        </Row>
      </div>

    );
  }
}

export default CreateTweet;
