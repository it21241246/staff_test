const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect db
const MONGODB_URL = process.env.MONGODB_URL;


mongoose.connect(MONGODB_URL,{
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

//data to staff db
const studentRouter = require("./routes/studentroutes.js");
app.use("/student",studentRouter);

//data to staff db
const staffRouter = require("./routes/staff.js");
app.use("/staff",staffRouter);


//db to teacher db
const teacherRouter = require("./routes/teacher.js");
app.use("/teacher",teacherRouter);





app.listen(PORT, () => {
    console.log(`Server is up and running on port number :  ${PORT}`)
})