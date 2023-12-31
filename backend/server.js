const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/useRoute');
const chatRoutes = require("./routes/chatRoutes");
const {notFound, errorHandler} = require("../backend/middlewares/erroMiddleware");

dotenv.config();
connectDB()
const app = express();

app.use(express.json()); //to accept json data

// By default endpoint
app.get('/',(req, res)=>{
    res.send("Api is running");
}); 

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started"));