import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { pdfjs } from 'react-pdf'
import adminApi from '../../API/adminAPI';
import PdfViewer from './PdfViewer';
import { ToastContainer, toast } from 'react-toastify';
import { buttonStyles } from "../styles/LangoStyle"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface MentorData {
  firstName: string;
  lastName: string;
  email: string;
  qualification: string;
  language: string;
  pdfs: string[];
}

interface OneMentor {
  isVerified: string
  _id: string
  firstName: string
  lastName: string
  email: string
  qualification: string
  language: string;
  pdfs: string[];
}

function MentorDetails() {
  const [active, setActive] = useState('viewMentors')
  const [mentorData, setMentorData] = useState<MentorData[]>([]);
  const [oneMentor, setOneMentor] = useState<OneMentor>()
  const [refresh, setRefresh] = useState(false);
  const { getMentorsToVerify, approveMentors, rejectMentors } = adminApi();
  const approveMessage = (message: string) => toast(message)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentors = await getMentorsToVerify();
        setMentorData(mentors);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleApproveUser = async (mentorId: any) => {
    try {
      const approve = await approveMentors(mentorId)
      if (approve) {
        approveMessage('verified')
        setTimeout(() => {
          setActive('viewMentors')
        }, 3000);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRejectUser = async (mentorId: any) => {
    try {
      const reject = await rejectMentors(mentorId)
      if (reject) {
        approveMessage('rejected')
        setTimeout(() => {
          setActive('viewMentors')
        }, 3000);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.log(err);

    }
  };

  const handleViewPdf = (data: any) => {
    setOneMentor(data)
    setActive("viewPdf")
  }

  return (
    <div>
      <ToastContainer />
      {mentorData.length > 0 ? (
        <>
          {active === 'viewMentors' &&
            <Box sx={{ display: 'flex' }}>
              {mentorData.map((data: MentorData) => (
                <Card key={data.email}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      User Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Name: {data.firstName} {data.lastName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Email: {data.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Qualification: {data.qualification}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Language: {data.language}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                    </Box>
                    <Box>
                      <Button variant="contained"
                        onClick={() => handleViewPdf(data)}
                        sx={buttonStyles}
                      >
                        View Pdf
                      </Button>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>}
          {active === 'viewPdf' &&
            <>
              <Button sx={buttonStyles} onClick={() => { setActive('viewMentors') }} variant="contained" color="primary">
                Go Back
              </Button>
              {oneMentor?.isVerified === 'pending' &&
                <>
                  <PdfViewer id={oneMentor} />
                  <Box sx={{ mt: 3 }}>
                    <Button variant="contained" onClick={() => handleApproveUser(oneMentor._id)} sx={{ mr: 1 }}>
                      Approve
                    </Button>
                    <Button variant="contained" onClick={() => handleRejectUser(oneMentor._id)} sx={{
                      backgroundColor: "red", '&:hover': {
                        backgroundColor: '#6D5D6E',
                        color: 'white'
                      }
                    }}>
                      Reject
                    </Button>
                  </Box>
                </>
              }
            </>
          }
        </>
      ) : (
        <Box sx={{ height: '30rem', width: '60rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Typography
              component="h1"
              variant="h3"
              color="inherit">
              No Mentors To Approve
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default MentorDetails;
