require("dotenv").config();
const mongoose = require("mongoose");
const express =  require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category")
//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DATABASE CONNECTED");
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use("/api",authRoutes);
app.use("/api", userRoutes);
app.use("/api",categoryRoutes);
//PORT
const PORT = 5000;

//LISTENING
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} ......`)
})