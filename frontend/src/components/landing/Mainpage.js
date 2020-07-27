import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@material-ui/core';
import { getAllPosts } from '../../utils/post';
import UserContext from '../../context/UserContext';
import Searchbar from './Searchbar';
import ToggleDisplayView from '../layout/ToggleDisplayView';

const Mainpage = () => {
  const [posts, setPosts] = useState(null);
  const { refresh } = useContext(UserContext);

  useEffect(() => {
    const awaitForPosts = async () => {
      const response = await getAllPosts();

      setPosts(response.reverse());
    };

    awaitForPosts();
  }, [refresh]);

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
        <Grid item>
          {posts && <ToggleDisplayView posts={posts} defaultView={'single'} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mainpage;
