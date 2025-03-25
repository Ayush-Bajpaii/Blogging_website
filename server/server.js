import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const server = express();

let PORT = 3000;
server.use(express.json());

mongoose.connect(process.env.DB_LOCATION,{
    autoIndex:true})
console.log('MongoDB connected successfully');

server.post("/signup", (req,res) =>{
    console.log(req.body)
    res.json(req.body)
})
server.listen(PORT,() => {
    console.log('Listening on port ->' + PORT);
});
