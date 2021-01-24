const Blog =  require('../models/Blog');

const create = (blog)  => {
     //create model
    return Blog.create(blog);
}

const getAll = (query) => Blog.find(query).exec();
const getbyId = (id) => Blog.findById(id).exec();
const editOne = (id,body) => Blog.findByIdAndUpdate(id , body , { new : true }).exec();//by default return the decuoment befor update
const deleteOne = (id) => Blog.findByIdAndDelete(id).exec();
const getByTag = (tags) => Blog.find(tags).exec();

const getBlogs = () => Blog.find().sort([['updatedAt',-1]]).exec();


module.exports={
    create , getAll , getbyId , getByTag , getBlogs , editOne , deleteOne
}