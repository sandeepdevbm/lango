import {projectHelper} from "../Helpers/projectHelpers.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {S3Client, PutObjectCommand ,GetObjectCommand } from '@aws-sdk/client-s3'
import { s3,bucket } from "../S3/S3.js";

const projectHelpers = new projectHelper();
const {
    getLang , getMentor , getDetails , uploadData , mentorsToVerify,getOneMentor, approveMen,
    rejectMen, reqToMentor ,getStudent ,acceptStudentRequest,rejectStudentRequest, getStudentsForMentor
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

export const uploadDetails = async(req,res)=>{
    console.log(req.body.value)

    try{
        let data = await uploadData(req.body)
        // console.log("llllaaaaannngnggggggggg");
        // console.log(details);
        // res.status(201).json({data})
    }catch(err){

    }
}

export const getMentorsToVerify = async(req,res)=>{
    try{
        let data = await mentorsToVerify()
        res.status(201).json({data})
    }catch(err){

    }
}

export const getAMentor = async(req,res)=>{
    const mentorId = req.params.mentorId
    try{
        let data = await getOneMentor(mentorId)

            const getObjectParams = {
              Bucket: bucket.bucketName,
              Key: data.profilePicture,
            };
      
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            data.profilePicture = url;
        res.status(201).json({data})
    }catch(err){

    }
}

export const approveMentor = async(req,res)=>{
    const mentorId = req.body.mentorId
    console.log(mentorId);
    try{
        let approve = await approveMen(mentorId)
        res.status(201).json({approve})
    }catch(err){

    }
}
export const rejectMentor = async(req,res)=>{
    const mentorId = req.body.mentorId
    console.log(mentorId);
    try{
        let reject = await rejectMen(mentorId)
        res.status(201).json({reject})
    }catch(err){

    }
}
export const requestMentor = async(req,res)=>{
    const studentId = req.params.studentId
    const mentorId = req.params.mentorId
    console.log(studentId,"studentId",mentorId,"mentorId");
    try{
        let request = await reqToMentor(studentId,mentorId)
        console.log(request.students,"rerererererer");
        res.status(201).json({request : request.students})
    }catch(err){
        console.log(err);
    }
}
export const getAStudent = async(req,res)=>{
    const studentId = req.params.studentId
    console.log(studentId,"studentId");
    try{
        let data = await getStudent(studentId)
        console.log(data,"students");
        const getObjectParams = {
            Bucket: bucket.bucketName,
            Key: data.profilePicture,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          data.profilePicture = url;
        res.status(201).json(data)
    }catch(err){
        console.log(err);
    }
}
export const acceptStudent = async(req,res)=>{
    console.log(req.body.details);
    console.log();
    const {mentorId,studentId} = req.body.details
    console.log(mentorId);
    try{
        let response = await acceptStudentRequest(mentorId,studentId)
        console.log(response.response,"rerererererer");
        res.status(201).json({response: response.response})
    }catch(err){
        console.log(err);
    }
}
export const rejectStudent = async(req,res)=>{
    const {mentorId,studentId} = req.body.details
    try{
        let response = await rejectStudentRequest(mentorId,studentId)
        res.status(201).json({response: response.response})
    }catch(err){
        console.log(err);
    }
}
export const getMentorStudent = async(req,res)=>{
    console.log(req.params.mentorId,"mentorIddd");
    const mentorId = req.params.mentorId
    try{
        let response = await getStudentsForMentor(mentorId)
        const studentData = response.map(async (student) => {
            const getObjectParams = {
              Bucket: bucket.bucketName,
              Key: student.studentProfilePicture,
            };
      
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            student.studentProfilePicture = url;
      
            return student;
          });
      
          const updatedStudentData = await Promise.all(studentData);
          console.log(updatedStudentData,"rerererererer");
          res.status(201).json({ students: updatedStudentData });
    }catch(err){
        console.log(err);
    }
}
