const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        
    },
    summary:{
        type:String,
        
    },
    content:{
        type:String,
       
    },
    file:{
        type:String,
    },
    author:{
       type: String,
       required:true,
    },
},
{
    timestamps:true,
    
})
const PostModel = mongoose.model("post" , PostSchema);
module.exports = PostModel;