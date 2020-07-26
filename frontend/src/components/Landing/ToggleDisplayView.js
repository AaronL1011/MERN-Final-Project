import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import PostCardLarge from '../post/PostCardLarge';
import PostCardSmall from '../post/PostCardSmall';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const ToggleDisplayView = ({ posts }) => {
  // TODO Raise state and function of toggle
  // The state and helper function needs to be raised to a higher level (Mainpage.js) so the toggle state can be passed to other components
  const [displayView, setDisplayView] = useState('single');

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };
  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <Grid item>
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
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={9}
        md={9}
        lg={11}
        xl={12}
        justify='center'
        spacing={2}
      >
        {displayView === 'single' ? (
          posts.map((post) => (
            <Grid item style={{width: '100%'}}>
              <PostCardLarge postContent={post} />
            </Grid>
          ))
        ) : (
          // <PostCardLarge postContent={posts[0]} />
          <Box fullWidth>
            <Grid>

            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ToggleDisplayView;
