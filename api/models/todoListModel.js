const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required : 'kindly enter the name of the task'
    },
    content: {
        type: String,
        required : "kindly enter the content"
    },
    // email: {
    //     type: String
    // },
    user : {

        type: ObjectId, ref : 'User',
        required: true
    },
    // dog : {
    //     type: String
    // },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']            
        }],
        default: ['pending']
    }

});

module.exports ={ Task };
