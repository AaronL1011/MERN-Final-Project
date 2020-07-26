import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const postContent = {
  tags: ['cat', 'balls', 'joe'],
  username: 'Joe Dane',
  images: [
    'https://grupgrup-images.s3.ap-southeast-2.amazonaws.com/80b2487b-a0e3-426c-814f-02650d06f5d9'
  ],
  _id: '5f1979c3242a680017c04cee',
  caption: "This is a photo of my cat, Joe. He's... eccentric.",
  visibility: '3',
  date: '2020-07-23T11:51:31.362Z',
  __v: 0
};

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 250,
    overflow: 'hidden',
    margin: 15
  }
});

const PostCardSmall = ({ postContent }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          image={postContent.images[0]}
          style={{ minHeight: 250 }}
        />
      </CardActionArea>
    </Card>
  );
};

export default PostCardSmall;
