import express from  'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import userRoutes from './api/routes/user'


mongoose.connect('mongodb://localhost:27017');
mongoose.Promise =global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use("/user",userRoutes);


app.use((req,res,next)=>{
    res.status(200).json({
        message:"itworks"
    });
});

app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.status=404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.json({
        error:{
            message:err.message
        }
    })
});

module.exports = app;