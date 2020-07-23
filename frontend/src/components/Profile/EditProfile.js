import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const EditProfile = () => {
  const placeholder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeholder);
  const [user, setUser] = useState({});
  const { userData, setUserData } = useContext(UserContext);

  const handleImage = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  const deleteAccount = async () => {
    try {
      const deletedUser = await axios.delete(
        'http://grupgrup-backend.herokuapp.com/api/users/delete',
        {
          headers: { 'auth-token': userData.token }
        }
      );

      console.log(`${deletedUser.data.username} deleted.`);
      setUserData({
        token: undefined,
        user: undefined
      });
      localStorage.setItem('jwt', '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!userData.user && <Redirect to='/' />}
      <Box mt={4} mb={10}>
        <Grid container direction='column' alignItems='center' spacing={2}>
          <Grid item container alignItems='center' direction='column'>
            <Typography variant='h4'>Edit Profile</Typography>
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
            <img alt='profile picture' src={file} style={styles.profilepic} />
          </Grid>
          <Grid item container direction='column' xs={11} sm={6} lg={3} xl={2}>
            <Typography variant='subtitle1'>Profile Picture:</Typography>&nbsp;
            <input
              type='file'
              name='profile-picture'
              id='picture-upload'
              onChange={(e) => handleImage(e.target)}
            />
          </Grid>
          <br />
          <br />
          <br />
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
              label='Email'
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
              id='bio-field'
              label='Bio'
              variant='outlined'
              fullWidth
              multiline
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
            <Button variant='outlined' color='primary' fullWidth>
              Save Changes
            </Button>
          </Grid>
          <br />
          <br />
          <br />
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
              id='new-password-field'
              label='New Password'
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
              id='conf-new-password-field'
              label='Confirm New Password'
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
              id='og-password-field'
              label='Current Password'
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
            <Button variant='outlined' color='primary' fullWidth>
              Change Password
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
            <Button
              onClick={() => deleteAccount()}
              variant='outlined'
              color='secondary'
              fullWidth
            >
              Delete Account
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
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

const styles = {
  profilepic: {
    height: '300px',
    borderRadius: '50%'
  }
};

export default EditProfile;
