import mongoose from 'mongoose';
//ES6 destructuring
const {Schema} = mongoose;

//Define image schema
const imageSchema = new Schema({
    name: String,
    url: String
});

//Define expense schema
const expenseSchema = new Schema({
    _id: String,
    expense_name: String,
    price: Number,
    //timestamp: Date,
    //image: imageSchema
});

const userSchema = new Schema({
    email: String,
    password: String,
    expenses: [expenseSchema] 
}, { strict: false});

//third parameter specifies the collection name 
export default mongoose.model('user', userSchema, 'users');