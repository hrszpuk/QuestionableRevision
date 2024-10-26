const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.echo = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.status(200).send({ echo: req.body });
    });
});
