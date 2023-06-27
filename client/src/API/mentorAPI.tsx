import AxiosConfig from "../config/axiosConfig";

const mentorAPI = () => {

    const getMentorDetails = async (value: any) => {
        try {
            const response = await AxiosConfig.get(`/mentordetails/${value}`)
            return response.data.mentor
        } catch (err) {
            console.log("err", err);
        }
    }

    const uploadPdf = async (value: any, id: any) => {
        try {
            let data = { value, id }
            const response = await AxiosConfig.post('/upload-details', data)
            //    return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    const getLangDetails = async (value: any) => {
        try {
            const response = await AxiosConfig.get(`/languagedetails/${value}`)
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    const getAMentor = async (value: any) => {
        try {
            const response = await AxiosConfig.get(`/mentor-profile/${value}`)
            return response.data.data
        } catch (err) {
            console.log("err", err);
        }
    }

    return { uploadPdf, getMentorDetails, getLangDetails, getAMentor }
}

export default mentorAPI
