const express = require('express');
const cors = require('cors');
const dbUri = require('./Configuration/dbconfig');
const mongoose = require('mongoose');
const Task = require('./models/tasks');
const users = require('./apis/users');
const register = require('./apis/register');
const login = require('./apis/login');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;
mongoose.connect(dbUri.dbstring).then((result) => {
    console.log('connected to DB')
}).catch((err) => { console.log(err) });

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
// console.log(dbUri.dbstring);

// app.get('/add-task', (req, res)=> {
//     const task = new Task({
//         task_title:'Edit image',
//         tas_description: 'Add the image',
//         assigned_by:'shital@gmail.com',
//         start_time:Date.now(),
//         end_time: Date.now(),
//         assign_to: 'Ravi@gohil.com',
//         total_hours: 5,
//         task_status: 'Completed'
//     });

//     task.save().then((data) => {
//         res.send(data);
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

app.listen(PORT,() => {
    console.log(`listning on port: ${PORT}`)
});