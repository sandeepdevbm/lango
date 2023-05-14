import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import mentorReducer  from './mentorSlice/mentorSlice';
import studentReducer from './studentSlice/studentSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    userReducer,
    studentReducer,
    mentorReducer
})

const persisteReducer = persistReducer(persistConfig, reducers)

export const store = configureStore ({
    reducer: {
        persisteReducer
    },
    middleware:[],
})