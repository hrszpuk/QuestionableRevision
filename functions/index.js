const { initializeApp } = require("firebase-admin/app");

initializeApp({
    databaseURL: 'https://questionablerevision-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: 'questionablerevision.appspot.com'
});

const {echo} = require("./src/echo");
const {uploadpdf} = require("./src/uploadpdf");
const {processPdf} = require("./src/process-pdf");
const {lobbyStart} = require("./src/lobby-start");
const {lobbyClose} = require("./src/lobby-close");
const {lobbyJoin} = require("./src/lobby-join");
const {createUser} = require("./src/create-user")
const {advanceQuestion} = require("./src/advance-question")

// Remember to add new functions to the rewrites in the same format as the others.
exports.echo = echo;
exports.uploadpdf = uploadpdf;
exports.processPdf = processPdf;
exports.lobbyStart = lobbyStart;
exports.lobbyClose = lobbyClose;
exports.lobbyJoin = lobbyJoin;
exports.createUser = createUser;
exports.advanceQuestion = advanceQuestion;

