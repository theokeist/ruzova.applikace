import supabase from "../_supabase"
import { useQueryClient } from "react-query"
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

  return data
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
  try {
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
  } catch (error) {
    console.log(error.message);
  }
}