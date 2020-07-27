import React, { useState, useContext } from 'react';
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
import { createNewPost } from '../../utils/post';

const NewUpload = ({ toggleModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);
  const placeHolder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeHolder);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('1');
  const [files, setFiles] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const isDisabled = userData.user ? false : true

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
    setIsPosting(true);
    let postFormData = new FormData();
    if (caption !== '') postFormData.set('caption', caption);
    if (tags !== '') postFormData.set('tags', tags);
    postFormData.set('displayName', userData.user.username);
    postFormData.set('authorID', userData.user.id);
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
      console.log(response);
      toggleModal();
    } else {
      enqueueSnackbar(response, {
        variant: 'error'
      });
      setIsPosting(false);
    }
  };

  return (
    <Box style={styles.container}>
      <Card style={styles.root}>
        <CardHeader title='New Image Upload'></CardHeader>
        <CardMedia
          id='previewImage'
          image={file}
          component='img'
          title='salad woman'
          style={{
            height: '300px',
            paddingBottom: '10px'
          }}
        />
        <CardContent style={styles.content}>
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
          {isPosting ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                onClick={() => attemptCreatePost()}
                variant='outlined'
                size='small'
                color='primary'
              >
                Post!
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

const styles = {
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
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)'
  },
  content: {
    padding: '0',
    margin: '0'
  },
  media: {
    height: '200px',
    paddingTop: '56.25%' // 16:9
  }
};

export default NewUpload;
