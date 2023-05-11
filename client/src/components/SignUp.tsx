import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel, { FormControlLabelProps, } from '@mui/material/FormControlLabel';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
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
import Radio from '@mui/material/Radio';
import { useNavigate } from 'react-router-dom';




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

export default function SignUp() {

  const navigate = useNavigate()

  interface FormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    position:string
  }

  const [formState, setFormState] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    position:''
  });
interface pos {
  position:string
}
  const[posi,setPosi]= useState<pos>({
    position:""
  })
  console.log(posi);
  


  interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
  }
  
  const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
    <FormControlLabel {...props} />
  ))(({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }));

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();
  
    let checked = false;
  
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
  
    return <StyledFormControlLabel checked={checked} {...props} />;
  }
  
  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  }

  const newFormState = { ...formState, key: posi };
console.log("dscddcdscsdc");
console.log(newFormState);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response = await AxiosConfig.post("/signup", newFormState)
    console.log(response.data);

  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={1.5} >
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
          <RadioGroup name="position" defaultValue="student"
          value={posi} onChange={(e:any)=>setPosi(e.target.value)}>
            <div style={{justifyContent:"space-between"}}>
            <MyFormControlLabel value="student"  label="Student" control={<Radio />} />
            <MyFormControlLabel value="mentor"  label="Mentor" control={<Radio />} />
            </div>
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
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