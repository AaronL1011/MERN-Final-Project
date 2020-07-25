import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const ProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const profileURL = params.profileUrl;

    const getUserProfile = async () => {
      const userProfileInfo = await axios.get(
        `http://grupgrup-backend.herokuapp.com/api/users/profile/${profileURL}`
      );

      setUserProfile(userProfileInfo.data);
      setIsLoading(false);
    };
    if (profileURL) {
      getUserProfile();
    }
  }, [params.profileUrl]);

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
