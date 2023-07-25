import AxiosConfig from "../config/axiosConfig";
import useMentorAxios from "../config/mentorAxios"

const mentorAPI = () => {

    const mentorApi = useMentorAxios()

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
    const acceptStudent = async (mentorId:any, studentId:any) => {
        try {
            const details = {mentorId,studentId}
            const response = await mentorApi.post('/accept-student',{details})
            console.log(response.data.response);
            
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }
    const rejectStudent = async (mentorId:any, studentId:any) => {
        try {
            const details = {mentorId,studentId}
            const response = await AxiosConfig.post('/reject-student',{details})
            console.log(response.data.response);
            
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }
    const getMentorStudent = async (mentorId:any) => {
        try {
            const response = await mentorApi.get(`/student-details/${mentorId}`)
            console.log(response.data.students);
            return response.data.students
        } catch (err) {
            console.log("err", err);
        }
    }

    return { uploadPdf, getMentorDetails, getLangDetails, getAMentor , acceptStudent, rejectStudent, getMentorStudent }
}

export default mentorAPI
