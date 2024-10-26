const {onRequest} = require("firebase-functions/v2/https");
const {uploadBytes} = require("firebase-admin/storage");
const cors = require('cors')({ origin: true });

exports.uploadpdf = onRequest(
    {timeoutSeconds: 1200},
    (req, res) => {
        cors(req, res, () => {
            const userFile = req.body;

            if (userFile === "") {
                res.status(200).send("You got no rizz brotha");
            }

            uploadBytes(userFile, userFile)
                .then((snapshot) => {
                    res.status(200).send("Successfully uploaded file!");
                })
                .catch((error) => {
                    res.status(404).send("File upload failed: "+ error);
                });
        })
    },
);
