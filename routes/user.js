const express = require ('express');
const router = express.Router();
const { create , login , getAll , editOne , deleteOne} = require('../controllers/user');
const authMiddleware = require('../midlewere/auth')


router.post('/',async(req , res , next) => {
    const { body } = req ; 
    try
    {
        const user = await create (body) ; 
        res.json(user);
    }
    catch(e)
    {
        next(e);//going to error handeler
    }
});

router.post('/login', async (req, res, next) => {
    const { body } = req;
    try 
    {
      const user = await login (body);
      res.json(user);
    } 
    catch (e) 
    {
      next(e);
    }
});

router.get('/',authMiddleware,async(req , res , next) => {
    try 
    {
      const users = await getAll();
      res.json(users);
    } 
    catch (e) 
    {
      next(e);
    }
});

router.patch('/:id' ,authMiddleware,async (req , res , next) => {
    const{ params : { id } , body } = req ;
    try
    {
        const user = await editOne(id,body);
        res.json(user)
    }
    catch (e) 
    {
        next(e);
    }
});

router.delete('/:id', authMiddleware,async (req , res , next ) => {
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
module.exports = router ;
