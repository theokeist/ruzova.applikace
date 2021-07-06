import { useEffect, useState } from "react";
import supabase from "../ruzova_app/_supabase";
import {
  Avatar,
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  normal: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  ONE: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontWeight: 900,
  },
  label: {
    marginTop: theme.spacing(5),
    fontWeight: 900,
  },
}));
const AvatarProfile = ({
  url,
  size,
  hideUpload = false,
  largeAvatar = false,
  center = false,
  username,
  onUpload,
}: any) => {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState<any>(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {avatarUrl ? (
        <>
          <Avatar
            src={avatarUrl}
            alt="Avatar"
            component="div"
            className={largeAvatar ? classes.large : classes.normal}
          />
        </>
      ) : (
        <Avatar
          alt="Avatar"
          component="div"
          className={largeAvatar ? classes.large : classes.normal}
        />
      )}
      {!hideUpload ? (
        <FormControl component="form">
          <FormControlLabel
            control={
              <input
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  width: "10px",
                }}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            }
            label={
              uploading ? (
                "Uploading ..."
              ) : (
                <Button variant="outlined">Upload</Button>
              )
            }
          />
        </FormControl>
      ) : (
        <></>
      )}
      {username && (
        <Typography variant="h4" className={classes.username} gutterBottom>
          {username}
        </Typography>
      )}
    </>
  );
};

export default AvatarProfile;
