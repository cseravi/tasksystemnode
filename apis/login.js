const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config()

router.post('/auth', (req, res) => {
    let token = req.headers['x-auth-token'];
    if(!token){
        res.send({status:403, details:'Token required'});
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if(err){
                res.send({status:403, details:'Invalid user or token!' })
            }else{
                let userId = result.id;
                let userEmail = result.email;
                let {id, email, name} = result
                res.send({status:200, data:{email:userEmail, user_id: userId, name:name}})
            }
        });
    }
});

router.post('/', async(req, res) => {
    const {email, password} = req.body;
    // console.log(email, password)
    const getData = await User.findOne({email: email}).lean();
    if(!getData){
        return res.send({status:404, details: 'Username or Password is not valid!'})
    }

    if(await bcrypt.compare(password, getData.password)){
        const token = jwt.sign({
            id: getData._id,
            email: getData.email,
            name: `${getData.firstname} ${getData.lastname}`
        }, process.env.JWT_SECRET)
        
        return res.send({status:200, token: token, data:getData})
    }else{
        res.send({status:404, details:"Username or Password is not valid!"})
    }
})

module.exports = router;