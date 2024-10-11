const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lamourgames-2024.firebaseio.com"
});

const auth = admin.auth();

module.exports = { auth };
