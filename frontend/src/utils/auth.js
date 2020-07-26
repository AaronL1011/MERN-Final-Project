import axios from 'axios';

export const checkLoggedIn = async () => {
  let token = localStorage.getItem('jwt');
  if (token === null) {
    localStorage.setItem('jwt', '');
    token = '';
  }
  const tokenResponse = await axios.post(
    'https://grupgrup-backend.herokuapp.com/api/users/tokenIsValid',
    null,
    { headers: { 'auth-token': token } }
  );
  // console.log(tokenResponse.data);
  if (tokenResponse.data) {
    const userResponse = await axios.get(
      'https://grupgrup-backend.herokuapp.com/api/users/user',
      { headers: { 'auth-token': token } }
    );
    // console.log(userResponse.data);
    return {
      token,
      user: userResponse.data
    };
  }

  return null;
};

export const handleLogin = async (email, password) => {
  const config = {
    'Content-Type': 'application/json'
  };
  const body = { email, password };
  try {
    const response = await axios.post(
      'https://grupgrup-backend.herokuapp.com/api/auth/login',
      body,
      config
    );

    localStorage.setItem('jwt', response.data.token);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const handleCreateAccount = async (
  username,
  email,
  profileUrl,
  password
) => {
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
    const response = await axios.post(
      'https://grupgrup-backend.herokuapp.com/api/auth/signup',
      newUser,
      config
    );

    localStorage.setItem('jwt', response.data.token);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
