import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {  Button } from "@mui/material";
import { useSelector } from 'react-redux'
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice'
import { useNavigate } from 'react-router-dom';
import mentorAPI from '../../API/mentorAPI';

interface HeroSectionPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
}

interface UserData {
  _id: string;
  firstName: string;
  isVerified: string
  pdfs: string[]
}

function MentorHeroSection(props: HeroSectionPostProps) {
  const { post } = props;
  const [mentor, setMentor] = useState<UserData>()
  const { getAMentor } = mentorAPI()
  const user = useSelector(mentorReducer)
  const navigate = useNavigate()

  useEffect(() => {
    const details = async () => {
      const mentorData = await getAMentor(user._id)
      setMentor(mentorData)
    }
    details()
  }, [])

  const handleGetVerified = () => {
    navigate(`/mentorverify/${user._id}`)
  }

  return (
    <div>
      {mentor &&
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${post.image})`,
            height: "27rem",
            borderRadius: 0
          }}
        >
          {<img style={{ display: "none" }} src={post.image} alt={post.imageText} />}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
              backdropFilter: 'blur(1.2px)',
              borderRadius: '4px',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: '-1'
              }
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{ textShadow: '0 0 3px white' }} >
                  {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph sx={{ color: '', textShadow: '0 0 2px white', mt: 3 }} >
                  {post.description}
                </Typography>
                {mentor.pdfs.length > 0 ? (
                  <Button variant="contained" sx={{
                    backgroundColor: '#F4EEE0', color: '#393646', fontStyle: 'italic', '&:hover': {
                      backgroundColor: '#F4EEE0',
                      color: '#393646'
                    }
                  }}>
                    request sent for verification
                  </Button>
                ) : (
                  <Button variant="contained" sx={{
                    backgroundColor: '#F4EEE0', color: '#393646', fontStyle: 'italic', '&:hover': {
                      backgroundColor: '#6D5D6E',
                      color: 'white'
                    }
                  }} onClick={handleGetVerified}>
                    {post.linkText}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      }
    </div>
  );
}
export default MentorHeroSection
