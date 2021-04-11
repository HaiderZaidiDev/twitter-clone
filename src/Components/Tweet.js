import '../index.css';
import React, {Component} from 'react';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Linkify from 'react-linkify';

import firebase from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const db = firebase.firestore();

class Tweet extends React.Component {
  /* Renders the tweet component, where the data of the tweet is derived from props. */
  constructor(props) {
    super(props);
    //this.elapsedTime()
    this.likeTweet = this.likeTweet.bind(this);
    this.retweetTweet = this.retweetTweet.bind(this);
  }

  /* To-do: Find a way to combine likeTweet and retweetTweet into one function. */

  async likeTweet() {
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection('tweets').doc(this.props.tweetId);
    var currentTweet = await docRef.get();
    var currentLikedBy = await currentTweet.data().likedBy;
    if(currentLikedBy.includes(uid.toString())) {
      alert("You've already liked this!")
    }
    else {
      // Incrementing the like count in the db.
      var currentLikes = currentTweet.data().likes;
      var likes = currentLikes + 1


      /* Not possible to push directly to firebase arrays, so we create a
      / new array with the user's name it. */
      var likedBy = currentLikedBy.slice();
      likedBy.push(uid);

      // Updating the db.
      await docRef.update({
        likedBy:likedBy,
        likes:likes
      })
    }
  }

  async retweetTweet() {
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection('tweets').doc(this.props.tweetId);
    var currentTweet = await docRef.get();
    var currentRetweetedBy = await currentTweet.data().retweetedBy;

    if(currentRetweetedBy.includes(uid.toString())) {
      alert("You've already retweeted this!")
    }
    else {
      // Incrementing the like count in the db.
      var currentRetweets = currentTweet.data().retweets;
      var retweets = currentRetweets + 1

      /* Not possible to push directly to firebase arrays, so we create a
      / new array with the user's name it. */
      var retweetedBy = currentRetweetedBy.slice();
      retweetedBy.push(uid);

      // Updating the db.
      await docRef.update({
        retweetedBy:retweetedBy,
        retweets:retweets
      })
    }
  }

  render() {
    return (
      <div className="tweet">
        <Row>
          <div className="avatar-wrapper">
            <img src={this.props.photoURL} className="avatar"></img>
          </div>
          <Col lg={8} md={8} className="no-padding">
            <div className="tweet-body">
              <Row>
                  <p className="tweet-user"> {this.props.displayName} <span className="secondary">@{this.props.username}</span></p>
                  <Linkify><p className="tweet-msg"> {this.props.message}</p></Linkify>
                  <div className="tweet-icons">
                    <i onClick={this.retweetTweet} className="fas fa-retweet" id="retweet"></i><span className="count">{this.props.retweets}</span>
                    <i onClick={this.likeTweet} className="far fa-heart" id="like" ></i> <span className="count">{this.props.likes}</span>
                  </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tweet;
