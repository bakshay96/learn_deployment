
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator =async(req,res,next)=>{
    try{
        let token =req?.headers?.authorization;
        // check is token is present in headers

        if(!token){
            return res.status(401).json({message:"Not authorized !"});
        }
        token =req.headers.authorization.split(" ")[1];
        //verify token;

        const isTokenValid = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!isTokenValid)
        {
            return res.status(401).json({message:"Not authorized"});
        }
        req.body.userId = isTokenValid.userId;
        next();
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"something went wrong, please try again.",err:err.message});
    }

}

module.exports ={authenticator};