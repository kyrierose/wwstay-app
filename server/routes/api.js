import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("From api route");
});

export default router;