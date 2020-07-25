import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Link, Redirect } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { userData, setUserData } = useContext(UserContext);

  const handleLogin = async () => {
    const config = {
      'Content-Type': 'application/json'
    };
    const newUser = {
      username,
      email,
      profile_url: profileUrl,
      password
    };
    try {
      if (password === confirmPassword) {
        setLoading(true);
        const response = await axios.post(
          'https://grupgrup-backend.herokuapp.com/api/auth/signup',
          newUser,
          config
        );

        enqueueSnackbar(`You've successfully signed up!`, {
          variant: 'success'
        });
        setUserData({
          token: response.data.token,
          user: response.data.user
        });
        localStorage.setItem('jwt', response.data.token);
      } else {
        enqueueSnackbar(`Please check that your passwords match!`, {
          variant: 'error'
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data, {
        variant: 'error'
      });
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      {/* {userData.user && <Redirect to={`/profile/${userData.user.url}`} />} */}
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

export default Signup;
