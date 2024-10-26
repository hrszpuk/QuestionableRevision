const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

const db = getFirestore();

exports.generateQuestionsAndAnswers = onRequest(async (req, res) => {
    try {
        const docId = req.query.docId;  // Assume the PDF doc ID is passed as a query parameter
        if (!docId) {
            return res.status(400).send("Document ID not provided.");
        }

        const docRef = db.collection("parsed_pdfs").doc(docId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send("PDF document not found in Firestore.");
        }

        const pdfContent = doc.data().content;  // Assuming parsed content is stored under `content`

        const geminiResponse = await fetch("https://api.gemini.ai/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` // API KEY NEEDS TO GO HERE
            },
            body: JSON.stringify({
                prompt: `Generate a list of questions and answers based on the following information:\n\n${pdfContent}`,
                maxTokens: 1000 
            })
        });

        if (!geminiResponse.ok) {
            throw new Error(`Error from Gemini API: ${geminiResponse.statusText}`);
        }

        const geminiData = await geminiResponse.json();
        const generatedQnA = geminiData.text;

        const qnaPairs = geminiData.qna.map(item => ({
            question: item.question,
            answer: item.answer
        }));

        const qnaDocRef = db.collection("qna").doc(docId);  // Store in the same doc ID as the PDF
        await qnaDocRef.set({ qnaPairs, createdAt: new Date() });

        res.status(200).json({
            message: "Q&A successfully generated and stored.",
            qnaPairs
        });

    } catch (error) {
        console.error("Error generating Q&A:", error);
        res.status(500).send("Internal Server Error");
    }
});
