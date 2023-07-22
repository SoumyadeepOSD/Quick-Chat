const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Before savin the function 
// If password is not modified then move to the next step
// If password is new then encrypt it
userSchema.pre('save', async function(next){
    if(!this.isModified){
        next()
    }
    // actual encryption happend here
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const user = mongoose.model("user", userSchema);
module.exports = user;
