import { CircularProgress, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { useUser } from "../../backend/users";

export default function PublicRoute({ children }: any) {
  const router = useRouter();
  const { data } = useUser();

  if (data) {
    router.push("/feed");
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
  } else {
    return <>{children}</>;
  }
}
