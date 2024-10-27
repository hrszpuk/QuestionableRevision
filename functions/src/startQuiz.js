const {onRequest} = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

// TODO: update
const db = admin.database();

exports.startQuiz = onRequest(async (req, res) => {
  cors(req, res, () => {
    try{
      // Recieve the questions and answer
      // TODO: Update query with parsed questions and answers
      const questions = db.collection("questions");
      const answers = db.collection("answers");

      if (!questions.exists) {
        return res.status(400).send("Questions not provided!");
      }
      if (!answers.exists) {
        return res.status(400).send("Answers not provided!");
      }

    }catch (error) {
      console.error("Error reciving questions and answers:", error);
      res.status(500).send("Internal Server Error");

    }
  })
});
