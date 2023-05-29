import User from "../models/User.js";
import Language from "../models/Language.js"

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
}