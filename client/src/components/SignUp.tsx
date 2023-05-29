import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useState, useEffect, useRef, ChangeEvent  } from "react"
import AxiosConfig from '../config/axiosConfig';
import Radio from '@mui/material/Radio';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {

  FormControl,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';

import authAPI from '../API/authAPI'




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

// ---------------------------------
interface Qualification {
  value: string;
  label: string;
}

const qualifications: Qualification[] = [
  { value: 'none', label: 'None' },
  { value: 'bachelor', label: 'Bachelor Degree' },
  { value: 'master', label: 'Master Degree' },
  { value: 'doctorate', label: 'Doctorate Degree' },
];
//--------------------------------------------

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface Language {
  id: string;
  name: string;
}


const theme = createTheme();

export default function SignUp() {

  const { doSignup, languages } = authAPI();
  const navigate = useNavigate()
  const nonValid = (message: string) => toast(message)

  const [role, setRole] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [err, setErr] = useState<string>('')

  // pppppppppppppppppppppppppppppppppppppppppppppppppppppppp

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const profilePictureRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleProfilePictureUpload = () => {
    if (profilePictureRef.current) {
      profilePictureRef.current.click();
    }
  };
//============================================================================

  const [languageOptions, setLanguageOptions] = useState<Language[]>([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await languages();
      const fetchedLanguages = response.lang;
      setLanguageOptions(fetchedLanguages);
    } catch (error) {
      console.error(error);
    }
  };



  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleQualificationChange = (event: any) => {
    setQualification(event.target.value);
  };

  const handleLanguageChange = async (event: any) => {
    setLanguage(event.target.value);

    let language = await languages()
    console.log('//////');
    console.log(language.lang);
  };



  const [formState, setFormState] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  console.log(profilePicture,"=========================");
  

  let formData = new FormData()
  let form = {...formState}
  formData.append("formState",JSON.stringify(form))
  formData.append('qualification',qualification)
  formData.append('language',language)
  if (profilePicture) {
    formData.append('profilePicture', profilePicture);
  }

  // const newState = { ...formState, qualification, language, profilePicture }
  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
 
    let response = await doSignup(formData)
    try {
      if (response.response._id) {
        nonValid("successfully Signed up")
        setTimeout(() => {
          navigate('/login')
        }, 2000);

      }
      if (response.response.email === 'Email already exists') {
        nonValid(response.response.email)
      }
      if (response.response.email === 'Please enter a valid email') {
        nonValid(response.response.email)
      }
      if (response.response.email === 'Please enter an email') {
        nonValid(response.response.email)
      }
      if (response.response.password === 'Minimum password length is 6 character') {
        nonValid(response.response.password)
      }
      if (response.response.password === 'Please enter an password') {
        nonValid(response.response.password)
      }
    } catch (err) {
      console.log('sdasdad', err);

    }


    console.log(response.response);

  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 0

          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', height:"6rem", width:'6rem'  }}>
            {profilePicture ? (
              <img src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'inherit' }} />
            ) : (
              <LockOutlinedIcon />
            )}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1.5} >
            <input
              type="file"
              name= "profilePicture"
              id="profile-picture-input"
              ref={profilePictureRef}
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 , ml:1.5}}
              onClick={handleProfilePictureUpload}
            >
              Upload Profile Picture
            </Button>
              <Grid item xs={12} sm={6}  >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputProps={{ sx: { height: "50px" } }}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={formState.lastName}
                  onChange={handleChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{ sx: { height: "50px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                  label="Phone Number"
                  type="string"
                  id="phone"
                  autoComplete="phone"
                  InputProps={{ sx: { height: "50px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formState.email}
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{ sx: { height: "50px" } }}
                />
                <ToastContainer />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{ sx: { height: "50px" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" margin="normal" required>
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    aria-label="role"
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    row
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="mentor"
                      control={<Radio />}
                      label="Mentor"
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </FormControl>
                {role === 'mentor' && (
                  <>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel id="mentor-qualification-label">
                        Qualification
                      </InputLabel>
                      <Select
                        labelId="mentor-qualification-label"
                        id="mentor-qualification-select"
                        value={qualification}
                        onChange={handleQualificationChange}
                      >
                        {qualifications.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel id="mentor-status-label">Language</InputLabel>
                      <Select
                        labelId="mentor-status-label"
                        id="mentor-status-select"
                        value={language}
                        onChange={handleLanguageChange}
                      >
                        {languageOptions.map((option : any) => (
                          <MenuItem key={option.id} value={option.language}>
                            {option.language}
                          </MenuItem>
                        ))}
                        {/* <MenuItem value="english">English</MenuItem>
                        <MenuItem value="malayalam">Malayalam</MenuItem>
                        <MenuItem value="hindi">Hindi</MenuItem>
                        <MenuItem value="tamil">Tamil</MenuItem> */}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}