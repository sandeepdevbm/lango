import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import StudentRequest from './StudentRequest';
import { useSelector } from 'react-redux';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import mentorAPI from '../../API/mentorAPI';

interface HeroSectionPostProps {
    post: {
        description: string;
        image: string;
        imageText: string;
        title: string;
    };
}

interface MentorData{
    students:string[]
}

function MentorVerifiedHero(props: HeroSectionPostProps) {
    const { post } = props;
    const {getAMentor} = mentorAPI()
    const [mentor,setMentor] = useState<MentorData>()
    const mentorData = useSelector(mentorReducer)
    // const hasPendingRequests = mentorData?.students.some((student: any) => student.isAccepted === false);
    useEffect(()=>{
        const getMentor=async ()=>{
            const mentorDetails = await getAMentor(mentorData._id)
            setMentor(mentorDetails)
        }
        getMentor()
    },[])
    // const hasPendingRequests = mentor?.students.some((student:any) => student.isAccepted === "false");
    return (
        <div>
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
                    height: "26rem",
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
                            <Typography variant="h5" color="inherit" paragraph sx={{ color: '', textShadow: '0 0 2px white', mt: 3,fontSize: { xs: '1.2rem', sm: 'inherit' } }} >
                                {post.description}
                            </Typography>
                            <Button variant="contained" sx={{
                                backgroundColor: '#F4EEE0', color: '#393646', fontStyle: 'italic', '&:hover': {
                                    backgroundColor: '#F4EEE0',
                                    color: '#393646'
                                }
                            }}>
                                You are Verified
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <div>
        <StudentRequest />  
    </div>
        </div>
    )
}

export default MentorVerifiedHero
