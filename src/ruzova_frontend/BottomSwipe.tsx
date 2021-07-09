import React from "react";
import Link from "next/link";
import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  IconButton,
  SwipeableDrawer,
  Icon,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import { useUser } from "../ruzova_app/users";
import AvatarProfile from "./Avatar";
import { useRuzovaTheme } from "./_ruzovaTheme";
import supabase from "../ruzova_app/_supabase";

const BottomSwipe = ({
  user,
  toggleDrawer,
  state,
  setState,
  livePost,
  setLivePost,
}: any) => {
  const classes = useStyles();
  const ruzova = useRuzovaTheme();

  const handleChange = (e) => {
    setLivePost(e.target.value);
  };

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      className={classes.root}
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={25}
      disableDiscovery
      disableSwipeToOpen
      transitionDuration={850}
    >
      <div className={classes.content}>
        <Grid container alignItems="flex-start" className={classes.drawer}>
          <Grid xs={2} item>
            {user && user?.data?.avatar_url ? (
              <AvatarProfile
                className={classes.avatar}
                url={user?.data?.avatar_url}
                size={30}
              />
            ) : (
              <Avatar
                alt="Profile"
                component="div"
                className={classes.normal}
              />
            )}
          </Grid>
          <Grid xs={10} item>
            <TextField
              className={ruzova.input}
              value={livePost}
              onChange={handleChange}
              rows={4}
              variant="outlined"
              multiline
              fullWidth
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          className={classes.nav}
          container
          alignItems="baseline"
          justify="space-around"
        >
          <IconButton onClick={toggleDrawer(false)}>
            <Link href="/feed">
              <DynamicFeedIcon />
            </Link>
          </IconButton>
          {user && (
            <IconButton onClick={toggleDrawer(false)}>
              <Link href="/profile">
                <ExpandMoreIcon />
              </Link>
            </IconButton>
          )}
          <IconButton onClick={toggleDrawer(false)}>
            <Link href="/profile">
              <Icon>
                <Image src="/logo.png" layout="fill" />
              </Icon>
            </Link>
          </IconButton>
        </Grid>

        <Grid style={{ padding: "11px" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
            Stories
          </Typography>
        </Grid>
      </div>
    </SwipeableDrawer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDrawer-paperAnchorBottom": {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: "100%",
    },
  },
  content: {
    height: 500,
    overflow: "hidden",
  },
  drawer: {
    padding: "11px",
  },
  nav: {
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
    margin: "3rem 0rem",
    padding: "15px",
  },
  avatar: {
    border: "4px solid #FF96C8",
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  textField: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
  },
  normal: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default BottomSwipe;
