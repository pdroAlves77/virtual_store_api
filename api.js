const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/db')
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
db.on("connected", function () {
    console.log("connected!");
});

db.on("disconnected", function () {
    console.log("disconnected!");
});

db.on("error", function (error) {
    console.log('Connection error: ' + error);
});

require('./config/routes')(app)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})