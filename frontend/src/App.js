import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Signup from './components/Signup';
import EditProfile from './components/EditProfile';
import { userContext } from './AppContext';
import setAuthToken from './utils/setAuthToken';

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

const App = () => {
  return (
    <Router>
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/editprofile' component={EditProfile} />
    </Router>
  );
};

export default App;
