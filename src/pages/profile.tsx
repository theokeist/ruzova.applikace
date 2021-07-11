import { useState, useEffect } from "react";
import supabase from "../ruzova_app/_supabase";
import { Button, Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import PrivateRoute from "../ruzova_frontend/auth/PrivateRoute";
import { useLogOut, useProfileImage, useUser } from "../ruzova_app/users";
import Avatar from "../ruzova_frontend/Avatar";
import { useRuzovaTheme } from "../ruzova_frontend/_ruzovaTheme";
import RuzovaButton from "../ruzova_frontend/RuzovaButton";

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
  })
);

export default function Profile() {
  const ruzova = useRuzovaTheme();

  const classes = useStyles();
  const [loading, setLoading] = useState<any>(true);
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);
  const [live_post, setLivePost] = useState<any>(null);
  const [url, setUrl] = useState<any>();

  const logoutMutation = useLogOut();

  const { data: user } = useUser();
  useEffect(() => {
    console.log(user);
    getProfile(user);
  }, [user]);

  const { data: url_live } = useProfileImage(avatar_url);
  //
  // Getting Profile images
  //
  useEffect(() => {
    setUrl(url_live);
  }, [url_live]);

  async function getProfile(user: any) {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, live_post, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setLivePost(data.live_post);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }: any) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const updateProfileHandler = () => {
    updateProfile({ username, website, avatar_url });
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
          <Avatar
            url={url}
            size={40}
            largeAvatar={true}
            username={username}
            hideUpload
            onUpload={(url: any) => {
              setAvatarUrl(url);
              updateProfile({ username, website, avatar_url: url });
            }}
          />
        </Grid>

        <Grid container item direction="column" justify="flex-start">
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
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

        <Typography style={{ marginTop: "20px" }}>{live_post}</Typography>
      </Grid>
    </PrivateRoute>
  );
}
