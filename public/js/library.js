/*
  Reference for database (example):
  {
 "lobbies": [{
       "ssjg83j3jlsfs93fj": {
         "lobbyCode": "FM78SG",
         "questionSet": [{
           "question": "Some question here?",
           "options": ["option 1", "option 2", "option 3", "option 4"],
           "answer": "option 2"
         }],
         "players": [{
           "userName": "Username123",
           "userId": "3sjnf3049s8fns803rf",
           "correctlyAnswered": 3,
           "answeredCurrent": false
         }],
         "totalRounds": 10,
         "currentRound": 3,
         "hostId": "3sjnf3049s8fns803rf"
       }
     }
 ]
}

  Reference for user auth (example):
  {
 "users": [{
     "userName": "Username123",
     "userId": "3sjnf3049s8fns803rf"
   }]
}

 */
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "/firebase/firestore";
const db = getFirestore();

/* Usage:
getCurrentQuestion(lobbyId).then((question) => {
  console.log('Current question:', question);
});
*/
async function getCurrentQuestion(lobbyId) {
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const lobbySnap = await getDoc(lobbyRef);

    if (lobbySnap.exists()) {
        const lobbyData = lobbySnap.data();
        const currentRound = lobbyData.currentRound;
        const questionSet = lobbyData.questionSet;

        if (questionSet && questionSet.length > currentRound) {
            return questionSet[currentRound];
        } else {
            throw new Error("No more questions available.");
        }
    } else {
        throw new Error("Lobby not found.");
    }
}

/*
getQuestionCount(lobbyId).then((count) => {
  console.log('Total questions:', count);
})
 */
async function getQuestionCount(lobbyId) {
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const lobbySnap = await getDoc(lobbyRef);

    if (lobbySnap.exists()) {
        const lobbyData = lobbySnap.data();
        return lobbyData.questionSet.length;
    } else {
        throw new Error("Lobby not found.");
    }
}

/*
submitAnswer(lobbyId, userId, 'option 2').then(() => {
  console.log('Answer submitted successfully.');
}).catch((error) => {
  console.error(error.message);
});
 */
async function submitAnswer(lobbyId, userId, answer) {
    const lobbyRef = doc(db, "lobbies", lobbyId);
    const lobbySnap = await getDoc(lobbyRef);

    if (lobbySnap.exists()) {
        const lobbyData = lobbySnap.data();
        const currentRound = lobbyData.currentRound;
        const currentQuestion = lobbyData.questionSet[currentRound];
        const players = lobbyData.players;

        // Find the player's entry in the players list
        const playerIndex = players.findIndex(player => player.userId === userId);

        if (playerIndex === -1) {
            throw new Error("Player not found in lobby.");
        }

        // Check if the answer is correct
        const isCorrect = currentQuestion.answer === answer;

        // Update the player's stats
        if (!players[playerIndex].answeredCurrent) {
            const playerUpdate = {
                [`players.${playerIndex}.answeredCurrent`]: true,
                [`players.${playerIndex}.correctlyAnswered`]: isCorrect
                    ? players[playerIndex].correctlyAnswered + 1
                    : players[playerIndex].correctlyAnswered,
            };

            // Update the lobby document with the new player data
            await updateDoc(lobbyRef, playerUpdate);
        } else {
            throw new Error("Player has already answered this question.");
        }
    } else {
        throw new Error("Lobby not found.");
    }
}

// await moveToNextRound(lobbyId);
async function moveToNextRound(lobbyId) {
    const lobbyRef = admin.database().ref(`lobbies/${lobbyId}`);
    const lobbySnap = await lobbyRef.once('value');

    if (!lobbySnap.exists()) {
        console.log("Lobby not found");
        return;
    }

    const lobbyData = lobbySnap.val();
    const totalRounds = lobbyData.totalRounds;
    const currentRound = lobbyData.currentRound;

    if (currentRound < totalRounds - 1) {
        await lobbyRef.update({
            currentRound: currentRound + 1
        });

        const playersRef = admin.database().ref(`lobbies/${lobbyId}/players`);
        playersRef.once('value', (playersSnap) => {
            playersSnap.forEach(playerSnap => {
                playersRef.child(playerSnap.key).update({ answeredCurrent: false });
            });
        });
        console.log(`Moved to next round for lobby ${lobbyId}`);
    } else {
        console.log(`Quiz finished for lobby ${lobbyId}`);
    }
}
