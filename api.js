const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/db')
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
  const allowedOrigins = [
    "https://virtual-store-ui.vercel.app",
    "http://localhost:3001"
  ];
  
  // Middleware CORS aplicado a todas as rotas
  app.use(cors({
    origin: function(origin, callback){
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

require('./config/routes')(app)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})