const express = require('express'),
  massive = require('massive'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  CTRL = require('./ctrl/ctrl.js')
  env = require('dotenv').config({ path: './server/config/.env' }),
  app = express(),
  port = process.env.SERVER_PORT,
  path = require('path');

  //middleware
  app.use(cors());
  app.use(bodyParser.json({limit:'50mb'}));
  app.use(express.static(__dirname + '/../build'));

  //massive db
  massive({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    ssl:true
  }, { 
    scripts: __dirname + '/db' 
  }).then(db => {  
    app.set('db', db);
  });

  app.use(bodyParser.json());

  //sessions
  app.use(session({
    secret: process.env.SERVER_SECRET,
    resave: false,
    saveUninitialized: false
  }));

  app.use(express.static(__dirname + '/..build'));

  //listen 
  app.listen(port, () => console.log(`listening on port ${port}`))