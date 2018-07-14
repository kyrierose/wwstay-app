import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const router = express.Router();

const db_uri = "mongodb://localhost:27017/wwstay"

mongoose.connect(db_uri, err =>{
    if(err)
        console.log('Error connecting to the database');
    else
        console.log('Connected to mongodb');
})

router.get('/', (req,res)=>{
    res.send("Reached API home");
});

//Defining registration endpoint
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        console.log(registeredUser)
      }
    })
})

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
    //returns user's expenses array
    
});

export default router;