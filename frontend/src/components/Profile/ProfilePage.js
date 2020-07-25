import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const ProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading ? <Spinner /> : <ProfileCard userProfile={userProfile} />}
    </div>
  );
};

export default ProfilePage;
