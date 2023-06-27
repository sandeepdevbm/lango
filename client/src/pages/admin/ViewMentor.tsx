import React,{useEffect} from 'react'
import StudentNavBar from '../../components/student/StudentNavBar'
import ViewMentorDetails from '../../components/student/ViewMentorDetails'
import { useSelector } from 'react-redux'
import { studentReducer } from '../../Redux/studentSlice/studentSlice'
import { useNavigate } from 'react-router-dom';

function ViewMentor() {
    
    const navigate = useNavigate()
    const user = useSelector(studentReducer)
    useEffect(()=>{
        if(!user._id){
            navigate('/')
        }
    },[])

  return (
    <div>
      <StudentNavBar/>
      <ViewMentorDetails/>
    </div>
  )
}

export default ViewMentor
