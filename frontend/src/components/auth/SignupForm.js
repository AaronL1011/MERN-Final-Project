import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const useStyles = makeStyles({
  boxStyle: {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexCentered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#696969',
    textDecoration: 'none'
  }
});

const SignupForm = ({
  username,
  setUsername,
  profileUrl,
  setProfileUrl,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  attemptUserCreate
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.boxStyle}>
      <Grid container className={classes.gridContainer} spacing={1}>
        <Grid item container className={classes.flexCentered}>
          <h1>
            GrupGrup <CameraAltIcon fontSize={'large'} />
          </h1>
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <TextField
            id='username-field'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label='Username'
            variant='outlined'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <TextField
            id='email-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <TextField
            id='profile-url-field'
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            label='Profile URL'
            variant='outlined'
            fullWidth
            required
          />
          <Typography variant='caption'>
            This is permanent! (www.grupgrup.com/profile/'profileURL')
          </Typography>
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <TextField
            id='password-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            required
          />
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <TextField
            id='confirm-password-field'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label='Confirm Password'
            type='password'
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <Button
            onClick={() => attemptUserCreate()}
            variant='outlined'
            fullWidth
          >
            Create Account
          </Button>
        </Grid>
        <Grid
          item
          container
          className={classes.flexCentered}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <Link to='/login' className={classes.link}>
            Have an account? Log In
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
