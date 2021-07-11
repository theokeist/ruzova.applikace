import { useState, useEffect } from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Head from "next/head";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Footer from "../ruzova_frontend/Footer";

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
  const classes = useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, viewport-fit=contain"
          />
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

          <Footer />
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
