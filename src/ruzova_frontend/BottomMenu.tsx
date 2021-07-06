import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import { useUser } from "../ruzova_app/users";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
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
        <>
          <Grid item>
            <Link href="/create-post">
              <Button variant="outlined" color="primary">
                <AddIcon />
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Typography>Ahoj jak se mas</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={setDrawer(true)}>
              <ExpandLessIcon />
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
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
        </>
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
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default BottomMenu;
