const express = require("express");
const app = express();
require('dotenv').config()
const db = require("./config/db");
app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use('/api/user',userRoute);
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Listening on the to port ${port}`));