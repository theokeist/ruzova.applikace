import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  Grid,
  makeStyles,
  CardActions,
  Collapse,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Stories from "react-insta-stories";
import Image from "next/image";
import AvatarProfile from "./Avatar";

const stories: any = [
  "https://images.unsplash.com/photo-1622495806758-5d8f62817275?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=363&q=80",
  "https://images.unsplash.com/photo-1624605984842-6971e8b7b9d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  "https://images.unsplash.com/photo-1595183265031-b4cb347a8353?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  {
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 30m ago",
      profileImage: "https://picsum.photos/100/100",
    },
  },
  "https://images.unsplash.com/photo-1622495806758-5d8f62817275?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=363&q=80",
  "https://images.unsplash.com/photo-1622495806758-5d8f62817275?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=363&q=80",
];
const PostCard = ({ postsProps, noStories = false }: any) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [post, setPosts] = useState<any>();
  const [url, setUrl] = useState<any>();

  useEffect(() => {
    setPosts(postsProps);
    setUrl(postsProps?.avatar_url);
  }, [postsProps]);

  const profiles = [
    "@xd64cardas",
    "@CAman",
    "@RicTicPic",
    "@PicNic420",
    "@ORSZA",
    "@le0nad",
  ];

  const randomProfiles = profiles[Math.floor(Math.random() * profiles.length)];
  const [randomProfile, setRandomProfile] = useState(randomProfiles);

  console.log(post);
  return (
    <Grid
      direction="row"
      justify="flex-start"
      alignItems="flex-start" // BASELINE
      className={classes.postCard}
      container
    >
      <Grid className={classes.avatarSide}>
        <AvatarProfile url={url} size={40} hideUpload />
      </Grid>

      <Grid className={classes.cardSide}>
        {!noStories ? (
          <Card
            elevation={0}
            className={!expanded ? classes.card : classes.cardExpanded}
          >
            <CardActions
              className={classes.cardActions}
              onClick={handleExpandClick}
              disableSpacing
            >
              <Grid container direction="column">
                <Typography variant="caption" style={{ fontWeight: "bold" }}>
                  {post?.username}
                </Typography>
                <Typography
                  variant="body1"
                  className={expanded ? classes.title : classes.titleExpanded}
                >
                  {post?.live_post}
                </Typography>
              </Grid>
            </CardActions>
            <React.Fragment>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.storiesCollapse}>
                  {!noStories && (
                    <Stories
                      width="100%"
                      height="400px"
                      loop={true}
                      stories={stories}
                    />
                  )}
                </div>
              </Collapse>
            </React.Fragment>
          </Card>
        ) : (
          <Card
            elevation={0}
            className={
              !expanded ? classes.cardNotification : classes.cardExpanded
            }
          >
            <CardActions
              className={classes.cardActions}
              onClick={handleExpandClick}
              disableSpacing
            >
              <Grid container direction="column">
                <Typography variant="caption" style={{ fontWeight: "bold" }}>
                  {randomProfile}
                </Typography>
                <Typography
                  variant="body1"
                  className={expanded ? classes.title : classes.titleExpanded}
                >
                  {post?.live_post}
                </Typography>
              </Grid>
            </CardActions>
            <React.Fragment>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {!noStories && (
                  <Stories
                    width="100%"
                    height="400px"
                    loop={true}
                    stories={stories}
                  />
                )}
              </Collapse>
            </React.Fragment>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  postCard: {
    padding: "0px 10px 0px 10px",
    marginBottom: 10,
    flexWrap: "nowrap",
    width: "100%",
  },
  cardSide: {
    marginLeft: 5,
    flexGrow: 1,
    width: "80%",
  },
  avatarSide: {},
  card: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    border: "1px solid",
    borderColor: "#f0f0f0",
  },
  cardNotification: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    border: "1px solid",
    borderColor: "#f0f0f0",
    backgroundColor: theme?.palette.primary.main,
    color: "white",
  },
  cardActions: {
    padding: "5px",
  },
  cardExpanded: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    border: "1px solid",
    borderColor: "#f0f0f0",
  },
  collapse: {
    padding: "5px",
  },
  storiesCollapse: {
    "& img": {
      width: "100% !important",
      height: "400px",
      objectFit: "cover",
      marginTop: "4px !important",
    },
  },
  avatar: {
    border: "4px solid #FF96C8",
    borderColor: theme?.palette.primary.main,
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatarStories: {
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  title: {
    maxWidth: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflow: "hidden",
    lineHeight: 1.25,
    //    whiteSpace: "nowrap",
    //textOverflow: "ellipsis",
  },
  titleExpanded: {
    maxWidth: "100%",
    overflow: "hidden",
    textAlign: "justify",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    lineHeight: 1.25,
  },
}));

export default PostCard;
