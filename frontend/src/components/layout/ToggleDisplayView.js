import React, { useState, useContext } from 'react';
import { Box, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostCardLarge from '../post/PostCardLarge';
import PostCardSmall from '../post/PostCardSmall';
import PostModal from '../post/PostModal';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import UserContext from '../../context/UserContext';

const useStyles = makeStyles({
  mainContainer: {
    marginBottom: 100
  },
  toggleButtonBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  largeCardGrid: {
    justifyContent: 'center'
  },
  smallCardBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'space-between',
    flexWrap: 'wrap'
  }
});

const ToggleDisplayView = ({
  posts,
  defaultView,
  searchValue,
  setSearchValue,
  tagSearchEnabled
}) => {
  const classes = useStyles();
  const [displayView, setDisplayView] = useState(defaultView);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { userData } = useContext(UserContext);

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };

  const handleModal = (post) => {
    setModalContent(post);
    setModalState(!modalState);
  };

  const largeCard = (post, index) => {
    return (
      <Grid key={index} item style={{ width: '100%' }}>
        <PostCardLarge
          postContent={post}
          openModal={() => handleModal(post)}
          closeModal={() => setModalState(!modalState)}
          userData={userData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          tagSearchEnabled={tagSearchEnabled}
        />
      </Grid>
    );
  };

  const smallCard = (post, index) => {
    return (
      <PostCardSmall
        postContent={post}
        openModal={() => handleModal(post)}
        key={index}
      />
    );
  };

  return (
    <Container className={classes.mainContainer}>
      <Box className={classes.toggleButtonBox}>
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
      {modalContent !== null && (
        <PostModal
          modalState={modalState}
          handleModalChange={handleModal}
          modalContent={modalContent}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          tagSearchEnabled={tagSearchEnabled}
        />
      )}
      <Grid item container className={classes.largeCardGrid} spacing={2}>
        {displayView === 'single' ? (
          posts.map((post, index) => {
            if (post.visibility === '0') {
              return largeCard(post, index);
            } else if (post.visibility === '1' && userData.user) {
              return largeCard(post, index);
            } else if (
              userData.user &&
              post.visibility === '2' &&
              post.authorID === userData.user.id
            ) {
              return largeCard(post, index);
            } else {
              return null;
            }
          })
        ) : (
          <Box className={classes.smallCardBox}>
            {posts.map((post, index) => {
              if (post.visibility === '0') {
                return smallCard(post, index);
              } else if (post.visibility === '1' && userData.user) {
                return smallCard(post, index);
              } else if (
                userData.user &&
                post.visibility === '2' &&
                post.authorID === userData.user.id
              ) {
                return smallCard(post, index);
              } else {
                return null;
              }
            })}
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default ToggleDisplayView;
