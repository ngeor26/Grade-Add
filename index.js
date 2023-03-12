const admin = require("firebase-admin");
const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");

const app = express();
app.use(cors());

var serviceAccount = require("./permissions.json");
const { response } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/:collection/:document/:subject/:grade", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const database = db
    .collection(req.params.collection)
    .doc(req.params.document);
  const subject = req.params.subject;
  const grade = req.params.grade;
  let obj = {};
  obj[subject] = grade;
  database.set(obj, { merge: true });
  return res.status(200).send(response);
});

app.listen(port, () => {
  console.log("listening on port" + port);
});
