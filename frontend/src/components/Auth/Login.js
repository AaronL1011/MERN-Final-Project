import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import Spinner from '../layout/Spinner';
import LoginForm from './LoginForm';
import { handleLogin } from '../../utils/auth';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);

  const attemptLogin = async () => {
    setLoading(true);
    const response = await handleLogin(email, password);
    if (response.user) {
      enqueueSnackbar(`You're logged in!`, {
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
          handleLogin={attemptLogin}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Login;
