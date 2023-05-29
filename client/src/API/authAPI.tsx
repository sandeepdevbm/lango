import AxiosConfig from "../config/axiosConfig";

const authAPI = ()=>{
    const doSignup = async (signupData:any) =>{
        try{
            console.log("dddddddddddd");
            console.log(signupData);
            
            
           const response = await AxiosConfig.post('/signup', signupData , {
            headers: {
              'Content-Type': 'multipart/form-data',
            }})
           return response.data
        }catch(err){
            console.log("err",err);  
        }
    }
    


    const languages = async () =>{
        try{
           const response = await AxiosConfig.get('/languages' )
           return response.data
        }catch(err){
            console.log("err",err);  
        }
    }


    const getMentorDetails = async (value:any) =>{
        try{            
           const response = await AxiosConfig.get(`/mentordetails/${value}`)
           console.log("ddd");
           console.log(response.data.mentor);
           return response.data.mentor
        }catch(err){
            console.log("err",err);  
        }
    }
    const getLangDetails = async (value:any) =>{
        try{            
           const response = await AxiosConfig.get(`/languagedetails/${value}`)
           console.log("lanngggggg");
           console.log(response.data.details.discription);
           return response.data
        }catch(err){
            console.log("err",err);  
        }
    }



    return {doSignup, languages, getMentorDetails,getLangDetails}
}

export default authAPI
