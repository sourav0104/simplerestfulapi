//creating post schema
const {Schema , model} = require('mongoose');


const PostSchema = new Schema({
    title : {
        type : String,
        required:true,
    },
    content: {
        type:String,
        required:true,
    },

},
    {timestamps:true}
);

module.exports = model('posts' , PostSchema);