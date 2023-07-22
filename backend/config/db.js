require('dotenv').config();
const mongoose = require('mongoose');
const username = encodeURIComponent("SoumyadeepOSD");
const password = encodeURIComponent("Bhowmick@69");
MONGO_URI=`mongodb+srv://${username}:${password}@cluster0.1i9k0fc.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async() => {
    try{
        const con = await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(con.connection.host);
    }catch(err){
        console.log(`Error ${err}`);
        process.exit();
    }
}

module.exports = connectDB;