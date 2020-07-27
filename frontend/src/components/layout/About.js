import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'url(https://images.unsplash.com/photo-1595766711576-393e79ec6302?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  container: {
    height: '40%',
    width: '100vw',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 0 20px black',
    background: '#fff'
  },
  link: {
    marginTop: 40,
    color: '#696969',
    textDecoration: 'none'
  },
  heading: {
    marginBottom: 40
  },
  textBox: {
    maxWidth: 800
  }
});
const About = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.textBox}>
          <Typography variant='h3' className={classes.heading}>
            About Us
          </Typography>
          <Typography variant='body1'>
            GrupGrup is a project built by Evelyn Paplauskas and Aaron Lewis for
            a final project with Coder Academy. This application is designed to
            be a platform for original content that you wish to share with your
            peers! Feel free to sign up today and join the family!
          </Typography>
        </Box>
        <Link to='/signup' className={classes.link}>
          Create an Account
        </Link>
      </Box>
    </Box>
  );
};

export default About;
