import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Grid, Typography } from "@material-ui/core";
import PublicRoute from "../ruzova_frontend/auth/PublicRoute";

export default function Home() {
  return (
    <PublicRoute>
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Image src="/logo.png" height={125} width={125} />

        <Typography variant="h2" style={{ fontWeight: "bold" }}>
          růžová
        </Typography>
      </Grid>
    </PublicRoute>
  );
}
