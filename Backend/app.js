const mongoose = require("mongoose");
const express =  require("express");

const app = express();

mongoose.connect("mongodb://localhost:27017/product",
{
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DATABASE CONNECTED");
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} ......`)
})