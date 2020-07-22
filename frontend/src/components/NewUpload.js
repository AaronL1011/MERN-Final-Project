import React, { useState } from 'react';
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

const NewUpload = () => {
  const placeHolder = require('../img/placeholder.jpg');
  const [file, setFile] = useState(placeHolder);

  const getImage = (input) => {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
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
              multiple
              onChange={(e) => getImage(e.target)}
            />
          </Grid>
          <Grid item container>
            <TextField
              id='caption-field'
              label='Caption'
              variant='outlined'
              fullWidth
              multiline
            />
          </Grid>
          <Grid item container>
            <TextField
              id='tags-field'
              label='Tags'
              variant='outlined'
              fullWidth
            />
            <Typography variant='caption'>Comma seperated tags</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant='outlined' size='small' color='primary'>
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
