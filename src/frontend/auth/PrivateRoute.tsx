import { CircularProgress, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { useUser } from "../../backend/users";

export default function PrivateRoute({ isLoading, children }: any) {
  const router = useRouter();
  const { isFetching, isError } = useUser();
  if (isFetching || isLoading) {
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
        <CircularProgress />
      </Grid>
    );
  }

  if (isError) {
    router.push("/auth/login");
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
        <CircularProgress />
      </Grid>
    );
  }

  return <>{children}</>;
}
