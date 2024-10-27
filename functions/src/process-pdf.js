const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const pdf = require("pdf-parse");

// Takes a {"filename":"example.pdf"} and needs that file to be in storage to work
exports.processPdf = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const filename = req.body.filename

            if (!filename) {
                return res.status(400).send('No filename provided');
            }

            const bucket = admin.storage().bucket();
            const tempFilePath = path.join(os.tmpdir(), filename);

            await bucket.file(filename).download({ destination: tempFilePath });

            const fileBuffer = fs.readFileSync(tempFilePath);

            const data = await pdf(fileBuffer);

            fs.unlinkSync(tempFilePath);

            res.status(200).json({
                message: 'PDF processed successfully',
                extractedText: data.text
            });

        } catch (error) {
            console.log(error)
            res.status(500).send('Unable to generate questions from PDF: ' + error.message);
        }
    })
})