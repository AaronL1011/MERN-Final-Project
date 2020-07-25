import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import axios from 'axios';
import UserContext from '../../context/UserContext';

const EditProfile = () => {
  const placeholder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeholder);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userFormValues, setUserFormValues] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { username, email, bio } = userFormValues;

  useEffect(() => {
    async function getUserFormValues() {
      const userFormData = await axios.get(
        `http://grupgrup-backend.herokuapp.com/api/users/profile/${userData.user.url}`,
        {
          headers: {
            'auth-token': userData.token
          }
        }
      );
      setUserFormValues({
        username: userFormData.data.username,
        email: userFormData.data.email,
        bio: userFormData.data.bio
      });
      if (userFormData.data.profilePicture) {
        const userProfilePicture = userFormData.data.profilePicture;
        setFile(userProfilePicture);
      }
      setIsLoading(false);
    }
    if (userData.user) {
      getUserFormValues();
    }
  }, [userData.token, userData.user]);

  const handleImage = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  const onChange = (e) =>
    setUserFormValues({ ...userFormValues, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    setIsLoading(true);
    if (profilePic) {
      let profilePicFormData = new FormData();
      profilePicFormData.append('image', profilePic);
      const config = {
        'Content-Type': 'multipart/form-data',
        'auth-token': userData.token
      };
      await axios
        .post(
          'http://grupgrup-backend.herokuapp.com/profile-pic-upload',
          profilePicFormData,
          {
            headers: config
          }
        )
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }
    try {
      await axios
        .put(
          `http://grupgrup-backend.herokuapp.com/api/users/update`,
          userFormValues,
          {
            headers: {
              'auth-token': userData.token
            }
          }
        )
        .then(() => {
          enqueueSnackbar('Your details have been saved!', {
            variant: 'success'
          });
          history.push(`/profile/${userData.user.url}`);
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data, {
            variant: 'error'
          });
          console.log(error.response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setIsLoading(true);
      await axios
        .delete('http://grupgrup-backend.herokuapp.com/api/users/delete', {
          headers: { 'auth-token': userData.token }
        })
        .then(() => {
          enqueueSnackbar(
            `We're sad to see you go. Your account has been deleted.`,
            {
              variant: 'info'
            }
          );
          setUserData({
            token: undefined,
            user: undefined
          });
          localStorage.setItem('jwt', '');
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: 'error'
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {!userData.user && <Redirect to='/login' />}
      {isLoading ? (
        <Box style={styles.spinnerBox}>
          <CircularProgress />
        </Box>
      ) : (
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
                to={`/profile/${userData.user.url}`}
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
            <Grid
              item
              container
              direction='column'
              xs={11}
              sm={6}
              lg={3}
              xl={2}
            >
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
      )}
    </>
  );
};

const styles = {
  profilepic: {
    height: '300px',
    width: '300px',
    borderRadius: '50%'
  },
  spinnerBox: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default EditProfile;
