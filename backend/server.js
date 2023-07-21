const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// By default endpoint
app.get('/',(req, res)=>{
    res.send("Api is running");
}); 

// 1st endpoint
app.get('/api/chat', (req, res)=>{
    res.send(chats);
});

//2nd endpoint
app.get('/api/chat/:id', (req, res)=>{
    const singleChat = chats.find((c) => c.id === req.params.id);
    res.send(singleChat);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started"));