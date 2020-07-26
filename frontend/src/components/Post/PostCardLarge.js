import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
  root: {
    maxWidth: '100%',
    height: '100%',
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

const PostCardLarge = ({ postContent }) => {
  const classes = useStyles();
  console.log(postContent.tags);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia component='img' width='100%' image={postContent.images[0]} />
        <CardContent>
          {postContent.tags && (
            <TagChips tagsArray={arrayToChipData(postContent.tags)} />
          )}
          <Typography gutterBottom variant='h5' component='h2'>
            {postContent.username}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {postContent.caption}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCardLarge;
