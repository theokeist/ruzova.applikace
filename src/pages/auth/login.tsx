import {
  Button, Grid, TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useLogin } from "../../backend/users";
import PublicRoute from "../../frontend/auth/PublicRoute";
import { useRuzovaTheme } from "../../frontend/_ruzovaTheme";

export default function Login() {
  const ruzova = useRuzovaTheme();
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation: any = useLogin({ email, password });

  if (loginMutation?.isSuccess) {
    router.push("/feed");
  }

  return (
    <PublicRoute>
      <Grid container item justify="center" alignItems="center">
        <Grid container xs={10} justify="center" item>
          {loginMutation?.isError && (
            <p className="text-sm mb-8 text-red-500">
              {loginMutation?.error?.message}
            </p>
          )}

          <div className={classes.logo}>
            <Image src="/logo.png" height={100} width={100} />
          </div>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            size="small"
            className={`${ruzova.input} ${classes.textField}`}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            variant="outlined"
            label="Heslo"
            name="password"
            type="password"
            size="small"
            className={`${ruzova.input} ${classes.textField}`}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={`${ruzova.button} ${classes.buttonDown}`}
            onClick={() => loginMutation.mutate()}
          >
            {loginMutation.isLoading ? (
              <span>...</span>
            ) : (
              <span>P??ihl??sit se</span>
            )}{" "}
          </Button>
        </Grid>
      </Grid>
    </PublicRoute>
  );
}

const useStyles = makeStyles({
  textField: {
    marginBottom: 15,
  },
  buttonDown: {
    marginTop: 30,
  },
  logo: {
    marginBottom: 30,
  },
});
