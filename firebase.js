// firebase.js
const admin = require("firebase-admin");
//const serviceAccount = require("./serviceAccountKey.json");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT); // Load from environment variable


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipeapi-bd6e4.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
