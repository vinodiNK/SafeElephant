// server.js

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Or use service account if needed
  databaseURL: 'https://SafeElephant.firebaseio.com'
});

const db = admin.database();

// Example POST endpoint to upload location
app.post('/upload-location', (req, res) => {
  const { latitude, longitude, reportedBy } = req.body;

  const ref = db.ref('locations');
  const newLocationRef = ref.push();
  newLocationRef.set({
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
    reportedBy
  });

  res.send({ message: 'Location uploaded successfully' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
