import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import {authHelper} from "../Helpers/authHelper.js"

const authHelpers = new authHelper();
const {
  doSignup,doLogin
} = authHelpers;

const maxAge=3*24*60*60
const createToken= (id)=>{
    return jwt.sign({id},'this is a secret',{
        expiresIn:maxAge
    })
}

//REGISTER USER

export const userSignup=async(req,res)=>{
    try{
       
        const response = await doSignup(req.body)
        console.log("kkkkk");
        console.log(response);
        if(response._id){
            const token = createToken(response._id)
            res.cookie("token",token,{httpOnly:true});
            res.status(201).json({response:response})
        }else{
            res.status(201).json({response:response})
        }
    }catch(err){
        res.status(400).json(err)
    }
}


export const userLogin=async(req,res)=>{
    try{
        const response = await doLogin(req.body)
        const token = createToken(response._id)
        res.cookie("token",token,{httpOnly:true});
        res.status(201).json({response:response,token})
    }catch(err){
        res.status(400).json({err})
    }
}