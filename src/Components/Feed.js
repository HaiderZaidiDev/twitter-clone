import '../index.css';
import Avatar from './avatar.svg'
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
  /* Using a hook to fecth tweets from the firestore, in descending order */
  const [snapshot, loading, error] = useCollection(db.collection('tweets').orderBy('createdAt', 'desc'));
  // Snapshot is a snapshot of the collection, it is undefined till it is loaded in.
  if (snapshot) {
    /* Snapshot returns a JSON object, with all of the raw docs, here, we're
       creating an object, and extracting the data from each doc.

       Note: Mapping works similar to list comprhension in python, doc is the element.
       . */
     var tweetsJson = snapshot.docs.map((doc) => (
      doc.data())
    );
  }

  return(
    <div className="feed">
      {/* Using conditional rendering and mapping, to render out tweets.
        Here, we use mapping to go through each element, and create a tweet component. */}

      {snapshot && (
        tweetsJson.map((tweet) => (
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
