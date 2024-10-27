const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors');
const admin = require("firebase-admin");
const fetch = require("node-fetch");

const corsHandler = cors({ origin: true });

exports.lobbyJoin = onRequest({ region: 'europe-west1' }, async (req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { lobbyCode, userId, userName } = req.body;

            if (!lobbyCode || !userId || !userName) {
                return res.status(400).send("Missing lobbyCode, userId, or userName");
            } else if (lobbyCode === "undefined" || userId === "undefined" || userName === "undefined") {
                return res.status(400).send("Defined: lobbyCode, userId, or userName");
            }
            
            const createUserUrl = "../function/createUser";

            const response = await fetch(createUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({lobbyCode, userId, userName})
            });

            return res.status(200).send({ message: "User created successfully." });

        } catch (error) {
            console.error('Error joining lobby:', error);
            res.status(500).send('Unable to join lobby: ' + error.message);
        }
    });
});
