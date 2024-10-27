const {onRequest} = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

exports.lobbyJoin = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, () => {
        try {
            const { lobbyCode, userId, userName } = req.body;

            if (!lobbyCode || !userId || !userName) {
                return res.status(400).send("Missing lobbyCode, userId, or userName");
            }

        } catch (error) {
            console.error('Error joining lobby:', error);
            res.status(500).send('Unable to join lobby: ' + error.message);
        }
    })
});
