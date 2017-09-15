
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

const todoList = {
    list_all_tasks : (req, res) => {
        console.log('this works');
        Task.find({}).then( task => {
            res.json(task);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
        
    },

    create_a_task : (req, res) =>{
        var new_task = new Task({
            name: req.body.name,
            content: req.body.content,
            user: req.user
        });

        new_task.save().then(task => {
            console.log(task);
            res.json(task);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
    },

    read_a_task : (req, res) => {
        Task.findById(req.params.taskId).then(task => {
            res.json(task);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
      },

    update_a_task : (req, res) =>{
        Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}).then( task => {
            res.json(task);
        }).catch(err=>{
            console.log(err);
            res.send(err);
        })
    },

    delete_a_task : (req, res) =>{
        Task.remove({
            _id: req.params.taskId
        }).then(task => {
            res.json({ message: 'Task successfully delete' });
        }).catch(err => {
            res.send(err);
        });
    }
}

module.exports = todoList;