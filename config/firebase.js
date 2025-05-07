const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  project_id: "fir-cb44d",
});

const db = admin.firestore();
module.exports = db;
