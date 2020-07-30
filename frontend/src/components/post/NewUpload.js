import React, { useState, useContext, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
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
import { createNewPost } from '../../utils/post';

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
  },
  media: {
    height: '200px',
    paddingTop: '56.25%' // 16:9
  }
});

const NewUpload = ({ toggleModal }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { userData, refresh, setRefresh } = useContext(UserContext);
  const placeHolder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeHolder);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('1');
  const [files, setFiles] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const isDisabled = localStorage.getItem('jwt') ? false : true;

  useEffect(() => {
    if (isDisabled) {
      enqueueSnackbar(`You need to log in to create a post!`, {
        variant: 'error'
      });
    }
  }, [isDisabled, enqueueSnackbar]);

  const getImage = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  const attemptCreatePost = async () => {
    if (userData.user) {
      if (
        files !== null &&
        (files.type === 'image/jpeg' || files.type === 'image/png')
      ) {
        setIsPosting(true);
        let postFormData = new FormData();
        if (caption !== '') postFormData.set('caption', caption);
        if (tags !== '') postFormData.set('tags', tags);
        postFormData.set('displayName', userData.user.username);
        postFormData.set('authorID', userData.user.id);
        postFormData.set('authorURL', userData.user.url);
        postFormData.set('visibility', visibility);
        postFormData.append('images', files);

        const config = {
          'Content-Type': 'multipart/form-data',
          'auth-token': userData.token
        };

        const response = await createNewPost(postFormData, config);

        if (response.images) {
          enqueueSnackbar(`Post successfuly created!`, {
            variant: 'success'
          });
          setRefresh(!refresh);
          toggleModal();
        } else {
          enqueueSnackbar(response, {
            variant: 'error'
          });
          setIsPosting(false);
        }
      } else {
        enqueueSnackbar(`Please choose either a JPEG or PNG!`, {
          variant: 'info'
        });
      }
    } else {
      enqueueSnackbar(`You need to log in to create a post!`, {
        variant: 'error'
      });
    }
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title='New Image Upload'></CardHeader>
        <CardMedia
          id='previewImage'
          image={file}
          component='img'
          title='Upload Preview'
          style={{
            height: '300px',
            paddingBottom: '10px'
          }}
        />
        <CardContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item container>
              <input
                type='file'
                name='profile-picture'
                id='picture-upload'
                onChange={(e) => {
                  getImage(e.target);
                  setFiles(e.target.files[0]);
                }}
                disabled={isDisabled}
              />
            </Grid>
            <Grid item container>
              <TextField
                id='caption-field'
                label='Caption'
                variant='outlined'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                fullWidth
                multiline
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
              >
                <MenuItem value='0'>Anyone</MenuItem>
                <MenuItem value='1'>Logged In Users</MenuItem>
                <MenuItem value='2'>Just Me</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {isPosting ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                id='create-post-button'
                onClick={() => attemptCreatePost()}
                variant='outlined'
                size='small'
                color='primary'
              >
                Post!
              </Button>
              <Button
                id='cancel-post-button'
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

export default NewUpload;
