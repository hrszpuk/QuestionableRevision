const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const pdf = require("pdf-parse");
const path = require("path");
const os = require("os");
const fs = require("fs");
const axios = require("axios")
const {GoogleGenerativeAI} = require("@google/generative-ai")

const structure_specifier = "Your answer should be structured in JSON. The quiz should be an array of objects with each object being a question. Each question object should contain a “question” field containing the question, an “options” field containing an array of 4 options, and the “answer” field. The question and options should NOT be prefixed with numbers or letters. The final object should be called \\“questionSet\\”"
const prompt = "Generate a multiple choice quiz using the content provided below.\n\n" + structure_specifier


// Takes a {"filename":"example.pdf"} and needs that file to be in storage to work
exports.processPdf = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const {filename} = req.body;

            if (!filename) {
                return res.status(400).send('No filename provided');
            }

            const bucket = admin.storage().bucket();
            const tempFilePath = path.join(os.tmpdir(), filename);

            await bucket.file(filename).download({ destination: tempFilePath });

            const fileBuffer = fs.readFileSync(tempFilePath);

            const data = await pdf(fileBuffer);

            fs.unlinkSync(tempFilePath);

            if (data.text.toString().trim() === "") {
                res.status(500).send('PDF process resulted in empty text');
                return
            }

            const genAI = new GoogleGenerativeAI();
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt + '\n\n' + data.text);

            let questionSet = result.response.text();
            questionSet = questionSet
                .replace("```json", "")
                .replace("```", "");
            let questionSetJson = JSON.parse(questionSet);

            if (questionSet === "[GoogleGenerativeAI Error]" || questionSet === "undefined") {
                res.status(500).send('AI Error:' + questionSet);
                return
            }

            await bucket.file(filename).delete();

            res.status(200).json({
                message: 'PDF processed and questions generated successfully',
                questions: questionSetJson,
            });

        } catch (error) {
            console.log(error)
            res.status(500).send('Unable to generate questions from PDF: ' + error.message);
        }
    })
})