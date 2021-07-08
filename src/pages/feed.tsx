import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../ruzova_app/_supabase";
import { Card, Grid, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PostCard from "../ruzova_frontend/PostCard";
import PrivateRoute from "../ruzova_frontend/auth/PrivateRoute";

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
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase.from("profiles").select();
    setPosts(data);
    setLoading(false);
  }
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
  if (!posts?.length) return <Typography variant="h3">No posts :-/</Typography>;

  return (
    <PrivateRoute>
      <Grid style={{ width: "100%", marginBottom: "70px" }} item>
        <Typography variant="h4" className={classes.feeds} gutterBottom>
          Feed
        </Typography>
        {posts.map((post: any, index: any) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            {index % 7 === 0 ? (
              <PostCard key={post.id} postsProps={post} noStories></PostCard>
            ) : (
              <PostCard key={post.id} postsProps={post}></PostCard>
            )}
          </Link>
        ))}
      </Grid>
    </PrivateRoute>
  );
}
