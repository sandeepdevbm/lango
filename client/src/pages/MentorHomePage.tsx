import React, { useEffect, useState } from 'react'
import MentorNavBar from '../components/mentor/MentorNavBar'
import MentorHeroSection from '../components/mentor/MentorHeroSection'
import { useSelector } from 'react-redux'
import { mentorReducer } from '../Redux/mentorSlice/mentorSlice'
import { useNavigate } from 'react-router-dom';
import mentorAPI from '../API/mentorAPI';
import MentorVerifiedHero from "../components/mentor/MentorVerifiedHero"
import { Typography } from '@mui/material'

interface UserData {
  _id: string;
  firstName: string;
  isVerified: string
  pdfs: string[]
}

function MentorHomePage() {

  const navigate = useNavigate()
  const user = useSelector(mentorReducer)
  useEffect(() => {
    if (!user._id) {
      navigate('/')
    }
  }, [])

  const [mentor, setMentor] = useState<UserData>()
  const { getAMentor } = mentorAPI()

  useEffect(() => {
    const details = async () => {
      const mentorData = await getAMentor(user._id)
      setMentor(mentorData)
    }
    details()
  }, [])

  return (
    <div>
      <MentorNavBar />
      {mentor?.isVerified === "pending" &&
        <>
          <MentorHeroSection post={{
            description: 'Learning a new language can be an exciting and rewarding experience. Not only does it open up new opportunities for communication and cultural exploration, but it also exercises the brain and improves cognitive abilities.',
            image: 'https://thumbs.dreamstime.com/b/closeup-wooden-word-wooden-table-background-concept-mentor-closeup-wooden-word-wooden-table-background-concept-mentor-165492466.jpg', imageText: '', linkText: 'get verified', title: 'Learning a new language'
          }} />
        </>
      }
      {mentor?.isVerified === "true" &&
        <MentorVerifiedHero post={{
          description: 'Learning a new language can be an exciting and rewarding experience. Not only does it open up new opportunities for communication and cultural exploration, but it also exercises the brain and improves cognitive abilities.',
          image: 'https://thumbs.dreamstime.com/b/closeup-wooden-word-wooden-table-background-concept-mentor-closeup-wooden-word-wooden-table-background-concept-mentor-165492466.jpg', imageText: '', title: 'Learning a new language'
        }} />
      }
      {mentor?.isVerified === "false" &&
        <Typography>
          you are rejected
        </Typography>
      }
    </div>
  )
}

export default MentorHomePage
