import React from "react";
import { Grid, Card, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    maxWidth: "100%",
  },
  actionArea: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 600,
  },
  profile_pic: {
    flexGrow: 1,
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
    maxWidth: "100%",
  },
});

const ProfileCard = (userProfile) => {
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
