const express = require ('express');
const router = express.Router();
const blog = require('./blog');
const user = require('./user');
const authMiddleware = require('../midlewere/auth')
const { getBlogs } = require('../controllers/blog');

router.get('/home' ,async (req, res, next) => {
    try 
    {
        const blogs = await getBlogs();
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
router.use('/blogs',authMiddleware,blog);
router.use('/users',user);

module.exports=router;