import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const router = express.Router();

const db_uri = "mongodb://kyrierose:akshit123@ds137661.mlab.com:37661/wwstay"

mongoose.connect(db_uri, err =>{
    if(err)
        console.log('Error connecting to the database');
    else
        console.log('Connected to mongodb');
})

router.get('/', (req,res)=>{
    res.send("From api route");
});

router.post('/register',(req,res)=>{
    //Storing request parameters
    let userData = req.body;
    //creating user object from this data
    let user = new User(userData);
    user.save((err, registeredUser)=>{
        if(err)
            console.log("Registration failed!");
        else    
            res.status(200).json(registeredUser);
    });

});

export default router;