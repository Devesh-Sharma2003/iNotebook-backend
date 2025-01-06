const express = require("express");
const {UserSchema} = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const { fetchUser } = require("../middleware/FetchUser");
const JWT_SECRET="Iamgood$boy!";


router.post("/signup",async (req, res)=>{
    try{
        const {email, password}=req.body;
        const existUser=await UserSchema.findOne({where:{email}})
        if(existUser){
            return res.status(400).json({
                status: false,
                message:"Email already exist!"
            })
        }else if(password.length<8){
            return res.status(400).json({
                status: false,
                message:"Password length less than 8 characters!"
            })
        }else{
            // generate a salt
            const salt=await bcrypt.genSalt(10);
            const secPass=await bcrypt.hash(password, salt);
            const user=await UserSchema.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken=jwt.sign(data, JWT_SECRET);
            res.status(201).json({
                status: true,
                message: "User registered successfully!",
                token:authToken
            });
        }
    }catch(err){
        console.log("Error", err);
        res.status(500).send({
            status:false,
            message:err
        });
    }
});

router.post("/login", async (req, res)=>{
    const {email, password}=req.body;
    try{
        let user=await UserSchema.findOne({where:{email}});
        if(!user){
            return res.status(401).json({
                status: false,
                message:"Please enter valid credentials"
            })
        }
        const passCompare=await bcrypt.compare(password, user.password);
        if(!passCompare){
            return res.status(401).json({
                status: false,
                message:"Please enter valid credentials"
            })
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data, JWT_SECRET);
        res.status(200).json({
            status: true,
            message: "User logged in successfully!",
            token:authToken
        });
    }catch(err){
        console.log("Error", err);
        res.status(500).send({
            status:false,
            message:""+err
        });
    }
})

router.post("/getUser", fetchUser, async (req, res)=>{
    try{
        userId=req.user.id;
        const user=await UserSchema.findByPk(userId,{
            attributes:{exclude:["password"]}
        });
        res.send(user);
    }catch(err){
        res.status(500).send({
            status:false,
            message:""+err
        });
    }
})




module.exports=router;
