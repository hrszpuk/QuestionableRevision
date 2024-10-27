const {onRequest} = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

exports.lobbyJoin = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, () => {

    })
});
