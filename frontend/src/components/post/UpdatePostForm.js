import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updatePost } from '../../utils/post';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    maxWidth: '345px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px'
  },
  content: {
    padding: '0',
    margin: '0'
  }
});

const UpdatePostForm = ({
  toggleModal,
  postId,
  current_caption,
  current_tags,
  current_visibility
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userData, refresh, setRefresh } = useContext(UserContext);
  const [caption, setCaption] = useState(current_caption);
  const [tags, setTags] = useState(current_tags.join(', '));
  const [visibility, setVisibility] = useState(current_visibility);
  const [isLoading, setIsLoading] = useState(false);

  const attemptUpdatePost = async () => {
    if (userData.user) {
      setIsLoading(true);

      const newTags = tags
        ? tags.toLowerCase().replace(/\s+/g, '').split(',')
        : [];

      const data = {
        caption,
        tags: newTags,
        visibility
      };

      const response = await updatePost(postId, userData.token, data);

      if (response._id) {
        enqueueSnackbar(`Post successfuly updated!`, {
          variant: 'success'
        });
        setRefresh(!refresh);
        toggleModal();
      } else {
        enqueueSnackbar('Something went wrong, but im not quite sure what!', {
          variant: 'error'
        });
        setIsLoading(false);
      }
    } else {
      enqueueSnackbar(`How did you even manage this?`, {
        variant: 'error'
      });
    }
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title='Edit Post'></CardHeader>
        <CardContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item container>
              <TextField
                id='caption-field'
                label='Caption'
                variant='outlined'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item container>
              <TextField
                id='tags-field'
                label='Tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                variant='outlined'
                fullWidth
              />
              <Typography variant='caption'>Comma seperated tags</Typography>
            </Grid>
            <Grid item container>
              <Typography variant='body2'>Who can see your post?</Typography>
              <Select
                fullWidth
                variant='outlined'
                id='visibility-field'
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <MenuItem value='0'>Anyone</MenuItem>
                <MenuItem value='1'>Logged In Users</MenuItem>
                <MenuItem value='2'>Just Me</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                onClick={attemptUpdatePost}
                variant='outlined'
                size='small'
                color='primary'
              >
                Update
              </Button>
              <Button
                onClick={toggleModal}
                variant='outlined'
                size='small'
                color='secondary'
              >
                Cancel
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default UpdatePostForm;
