import User from "../models/User.js"
import {projectHelper} from "../Helpers/projectHelpers.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {S3Client, PutObjectCommand ,GetObjectCommand } from '@aws-sdk/client-s3'
import { s3,bucket } from "../S3/S3.js";




const projectHelpers = new projectHelper();
const {
    getLang , getMentor , getDetails
} = projectHelpers;


export const languages = async(req,res)=>{

    try{
        const lang = await getLang()
        console.log("lllllllllll");
        console.log(lang);
        res.status(201).json({lang})
    }catch(err){
        console.log(err);
    }
}
export const getMentorDetails = async(req,res)=>{
    console.log(req.params.value)
    try{
        let mentor = await getMentor(req.params.value)
        console.log(mentor,"sssssssss");
        
       
    const mentorPromises = mentor.map(async (men) => {
        const getObjectParams = {
          Bucket: bucket.bucketName,
          Key: men.profilePicture,
        };
  
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        men.profilePicture = url;
  
        return men;
      });
  
      const updatedMentors = await Promise.all(mentorPromises);
  
      console.log("ddddddd");
      console.log(updatedMentors);
      res.status(201).json({ mentor: updatedMentors });

    }catch(err){

    }
}

export const getLangDetails = async(req,res)=>{
    console.log(req.params.data)
    try{
        let details = await getDetails(req.params.data)
        // console.log("llllaaaaannngnggggggggg");
        // console.log(details);
        res.status(201).json({details})
    }catch(err){

    }
}