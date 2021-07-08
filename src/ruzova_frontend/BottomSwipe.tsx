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

const BottomSwipe = ({ toggleDrawer, state, setState }: any) => {
  const classes = useStyles();
  const ruzova = useRuzovaTheme();

  const user = useUser();
  console.log("NOW", user.data);
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
    >
      <div className={classes.content}>
        <Grid
          container
          alignItems="flex-start"
          spacing={1}
          className={classes.drawer}
        >
          {user && user?.data?.avatar_url && (
            <Grid xs={2} item>
              <AvatarProfile
                className={classes.avatar}
                url={user?.data?.avatar_url}
                size={30}
              />
            </Grid>
          )}
          <Grid xs={10} item>
            <TextField
              className={ruzova.button}
              value={"Ahoj jak se mas"}
              rows={4}
              variant="outlined"
              multiline
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          className={classes.nav}
          container
          alignItems="baseline"
          justify="space-around"
        >
          <Link href="/feed">
            <IconButton onClick={() => setState(false)}>
              <DynamicFeedIcon />
            </IconButton>
          </Link>
          {user && (
            <Link href="/profile">
              <IconButton onClick={() => setState(false)}>
                <ExpandMoreIcon />
              </IconButton>
            </Link>
          )}
          <Link href="/profile">
            <IconButton onClick={() => setState(false)}>
              <Icon>
                <Image src="/logo.png" layout="fill" />
              </Icon>
            </IconButton>
          </Link>
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
}));

export default BottomSwipe;
