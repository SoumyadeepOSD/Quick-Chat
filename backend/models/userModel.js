const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.xqbTM0vtmFEFX88da1iEwQHaHa?pid=ImgDet&rs=1"
    },
},{timestamps:true}
);


const user = mongoose.model("user", userSchema);
module.exports = user;
