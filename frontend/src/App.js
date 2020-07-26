import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Mainpage from './components/landing/Mainpage';
import EditProfile from './components/profile/EditProfile';
import ProfilePage from './components/profile/ProfilePage';
import NavigationBar from './components/layout/NavigationBar';
import UserContext from './context/UserContext';
import UploadModal from './components/post/UploadModal';
import { checkLoggedIn } from './utils/auth';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userLoggedIn = async () => {
      const user = await checkLoggedIn();
      if (user) {
        setUserData(user);
      }
    };

    userLoggedIn();
  }, []);

  const handleModalState = () => setModalOpen(!modalOpen);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path='/' component={Mainpage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/editprofile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/profile/:profileUrl'
              component={ProfilePage}
            />
          </Switch>
          <UploadModal
            modalState={modalOpen}
            handleModalChange={handleModalState}
          />
          <NavigationBar modalToggle={handleModalState} />
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
