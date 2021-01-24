const express = require ('express');
const router = express.Router();
const { create , getAll , getbyId , getByTag , editOne , deleteOne } = require('../controllers/blog');

router.post('/',async(req , res , next) => {
    const { body , user : {id}} = req ; 
    try
    {
        const blog = await create ({ ...body, userId: id }) ; 
        res.json(blog);
    }
    catch(e)
    {
        next(e);//going to error handeler
    }
})

router.get('/', async (req , res , next) => 
{
    const { user: { id } } = req;
    try
    {
        const blogs = await getAll({ userId: id }) ; 
        res.json(blogs);
    }
    catch(e)
    {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    const{ params : { id }  } = req ;
    try
    {
        const blog = await getbyId(id);
        res.json(blog)
    }
    catch (e) 
    {
        next(e);
    }
});

router.get('/tags/:tag', async (req, res, next) => {
    const{ params : { tag }  } = req ;
    try 
    {
        const blog = await getByTag({tags:{"$regex": tag}});
        res.json(blog);

    } catch {

        next(e);
    }
})
router.patch('/:id' , async (req , res , next) => {
    const{ params : { id } , body } = req ;
    try
    {
        const blog = await editOne(id,body);
        res.json(blog)
    }
    catch (e) 
    {
        next(e);
    }
});

router.delete('/:id', async (req , res , next ) => {
    const{ params : { id } } = req ;
    try
    {
        const blog = await deleteOne(id);
        res.json(blog)
    }
    catch (e) 
    {
        next(e);
    }
});
module.exports = router;