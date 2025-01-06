const {connectToPostgres} = require("./db");
const express = require("express");
const {sequelize} = require("./db");
const cors =require('cors');


connectToPostgres();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

    
app.use("/inotes/auth", require("./routes/Auth"));
app.use("/inotes/notes", require("./routes/Inotes"));

sequelize.sync().then(()=>console.log("db synced")).catch((err)=>console.log("error: "+err));   
app.listen(port);
