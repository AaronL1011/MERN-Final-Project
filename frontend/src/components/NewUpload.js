import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@material-ui/core';

const NewUpload = () => {
  return (
    <Card style={styles.root}>
      <CardHeader title='New Image Upload'></CardHeader>
      <CardMedia
        image={require('../img/saladwoman.jpg')}
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
              value=''
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
