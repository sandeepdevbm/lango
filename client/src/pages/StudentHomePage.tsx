import React,{useEffect} from 'react'
import StudentNavBar from '../components/student/StudentNavBar'
import HeroSection from '../components/HeroSection'
import { useSelector } from 'react-redux'
import { studentReducer } from '../Redux/studentSlice/studentSlice'
import { useNavigate } from 'react-router-dom';


function StudentHomePage() {

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
      <HeroSection post={{ description: 'Learning a new language can be an exciting and rewarding experience. Not only does it open up new opportunities for communication and cultural exploration, but it also exercises the brain and improves cognitive abilities.',
      image: 'https://wallpaperaccess.com/full/6469440.jpg',imageText: '',linkText: '',title: 'Learning a new language' }} />
    </div>
  )
}

export default StudentHomePage
