//Main imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//File Imports
import api from './routes/api';

const PORT = 3000;
const app = express();

//Use middlewares before routing
app.use(cors()); // For matching front-end port to back-end port
app.use(bodyParser.json());

//responses from api route
app.use('/api',api);

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