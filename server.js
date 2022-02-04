//require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path");
const mongoose = require('mongoose')
const bodyparser = require("body-parser");
const dbConfig = require("./Backend/app/config/db.config.js");
console.log(dbConfig.url)
mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {

        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use("/", express.static(path.join(__dirname, "static")));
app.use(express.json())
app.use(cors())
app.use(bodyparser.json());

const routes = require('./Backend/app/routes/docapp.js')
app.use('/docapp', routes)



app.listen(9000, () => console.log('Server started'))