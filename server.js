const express = require('express');
const { connectDb } = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT | 8001;

//middleware
app.use(express.json());
app.use("/himan" , require("./routes/urlRoute"));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

