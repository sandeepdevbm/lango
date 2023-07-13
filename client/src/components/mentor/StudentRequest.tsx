import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import mentorAPI from '../../API/mentorAPI';
import studentAPI from '../../API/studentAPI';
import {buttonStyles,rejectStyle} from "../styles/LangoStyle"

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  qualification: string;
  profilePicture: string;
}

function StudentRequest() {
  const { getAMentor } = mentorAPI();
  const { getAStudent } = studentAPI();
  const mentorData = useSelector(mentorReducer);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const getStudents = async () => {
      const getReqStu = await getAMentor(mentorData._id);
      const newStudents: Student[] = [];
      for (const element of getReqStu.students) {
        if (element.isAccepted === "false") {
          const student = await getAStudent(element.studentId);
          newStudents.push(student);
        }
      }
      setStudents(newStudents);
    }
    getStudents();
  }, []);

  return (
    <Box m={5}>
      <Typography variant="h4" sx={{color:'#4F4557'}} gutterBottom>
        New Students Request
      </Typography>
      {students && students.length > 0 ? (
        <Grid container spacing={2}>
          {students.map((student) => (
            <Grid item xs={12} key={student._id} sx={{mt:2}}>
              <Card sx={{
  width: '50%',
  '@media (max-width: 1080px)': {
    width: '100%',
  },
  height:'inherit'
}}>
<Box display="flex" m={1} flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs:'start',sm:"center"}} justifyContent="space-between">
  <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
    <Avatar sx={{
      bgcolor: 'secondary.main',
      width: { xs: 40, sm: 56 },
      height: { xs: 40, sm: 56 },
    }}>
      {student.profilePicture ? (
        <img src={student.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <LockOutlinedIcon />
      )}
    </Avatar>
    <Box ml={{ xs: 1, sm: 2 }}>
      <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: 'inherit' } }}>{student.firstName} {student.lastName}</Typography>
      <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{student.email}</Typography>
    </Box>
  </Box>
  <Box display="flex">
    <Button variant="contained" color="primary" sx={{...buttonStyles, mr: 1}}>Accept</Button>
    <Button variant="contained" color="primary" sx={rejectStyle}>Reject</Button>
  </Box>
</Box>

</Card>

            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No new student requests</Typography>
      )}
    </Box>
  );
}

export default StudentRequest;
