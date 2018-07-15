import mongoose from 'mongoose';
//ES6 destructuring
const {Schema} = mongoose;

//Define expense schema
const expenseSchema = new Schema({
    _id: String,
    expense_name: String,
    price: Number,
    timestamp: String //String works as well as Date object
});

const userSchema = new Schema({
    email: String,
    password: String,
    expenses: [expenseSchema] 
}, { strict: false});

//third parameter specifies the collection name 
export default mongoose.model('user', userSchema, 'users');