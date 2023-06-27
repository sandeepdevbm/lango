import AxiosConfig from "../config/axiosConfig";

const authAPI = () => {

    const getMentorsToVerify = async () => {
        try {
            const response = await AxiosConfig.get('/verify-mentors')
            return response.data.data
        } catch (err) {
            console.log("err", err);
        }
    }

    const approveMentors = async (mentorId: any) => {
        try {
            const response = await AxiosConfig.post('/apporve-mentors', { mentorId: mentorId })
            return response
        } catch (err) {
            console.log("err", err);
        }
    }

    const rejectMentors = async (mentorId: any) => {
        try {
            const response = await AxiosConfig.post('/reject-mentors', { mentorId: mentorId })
            return response
        } catch (err) {
            console.log("err", err);
        }
    }

    return { getMentorsToVerify, approveMentors, rejectMentors }
}

export default authAPI
