import React, { useState } from 'react';
import { Grid, CircularProgress, TextField, Button } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState('');

  const handleLogin = async () => {
    const config = {
      'Content-Type': 'application/json'
    };
    const body = { email, password };
    console.log(body);
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        'http://grupgrup-backend.herokuapp.com/api/auth/login',
        body,
        config
      );

      if (response.data.token) {
        localStorage.setItem('jwt', response.data.token);
        // console.log(response.data.token);
        setLoading(false);
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
            <Button onClick={() => handleLogin()} variant='outlined' fullWidth>
              Log In
            </Button>
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

export default Login;
