import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import { studentReducer } from '../../Redux/studentSlice/studentSlice';
import Room from '../roomComponent/room';

interface UserProps{
  role:string;
}

function RoomPage() {
    const [user,setUser]= useState<UserProps>()
  const mentorData = useSelector(mentorReducer)
  const studentData = useSelector(studentReducer)

  useEffect(()=>{
    const data = ()=>{
      if(mentorData.role ==="mentor") setUser(mentorData)
      else if(studentData.role === "student") setUser(studentData)
    }
    data()
  },[])
  return (
    <div>
      <div>
      {user?.role === "mentor" && (
      <Room user = {user}/>
      )}
      {user?.role === "student" && (
        <Room user = {user}/>
      )}
    </div>
    </div>
  )
}

export default RoomPage
