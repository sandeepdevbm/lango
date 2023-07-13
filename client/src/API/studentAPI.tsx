import AxiosConfig from "../config/axiosConfig";

const studentAPI = () => {

    const getMentorDetails = async (value: any) => {
        try {
            const response = await AxiosConfig.get(`/mentordetails/${value}`)
            return response.data.mentor
        } catch (err) {
            console.log("err", err);
        }
    }
    const handleReqToMentor = async (studentId: string, mentorId: string) => {
        try {
            const response = await AxiosConfig.get(`/sentRequest/${studentId}/${mentorId}`)
            console.log(response.data,"request senttttt");
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }
    const getAStudent = async (studentId: string) => {
        try {
            const response = await AxiosConfig.get(`/sentRequest/${studentId}`)
            console.log(response.data,"studenttttttt");
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    return {  getMentorDetails, handleReqToMentor,getAStudent}
}

export default studentAPI
