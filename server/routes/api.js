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

//Defining registration endpoint
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

//Defining login endpoint
router.post('/login',(req, res)=>{
    //Storing request paramters
    let userData = req.body;

    User.findOne({email : userData.email}, (err, user)=>{
        if(err)
            console.log(err);
        else{
            if(!user)
                res.status(401).send("Invalid Email");
            else if(userData.password !== user.password)
                res.status(401).send("Invalid Password");
            else
                res.status(200).json(user);
        }
    });
});
// Defining secured expense manager
router.get('/expenses', (req,res)=>{
    res.send('Expenses align up here');
});

export default router;