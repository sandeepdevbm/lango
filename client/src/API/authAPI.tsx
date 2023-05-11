import AxiosConfig from "../config/axiosConfig";

const authAPI = ()=>{
    const dosignup = async () =>{
        try{
           const response = await AxiosConfig.post('/signup', )
           return response.data
        }catch(err){
        }
    }
    return {dosignup}
}

export default authAPI
