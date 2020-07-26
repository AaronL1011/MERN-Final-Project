import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import TagChips from './TagChips';

// Test build data
// const postContent = {
//   tags: ['cat', 'balls', 'joe'],
//   username: 'Joe Dane',
//   images: [
//     'https://grupgrup-images.s3.ap-southeast-2.amazonaws.com/80b2487b-a0e3-426c-814f-02650d06f5d9'
//   ],
//   _id: '5f1979c3242a680017c04cee',
//   caption: "This is a photo of my cat, Joe. He's... eccentric.",
//   visibility: '3',
//   date: '2020-07-23T11:51:31.362Z',
//   __v: 0
// };

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

const ModalPostCard = ({ postContent, handleModalChange }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} onClick={handleModalChange}>
      <Card className={classes.root} onclick={(e) => e.preventDefault()}>
        <CardActionArea onclick={(e) => e.preventDefault()}>
          <Box
            style={{
              height: '50vh',
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src={postContent.images[0]}
              style={{ height: '100%' }}
              alt={postContent.caption}
            />
          </Box>
          <CardContent className={classes.caption}>
            {postContent.tags && (
              <TagChips tagsArray={arrayToChipData(postContent.tags)} />
            )}
            <Typography>{postContent.displayName}</Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {postContent.caption}
            </Typography>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                paddingTop: 10
              }}
            >
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => alert('Yes')}
              >
                Delete
              </Button>
              <Button variant='outlined' color='primary'>
                Edit
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ModalPostCard;
