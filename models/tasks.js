const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task_title:{
        type: String,
        required: true
    },
    tas_description:{
        type: String,
        required: true
    },
    assigned_by:{
        type: String
    },
    start_time:{
        type: Date
    },
    end_time:{
        type: Date
    },
    assign_to: {
        type: String
    },
    total_hours: {
        type: Number
    },
    priority:{
        type: String,
        enum: ['high', 'medium', 'low']
    },
    task_status: {
        type: String,
        enum: ["running", "onhold", "reassigned", "completed"]
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;