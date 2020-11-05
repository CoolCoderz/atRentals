const mongoose = require("mongoose");
const express =  require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/product",
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
//PORT
const PORT = 5000;

//LISTENING
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} ......`)
})