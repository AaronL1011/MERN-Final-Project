import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Mainpage from './components/landing/Mainpage';
import About from './components/layout/About';
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
  const [refresh, setRefresh] = useState(false);

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
        <UserContext.Provider
          value={{ userData, setUserData, refresh, setRefresh }}
        >
          <Switch>
            <Route exact path='/' component={Mainpage} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/editprofile' component={EditProfile} />
            <Route exact path='/profile/:profileUrl' component={ProfilePage} />
          </Switch>
          <UploadModal
            modalState={modalOpen}
            handleModalChange={handleModalState}
          />
          <NavigationBar modalToggle={handleModalState} modalOpen={modalOpen} />
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
