const {onRequest} = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

exports.echo = onRequest(async (req, res) => {
  cors(req, res, () => {
    res.status(200).send({"echo": req.body});
  })
});
