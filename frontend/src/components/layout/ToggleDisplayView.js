import React, { useState, useContext } from 'react';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import PostCardLarge from '../post/PostCardLarge';
import PostCardSmall from '../post/PostCardSmall';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import UserContext from '../../context/UserContext';

const ToggleDisplayView = ({ posts, defaultView }) => {
  // TODO Raise state and function of toggle
  // The state and helper function needs to be raised to a higher level (Mainpage.js) so the toggle state can be passed to other components
  const [displayView, setDisplayView] = useState(defaultView);
  const { userData } = useContext(UserContext);

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };
  return (
    <Container style={{ marginBottom: 100 }}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <ToggleButtonGroup
          value={displayView}
          exclusive
          onChange={handleDisplayView}
          aria-label='display alignment'
        >
          <ToggleButton
            value='single'
            aria-label='display results in single column'
          >
            <ViewDayIcon />
          </ToggleButton>
          <ToggleButton
            value='multiple'
            aria-label='display results in multiple columns'
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid item container justify='center' spacing={2} fullWidth>
        {displayView === 'single' ? (
          posts.map((post) => {
            if (post.visibility === '0') {
              return (
                <Grid item style={{ width: '100%' }}>
                  <PostCardLarge postContent={post} />
                </Grid>
              );
            } else if (post.visibility === '1' && userData.user) {
              return (
                <Grid item style={{ width: '100%' }}>
                  <PostCardLarge postContent={post} />
                </Grid>
              );
            } else if (
              post.visibility === '2' &&
              post.authorID === userData.user
            ) {
              return (
                <Grid item style={{ width: '100%' }}>
                  <PostCardLarge postContent={post} />
                </Grid>
              );
            }
          })
        ) : (
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            {posts.map((post) => {
              if (post.visibility === '0') {
                return <PostCardSmall postContent={post} />;
              } else if (post.visibility === '1' && userData.user) {
                return <PostCardSmall postContent={post} />;
              } else if (
                post.visibility === '2' &&
                post.authorID === userData.user
              ) {
                return <PostCardSmall postContent={post} />;
              }
            })}
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default ToggleDisplayView;
