import '../index.css';
import Tweet from './Tweet'
import React, {Component} from 'react';

//Firebase
import firebase from './Firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

// Bootstap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const db = firebase.firestore();

const Feed = () => {
  /* Displays a feed of all the tweets stored in the database, using hooks. */

  var elapsedTime = async (id) => {
    /* Determining the time past since the tweet was posted. */
    // Fetching tweet.
    const docRef = db.collection('tweets').doc(id);
    var tweet = await docRef.get();

    try {
      var tweetCreatedAt = await tweet.data().createdAt;
      var tweetCreatedAtDate = tweetCreatedAt.toDate();

      // Calculating difference between tweet createdAt, and current time.
      var currentTime = new Date();
      var elapsedTime = Math.abs(currentTime - tweetCreatedAtDate)/1000

      // Suffixing the unit of time.
      var elapsedTime = Math.round(elapsedTime/60)
      if (elapsedTime > 1440 ) {
        elapsedTime = `${Math.round(elapsedTime/1440)}d`
      }
      if (elapsedTime > 60) {
        elapsedTime = `${Math.round(elapsedTime/60)}h`
      }
      else if (elapsedTime < 60) {
        elapsedTime = `${elapsedTime}m`
      }
      return elapsedTime

    }
    catch(err) {
      // Usually if tweet is invalid because there is no createdAt.
      console.log("Error: No elapsed time!")

    }
  }

  const [snapshot, loading, error] = useCollection(db.collection('tweets').orderBy('createdAt', 'desc'));
  // Snapshot is a snapshot of the collection, it is undefined till it is loaded in.
  if (snapshot) {

    /* Snapshot returns a JSON object, with all of the raw docs, here, we're
       creating an object, and extracting the data from each doc.

       Note: Mapping works similar to list comprhension in python, doc is the element.
       . */
    var tweetsArray = snapshot.docs.map((doc) => (
      doc.data())
    );
  }

  return(
    <div className="feed">
      {/* Using conditional rendering and mapping, to render out tweets.
        Here, we use mapping to go through each element, and create a tweet component. */}

      {snapshot && (
        tweetsArray.map((tweet) => (
          <Tweet
            tweetId={tweet.tweetId}
            photoURL={tweet.photoURL}
            displayName={tweet.displayName}
            username={tweet.username}
            message={tweet.message}
            retweets={tweet.retweets}
            likes={tweet.likes}/>
        ))
      )}
    </div>
  )
}

export default Feed;
