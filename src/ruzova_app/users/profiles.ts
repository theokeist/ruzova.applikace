import supabase from "../_supabase"
import { useQueryClient } from "react-query"


export async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.log("Error downloading image: ", error.message);
  }
}

export const findUserProfile = async (user: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .single()

  if(error) {
    throw new Error(error.message)
  }

  if(!data) {
    throw new Error("User not found")
  }

  const trueImage = await downloadImage(data?.avatar_url);
  return {...data, trueImage}
}

export const findProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select()

  if(error) {
    throw new Error(error.message)
  }

  if(!data) {
    throw new Error("User not found")
  }

  return data
}

export const updateProfile = async (user: any, live_post: any) => {
    const queryClient = useQueryClient()

    const updates = {
      id: user?.id,
      live_post: live_post,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").update(updates);

    if (error) {
      throw error;
    }

    queryClient.invalidateQueries('profiles')
    queryClient.invalidateQueries('user')
}

export async function updateSettings(settings: any) {
    const updates = {
      id: settings?.user?.id,
      username: settings?.username,
      website: settings?.website,
      avatar_url: settings?.avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {returning: "minimal"});

    if (error) {
      throw error;
    }
}