import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { getAllPosts } from '../../utils/post';
import UserContext from '../../context/UserContext';
import Searchbar from './Searchbar';
import ToggleDisplayView from '../layout/ToggleDisplayView';

const useStyles = makeStyles({
  containerStyle: {
    paddingTop: '30px'
  },
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  flexCentered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#696969',
    textDecoration: 'none'
  }
});

const Mainpage = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState(null);
  const [postsOriginalState, setPostsOriginalState] = useState(null);
  const { refresh } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const awaitForPosts = async () => {
      const response = await getAllPosts();

      setPosts(response);
      setPostsOriginalState(response);
    };

    awaitForPosts();
  }, [refresh]);

  useEffect(() => {
    if (searchValue) {
      let filteredPosts = [];
      let searchQuery = searchValue.toLowerCase().split(' ');
      for (let query of searchQuery) {
        postsOriginalState.map((post) => {
          if (post.tags.includes(query) && !filteredPosts.includes(post)) {
            return filteredPosts.push(post);
          }
          return null;
        });
      }
      setPosts(filteredPosts);
    } else {
      if (posts !== postsOriginalState) {
        setPosts(postsOriginalState);
      }
    }
  }, [searchValue]); // Run search logic when searchValue changes

  return (
    <Container className={classes.containerStyle}>
      <Grid container className={classes.gridContainer}>
        <Grid item>
          {/* Toggle only this component so a user's posts or the search results can be toggled */}
          <Searchbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Grid>
        <Grid item>
          {posts && (
            <ToggleDisplayView
              posts={posts}
              defaultView={'single'}
              tagSearchEnabled={true}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mainpage;
