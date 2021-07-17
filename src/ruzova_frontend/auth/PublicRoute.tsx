import { useRouter } from "next/router";
import { useUser } from "../../ruzova_app/users";
import { Grid, CircularProgress } from "@material-ui/core";

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
