import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import EditPostModal from './EditPostModal';
import TagChips from './TagChips';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { handleNameClick } from './utils/profileUtils';
import { deletePost } from '../../utils/post';

// Styling
const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    maxWidth: 1000,
    maxHeight: '90vh'
  },
  caption: {
    maxheight: '30vh',
    minHeight: '3rem',
    zIndex: '20',
    bottomMargin: 0
  },
  imageBox: {
    height: '50vh',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: '100%'
  },
  buttonBox: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonMargin: {
    margin: '0 5px 0 5px'
  }
});

// Helper method
const arrayToChipData = (array) => {
  let output = [];
  array.forEach(function (tagString) {
    output.push({ key: array.indexOf(tagString), label: tagString });
  });
  return output;
};

const ModalPostCard = ({
  postContent,
  handleModalChange,
  searchValue,
  setSearchValue,
  tagSearchEnabled
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userData, refresh, setRefresh } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const classes = useStyles();
  let history = useHistory();

  const handleDialogClick = (e) => {
    if (e) e.stopPropagation();
    setOpen(!open);
  };

  const handleEditModalState = (e) => {
    if (e) e.stopPropagation();
    setEditModalOpen(!editModalOpen);
  };

  const onDelete = async () => {
    const response = await deletePost(postContent._id, userData.token);
    if (response.status === 200) {
      enqueueSnackbar(response.data, {
        variant: 'success'
      });
      setRefresh(!refresh);
    } else {
      enqueueSnackbar('Hmmm... Something went wrong!', {
        variant: 'error'
      });
    }
  };

  return (
    <Box className={classes.container} onClick={handleModalChange}>
      <Dialog open={open} onClose={handleDialogClick}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This is permanent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClick} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDialogClick();
              onDelete();
            }}
            color='primary'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root} onClick={(e) => e.preventDefault()}>
        <CardActionArea onClick={(e) => e.preventDefault()}>
          <Box className={classes.imageBox}>
            <img
              src={postContent.images[0]}
              className={classes.image}
              alt={postContent.caption}
            />
          </Box>
        </CardActionArea>
        <CardContent className={classes.caption}>
          {postContent.tags && (
            <TagChips
              tagsArray={arrayToChipData(postContent.tags)}
              tagSearchEnabled={tagSearchEnabled}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          )}
          <Typography
            onClick={(event) => {
              handleNameClick(event, history, postContent.authorURL);
            }}
          >
            {postContent.displayName}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {postContent.caption}
          </Typography>
          {userData.user && userData.user.id === postContent.authorID && (
            <Box className={classes.buttonBox}>
              <Button
                variant='outlined'
                color='secondary'
                className={classes.buttonMargin}
                onClick={(e) => handleDialogClick(e)}
              >
                Delete
              </Button>
              <Button
                variant='outlined'
                color='primary'
                className={classes.buttonMargin}
                onClick={(e) => handleEditModalState(e)}
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <EditPostModal
        onClick={(e) => e.stopPropagation()}
        modalState={editModalOpen}
        handleModalChange={handleEditModalState}
        currentDetails={{
          id: postContent._id,
          tags: postContent.tags,
          caption: postContent.caption,
          visibility: postContent.visibility
        }}
      />
    </Box>
  );
};

export default ModalPostCard;
