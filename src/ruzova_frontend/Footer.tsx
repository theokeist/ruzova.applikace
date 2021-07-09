import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import BottomMenu from "./BottomMenu";
import BottomSwipe from "./BottomSwipe";
import { useUser } from "../ruzova_app/users";

export default function Footer() {
  const [state, setState] = useState(false);
  const user = useUser();
  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
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
      <BottomMenu user={user} setDrawer={toggleDrawer}></BottomMenu>
      <BottomSwipe
        user={user}
        toggleDrawer={toggleDrawer}
        state={state}
        setState={setState}
      />
    </Grid>
  );
}
