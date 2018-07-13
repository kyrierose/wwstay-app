import mongoose from 'mongoose';
//ES6 destructuring
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

//third parameter specifies the collection name 
export default mongoose.model('user', userSchema, 'users');