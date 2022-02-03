//require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
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


app.use(express.json())
app.use(cors())

const routes = require('./Backend/app/routes/docapp.js')
app.use('/docapp', routes)

app.listen(9000, () => console.log('Server started'))