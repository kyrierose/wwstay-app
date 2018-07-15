import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

const db_uri = "mongodb://localhost:27017/wwstay"

mongoose.connect(db_uri, err =>{
    if(err)
        console.log('Error connecting to the database');
    else
        console.log('Connected to mongodb');
})

function verifyToken(req, res, next) {
    console.log("called")
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

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
        //Generating token
        let payload = { subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey');
        //Remove password key for security reasons
        let response = JSON.parse(JSON.stringify(user)); //creates a perfect object
        response.password = undefined
        //appending token to response object
        response.token = token
        res.status(200).json(response);
      }
    })
})

//Defining login endpoint
router.post('/login',(req, res)=>{
    //Storing request paramters
    const userData = req.body;

    User.findOne({email : userData.email}, (err, user)=>{
        if(err)
            console.log(err);
        else{
            if(!user)
                res.status(401).send("No user found!");
            else if(userData.password !== user.password)
                res.status(401).send("Invalid Password");
            else{
                //generate token
                let payload = { subject: user._id}
                const token = jwt.sign(payload, 'secretKey');
                //Remove password key for security reasons
                let response = JSON.parse(JSON.stringify(user));
                response.password = undefined
                //appending token to response object
                response.token = token
                res.status(200).json(response);              
            }
        }
    });
});

// adding a new expense
router.post('/create', verifyToken, (req,res)=>{
    //appends the new entry
    const userData = req.body;
    User.findOne({email: userData.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expenseObject = userData.expense;
            const _id = mongoose.Types.ObjectId()
            expenseObject._id = _id;
            user.expenses.push(expenseObject);
            user.save((err, registeredUser) => {
                if (err) {
                  console.log(err)      
                } else {
                    //sending complete object
                    //Remove password key for security reasons
                    let response = user
                    response.password = undefined
                    res.status(200).json(response);   
                }
            })
        }
    })
});

//updating a expense
router.post('/update', verifyToken, (req,res)=>{
    User.findOne({email:req.body.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expenseObj = req.body.expense;
            user.expenses.id(expenseObj._id).remove()//Remove old entry 
            user.expenses.push(expenseObj)//Push new entry
            user.save((err, registeredUser) => {
                if (err) {
                  console.log(err)      
                } else {
                    //sending complete object
                    //Remove password key for security reasons
                    let response = user
                    response.password = undefined
                    res.status(200).json(response);   
                }
            }) 
        }
    })
});

//Deleting a expense
router.post('/delete', verifyToken, (req,res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expense_id = req.body.expense_id;
            user.expenses.id(expense_id).remove();
            user.save((err, registeredUser) => {
                if (err) {
                  console.log(err)      
                } else {
                    //sending complete object
                    //Remove password key for security reasons
                    let response = user
                    response.password = undefined
                    res.status(200).json(response);   
                }
            })
        }
    });
})

export default router;