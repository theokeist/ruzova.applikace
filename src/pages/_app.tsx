import { useState, useEffect } from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import BottomMenu from "../ruzova_frontend/BottomMenu";
import { makeStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  Icon,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AvatarProfile from "../ruzova_frontend/Avatar";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import BottomSwipe from "../ruzova_frontend/BottomSwipe";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      light: "#FF96C8",
      main: "#FF96C8",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#000000",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

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
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ height: "100vh", flexWrap: "nowrap" }}
        >
          <Grid
            container
            item
            xs={11}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <Component {...pageProps} />
          </Grid>
          <Divider style={{ width: "100%", height: "5px" }} />

          <Grid
            container
            item
            justify="space-evenly"
            alignItems="center"
            xs={1}
            style={{
              width: "100vw",
              height: "60px",
              maxWidth: "100%",
              zIndex: 1000,
              backgroundColor: "white",
              position: "fixed",
              bottom: "0px",
            }}
          >
            <BottomMenu setDrawer={toggleDrawer}></BottomMenu>
            <BottomSwipe
              toggleDrawer={toggleDrawer}
              state={state}
              setState={setState}
            />
          </Grid>
        </Grid>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const useStyles = makeStyles({
  root: {
    "& .MuiDrawer-paperAnchorBottom": {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      width: "100%",
    },
  },
  content: {
    height: 500,
    overflow: "hidden",
  },
  drawer: {
    padding: "11px",
  },
  menu: {
    width: "100vw",
    backgroundColor: "white",
    borderTop: "1px solid gray",
    padding: "8px 15px",
  },
  nav: {
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
    margin: "3rem 0rem",
    padding: "15px",
  },
  avatar: {
    border: "4px solid #FF96C8",
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  ruzova: {
    padding: "12px",
  },
});

export default MyApp;
