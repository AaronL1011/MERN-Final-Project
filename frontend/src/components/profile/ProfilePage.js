import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import ToggleDisplayView from '../layout/ToggleDisplayView';
import axios from 'axios';
import { useParams, Redirect } from 'react-router-dom';
import { getUserPosts } from '../../utils/post';

const ProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useContext(UserContext);

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
  }, [params.profileUrl, refresh]);

  return (
    <div>
      {!localStorage.getItem('jwt') && <Redirect to='/login' />}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfileCard userProfile={userProfile} />

          {userPosts && (
            <ToggleDisplayView
              posts={userPosts}
              defaultView={'multiple'}
              tagSearchEnabled={false}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
