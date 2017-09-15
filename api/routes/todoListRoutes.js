const todoList = require('../controllers/todoListController');
const authenticate = require('../../services/auth/authenticate');
const express = require('express');
const tasks = express.Router();

    tasks.get('/', todoList.list_all_tasks)
    tasks.post('/', authenticate, todoList.create_a_task);
    
    tasks.get('/:taskId', todoList.read_a_task) 
    tasks.put('/:taskId', todoList.update_a_task)
    tasks.delete('/:taskId',todoList.delete_a_task);

module.exports = tasks;