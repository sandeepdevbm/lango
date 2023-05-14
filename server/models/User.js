import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type : String,
            required:true,
            min:2,
            max:50,
        },
        lastName:{
            type : String,
            required:true,
            min:2,
            max:50,
        },
        phoneNumber:{
            type : Number,
            required:true,
        },
        email:{
            type : String,
            required:[true,"Please enter an email"],
            min:50,
            unique:true,
            lowercase:true,
            validate:[validator.isEmail,'Please enter a valid email']
        },
        password:{
            type : String,
            required:[true,"Please enter an password"],
            minlength:[6,"Minimum password length is 6 character"],
        },
        role:{
            type:String
        },
        qualification:{
            type:String
        },
        language:{
            type:String
        }
    },
    {timestamps:true}
)

// fire a function before doc saved to bd
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

//static method to login user
userSchema.statics.login = async function (email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User =  mongoose.model("user",userSchema)
export default User