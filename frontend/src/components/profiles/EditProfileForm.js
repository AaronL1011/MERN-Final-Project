import React from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const EditProfileForm = ({
  userUrl,
  file,
  setProfilePic,
  handleImage,
  email,
  username,
  bio,
  onChange,
  onSubmit,
  onPasswordChange,
  handleChangePassword,
  handleDialogClick,
  open,
  current_password,
  new_password,
  confirm_password,
  deleteAccount
}) => {
  return (
    <Box mt={4} mb={10}>
      <Dialog open={open} onClose={handleDialogClick}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This is permanent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClick} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDialogClick();
              deleteAccount();
            }}
            color='primary'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container direction='column' alignItems='center' spacing={2}>
        <Grid item container alignItems='center' direction='column'>
          <Typography variant='h4'>Edit Profile</Typography>
          <Button
            component={Link}
            color='primary'
            to={`/profile/${userUrl}`}
            size={'small'}
          >
            Return to Profile
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
          <img alt='profile preview' src={file} style={styles.profilepic} />
        </Grid>
        <Grid item container direction='column' xs={11} sm={6} lg={3} xl={2}>
          <Typography variant='subtitle1'>Profile Picture:</Typography>
          &nbsp;
          <input
            type='file'
            name='profile-picture'
            id='picture-upload'
            onChange={(e) => {
              handleImage(e.target);
              setProfilePic(e.target.files[0]);
            }}
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
            value={username}
            onChange={onChange}
            name='username'
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
            value={email}
            onChange={onChange}
            id='email-field'
            name='email'
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
            value={bio}
            onChange={onChange}
            id='bio-field'
            name='bio'
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
          <Button
            onClick={onSubmit}
            variant='outlined'
            color='primary'
            fullWidth
          >
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
            value={new_password}
            onChange={onPasswordChange}
            id='new-password-field'
            name='new_password'
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
            value={confirm_password}
            onChange={onPasswordChange}
            id='confirm-password-field'
            name='confirm_password'
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
            value={current_password}
            onChange={onPasswordChange}
            id='current-password-field'
            name='current_password'
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
          <Button
            onClick={handleChangePassword}
            variant='outlined'
            color='primary'
            fullWidth
          >
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
            onClick={handleDialogClick}
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
  );
};

const styles = {
  profilepic: {
    height: '300px',
    width: '300px',
    borderRadius: '50%'
  }
};

export default EditProfileForm;
