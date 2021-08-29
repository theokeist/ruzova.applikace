import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useUser } from "../backend/users";
import supabase from "../backend/_supabase";
import BottomMenu from "./BottomMenu";
import BottomSwipe from "./BottomSwipe";

export default function Footer() {
  const [state, setState] = useState(false);
  const [users, setUsers] = useState<any>();
  const [livePost, setLivePost] = useState<any>("");
  const [url, setUrl] = useState<any>("");

  const { data: user } = useUser();

  React.useEffect(() => {
    setUsers(user);
    setLivePost(user?.live_post);
    setUrl(user?.avatar_url);
  }, [user]);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (open === false && livePost !== users?.live_post) {
      updateProfile();
    }
    setState(open);
  };

  /// const postupdate = useLivePostUpdate(user, livePost);

  // Use mutation, invalidate Queries
  async function updateProfile() {
    try {
      const updates = {
        id: users?.id,
        live_post: livePost,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").update(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Grid
      container
      item
      xs={1}
      justify="space-evenly"
      alignItems="center"
      spacing={1}
      style={{
        width: "100vw",
        height: "auto",
        maxWidth: "100%",
        zIndex: 1000,
        backgroundColor: "white",
        position: "fixed",
        bottom: "0px",
      }}
    >
      <BottomMenu user={users} url={url} setDrawer={toggleDrawer}></BottomMenu>
      <BottomSwipe
        url={url}
        user={users}
        toggleDrawer={toggleDrawer}
        state={state}
        setState={setState}
        livePost={livePost}
        setLivePost={setLivePost}
      />
    </Grid>
  );
}
