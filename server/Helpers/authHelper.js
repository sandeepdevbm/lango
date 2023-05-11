import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

//hanlde error

const handleErrors=(err)=>{
    console.log(err.message,err.code);
    let errors ={email:'',password:''}

    //duplicate error code
    if(err.code=== 11000){
        errors.email = "Email already exists"
        return errors
    }

    //incorrect email
    if(err.message==='incorrect email'){
        errors.email='this email is not registered'
    }
    //incorrect password
    if(err.message==='incorrect password'){
        errors.password='this password is incorrect'
    }

    //validate err
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    console.log(errors);

    return errors
}
// const maxAge=3*24*60*60
// const createToken= (id)=>{
//     return jwt.sign({id},'this is a secret',{
//         expiresIn:maxAge
//     })
// }

export class authHelper {
    async doSignup(detail){
        console.log("ddddddddddd");
        console.log(detail);
        // const{firstName,lastName,phoneNumber,email,password}=detail
        try{
            const user = await User.create(detail)
            // const token = createToken(user._id)
            return user
        }catch(err){
            const errors = handleErrors(err)
            return errors
        }
    }

    async doLogin(details){
        try{
            const user = await User.login(details.email,details.password)
            return user
        }catch(err){
            const errors = handleErrors(err)
            return errors
        }
    }
}