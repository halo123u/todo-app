const express = require('express');

const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const Task = require('./api/models/todoListModel');
const User = require('./api/models/user');
const bodyParse = require('body-parser');

// const Promise = require('bluebird');
// Promise.promisifyAll(mongoose);
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParse.urlencoded({ extended : true}));
app.use(bodyParse.json());

app.listen(port);


const tasksRoutes = require('./api/routes/todoListRoutes');
app.use('/tasks', tasksRoutes);

const userRoutes = require('./api/routes/userRoutes');
app.use('/users', userRoutes);


console.log('todo list RESTful API server started on: l' + port);