import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCwq2BwXtrHfmI4xSbCErPC8y2k_eTZYU0",
  authDomain: "test-41a63.firebaseapp.com",
  databaseURL: "https://test-41a63.firebaseio.com"
};

const app = firebase.initializeApp(config);
const database_ref = app.database();

export default database_ref;