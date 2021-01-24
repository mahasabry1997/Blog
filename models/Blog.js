const mongoose = require ('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
    title : {
        type : String , 
        minlength : 15,
        maxlength : 50 ,
        required : true,
    },
    body : {
        type : String,
        minlength : 50,
        maxlength : 256,
    },
    tags : [String],
    createdAt : Date,
    updatedAt : Date,
    //auther
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});
const blogModel = mongoose.model('Blog',blogSchema);
module.exports = blogModel;
