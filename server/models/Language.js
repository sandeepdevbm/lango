import mongoose from "mongoose";
import validator from 'validator';

const languageSchema = new mongoose.Schema(
    {
        Name:{
            type : String,
            required:true,
        },
        discription:{
            type : String,
        }
    }
)

const Language =  mongoose.model("languages",languageSchema)
export default Language