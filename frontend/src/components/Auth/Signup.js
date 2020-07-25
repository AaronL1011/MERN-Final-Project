import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../layout/Spinner';
import SignupForm from './SignupForm';
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
  const history = useHistory();

  const handleCreateAccount = async () => {
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
        history.push(`/profile/${response.data.user.url}`);
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
          handleCreateAccount={handleCreateAccount}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Signup;
