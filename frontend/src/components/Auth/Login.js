import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Spinner from '../layout/Spinner';
import LoginForm from './LoginForm';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const handleLogin = async () => {
    const config = {
      'Content-Type': 'application/json'
    };
    const body = { email, password };
    try {
      setLoading(true);
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
      history.push(`/profile/${response.data.user.url}`);
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error, {
      //   variant: 'error'
      // });
      setLoading(false);
    }
  };

  return (
    <>
      {/* {userData.user && <Redirect to={`/profile/${userData.user.url}`} />} */}
      {!isLoading ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Login;
