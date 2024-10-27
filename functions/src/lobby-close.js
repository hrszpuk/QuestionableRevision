const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

if (admin.apps.length === 0) {
    admin.initializeApp();
}

const db = admin.database();

exports.lobbyClose = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const lobbyId = req.body.lobbyId;

            if (!lobbyId) {
                return res.status(400).send("Lobby ID is required");
            }

            const lobbyRef = db.ref(`lobbies/${lobbyId}`);

            await lobbyRef.remove()

            return res.status(200).json({
                message: `Lobby ${lobbyId} successfully closed.`,
            });
        } catch (error) {
            console.error('Error closing lobby:', error);
            res.status(500).send('Unable to close lobby: ' + error.message);
        }
    });
});
