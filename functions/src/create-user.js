const { onRequest } = require("firebase-functions/v2/https");
const cors = require('cors')({ origin: true });
const admin = require("firebase-admin");

const auth = admin.auth();

exports.createUser = onRequest({ region: 'europe-west1' }, async (req, res) => {
    cors(req, res, async () => {
        try {
            const { userName } = req.body;

            if (!userName) {
                return res.status(400).send("Username is required");
            }

            const userCredential = await auth.createUser({
                displayName: userName,
            });

            const userId = userCredential.uid;

            const userRef = admin.database().ref(`users/${userId}`);
            await userRef.set({
                userName: userName,
                createdAt: Date.now(),
            });

            return res.status(200).json({
                message: 'User created successfully',
                userId: userId,
                userName: userName
            });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).send('Unable to create user: ' + error.message);
        }
    });
});
