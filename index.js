const express = require("express");
const mongoose = require("mongoose");
const routes = require ('./routes/index');

const app = express();//creation for instance from express

mongoose.connect('mongodb://localhost:27017/project',{ useNewUrlParser: true},{ useUnifiedTopology: true });
app.use(express.json());

app.use('/',routes);

app.use('*',(req,res,next)=>{
 res.status(404).json({Err:"Not_Found"});
});

app.use((err,req,res,next)=>{//error handler midlewre (error in server)
  console.error(err);
  if(err instanceof mongoose.Error.ValidationError)
  {
    res.status(422).json(err.errors);
  }
  if(err.code === 11000)//error from data base
  {
    res.status(422).json({statusCode:"Validation Error" , property : err.keyValue})
  }
  if (err.message === 'UN_AUTHENTICATED') 
  {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();//server error
});
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is ready on: ${PORT}`);
});

//mongod.exe --dbpath D:\ITI\Mongo\data