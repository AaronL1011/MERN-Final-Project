import axios from 'axios';

export const checkLoggedIn = async () => {
  let token = localStorage.getItem('jwt');
  if (token === null) {
    localStorage.setItem('jwt', '');
    token = '';
  }
  const tokenResponse = await axios.post(
    'http://grupgrup-backend.herokuapp.com/api/users/tokenIsValid',
    null,
    { headers: { 'auth-token': token } }
  );
  // console.log(tokenResponse.data);
  if (tokenResponse.data) {
    const userResponse = await axios.get(
      'http://grupgrup-backend.herokuapp.com/api/users/user',
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
