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

// adding a new expense
router.post('/create', (req,res)=>{
    //appends the new entry
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expenseObject = req.body.expense;
            const _id = mongoose.Types.ObjectId()
            expenseObject._id = _id;
            user.expenses.push(expenseObject);
            user.save();
            //sending complete object
            res.status(200).send(user);
        }
    })
});

//updating a expense
router.post('/update',(req,res)=>{
    User.findOne({email:req.body.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expenseObj = req.body.expense;
            user.expenses.id(expenseObj._id).remove()//Remove old entry 
            user.expenses.push(expenseObj)//Push new entry
            user.save()
            //sending complete object
            res.status(200).send(user);
        }
    })
});

//Deleting a expense
router.post('/delete',(req,res)=>{
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err)
            console.log(err)
        else{
            let expense_id = req.body.expense_id;
            user.expenses.id(expense_id).remove();
            user.save();
            //sending complete object
            res.status(200).send(user);
        }
    });
})
export default router;