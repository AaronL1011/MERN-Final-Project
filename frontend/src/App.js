import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Mainpage from './components/Mainpage';
import EditProfile from './components/EditProfile';
import NewUpload from './components/NewUpload';
import NavigationBar from './components/NavigationBar';
import setAuthToken from './utils/setAuthToken';

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

const App = () => {
  return (
    <>
      <Router>
        <Route exact path='/' component={Mainpage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/editprofile' component={EditProfile} />
        <Route exact path='/upload' component={NewUpload} />
        <NavigationBar />
      </Router>
    </>
  );
};

export default App;
