import express  from "express";
const router = express.Router();
import mongoose  from "mongoose"
import bcrypt  from "bcrypt"
import jwt  from "jsonwebtoken";
import checkAuth  from "../middlewares/check-auth"
import nodemailer  from "nodemailer";
import validator  from 'validator';

import User  from '../models/user';

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MAIL,
        pass:process.env.MAILPWD
    }
});

/*router.post('/signup',(req,res,next) =>{
    console.log(req.body.password)
    bcrypt.hash(req.body.password,10, (err,hash)=> {
        if(err){
            console.log('err')
            return res.status(500).json({
                error : err
            })
        }else{
            
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email: req.body.email,
                emailUniv : req.body.emailUniv,
                password : hash,
                });
                
            user.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message:"user created"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                })
            });
        }
    });
});*/


router.put('/signup/:id',(req,res,next)=>{
    User.findById(req.params.id).exec().then((result)=>{
        if(!result || result.activated === true){
            res.status(404).json({
                message:"user does not exist"
            })
        }
        bcrypt.hash(req.body.password,10, (err,hash)=> {
            if(err){
                console.log('err')
                return res.status(500).json({
                    error : err
                })
            }else{
                
                User.findByIdAndUpdate(req.params.id,{email:req.body.email,
                    password:hash,
                    activated:true,
                    nom : req.body.nom,
                    prenom:req.body.prenom,
                    section: req.body.section,
                    dateCreated: Date.now(),

                }).exec()
                .then(result => {
                    console.log(result)
                    res.status(200).json({
                        message:"user fully created"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    })
                });
            }
        });
    })

    
});


router.post('/signup',(req,res,next) =>{
    User.find({
        emailUniv:req.body.emailUniv,
    }).exec().then((users)=>{
        console.log(users.length)
        if(users.length>1 && users[0].activated===true){
            return res.status(403).json({
                message:"auth failed"
            });
        }else if(users.length>1){
            var mailOptions = {
                from:process.env.MAIL,
                to:process.env.MAIL,
                subject:"Finish your signup",
                html:"<p>here " + req.body.emailUniv + "</p>"
    
            }
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log("email sent" + info.response);
                }
            })
            res.status(201).json({
                message:"user created mail sent"
            })
        }else{
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                emailUniv : req.body.emailUniv,
                activated:false,
                });
                
            user.save()
            .then(result => {
                console.log(result)
                var mailOptions = {
                    from:process.env.MAIL,
                    to:process.env.MAIL,
                    subject:"Finish your signup",
                    html:"<p>" + process.env.SIGNUPPAGE + user._id + "</p>"
        
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log(error)
                    }else{
                        console.log("email sent" + info.response);
                    }
                })
                res.status(201).json({
                    message:"user created"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                })
            });
        }
    })
            
   
});

router.post('/login',(req,res,next)=>{
    console.log("login")
    console.log(req.body)
    User.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length<1){
            console.log("ici")
            return res.status(401).json({
                message: "auth failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
            if(err){
                return res.status(401).json({
                    message: "auth failed"
                });
            }
            if(result){
                const token = jwt.sign({
                    userId:user[0]._id,
                    email:user[0].email,
                    section:user[0].section,
                    emailUniv:user[0].emailUniv,
                    nom:user[0].nom,
                    prenom:user[0].prenom,
                    dateCreated:user[0].dateCreated,
                    dateLastLogin:Date.now(),
                },process.env.JWT_KEY,{
                    expiresIn:"1h"
                })
                return res.status(200).json({
                    token: token,
                    message: "auth success"
                })
            }
            return res.status(401).json({
                message: "auth failed"
            });
        })
    })
    .catch(err => {
        console.log(err + "uu");
        res.status(500).json({
            error:err
        })
    })
});

router.get('/',/*checkAuth,*/(req,res,next)=>{
    User.find().exec()
    .then(users=>{
        return res.status(200).json({
            users:users
        })
    })
});
module.exports = router;