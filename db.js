const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL  , {
    dbName:'Store'
}).then(()=>{
    console.log('Db Connection SUccesfully');
}).catch((error)=>{

        console.log("your error is gotted  "+error);
});