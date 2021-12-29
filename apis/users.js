const express = require('express');
const User = require('../models/users');
const router = express.Router();

//get all users
router.get('/', (req, res) => {
    User.find().then(result => {
        res.send({status:200, data:[result]})
    }).catch((err) => {
        res.status(400).send({message:err})
    })
})

//get one user
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}).then(result => {
        if(!result){
            res.send({status:404, details:"User not found"})
        }
        res.send({status:200, data:[result]})
     }).catch((err) => {
         res.status(400).send({message:err})
     })
})

//add user
router.post('/add', (req, res) => {
    const user = new User(req.body)
    let data = User.findOne({email: req.body.email}).then((result)=>{
        if(result){
            res.send({status:'101', details:"User already exists!"})           
        }else{
            user.save().then((result) => {
                res.send({status:200, data:[result]});
            }).catch((err) => {
                res.send({err:"400",details:[err.errors]});
            });
        }
    }).catch((err) => {
        res.send({status:"400",details:err.message})
    })
})

//Update user
router.put('/edit/:id', (req, res) => {
    User.findOneAndUpdate({_id:req.params.id}, req.body, {new: true, runValidators:true}).then((result) => {
        res.send({status:200, data:[result]})
    }).catch((err) => res.send({err:"400",details:[err.errors]}));        
});

//delete user
router.delete('/delete/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id}).then((result) => {
        res.send({status: 200, data:[result]})
    }).catch((err) => {
        res.send({err:"400",details:[err.errors]})
    })
});

module.exports = router;