import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, CircularProgress, TextField, Button } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState('');

  const handleLogin = async () => {
    const config = {
      'Content-Type': 'application/json'
    };
    const body = { username, email, password };
    console.log(body);
    try {
      if (password === confirmPassword) {
        setLoading(true);
        setError('');
        const response = await axios.post(
          'http://grupgrup-backend.herokuapp.com/api/auth/signup',
          body,
          config
        );

        if (response.data.token) {
          localStorage.setItem('jwt', response.data.token);
          setLoading(false);
        }
      } else {
        setError('Please check that your passwords match');
      }
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      {!isLoading ? (
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
            {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label='Username'
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
            <TextField
              id='email-field'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              type='email'
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
            <TextField
              id='password-field'
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
            alignItems='center'
            justify='center'
            xs={11}
            sm={6}
            lg={3}
            xl={2}
          >
            <Button onClick={() => handleLogin()} variant='outlined' fullWidth>
              Create Account
            </Button>
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
            <Link to='/login' style={styles.link}>
              Have an account? Log In
            </Link>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction='column'
          alignItems='center'
          justify='center'
          spacing={1}
        >
          <Grid item padding={0}>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </>
  );
};

const styles = {
  link: {
    color: 'black',
    textDecoration: 'none'
  }
};

export default Signup;
