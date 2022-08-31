const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileupload = require('fileupload');

const app = express();

const port = 8000;

app.use([
    fileupload(),
    express.static("public"),
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    express.static("files")
])

mongoose.connect("mongodb://localhost:27017/OurFirstDapp", {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port, () => {
    console.log("Server is running on port 8000!");
})