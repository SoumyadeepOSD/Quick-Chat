const mongoose = require('mongoose');

const messsageModel = mongoose.Schema(
    {
        //who is the sender?
        sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        //who is the receiver?
        content:{type:String, trim:true},
        //what is the text of chat?
        chat:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
    },
    {
        timestamps:true,
    }
);

const Message = mongoose.model("Message", messsageModel);

module.exports = Message;