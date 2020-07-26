import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { getAllPosts } from '../../utils/post';

import Searchbar from './Searchbar';
import ToggleDisplayView from './ToggleDisplayView';

const Mainpage = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const awaitForPosts = async () => {
      const response = await getAllPosts();

      setPosts(response);
    };

    awaitForPosts();
  }, []);

  return (
    <Container style={{ paddingTop: '30px' }}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        align='center'
        alignItems='stretch'
        spacing={3}
      >
        <Grid item>
          {/* Toggle only this component so a user's posts or the search results can be toggled */}
          <Searchbar />
        </Grid>
        <Grid item >{posts && <ToggleDisplayView posts={posts} />}</Grid>
        {/* <Grid item> */}
        {/* Display post component that accepts a list of posts and a toggled variable*/}
        {/* #TODO Display contentcards here */}
        {/* </Grid> */}
      </Grid>
    </Container>
  );
};

export default Mainpage;
