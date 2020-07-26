import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page

    userData.user ? <Component {...rest} /> : <Redirect to='/login' />
  );
};

export default PrivateRoute;
