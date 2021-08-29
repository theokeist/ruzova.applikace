import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfiles } from "../backend/users";
import PrivateRoute from "../frontend/auth/PrivateRoute";
import PostCard from "../frontend/PostCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feeds: {
      padding: theme.spacing(1),
      fontWeight: 900,
    },
  })
);
export default function Feed() {
  const classes = useStyles();
  const [profiles, setProfiles] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { data: profilesResponse, isLoading } = useProfiles();
  useEffect(() => {
    setProfiles(profilesResponse);
    setLoading(false);
  }, [profilesResponse]);

  if (loading)
    return (
      <Grid
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "585px",
        }}
      >
        <CircularProgress />;
      </Grid>
    );
  if (!profiles?.length)
    return <Typography variant="h3">No posts :-/</Typography>;

  return (
    <PrivateRoute isLoading={isLoading}>
      <Grid style={{ width: "100%", marginBottom: "70px" }} item>
        <Typography variant="h4" className={classes.feeds} gutterBottom>
          Feed
        </Typography>
        {profiles.map((profile: any, index: any) => (
          <Link key={profile.id} href={`/posts/${profile.id}`}>
            <PostCard key={index} postsProps={profile}></PostCard>
          </Link>
        ))}
      </Grid>
    </PrivateRoute>
  );
}
