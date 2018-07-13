//Main imports
import express from 'express';
import bodyParser from 'body-parser';

//File Imports
import api from './routes/api';

const PORT = 3000;
const app = express();

//responses from api route
app.use('/api',api);
app.use(bodyParser.json());

//Handles landing page
app.get('/',(req, res)=>{
    res.send("Welcome to wwStay");
});

//Handles unknown path requests
app.get('**', (req, res)=>{
    res.send("Error 404");
});

app.listen(3000,()=>{
    console.log(`Server running at ${PORT}`);
});