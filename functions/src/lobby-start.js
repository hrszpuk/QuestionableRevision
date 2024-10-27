const { onRequest } = require("firebase-functions/v2/https");
const { generateUniqueCode } = require("./_utilities");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

if (admin.apps.length === 0) {
    admin.initializeApp({
        databaseURL: 'https://questionablerevision-default-rtdb.europe-west1.firebasedatabase.app/'
    });  // Initialize Admin SDK if not already initialized
}

const db = admin.database();

// You are required put the question data into this function
exports.lobbyStart = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            let questions = req.body;

            let lobbyCode = generateUniqueCode();

            const lobbyRef = db.ref('lobbies').push();
            const lobbyId = lobbyRef.key;

            const lobbyData = {
                lobbyCode: lobbyCode,
                question_set: questions,
                createdAt: Date.now(),
                status: 'waiting',
                players: [{
                    userid: generateUniqueCode(10),
                    username: req.body.username,
                    correctly_answered: 0,
                    hasAnswered: false,
                }],
                totalRounds: questions.length,
                currentRound: 0,
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
