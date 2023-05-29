import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Container, Grid, Typography, Card,
  CardContent, Button
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import authAPI from '../../API/authAPI'

import { useParams } from 'react-router-dom';

interface Mentor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  qualification: string;
  profilePicture: string
}



function Languages() {
  const { getMentorDetails, getLangDetails } = authAPI();
  const { language } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [languageDescription, setLanguageDescription] = useState<string>('');


  useEffect(() => {
    fetchMentorDetails();
    fetchLanguageDescription();
  }, []);

  //   const descriptionData = getLangDetails(language);
  //   console.log("sssssssaaaaaaaaaaaaaaa");
  //   console.log(descriptionData);




  const fetchMentorDetails = async () => {
    try {
      const mentorData = await getMentorDetails(language)
      console.log(mentorData);

      setMentors(mentorData);
    } catch (err) {
      console.log('Error fetching mentor details:', err);
    }
  };


  const fetchLanguageDescription = async () => {
    try {
      const descriptionData = await getLangDetails(language);
      console.log("sssssssssssssssssssss");
      console.log(descriptionData.details.discription);


      setLanguageDescription(descriptionData.details.discription);
    } catch (err) {
      console.log('Error fetching language description:', err);
    }
  };


  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom sx={{ m: 5, color: "#4F4557" }}>
          Here are the Mentors for {language} language.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Language Description: {languageDescription}
        </Typography>
        <Grid container spacing={2}>
          {mentors.map((mentor: Mentor, index: number) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}> 
                <Avatar sx={{ m: 3, bgcolor: 'secondary.main', height: "4rem", width: '4rem' }}>
                  {mentor.profilePicture ? (
                    <img src={mentor.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'inherit' }} />
                  ) : (
                    <LockOutlinedIcon />
                  )}
                </Avatar>
                <CardContent>
                  <Typography variant="h6">{mentor.firstName} {mentor.lastName} </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {mentor.email}
                  </Typography>
                  {/* <Typography variant="body1" gutterBottom>
                  Phone Number: {mentor.phoneNumber}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Qualification: {mentor.qualification}
                </Typography> */}
                </CardContent>
                </Box>
                
                <Button variant="contained" color="primary" sx={{
                  backgroundColor: '#6D5D6E',
                  height: '2rem',
                  marginTop: '2.5rem',
                  marginRight: '1rem',
                  '&:hover': {
                    backgroundColor: '#393646',
                  },
                }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Languages
