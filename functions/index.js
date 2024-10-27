const { initializeApp } = require("firebase-admin/app");

initializeApp({
    databaseURL: 'https://questionablerevision-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: 'questionablerevision.appspot.com'
});

const {echo} = require("./src/echo");
const {uploadpdf} = require("./src/uploadpdf");
const {generateQuestionsAndAnswers} = require("./src/generateq&a");
const {lobbyStart} = require("./src/lobby-start");
const {lobbyClose} = require("./src/lobby-close");
const {lobbyJoin} = require("./src/lobby-join");
const {createUser} = require("./src/create-user")

// Remember to add new functions to the rewrites in the same format as the others.
exports.echo = echo;
exports.uploadpdf = uploadpdf;
exports.generateQuestionsAndAnswers = generateQuestionsAndAnswers;
exports.lobbyStart = lobbyStart;
exports.lobbyClose = lobbyClose;
exports.lobbyJoin = lobbyJoin;
exports.createUser = createUser;

