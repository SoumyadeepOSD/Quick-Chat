const mongoose = require('mongoose');

const chatmodel = mongoose.Schema(
    {
        //name of chat
        chatName: {type: String, trim: true},
        //is it group/personal chat?
        isGroupChat:{type:Boolean, default:false},
        //users of chat list
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        ],
        //latest messages from users
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        //who is/are the admin(s) of group?
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },
    {
        timestamps:true,
    }
);
const Chat = mongoose.model("Chat", chatmodel);
module.exports = Chat;
// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin
