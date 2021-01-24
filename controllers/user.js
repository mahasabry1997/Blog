const User =  require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);

const create = (user)  =>  User.create(user);

const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).exec();
    if (!user) 
    {
      throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass)
    {
      throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
      username : user.username,
      id:user.id,
    }, 'tokenSecret', { expiresIn: '1d' });
    return {...user.toJSON() , token };
  };

const getAll = () => User.find({}).exec();

const editOne = (id,body) => User.findByIdAndUpdate(id , body , { new : true }).exec();
const deleteOne = (id) => User.findByIdAndDelete(id).exec();

module.exports = {
create , login , getAll , editOne , deleteOne
};