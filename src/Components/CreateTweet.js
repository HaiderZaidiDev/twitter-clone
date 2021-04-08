import '../index.css';
import Avatar from './avatar.svg'
import React, {Component} from 'react';

// Firebase
import firebase from './Firebase';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const db = firebase.firestore();
class CreateTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    // Binding handle submit to the class.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tweetPostDb = this.tweetPostDb.bind(this);

  }

  handleChange(event) {
    this.setState({message: event.target.value});
    console.log(this.props.user.displayName);
  }

  async spamFilter() {
    const uid = firebase.auth().currentUser.uid;
    /* Checks the last time the user tweeted, to prevent spam tweets. */
    const docRef = db.collection('users').doc(uid);
    var currentUser = await docRef.get();
    var lastPosted = await currentUser.data().lastPosted;
    var lastPostedDate = lastPosted.toDate();
    var currentTime = new Date();
    var elapsedTime = Math.abs(currentTime - lastPostedDate)/1000

    if(elapsedTime <= 15) {
      const remainingToPost = 15 - elapsedTime;
      alert("You're posting to fast! Try again in: " +  remainingToPost + " seconds.")
      return false
    }
    else {
      return true
    }


    console.log("Elapsed time: " + elapsedTime)
  }

  async userPostDb() {
    const uid = firebase.auth().currentUser.uid;
    /* Posts the user's profile to the db. */
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
    /* Posted the created tweet to the firestore database. */
    const docRef = db.collection('tweets').doc();
    const username = this.props.user.displayName.toLowerCase().replace(' ', '')
    console.log("The id of the tweet just created is: " + docRef.id)

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
    console.log(tweetData)
    await docRef.set(tweetData);
  }

  async handleSubmit(event) {
    event.preventDefault(); // Must always be at top.
    var spamFilter = await this.spamFilter();
    console.log("Spam filter: " + spamFilter)
    if(spamFilter) {
      await this.tweetPostDb();
      await this.userPostDb();
    }
    event.target.value = '';

  }

  render() {
    return (
      <div className="create-tweet">
        <Row className="align-items-center">
          <Col lg={1} md={1}>
            <img src={this.props.user.photoURL} className="avatar"></img>
          </Col>
          <Col lg={6} md={6} className="d-flex justify-content-start" style={{padding:0}}>
            <form className="tweet-box" onSubmit={this.handleSubmit}>
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
