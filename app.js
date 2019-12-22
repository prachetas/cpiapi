const express = require('express');
const app = express();
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares

app.use(cors());
app.use(bodyParser.json());


//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts',postsRoute);

//ROUTES
app.get('/',(req,res) => {
   res.send('This is the home page'); 
});


//Connect to Database
mongoose
  .connect(process.env.DB_CONNECTION, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });

//const client = new MongoClient(process.env.DB_CONNECTION,{ useNewUrlParser: true });



//How to start listening the server
app.listen(8080);