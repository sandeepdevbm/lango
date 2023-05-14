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

export const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        setDetails: (state, action) => {
            console.log("sssssssssssss");
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

        reSetDetails: (state, action) =>{
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

export const { setDetails, reSetDetails } = userSlice.actions;
export default userSlice.reducer;
export const userReducer = (state:any) => state.persisteReducer.userReducer;