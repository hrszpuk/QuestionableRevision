const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

exports.advanceQuestion = onRequest(async (req, res) => {
    const { lobbyId } = req.body;
    const lobbyRef = admin.database().ref(`lobbies/${lobbyId}`);
    const lobbySnap = await lobbyRef.once('value');

    if (!lobbySnap.exists()) {
        return res.status(404).send('Lobby not found.');
    }

    const lobbyData = lobbySnap.val();
    const totalRounds = lobbyData.totalRounds;
    const currentRound = lobbyData.currentRound;

    // Check if all players have answered
    const allPlayersAnswered = Object.values(lobbyData.players).every(player => player.answeredCurrent);

    // Move to the next round if all players have answered or end the game if at the last round
    if (allPlayersAnswered || currentRound >= totalRounds - 1) {
        if (currentRound < totalRounds - 1) {
            await lobbyRef.update({
                currentRound: currentRound + 1
            });

            // Reset answeredCurrent for all players
            const playersRef = admin.database().ref(`lobbies/${lobbyId}/players`);
            playersRef.once('value', (playersSnap) => {
                playersSnap.forEach(playerSnap => {
                    playersRef.child(playerSnap.key).update({ answeredCurrent: false });
                });
            });

            return res.status(200).send({ message: 'Moved to next round' });
        } else {
            return res.status(200).send({ message: 'Quiz finished' });
        }
    } else {
        return res.status(400).send('Not all players have answered yet.');
    }
});
