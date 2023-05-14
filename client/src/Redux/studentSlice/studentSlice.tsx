import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    firstName: "",
    lastName:"",
    phoneNumber:"",
    email: "",
    role: "",
    accessToken: ""
};

export const studentSlice = createSlice({
    name: 'studentDetails',
    initialState,
    reducers: {
        setStudentDetails: (state, action) => {
            console.log("sssssssssssss");
            console.log(action.payload, "action");
            const {_id, firstName, lastName, phoneNumber, email, role, accessToken } = action.payload;
            state._id = _id !== undefined ? _id : state._id;
            state.firstName = firstName !== undefined ? firstName : state.firstName;
            state.lastName = lastName !== undefined ? lastName : state.lastName;
            state.phoneNumber = phoneNumber !== undefined ? phoneNumber : state.phoneNumber;
            state.email = email !== undefined ? email : state.email;
            state.role = role !== undefined ? role : state.role;
            state.accessToken = accessToken !== undefined ? accessToken : state.accessToken; 
        
            
        },

        reSetStudentDetails: (state, action) =>{
            console.log(action.payload,"sssssss");
            state._id = "",
            state.firstName = "",
            state.lastName = "",
            state.phoneNumber = "",
            state.email = "",
            state.role = "",
            state.accessToken = ""
        }
    }
})

export const { setStudentDetails, reSetStudentDetails } = studentSlice.actions;
export default studentSlice.reducer;
export const studentReducer = (state:any) => state.persisteReducer.studentReducer;