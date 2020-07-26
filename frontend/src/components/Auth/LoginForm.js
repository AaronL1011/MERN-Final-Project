import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <Box height='100%' display='flex' alignItems='center'>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        spacing={1}
      >
        <Grid item container alignItems='center' direction='column'>
          <h1>
            GrupGrup <CameraAltIcon fontSize={'large'} />
          </h1>
        </Grid>
        <Grid
          item
          container
          alignItems='center'
          justify='center'
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
          alignItems='center'
          justify='center'
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
          alignItems='center'
          justify='center'
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
          alignItems='center'
          justify='center'
          direction='column'
          xs={11}
          sm={6}
          lg={3}
          xl={2}
        >
          <Link to='/signup' style={styles.link}>
            Create an Account
          </Link>
          <br />
          <Link to='/' style={styles.link}>
            Return Home
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  link: {
    color: '#696969',
    textDecoration: 'none'
  }
};
export default LoginForm;
