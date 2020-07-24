import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState('');
  const { userData, setUserData } = useContext(UserContext);

  const handleLogin = async () => {
    const config = {
      'Content-Type': 'application/json'
    };
    const body = { email, password };
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        'https://grupgrup-backend.herokuapp.com/api/auth/login',
        body,
        config
      );

      enqueueSnackbar(`You're logged in!`, {
        variant: 'success'
      });
      setUserData({
        token: response.data.token,
        user: response.data.user
      });
      localStorage.setItem('jwt', response.data.token);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      {userData.user && <Redirect to={`/profile/${userData.user.id}`} />}
      {!isLoading ? (
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
              <Button
                onClick={() => handleLogin()}
                variant='outlined'
                fullWidth
              >
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
      ) : (
        <Box height='100%' display='flex' alignItems='center'>
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
        </Box>
      )}
    </>
  );
};

const styles = {
  link: {
    color: '#696969',
    textDecoration: 'none'
  }
};

export default Login;
