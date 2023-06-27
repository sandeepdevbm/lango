import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"
import AxiosConfig from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Lottie from"lottie-react"
import world from '../lottie/world.json'
//redux
// import { setDetails } from "../Redux/userSlice/userSlice";
import{ setMentorDetails } from "../Redux/mentorSlice/mentorSlice"
import{ setStudentDetails } from "../Redux/studentSlice/studentSlice"
import { useDispatch } from 'react-redux'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const nonValid = (message:string) => toast(message)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  interface FormData {
    email: string;
    password: string;
  }
  interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string,
    role: string,
    qualification:string,
    language:string,
    isVerified:string
  }

  const [formState, setFormState] = useState<FormData>({
    email: '',
    password: '',
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let language = await AxiosConfig.get("/login")
    // console.log(language);
    
    let user = await AxiosConfig.post("/login", formState)
    const accessToken  = user.data.token
    
    if(user.data.response._id){
      if(user.data.response.role==="mentor"){
        const{_id, firstName, lastName, phoneNumber, email, role, qualification, language, isVerified} : Person = user.data.response
        dispatch(setMentorDetails({_id, firstName, lastName, phoneNumber, email, role, qualification, language, isVerified, accessToken }))
        setTimeout(() => {
          navigate('/mentor')
        }, 2000);
      }
  
      if(user.data.response.role==="student"){
        const{_id, firstName, lastName, phoneNumber, email, role} : Person = user.data.response
        dispatch(setStudentDetails({_id, firstName, lastName, phoneNumber, email, role, accessToken }))
        // console.log(language.data);
        setTimeout(() => {
          navigate('/student')
        }, 2000);
      }
      
      nonValid("Successfully logged in")
    }
    if(user.data.response.email==='this email is not registered'){
      nonValid(user.data.response.email)
    }
    if(user.data.response.password==='this password is incorrect'){
      nonValid(user.data.response.password)
    }
    
    console.log(user.data.response);
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display:'flex',justifyContent:'center',marginTop:'1.5rem'}}>

      <Box sx={{height:"38rem", width:'28rem',display:{xs: 'none', md: 'flex'}}}>
      <Lottie style={{marginLeft:"5rem", height:"18rem", marginTop:"10rem"}}
         animationData={world}/>
      </Box> 
<Box sx={{marginTop:'2rem'}}>
      <Container component="main" maxWidth="xs"sx={{border: "1px solid black",borderRadius:'2.5rem'}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 5}}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={formState.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <ToastContainer />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formState.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{fontSize:'.8rem'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{fontSize:'.8rem'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
}