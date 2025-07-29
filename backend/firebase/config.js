const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://safeelephant-1a96d.firebaseio.com", // Replace with your URL
});

const db = admin.database();
module.exports = db;
