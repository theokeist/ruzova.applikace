import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
import AvatarProfile from "./Avatar";
const BottomMenu = ({ url, user, setDrawer, setState }: any) => {
  const classes = useStyles();

  return (
    <>
      {user ? (
        <Grid
          container
          alignItems="center"
          justify="space-evenly"
          spacing={1}
          className={classes.drawer}
        >
          <Grid xs={2} onClick={setDrawer(true)} item>
            {user && url ? (
              <AvatarProfile
                className={classes.avatar}
                url={url}
                size={30}
                stories
                hideUpload
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
            <Typography className={classes.titleExpanded}>
              {user?.live_post}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          alignItems="center"
          justify="space-evenly"
          spacing={1}
          className={classes.drawer}
        >
          <Grid item>
            <Link href="/">
              <IconButton onClick={setDrawer(false)}>
                <HomeIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/login">
              <IconButton onClick={setDrawer(false)}>
                <LockOpenIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup">
              <IconButton onClick={setDrawer(false)}>
                <LockIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  menu: {
    width: "100vw",
    backgroundColor: "white",
    borderTop: "1px solid #fafafa",
    padding: "8px 11px",
  },
  avatar: {
    border: "4px solid #FF96C8",
    borderColor: theme?.palette.primary.main,
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  drawer: {
    padding: "11px",
  },
  titleExpanded: {
    maxWidth: "100%",
    overflow: "hidden",
    textAlign: "justify",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    userSelect: "none",
  },
  normal: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default BottomMenu;
