import React, { useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import ToggleDisplayView from '../layout/ToggleDisplayView';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
import { getUserPosts } from '../../utils/post';

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
  const [userPosts, setUserPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profileURL = params.profileUrl;

    const getUserProfile = async () => {
      const userProfileInfo = await axios.get(
        `https://grupgrup-backend.herokuapp.com/api/users/profile/${profileURL}`
      );

      setUserProfile(userProfileInfo.data);

      const userPostsResponse = await getUserPosts(userProfileInfo.data.id);
      setUserPosts(userPostsResponse);
      setIsLoading(false);
    };

    if (profileURL) {
      getUserProfile();
    }
  }, [params.profileUrl]);

  return (
    <div>
      {!localStorage.getItem('jwt') && <Redirect to='/login' />}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfileCard userProfile={userProfile} />

          {userPosts && (
            <ToggleDisplayView posts={userPosts} defaultView={'multiple'} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
