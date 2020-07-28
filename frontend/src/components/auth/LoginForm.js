import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const useStyles = makeStyles({
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

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
  const classes = useStyles();

  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Grid container className={classes.gridContainer} spacing={1}>
        <Grid item container alignItems='center' direction='column'>
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
            id='password-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
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
          <Button onClick={() => handleLogin()} variant='outlined' fullWidth>
            Log In
          </Button>
        </Grid>
        <Grid
          item
          container
          className={classes.gridContainer}
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <Link to='/signup' className={classes.link}>
            Create an Account
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
