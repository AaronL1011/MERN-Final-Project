import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const ProfilePage = () => {
  useEffect(() => {
    if (userData.user) {
      const getUserProfile = async () => {
        const userProfileInfo = await axios.get(
          `http://grupgrup-backend.herokuapp.com/api/users/${userData.user.id}/profile`
        );

        setUserProfile(userProfileInfo.data);
        setIsLoading(false);
      };

      getUserProfile();
    }
  }, []);

  const { userData } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {!userData.user && <Redirect to='/login' />}
      {isLoading ? (
        <Box style={styles.spinnerBox}>
          <CircularProgress />
        </Box>
      ) : (
        <ProfileCard userProfile={userProfile} />
      )}
    </div>
  );
};

const styles = {
  spinnerBox: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default ProfilePage;
