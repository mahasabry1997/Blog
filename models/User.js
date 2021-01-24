const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const { options } = require('../routes');
const { Schema } = mongoose;
const userSchema = new Schema ({
    username : {
        type : String,
        unique : true ,
        minlength: 8,
        maxlength : 140,
    },
    password : {
        type : String,
        length : 8 ,
        required : true ,
    },
    firstName : {
        type : String ,
        maxlength : 140 ,
        required : true ,
    },
    lastName : {
        type : String ,
        maxlength : 140 ,
    },
    dateOfBirth: String,
},
{
    toJSON: {
        transform : (doc , ret , options) =>
        {
            delete ret.password;
            return ret;
        },
    }
});

userSchema.pre('save',function preSave(next){
    this.password = bcrypt.hashSync(this.password, 8);// 8 => salting route
    next();
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) 
    {
      return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});
  
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};  

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;