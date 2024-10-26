const { initializeApp } = require("firebase/app");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

initializeApp();

const storage = getStorage();

exports.data = onRequest(
    {timeoutSeconds: 1200},
    (req, res) => {
        const userFile = req.body;

        uploadBytes(userFile, file)
            .then((snapshot) => {
                console.log('Successfully uploaded file!');
            })
        .catch((error) => {
            console.error('File upload failed: ', error);
        });
    }
)


//const { GoogleGenerativeAI } = require("@google/generative-ai");

//const genAI = new GoogleGenerativeAI("AIzaSyD0yqVw9NcjOKCsMUrAy4H8z4y9qeTku68");
//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Generate some questions and answers about fish, Your answer should be structured in JSON. The quiz should be an array of objects with each object being a question. Each question object should contain a “question” field containing the question, an “options” field containing an array of 4 options, and the “answer” field. The question and options should NOT be prefixed with numbers or letters.";

//async function Content() {
//    const result = await model.generateContent(prompt);
//    console.log(result.response.text());
//}

//Content();