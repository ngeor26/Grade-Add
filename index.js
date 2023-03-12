const admin = require('firebase-admin')
const express = require('express')
const port = process.env.PORT || 3000

const app = express()

var serviceAccount = require('./permissions.json')
const { response } = require('express')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

app.get('/:collection/:document/:subject/:grade', (req, res) => {
    const database = db.collection(req.params.collection).doc(req.params.document)
    const subject = req.params.subject
    const grade = req.params.grade
    let obj = {}
    obj[subject] = grade
    database.set(obj, { merge: true })
    return res.status(200).send(response)
})

app.listen(port, () => {console.log("listening on port" + port)})