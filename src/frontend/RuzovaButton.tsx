import {
  CircularProgress, IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRuzovaTheme } from "./_ruzovaTheme";

const RuzovaButton = ({ text, clickable }: any) => {
  const ruzova = useRuzovaTheme();
  return (
    <IconButton
      color="primary"
      className={`${ruzova.button}`}
      style={{
        width: "100%",
        marginTop: "20px",
        border: "1px  solid red",
        fontSize: "1.3rem",
        borderColor: "red",
      }}
      onClick={() => clickable.mutate()}
    >
      {clickable?.isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <span>{text}</span>
      )}{" "}
    </IconButton>
  );
};

const useStyles = makeStyles((theme) => ({
  menu: {
    width: "100vw",
    backgroundColor: "white",
    borderTop: "1px solid #fafafa",
    padding: "8px 11px",
  },
  avatar: {
    border: "4px solid #FF96C8",
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default RuzovaButton;
