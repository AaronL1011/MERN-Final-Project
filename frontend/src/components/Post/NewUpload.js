import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import axios from 'axios';

const NewUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);
  const placeHolder = require('../../img/placeholder.jpg');
  const [file, setFile] = useState(placeHolder);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('');
  const [files, setFiles] = useState(null);

  const getImage = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  const createNewPost = async () => {
    let postFormData = new FormData();
    postFormData.set('caption', caption);
    postFormData.set('tags', tags);
    postFormData.set('visibility', visibility);

    postFormData.append('images', files);

    const config = {
      'Content-Type': 'multipart/form-data',
      'auth-token': userData.token
    };
    axios
      .post(
        'http://grupgrup-backend.herokuapp.com/image-upload',
        postFormData,
        {
          headers: config
        }
      )
      .then(function (response) {
        enqueueSnackbar(`Post successfuly created!`, {
          variant: 'success'
        });
        console.log(response);
      })
      .catch(function (response) {
        enqueueSnackbar(`Something went wrong!`, {
          variant: 'error'
        });
        console.log(response.message);
      });
  };

  return (
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
            <TextField
              id='visibility-field'
              label='Visibility'
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              variant='outlined'
              fullWidth
            />
            <Typography variant='caption'>0, 1, 2 or 3</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => createNewPost()}
          variant='outlined'
          size='small'
          color='primary'
        >
          Post!
        </Button>
      </CardActions>
    </Card>
  );
};

const styles = {
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
};

export default NewUpload;
