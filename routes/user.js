// user signup login

const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();

const {User} =require("../models/user");

const {Router} =require("express");

const userRouter =Router();

userRouter.post("/register", async (req,res)=>{
    try{
        const paylaod=req.body;
        const user= await User.findOne({email:paylaod.email});
        if(user)
        {
            return res.send({msg:"Please login, user already exist"});

        }
        else{
            //encrypting password
            const hashPassword =await bcrypt.hashSync(paylaod.password, 8)
            paylaod.password =hashPassword;

            const newUser =new User(paylaod);
            await newUser.save();

            return res.json({msg:"User registered.", user:newUser});
        }
    }
    catch(err)
    {
            res.send({msg:err.message})
    }
    
});

//login
userRouter.post("/login", async (req,res)=>{
    try{
        const paylaod=req.body;
        const user= await User.findOne({email:paylaod.email});
        if(!user) return res.send("Please signup first");

            //password verification
            const isPasswordCorrect =await bcrypt.compareSync(paylaod.password,user.password);
            if(isPasswordCorrect)
            {
                //jwt generation
                const token =await jwt.sign({email:user.email, userId:user._id}, process.env.JWT_SECRET_KEY,{expiresIn:60*30})

                res.json({msg:"Login success", token});

            }
            else{
                res.send({msg:"Invalid credentials"});
            }

        
       
    }
    catch(err)
    {
            res.send({msg:err.message})
    }
    
});

module.exports ={userRouter};