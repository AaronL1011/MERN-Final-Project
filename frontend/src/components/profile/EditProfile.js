import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../layout/Spinner';
import EditProfileForm from './EditProfileForm';
import {
  getUserProfile,
  submitProfileUpdate,
  handleChangePassword,
  deleteAccount
} from '../../utils/user';
import UserContext from '../../context/UserContext';

const EditProfile = () => {
  const placeholder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeholder);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userFormValues, setUserFormValues] = useState({});
  const [passwordFormValues, setPasswordFormValues] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { username, email, bio } = userFormValues;
  const {
    new_password,
    confirm_password,
    current_password
  } = passwordFormValues;

  useEffect(() => {
    async function getUserFormValues() {
      const response = await getUserProfile(userData.user.url, userData.token);
      if (response.username) {
        setUserFormValues({
          username: response.username,
          email: response.email,
          bio: response.bio
        });
        if (response.profilePicture) {
          setFile(response.profilePicture);
        }
        setIsLoading(false);
      }
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

  const handleDialogClick = () => {
    setOpen(!open);
  };

  const onPasswordChange = (e) =>
    setPasswordFormValues({
      ...passwordFormValues,
      [e.target.name]: e.target.value
    });

  const onSubmit = async () => {
    if (!username || !email) {
      enqueueSnackbar('Please check you have a Username and Email!', {
        variant: 'info'
      });
    } else {
      setIsLoading(true);
      const config = {
        'Content-Type': 'multipart/form-data',
        'auth-token': userData.token
      };
      const response = await submitProfileUpdate(
        userData.token,
        config,
        profilePic,
        userFormValues
      );
      if (response.username) {
        enqueueSnackbar('Your details have been saved!', {
          variant: 'success'
        });
        history.push(`/profile/${userData.user.url}`);
      } else {
        enqueueSnackbar(response, {
          variant: 'error'
        });
        setIsLoading(false);
      }
    }
  };

  const onChangePassword = async () => {
    setIsLoading(true);
    if (new_password && current_password && new_password === confirm_password) {
      const bodyData = {
        current_password,
        new_password
      };

      const response = await handleChangePassword(bodyData, userData.token);
      console.log(response);
      if (response.username) {
        enqueueSnackbar('Your new password has been saved!', {
          variant: 'success'
        });
        setPasswordFormValues({});
        setIsLoading(false);
      } else {
        enqueueSnackbar(response, {
          variant: 'error'
        });
        setIsLoading(false);
      }
    } else {
      enqueueSnackbar(`Please check your passwords and try again!`, {
        variant: 'error'
      });
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    const response = await deleteAccount(userData.token);

    if (response.username) {
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
    } else {
      enqueueSnackbar(response, {
        variant: 'error'
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {!localStorage.getItem('jwt') && <Redirect to='/login' />}
      {isLoading ? (
        <Spinner />
      ) : (
        <EditProfileForm
          userUrl={userData.user.url}
          file={file}
          setProfilePic={setProfilePic}
          handleImage={handleImage}
          email={email}
          username={username}
          bio={bio}
          onChange={onChange}
          onSubmit={onSubmit}
          onPasswordChange={onPasswordChange}
          handleChangePassword={onChangePassword}
          handleDialogClick={handleDialogClick}
          open={open}
          current_password={current_password}
          new_password={new_password}
          confirm_password={confirm_password}
          deleteAccount={onDelete}
        />
      )}
    </>
  );
};

export default EditProfile;
