import { useState, useEffect } from "react";
import supabase from "../ruzova_app/_supabase";
import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import PrivateRoute from "../ruzova_frontend/auth/PrivateRoute";
import {
  useLogOut,
  useProfileImage,
  useSettingsUpdate,
  useUser,
} from "../ruzova_app/users";
import AvatarProfile from "../ruzova_frontend/Avatar";
import { useRuzovaTheme } from "../ruzova_frontend/_ruzovaTheme";
import RuzovaButton from "../ruzova_frontend/RuzovaButton";
import { useQueryClient } from "react-query";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      fontWeight: 900,
    },
    ONE: {
      padding: theme?.spacing(4),
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
  })
);

export default function Settings() {
  const ruzova = useRuzovaTheme();

  const classes = useStyles();
  const [loading, setLoading] = useState<any>(true);
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [url, setUrl] = useState<any>();
  const logoutMutation = useLogOut();

  const { data: user } = useUser();
  useEffect(() => {
    setUsername(user?.username);
    setWebsite(user?.website);
    setAvatarUrl(user?.avatar_url);
  }, [user]);

  // async function getProfile(user: any) {
  //   try {
  //     setLoading(true);

  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, website, avatar_url`)
  //       .eq("id", user?.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       console.log(data);
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     console.log(error?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const { mutate: settingsUpdate } = useSettingsUpdate();

  const updateProfileHandler = (
    user: any,
    username: any,
    website: any,
    url: any
  ) => {
    settingsUpdate({ user, username, website, avatar_url: url });
  };

  return (
    <PrivateRoute>
      <Grid container justify="center" className={classes?.ONE}>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          className={classes?.avatarContainer}
        >
          <AvatarProfile
            url={avatar_url}
            size={40}
            username={username}
            onUpload={(url: any) => {
              setAvatarUrl(url);
              updateProfileHandler(user, username, website, url);
            }}
          />
        </Grid>

        <TextField
          variant="outlined"
          size="small"
          className={`${ruzova.input} ${classes.textField}`}
          id="email"
          type="text"
          label="Email"
          value={session?.user?.email}
          disabled
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          className={`${ruzova.input} ${classes.textField}`}
          id="username"
          type="text"
          label="Uživatelské jméno"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          className={`${ruzova.input} ${classes.textField}`}
          id="website"
          type="website"
          label="Web"
          value={website || ""}
          onChange={(e) => setWebsite(e?.target?.value)}
          fullWidth
        />

        <Button
          fullWidth
          variant="contained"
          size="small"
          color="primary"
          className={`${ruzova.button} ${classes.button}`}
          onClick={() =>
            updateProfileHandler(user, username, website, avatar_url)
          }
        >
          Aktualizovat
        </Button>

        <Button
          fullWidth
          variant="text"
          size="small"
          className={`${ruzova.button} ${classes.button}`}
          onClick={() => logoutMutation.mutate()}
        >
          Odhlásit se
        </Button>
      </Grid>
    </PrivateRoute>
  );
}
