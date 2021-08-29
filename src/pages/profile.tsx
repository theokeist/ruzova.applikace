import { Avatar, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useUser } from "../backend/users";
import PrivateRoute from "../frontend/auth/PrivateRoute";
import { useRuzovaTheme } from "../frontend/_ruzovaTheme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      fontWeight: 900,
    },
    ONE: {
      padding: theme?.spacing(2),
      marginBottom: theme?.spacing(10),
    },
    textField: {
      marginBottom: 15,
    },
    button: {
      marginTop: 30,
    },
    avatarContainer: {
      marginTop: theme?.spacing(3),
      marginBottom: theme?.spacing(5),
    },
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  })
);

export default function Profile() {
  const ruzova = useRuzovaTheme();

  const classes = useStyles();
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [live_post, setLivePost] = useState<any>(null);

  const { data: user, isLoading } = useUser();
  useEffect(() => {
    setUsername(user?.username);
    setWebsite(user?.website);
    setAvatarUrl(user?.trueImage);
    setLivePost(user?.live_post);
  }, [user]);

  return (
    <PrivateRoute isLoading={isLoading}>
      <Grid container justify="center" className={classes?.ONE}>
        <Grid
          container
          item
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          className={classes?.avatarContainer}
        >
          <Avatar src={avatar_url} className={classes?.large} />

          <Grid item justify="flex-start">
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {username}
            </Typography>

            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", alignSelf: "flex-start" }}
              gutterBottom
            >
              Prestiž : 782
            </Typography>
          </Grid>
        </Grid>

        <Typography style={{ marginTop: "20px" }}>{live_post}</Typography>
      </Grid>
    </PrivateRoute>
  );
}
