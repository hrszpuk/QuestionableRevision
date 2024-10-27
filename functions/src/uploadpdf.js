const {onRequest} = require("firebase-functions/v2/https");
const {getStorage} = require("firebase-admin/storage");
const cors = require('cors')({ origin: true });

const bucket = getStorage().bucket();

exports.uploadpdf = onRequest(
    {timeoutSeconds: 300},
    (req, res) => {
        cors(req, res, async () => {
            const userFile = req.body;
            const buffer = Buffer.from(userFile);
            const fileName = req.query.filename;

            try {
                const file = bucket.file(fileName);
                await file.save(buffer, {
                    metadata: {contentType: 'application/pdf'},
                });
                res.status(200).send({"Successfully uploaded file!": fileName});
            } catch (error) {
                res.status(500).send("File upload failed: " + error.message);
            }
        })
    },
);
