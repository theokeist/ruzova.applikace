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
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import { useUser } from "../ruzova_app/users";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
import AvatarProfile from "./Avatar";
const BottomMenu = ({ setDrawer, setState }: any) => {
  const classes = useStyles();

  const user = useUser();
  console.log(
    "BottomMenu - user is useQuery not Session",
    { ...user },
    "IN CASE USER TEXT DOWN THERE"
  );
  return (
    <>
      {user.isSuccess ? (
        <Grid
          container
          alignItems="center"
          justify="space-evenly"
          spacing={1}
          className={classes.drawer}
        >
          <Grid xs={2} onClick={setDrawer(true)} item>
            <Link href="/create-post">
              {user && user?.data?.avatar_url && (
                <AvatarProfile
                  className={classes.avatar}
                  url={user?.data?.avatar_url}
                  size={30}
                  stories
                />
              )}
            </Link>
          </Grid>
          <Grid xs={10} item>
            <Typography>Ahoj jak se mas</Typography>
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
}));

export default BottomMenu;
