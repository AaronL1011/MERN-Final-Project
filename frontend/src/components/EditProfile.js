import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Alert from '@material-ui/lab/Alert';

const EditProfile = () => {
  return (
    <>
      <Box mt={4}>
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
            <Typography variant='subtitle1'>Profile Picture:</Typography>&nbsp;
            <input
              type='file'
              name='profile-picture'
              id='picture-upload'
              value=''
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
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default EditProfile;
