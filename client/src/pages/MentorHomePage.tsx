import React ,{useEffect} from 'react'
import MentorNavBar from '../components/mentor/MentorNavBar'
import MentorHeroSection from '../components/mentor/MentorHeroSection'
import { useSelector } from 'react-redux'
import { mentorReducer } from '../Redux/mentorSlice/mentorSlice'
import { useNavigate } from 'react-router-dom';

function MentorHomePage() {

const navigate = useNavigate()
    const user = useSelector(mentorReducer)
    useEffect(()=>{
        if(!user._id){
            navigate('/')
        }
    },[])
  return (
    <div>
      <MentorNavBar/>
      <MentorHeroSection post={{ description: 'Learning a new language can be an exciting and rewarding experience. Not only does it open up new opportunities for communication and cultural exploration, but it also exercises the brain and improves cognitive abilities.',
      image: 'https://thumbs.dreamstime.com/b/closeup-wooden-word-wooden-table-background-concept-mentor-closeup-wooden-word-wooden-table-background-concept-mentor-165492466.jpg',imageText: '',linkText: 'get verified',title: 'Learning a new language' }} />
    </div>
  )
}

export default MentorHomePage
