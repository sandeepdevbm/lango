import React,{useState,useEffect} from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import mentorAPI from '../../API/mentorAPI';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'


interface MentorData {
    firstName: string;
    lastName: string;
    email: string;
    qualification: string;
    language: string;
    profilePicture:string;
    phoneNumber:number;
  }

function ViewMentorDetails() {
    const {getAMentor} = mentorAPI()
    const[mentorDetails,getMentorDetails]=useState<MentorData>()
  const { mentorId } = useParams();

  useEffect(()=>{
    const mentorData= async()=>{
       const mentor = await getAMentor(mentorId)
       getMentorDetails(mentor)
        
    }
    mentorData()
  },[])

  return (
    <div>
        <Container component="main" maxWidth="lg" >
        {/* <Box> */}
       <Box sx={{ display: '', alignItems: 'center',mt:5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center',mt:5 }}>
      <Avatar src={mentorDetails?.profilePicture} alt={mentorDetails?.firstName} sx={{ width: 100, height: 100, marginRight: 2 }} />
        <div style={{}}>
        <Typography variant="h5" gutterBottom sx={{fontSize:"2rem" ,color:'#393646'}}>
          {mentorDetails?.firstName.toUpperCase()} {mentorDetails?.lastName.toUpperCase()}
        </Typography>
        
        <h4 style={{marginTop:'-1rem', marginLeft:'.5rem'}}>{mentorDetails?.email}</h4>
        </div>
        <Button variant="contained" color="primary" sx={{
                  backgroundColor: '#6D5D6E',
                  height: '2rem',
                  marginLeft:'10rem',
                  marginTop:'-1rem',
                  marginRight: '1rem',
                  '&:hover': {
                    backgroundColor: '#393646',
                  },
                }}
                >
                  Sent Request
                </Button>
        </Box>
        
        <Box sx={{display:'flex' ,marginTop:'2rem', marginLeft:'1rem'}}>
        <div >
        <Typography variant="body1" gutterBottom sx={{color:'#4F4557'}}>
          Phone: 
        </Typography>
        <h4 style={{marginTop:'.5rem'}}>{mentorDetails?.phoneNumber}</h4>
        <Typography variant="body1" gutterBottom sx={{color:'#4F4557'}}>
          Qualification: 
        </Typography>
        <h4 style={{marginTop:'.5rem'}}>{mentorDetails?.qualification}</h4>
        <Typography variant="body1" gutterBottom sx={{color:'#4F4557'}}>
          Language: 
        </Typography>
        <h4 style={{marginTop:'.5rem'}}>{mentorDetails?.language} </h4>
        </div>
        
        

      </Box>
    </Box>
    {/* </Box> */}
    </Container>
    </div>
  )
}

export default ViewMentorDetails
