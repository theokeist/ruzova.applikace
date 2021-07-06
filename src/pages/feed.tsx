import { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../ruzova_app/_supabase";
import { Card, Grid, Typography } from "@material-ui/core";
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
  //const [posts, setPosts] = useState<any>([]);

  const posts = [
    { id: 1, title: "Ahoj" },
    { id: 2, title: "Nihao" },
    { id: 3, title: "Ahoj" },
    { id: 4, title: "Nihao" },
    { id: 5, title: "Ahoj" },
    { id: 6, title: "Nihao" },
    { id: 7, title: "Ahoj" },
    { id: 8, title: "Nihao" },
    { id: 9, title: "Ahoj" },
    { id: 10, title: "Nihao" },
    { id: 11, title: "Ahoj" },
    { id: 12, title: "Nihao" },
    { id: 13, title: "Ahoj" },
    { id: 14, title: "Nihao" },
    { id: 15, title: "Ahoj" },
  ];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select();
    //setPosts(data);
    setLoading(false);
  }
  if (loading) return <p className="text-2xl">Loading ...</p>;
  if (!posts?.length) return <p className="text-2xl">No posts.</p>;

  return (
    <PrivateRoute>
      <Grid style={{ width: "100%", marginBottom: "70px" }} item>
        <Typography variant="h4" className={classes.feeds} gutterBottom>
          Feed
        </Typography>
        {posts.map((post: any, index: any) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            {index % 7 === 0 ? (
              <PostCard key={index} postsProps={post} noStories></PostCard>
            ) : (
              <PostCard key={index} postsProps={post}></PostCard>
            )}
          </Link>
        ))}
      </Grid>
    </PrivateRoute>
  );
}
