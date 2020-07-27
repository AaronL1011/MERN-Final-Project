import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { handleCreateAccount } from '../../utils/auth';

import Spinner from '../layout/Spinner';
import SignupForm from './SignupForm';
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
  const history = useHistory();

  const attemptUserCreate = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      const response = await handleCreateAccount(
        username,
        email,
        profileUrl,
        password
      );
      if (response.user) {
        enqueueSnackbar(`You've successfully signed up!`, {
          variant: 'success'
        });
        setUserData({
          token: response.token,
          user: response.user
        });
        history.push(`/profile/${response.user.url}`);
      } else {
        console.log(response);
        enqueueSnackbar(response, {
          variant: 'error'
        });
        setLoading(false);
      }
    } else {
      enqueueSnackbar(`Please check that your passwords match!`, {
        variant: 'error'
      });
    }
  };

  return (
    <>
      {userData.user && <Redirect to={`/profile/${userData.user.url}`} />}
      {!isLoading ? (
        <SignupForm
          username={username}
          setUsername={setUsername}
          profileUrl={profileUrl}
          setProfileUrl={setProfileUrl}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          attemptUserCreate={attemptUserCreate}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Signup;
