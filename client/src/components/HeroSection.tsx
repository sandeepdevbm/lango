
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {Backdrop} from '@mui/material';
import Lottie from"lottie-react"
import world from '../lottie/world.json'
import people from '../lottie/people.json'


interface HeroSectionPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
}


export default function HeroSection(props: HeroSectionPostProps) {
  const { post } = props;


  return (
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
        height:"30rem"
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{display:"none" }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              backdropFilter: 'blur(1.2px)',
              borderRadius: '4px',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: '-1'
              }
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{textShadow: '0 0 3px white'}} >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph sx={{color:'',textShadow: '0 0 2px white'}} >
              {post.description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </Box>
        </Grid>
        <Box sx={{display: { xs: 'none', lg: 'flex' }}}>
        <Lottie style={{marginLeft:"10rem", height:"10rem", marginTop:"21.4rem"}}
         animationData={people}/>
        </Box>
      </Grid>
    </Paper>
  );
}