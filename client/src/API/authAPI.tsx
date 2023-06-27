import AxiosConfig from "../config/axiosConfig";

const authAPI = () => {

    const doSignup = async (signupData: any) => {
        try {
            const response = await AxiosConfig.post('/signup', signupData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    const languages = async () => {
        try {
            const response = await AxiosConfig.get('/languages')
            return response.data
        } catch (err) {
            console.log("err", err);
        }
    }

    const getMentorDetails = async (value: any) => {
        try {
            const response = await AxiosConfig.get(`/mentordetails/${value}`)
            return response.data.mentor
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

    return { doSignup, languages, getMentorDetails, getLangDetails }
}

export default authAPI
