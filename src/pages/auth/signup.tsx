import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateUser } from "../../ruzova_app/users";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useRuzovaTheme } from "../../ruzova_frontend/_ruzovaTheme";
import PublicRoute from "../../ruzova_frontend/auth/PublicRoute";

export default function Signup() {
  const router = useRouter();
  const ruzova = useRuzovaTheme();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const createUserMutation: any = useCreateUser({
    email,
    password,
    username,
  });

  if (createUserMutation?.isSuccess) {
    router.push("/");
  }

  return (
    <PublicRoute>
      <Grid container item justify="center" alignItems="center">
        <Grid container xs={10} justify="center" item>
          {createUserMutation?.isError && (
            <p className="text-sm mb-8 text-red-500">
              {createUserMutation?.error?.message}
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

          <TextField
            error
            helperText="Incorrect entry."
            variant="outlined"
            label="Uživatelské jméno"
            defaultValue="Hello World"
            name="username"
            type="text"
            size="small"
            className={`${ruzova.input} ${classes.textField}`}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={`${ruzova.button} ${classes.button}`}
            onClick={() => createUserMutation.mutate()}
          >
            {createUserMutation.isLoading ? (
              <span>...</span>
            ) : (
              <span>Registrovat se</span>
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
  button: {
    marginTop: 30,
  },
  logo: {
    marginBottom: 30,
  },
});
