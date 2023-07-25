import User from "../models/User.js";
import Language from "../models/Language.js"
import mongoose from "mongoose";

export class projectHelper {

    async getLang(){
        try{
            const language = await Language.find({})
            console.log(language);
            return language
        }catch(err){

        }
    }
    async getMentor(language){
        console.log(language);
        try {

            // Find the users having this language
            const users = await User.find({ language: language });
        
            return users;
        } catch (error) {
            // Handle error
            console.error(error);
            return null;
        }
    }
    
    async getDetails(language){
        console.log(language);
        try {
            const detail = await Language.findOne({ language});
            return detail;
        }catch(error) {
            console.error(error);
            return null;
        }
    }

    async uploadData(data){
      // console.log(data);
      const {value,id}= data
      try {
        const userData = await User.findByIdAndUpdate(id, { $push: { pdfs: value } })
        return userData
      }catch(error) {
          console.error(error);
          return null;
      }
  }
  async mentorsToVerify(){
    try {
      const mentorData = await User.find({ pdfs: { $exists: true, $not: { $size: 0 } }, isVerified: 'pending'})
      console.log("///////////eeeeeeeee");
      console.log(mentorData);
      return mentorData

    }catch(error) {
        console.error(error);
        return null;
    }
  }

  async getOneMentor(mentorId){
    try {
      const mentorData = await User.findById(mentorId)
      return mentorData

    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async approveMen(mentorId){
    try {
      const approve = await User.findByIdAndUpdate(mentorId, { isVerified: "true" },{ new: true })
      console.log(approve,"ssssssss");
      return approve

    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async rejectMen(mentorId){
    try {
      const reject = await User.findByIdAndUpdate(mentorId, { isVerified: "false" },{ new: true })
      console.log(reject,"ssssssss");
      return reject

    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async reqToMentor(studentId,mentorId){
    try {
      const request = await User.findByIdAndUpdate(
        mentorId,
        {
          $addToSet: {
            students: {
              studentId: studentId,
              isAccepted: false
            }
          }
        },
        { new: true }
      );
      const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { $set: { isAccepted: "" } },
        { new: true }
      );
      console.log(request,"studentreqtomentor",updatedStudent,"updatedStudent");
      return request
    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async getStudent(studentId){
    try {
      const response = await User.findById(studentId)
      console.log(response,"ssssssss");
      return response
    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async acceptStudentRequest(mentorId,studentId){
    try {
      const stuId = new mongoose.Types.ObjectId(studentId);
      const response = await User.findOneAndUpdate(
        { _id: mentorId, 'students.studentId': stuId },
        { $set: { 'students.$.isAccepted': true } },
        { new: true }
      );
      const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { $set: { isAccepted: "true" } },
        { new: true }
      );
      console.log(response,updatedStudent,"ssssssss");
      return {response,updatedStudent}
    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async rejectStudentRequest(mentorId,studentId){
    try {
      const response = await User.findOneAndUpdate(
        { _id: mentorId },
        { $pull: { students: { studentId } } },
        { new: true }
      );
      const updatedStudent = await User.findByIdAndUpdate(
        studentId,
        { $set: { isAccepted: "false" } },
        { new: true }
      );
      console.log(response,"removeddddd",updatedStudent,"ssssssss");
      return {response,updatedStudent}
    }catch(error) {
        console.error(error);
        return null;
    }
  }
  async getStudentsForMentor(mentorId){
    try {
      const mentId = new mongoose.Types.ObjectId(mentorId)
      const response = await User.aggregate([
        {
          $match: { _id: mentId }
        },
        {
          $unwind: '$students'
        },
        {
          $match: { 'students.isAccepted': 'true' }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'students.studentId',
            foreignField: '_id',
            as: 'studentDetails'
          }
        },
        {
          $unwind: '$studentDetails'
        },
        {
          $project: {
            studentId: '$studentDetails._id',
            studentFirstName: '$studentDetails.firstName',
            studentLastName: '$studentDetails.lastName',
            studentProfilePicture: '$studentDetails.profilePicture',
            studentPhoneNumber: '$studentDetails.phoneNumber',
          }
        }
      ])
      
      console.log(response,"responssssss");
      return response
    }catch(error) {
        console.error(error);
        return null;
    }
  }
}