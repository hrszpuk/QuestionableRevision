const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors');
const admin = require("firebase-admin");
const fetch = require("node-fetch");

const corsHandler = cors({ origin: true });

exports.lobbyJoin = onRequest({ region: 'europe-west1' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { lobbyCode, userName } = req.body;

            if (!lobbyCode || !userName) {
                return res.status(400).send("Missing lobbyCode, userId, or userName");
            } else if (lobbyCode === "undefined" || userName === "undefined") {
                return res.status(400).send("Defined: lobbyCode, userId, or userName");
            }
            
            const createUserUrl = "../function/createUser";

            const response = await fetch(createUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userName: userName})
            });

            if (response.ok) {
                const {userId} = response.body;
                const db = admin.database();

                // Path to the lobby in Firebase Realtime Database
                const playersRef = db.ref(`lobbies/${lobbyCode}/players/`);

                // Add user to the lobby
                const newUserRef = usersRef.push();
                await newUserRef.set({
                    userId: userId,
                    userName: userName,
                    correctlyAnswered: 3,
                    answeredCurrent: false
                });
                return res.status(200).send("Success")
            } else {
                return res.status(400).send("Invalid lobbyCode or userName");
            }

        } catch (error) {
            console.error('Error joining lobby:', error);
            res.status(500).send('Unable to join lobby: ' + error.message);
        }
    });
});
