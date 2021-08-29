import { makeStyles } from "@material-ui/core/styles";

export const useRuzovaTheme = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-root": {
      textTransform: "none",
      borderRadius: "15px",
      borderTopLeftRadius: "0px",
    },
  },
  button: {
    textTransform: "none",
    borderRadius: "15px !important",
    borderTopLeftRadius: "0px !important",
  },
}));
