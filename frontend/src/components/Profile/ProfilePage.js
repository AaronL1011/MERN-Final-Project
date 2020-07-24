import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userID = params.userId;

    const getUserProfile = async () => {
      const userProfileInfo = await axios.get(
        `http://grupgrup-backend.herokuapp.com/api/users/${userID}/profile`
      );

      setUserProfile(userProfileInfo.data);
      setIsLoading(false);
    };
    if (userID) {
      getUserProfile();
    }
  }, [params.userId]);

  return (
    <div>
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
