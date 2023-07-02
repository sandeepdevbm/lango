import AxiosConfig from "../config/axiosConfig";

const chatRequests = () => {
    const userChats = async (userId: string) => {
        console.log(userId,"qqqq");
        
        try {
            const response = await AxiosConfig.get(`/chat/${userId}`)
            console.log(response.data,"rees");
            
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }
    return {userChats}
}
export default chatRequests