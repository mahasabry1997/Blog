const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const CustomError = require('../helpers/CustomError')
const asyncSignVerify = promisify(jwt.verify);
const User = require('../models/User');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) 
    {
        next(new CustomError(401, 'AUTHENTICATION_REQUIRED', 'No token provided.'));
    }
    try
    {
        const { id } = await asyncSignVerify(authorization, 'tokenSecret');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    }
    catch(e) 
    {
         next(new CustomError(401, 'AUTHENTICATION_REQUIRED', 'Failed to authenticate token.')) 
    };
  }
module.exports = auth;