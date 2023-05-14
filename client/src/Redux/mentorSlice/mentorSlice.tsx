import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    firstName: "",
    lastName:"",
    phoneNumber:"",
    email: "",
    role: "",
    qualification:"",
    language:"",
    accessToken: ""
};

export const mentorSlice = createSlice({
    name: 'mentorDetails',
    initialState,
    reducers: {
        setMentorDetails: (state, action) => {
            console.log("sssddsssssssss");
            console.log(action.payload, "action");
            const {_id, firstName, lastName, phoneNumber, email, role, qualification, language, accessToken } = action.payload;
            state._id = _id !== undefined ? _id : state._id;
            state.firstName = firstName !== undefined ? firstName : state.firstName;
            state.lastName = lastName !== undefined ? lastName : state.lastName;
            state.phoneNumber = phoneNumber !== undefined ? phoneNumber : state.phoneNumber;
            state.email = email !== undefined ? email : state.email;
            state.role = role !== undefined ? role : state.role;
            state.qualification = qualification !== undefined ? qualification : state.qualification;
            state.language = language !== undefined ? language : state.language;
            state.accessToken = accessToken !== undefined ? accessToken : state.accessToken; 
        
            
        },

        reSetMentorDetails: (state, action) =>{
            state._id = "",
            state.firstName = "",
            state.lastName = "",
            state.phoneNumber = "",
            state.email = "",
            state.role = "",
            state.qualification = "",
            state.language = "",
            state.accessToken = ""
        }
    }
})

export const { setMentorDetails, reSetMentorDetails } = mentorSlice.actions;
export default mentorSlice.reducer;
export const mentorReducer = (state:any) => state.persisteReducer.mentorReducer;