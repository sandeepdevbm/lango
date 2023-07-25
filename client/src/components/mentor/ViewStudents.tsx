import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import mentorAPI from '../../API/mentorAPI';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import { useSelector } from 'react-redux';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

interface Student {
  studentId: string;
  studentFirstName: string;
  studentProfilePicture: string;
  studentPhoneNumber: string;
  studentLastName:string;
}

const ViewStudents: React.FC = () => {
  const { getMentorStudent } = mentorAPI();
  const mentor = useSelector(mentorReducer);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await getMentorStudent(mentor._id);
        console.log(data);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, [mentor._id]);

  const itemsPerPage = 1; 
  const totalItems = students.length; 
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={2} mt={5}>
        {currentItems.map((item) => (
            <Grid item xs={12} key={item.studentId}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}> 
                <Avatar sx={{ m: 3, bgcolor: 'secondary.main', height: "4rem", width: '4rem' }}>
                  {item.studentProfilePicture ? (
                    <img src={item.studentProfilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'inherit' }} />
                  ) : (
                    <LockOutlinedIcon />
                  )}
                </Avatar>
                <CardContent>
                  <Typography variant="h6">{item.studentFirstName} {item.studentLastName} </Typography>
                  <Typography variant="body1" gutterBottom>
                    {item.studentPhoneNumber}
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
                  Schudle Class
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </Box>

      </Container>

    </div>
    
  );
};

export default ViewStudents;
