import React, { useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// TODO Rev: Profilepage.js move to be helper functions for mainpage 
// If we are to use the Mainpage.js to be the main display of the app,
// rendering a profile page may be redundant
// Proposal: 
// * When viewing a profile, use the header section in Mainpage.js
//   to render the profile card and then the content (posts) container to
//   render that user's posts.
// * The functionality of the below then becomes a module'profile.js' which
//   contains all the logic that can be imported for use in Mainpage.js 

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
