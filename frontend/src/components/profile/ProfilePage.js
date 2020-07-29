import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import ToggleDisplayView from '../layout/ToggleDisplayView';
import { useSnackbar } from 'notistack';
import { useParams, Redirect } from 'react-router-dom';
import { getUserPosts } from '../../utils/post';
import { getUserProfile } from '../../utils/user';

const ProfilePage = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const profileURL = params.profileUrl;

    const getUserProfilePage = async () => {
      const response = await getUserProfile(profileURL, null);
      if (response.username) {
        setUserProfile(response);

        const userPostsResponse = await getUserPosts(response.id);
        setUserPosts(userPostsResponse);
        setIsLoading(false);
      } else {
        setUserPosts(null);
        enqueueSnackbar(response, {
          variant: 'error'
        });
        setIsLoading(false);
      }
    };

    if (profileURL) {
      getUserProfilePage();
    }
  }, [params.profileUrl, refresh, enqueueSnackbar]);

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
