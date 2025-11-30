const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/db')
const sgMail = require('@sendgrid/mail');
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors({
  origin: `*`,
  //[
    
    //'https://virtual-store-ui.vercel.app',   // Domínios permitidos
    //'http://localhost:3001'
  //],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
db.on("connected", function () {
    console.log("connected!");
});

db.on("disconnected", function () {
    console.log("disconnected!");
});

db.on("error", function (error) {
    console.log('Connection error: ' + error);
});

sgMail.setApiKey(process.env.SENDGRID_KEY); // coloque sua API key

require('./config/routes')(app)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})