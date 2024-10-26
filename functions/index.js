const { initializeApp } = require("firebase-admin/app");

initializeApp();

const {echo} = require("./src/echo");
const {uploadpdf} = require("./src/uploadpdf");
const {generateQuestionsAndAnswers} = require("./src/generateq&a");

// Remember to add new functions to the rewrites in the same format as the others.
exports.echo = echo;
exports.uploadpdf = uploadpdf;
exports.generateQuestionsAndAnswers = generateQuestionsAndAnswers;

