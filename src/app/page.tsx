'use client';

import { useAuth } from '@/utility/context/auth';
import { CSSProperties, useEffect } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Box,
  Button,
  Container,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
export default function HomePage() {
  const sectionStyle: CSSProperties = {
    padding: '40px',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '40%',
    marginTop: '20px',
    /* Other styles for images */
  };

  const homepageStyle = {
    fontFamily: 'Arial, sans-serif',
    /* Add more general styles as needed */
  };
  const { user } = useAuth();
  const pstyle = {
    margin: '4px',
  };
  const h2style = {
    margin: '4px 0 0 0',
    color: 'rgb(18 133 213)',
  };

  const divStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };
  useEffect(() => {
    console.log(user?.emailVerified);
  }, [user]);

  return (
    <>
      {/* {user?.emailVerified ? <h1>Admin logged in</h1> : <h1>User logged in</h1>} */}
      <div style={homepageStyle}>
        {/* <Grid
          container
          style={{
            background:
              'linear-gradient(to bottom, rgb(18 133 213), rgb(65 209 246),rgb(157 238 246),rgb(73 194 206),rgb(64 200 236), rgb(60 204 247))',
            width: '100%',
            color: 'white',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '20px',
              color: 'white',
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>WELCOME TO CODEAB</strong>
            </p>
            <h1>
              It's kinda like Facebook <br />
              but for your software engineering career
            </h1>
            <p style={{ margin: 0 }}>
              Our Collaboration Feature offers a suite of tools and capabilities
              that make working with others a breeze. Whether you're a remote
              team, a global organization, or a small group, our feature has you
              covered.
            </p>
            <Button
              variant='contained'
              sx={{ marginTop: '16px' }}
              onClick={() => {
                window.location.href = '/groups';
              }}
            >
              Collaborate
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <img
              src='./assets/images/People1.jpeg'
              alt='Image 3'
              height='460px'
            />
          </Grid>
        </Grid> */}
        <Grid
          container
          style={{
            background:
              'linear-gradient(to bottom, rgb(18 133 213), rgb(65 209 246),rgb(157 238 246),rgb(73 194 206),rgb(64 200 236), rgb(60 204 247))',
            width: '100%',
            color: 'white',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center', // Added to align content in the center
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center', // Changed alignment to center
              padding: '20px',
              color: 'white',
            }}
          >
            <p style={{ margin: 0, fontSize: '15px' }}>
              <strong>WELCOME TO CODEAB</strong>
            </p>
            <h1>
              It's kinda like Facebook <br />
              but for your software engineering career
            </h1>
            <p style={{ margin: 0 }}>
              Our Collaboration Feature offers a suite of tools and capabilities
              that make working with others a breeze. Whether you're a remote
              team, a global organization, or a small group, our feature has you
              covered.
            </p>
            <Button
              variant='contained'
              sx={{ marginTop: '16px' }}
              onClick={() => {
                window.location.href = '/groups';
              }}
            >
              Collaborate
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <img
              src='./assets/images/People1.jpeg'
              alt='Image 3'
              height='460px'
            />
          </Grid>
        </Grid>

        <main>
          <Grid
            container
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              backgroundColor: '#f7f7f7',
              boxShadow: 'inset 0px -1px #cccccc',
              borderBottom: '1px solid #cccccc',
            }}
          >
            <Grid item style={divStyle}>
              <h2 style={{ ...h2style, fontFamily: 'Arial', fontSize: '24px' }}>
                10,000+
              </h2>
              <p style={{ ...pstyle, fontFamily: 'Arial', fontSize: '14px' }}>
                USERS
              </p>
            </Grid>
            <Grid item style={divStyle}>
              <h2 style={{ ...h2style, fontFamily: 'Arial', fontSize: '24px' }}>
                100+
              </h2>
              <p style={{ ...pstyle, fontFamily: 'Arial', fontSize: '14px' }}>
                GROUPS
              </p>
            </Grid>
            <Grid item style={divStyle}>
              <h2 style={{ ...h2style, fontFamily: 'Arial', fontSize: '24px' }}>
                1 year
              </h2>
              <p style={{ ...pstyle, fontFamily: 'Arial', fontSize: '14px' }}>
                IN BUSINESS
              </p>
            </Grid>
            <Grid item style={divStyle}>
              <h2 style={{ ...h2style, fontFamily: 'Arial', fontSize: '24px' }}>
                150+
              </h2>
              <p style={{ ...pstyle, fontFamily: 'Arial', fontSize: '14px' }}>
                REVIEWS
              </p>
            </Grid>
          </Grid>
          <section
            id='section1'
            style={{ ...sectionStyle, display: 'flex', alignItems: 'center' }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                flexDirection: 'column',
                alignContent: 'center',
                textAlign: 'center',
              }}
            >
              <Grid item xs={12} md={6}>
                <div>
                  <Typography
                    variant='h4'
                    sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}
                  >
                    About Codeab
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ maxWidth: '600px', fontFamily: 'Arial' }}
                  >
                    An online platform designed to facilitate peer collaboration
                    and problem solving in coding which serves as a valuable
                    resource in programming landscape. Our service offers a
                    suite of tools and capabilities which make working with
                    others a breeze. Whether you are a remote team, an
                    organization or a small group, WE HAVE YOU COVERED!
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    ...imageStyle,
                    borderRadius: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src='./assets/images/About.jpeg'
                    alt='Image 1'
                    width='400px'
                    height='300px'
                  />
                </div>
              </Grid>
            </Grid>
          </section>

          <section
            id='section2'
            style={{ ...sectionStyle, justifyContent: 'center' }}
          >
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={6}>
                <div style={{ paddingLeft: '60px' }}>
                  <Typography
                    variant='h2'
                    sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}
                  >
                    Master the Art of Problem-Solving
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ maxWidth: '600px', fontFamily: 'Arial' }}
                  >
                    Mastering the art of problem-solving is a critical skill
                    that empowers individuals to approach challenges
                    methodically and effectively. We specialize in honing this
                    skill, offering proven strategies and training to equip
                    individuals and teams with the tools they need to excel in
                    problem-solving.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    ...imageStyle,
                    borderRadius: '40%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <img
                    src='./assets/images/ProblemSolving.jpeg'
                    alt='Image 2'
                    width='400px'
                    style={{ borderRadius: '50%' }}
                  />
                </div>
              </Grid>
            </Grid>
          </section>

          <section id='section2' style={sectionStyle}>
            <Grid
              container
              spacing={2}
              alignItems='center'
              flexDirection='row-reverse'
            >
              <Grid item xs={12} md={6}>
                <div>
                  <Typography
                    variant='h2'
                    sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}
                  >
                    Your Gateway to Career Advancement
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ maxWidth: '600px', fontFamily: 'Arial' }}
                  >
                    Your Gateway to Career Advancement is your passport to
                    professional success. Our platform offers a wide range of
                    resources, from expert guidance to tailored training,
                    designed to accelerate your career growth. Start your
                    journey with us and open the doors to a brighter, more
                    promising future.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    ...imageStyle,
                    borderRadius: '40%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <img
                    src='./assets/images/Career2.jpeg'
                    alt='Image 2'
                    width='400px'
                    height='400px'
                    style={{ borderRadius: '50%' }}
                  />
                </div>
              </Grid>
            </Grid>
          </section>
          {/* Add more sections as needed */}
        </main>
        <footer>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              background: 'linear-gradient(to right, #038de8, #1dd2fe)',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
          >
            <Container maxWidth='lg'>
              <Grid container direction='column' alignItems='center'>
                <Grid item xs={12}>
                  <Typography
                    color='white'
                    variant='h6'
                    sx={{ display: 'flex' }}
                  >
                    <ListItemButton component='a' href='/groups'>
                      <ListItemText primary='Groups' />
                    </ListItemButton>
                    <ListItemButton component='a' href='/rankings'>
                      <ListItemText primary='Rankings' />
                    </ListItemButton>
                    <ListItemButton component='a' href='/problems'>
                      <ListItemText primary='Problems' />
                    </ListItemButton>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    color='white'
                    variant='h6'
                    sx={{ display: 'flex' }}
                  >
                    <ListItemButton component='a' href='#facebook'>
                      <FacebookIcon />
                    </ListItemButton>

                    <ListItemButton component='a' href='#instagram'>
                      <InstagramIcon />
                    </ListItemButton>

                    <ListItemButton component='a' href='#linkedin'>
                      <LinkedInIcon />
                    </ListItemButton>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color='white' variant='subtitle1'>
                    {`\u00A9 2023 Codeab. All rights reserved.`}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </footer>
      </div>
    </>
  );
}
