# twitter-clone

## Description
Have you ever dreamed of having your own personal social media platform, like Twitter, without all the nuances (i.e. the people on there) that come with it? Here you go!

I created this project to learn more about React and Firebase Auth/firestore (as such, I may have overcommented on somethings for personal notes) - also because I thought it was cool to say I made a Twitter. 

Stack: 
- Front-end: React.js, Bootstrap, HTML/CSS
- Back-end: Firebase (OAuth2 & FireStore), Node.js 


## Features
- Firebase Google OAuth2 Authentication
- Create and view tweets (rendered in real-time from Firestore documents using a React hook).
- Spam filter on creating tweets (ensures a 15-second delay between tweets).

## Installation 
You can install the app by cloning the repository, and starting a server with npm. You will need to create your own database solution, I used firebase.
```
git clone https://github.com/HaiderZaidiDev/twitter-clone 
npm install react-bootstrap
npm install react-firebase-hooks/auth
npm install firebase
npm start
```

## Roadmap
I'll be working on this for the next few weeks, most of the front-end design for the feed is done (HTML/CSS), what remains, is implementing it via React, and linking it to a backend. 
- [X] Front-end: React.js, Bootstrap, HTML/CSS
- [X] Back-end: Firebase (OAuth2 & Firestore), Node.js 
- [] Create a sign-in page (currently, it's just a button). 
- [] Create user profile pages, and a following system.
