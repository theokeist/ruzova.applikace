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
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useProfileImage } from "../ruzova_app/users";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
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
  avatar: {
    border: "4px solid #FF96C8",
    borderColor: theme?.palette.primary.main,
    cursor: "pointer",
    width: theme.spacing(6),
    height: theme.spacing(6),
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
  stories = false,
}: any) => {
  const classes = useStyles();
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState<any>(false);

  const { data: new_url } = useProfileImage(url);
  useEffect(() => {
    if (new_url) setAvatarUrl(new_url);
  }, [new_url]);

  // console.log(avatarUrl);
  // async function downloadImage(path: string) {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .download(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //     setAvatarUrl(url);
  //   } catch (error) {
  //     console.log("Error downloading image: ", error.message);
  //   }
  // }

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
    <Grid container item justify="space-evenly" alignItems="center">
      {url && stories ? (
        <>
          <Avatar
            src={avatarUrl}
            alt="Avatar"
            component="div"
            className={
              largeAvatar
                ? `${classes.large} ${classes.avatar}`
                : `${classes.normal} ${classes.avatar}`
            }
          />
        </>
      ) : (
        <Avatar
          src={new_url}
          alt="Avatar"
          component="div"
          className={largeAvatar ? classes.large : classes.normal}
        />
      )}
      {!hideUpload ? (
        <>
          <input
            id="icon-button-file"
            style={{
              display: "none",
            }}
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default AvatarProfile;
