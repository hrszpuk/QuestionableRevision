const { onRequest } = require("firebase-functions/v2/https");
const { getIpAddress, generateLobbyCode } = require("./_utilities");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

if (admin.apps.length === 0) {
    admin.initializeApp({
        databaseURL: 'https://questionablerevision-default-rtdb.europe-west1.firebasedatabase.app/'
    });  // Initialize Admin SDK if not already initialized
}

const db = admin.database();

exports.lobbyStart = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const ip = getIpAddress(req);

            if (!ip || ip === "undefined") {
                console.error("Error: Host IP is undefined");
                return res.status(400).send("Host IP address is undefined");
            }

            let lobbyCode = generateLobbyCode();

            const lobbyRef = db.ref('lobbies').push();
            const lobbyId = lobbyRef.key;

            const lobbyData = {
                lobbyCode: lobbyCode,
                hostIp: ip,
                createdAt: Date.now(),
                status: 'waiting',
                players: [{
                    username: req.body.username,
                    ip: ip.toString(),
                    correctly_answered: 0,
                }]
            };

            await lobbyRef.set(lobbyData);

            res.status(200).json({
                message: 'Lobby successfully created',
                lobbyId: lobbyId,
                lobbyCode: lobbyCode,
                lobbyData: lobbyData
            });
        } catch (error) {
            console.error('Error creating lobby:', error);
            res.status(500).send('Unable to create lobby: ' + error.message);
        }
    });
});
