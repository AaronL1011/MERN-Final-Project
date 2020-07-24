import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Mainpage from './components/Landing/Mainpage';
import EditProfile from './components/Profile/EditProfile';
import ProfilePage from './components/Profile/ProfilePage';
import NewUpload from './components/Post/NewUpload';
import NavigationBar from './components/Navigation/NavigationBar';
import UserContext from './context/UserContext';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
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

      if (tokenResponse.data) {
        const userResponse = await axios.get(
          'http://grupgrup-backend.herokuapp.com/api/users/user',
          { headers: { 'auth-token': token } }
        );
        setUserData({
          token,
          user: userResponse.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path='/' component={Mainpage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/editprofile' component={EditProfile} />
            <Route exact path='/upload' component={NewUpload} />
            <Route exact path='/profile' component={ProfilePage} />
          </Switch>

          <NavigationBar />
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
