import AxiosConfig from "../config/axiosConfig";

const messageRequests = () => {
    const getMessages = async (chatId: string) => {
        console.log(chatId,"qqqq");
        
        try {
            const response = await AxiosConfig.get(`/message/${chatId}`)
            console.log(response.data,"rees");
            
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }
    const addMessage = async (data : any) =>{
        try {
            const response = await AxiosConfig.post(`/message/`,data)
            console.log(response.data,"rees");
            
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    return {getMessages,addMessage}
}
export default messageRequests