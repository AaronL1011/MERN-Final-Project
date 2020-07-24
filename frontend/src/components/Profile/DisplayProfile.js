import React from "react";
import { Grid, Card, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const userProfile = {
  posts: [],
  _id: "5f0fe089dfb7c45f8a61eff6",
  username: "John Smithson",
  email: "johnsmith@email.com",
  password: "$2a$10$P7zLSSmd5dDDSeu7epo1oOHch90mV3keGZOLc97DHmmP8q2eI7/eK",
  __v: 0,
  bio:
    "Hi there! My name is John Smith, pretty generic I know, but its all ive got to work with!",
  profile_picture:
    "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjMzOTc0MTk1NzI0/john-smith-9486928-1-402.jpg",
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    minWidth: 300,
    maxWidth: "100%",
  },
  actionArea: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: 300,
    maxWidth: 600,

  },
  profile_pic: {
    flexGrow: 1,
    minWidth:200,
    maxWidth: 300,
    alignSelf: "center",
    borderRadius: "50%",
    margin: 5,
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "column",
    justify: "center",
    alignItems: "center",
    minWidth: 270,
    maxWidth: "100%",
  },
});

const ProfileCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      
        <CardMedia
          className={classes.profile_pic}
          component="img"
          alt=""
          image={userProfile.profile_picture}
        />
        <CardActionArea className={classes.actionArea}>
          <CardContent className={classes.content}>
            <CardActions>
              <Button>Email</Button>
              <Button>Edit Profile</Button>
            </CardActions>
            <Typography variant="h4" component="h2" whiteSpace="wrap">
              {userProfile.username}
            </Typography>
            <Typography variant="body1" color="textPrimary" component="p">
              {userProfile.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
      
    </Card>
  );
};

export default ProfileCard;
