const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
    let data = User.findOne({email: req.body.email}).then(async (result) => {
        if(result){
            res.send({status:'101', details:"User already exists!"})           
        }else{
            try {
               const password = await bcrypt.hash(req.body.password, 10);

               req.body.password = password;
               const response = await User.create(req.body);
               res.send({status:200, data:[response]});
            }catch(error){
                res.send({err:"400",details:[err.errors]});
            }
        }
    }).catch((err) => {
        res.send({status:"400",details:err.message})
    })
});


module.exports = router;