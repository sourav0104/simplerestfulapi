const express = require("express");
const {connect} = require("mongoose");
const bodyparser = require('body-parser');
const cors = require("cors");
const{PORT ,MONGODB_URL} = require('./Config')



/*initialize app */
const app = express();


/*middleware*/
app.use(cors());// give permisson for allwing to use api
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


/*load routes */
app.use('/api/posts',require('./Routes/post'));

/*Databse Connection*/

let startApp = async ()=>{
    try {
        await connect(MONGODB_URL, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:true
        },
        (err)=>{
            if(err) throw err;
            console.log("database connected");
        });

        app.listen(PORT,(err)=>{
            if(err)throw err;
            console.log("successfull connected on port " + PORT);
        })
    } catch (err) {
        console.error(err);
    }
}
startApp();
