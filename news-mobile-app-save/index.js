//const express = require('express');
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
//const passport = require('passport');
//const path = require('path');
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

const users = require('./routes/api/users');
const article = require('./routes/api/article');
const org = require('./routes/api/org');
const notify = require('./routes/api/notify');
const token = require('./routes/api/token');
const categorys = require('./routes/api/categorys');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
//const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/news');
//mongoose.connect('mongodb://tomlee:paul75369@ds019053.mlab.com:19053/mydb');

//app.get('/',(req,res)=>{
 // res.send({hi: 'there1111'});
//});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/article', article);
app.use('/api/org', org);
app.use('/api/notify', notify);
app.use('/api/token', token);
app.use('/api/categorys', categorys);


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
