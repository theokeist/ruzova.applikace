import { useMutation, useQuery, useQueryClient } from "react-query"
import supabase from "../_supabase"
import { findUserProfile, findProfiles, updateProfile, downloadImage ,updateSettings} from "./profiles"

interface User {
  fullName?: string;
  email: string;
  username: string;
  password: string;
}

const createUser = async (user: any) => {
  // Check if username exists
  const { data: userWithUsername, error: existError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', user?.username)
    .single()

    console.log(userWithUsername)
  if(userWithUsername) {
    throw new Error('User with username exists')
  }

  const { data: signedInData, error: signUpError } = await supabase.auth.signUp({
    email: user?.email,
    password: user?.password
  })

  console.log(signedInData)
  if(signUpError) {
    throw signUpError
  }

  return signedInData
}

export function useCreateUser(user: User) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      // @ts-ignore
      const ID = data?.id || data?.user?.id;
      console.log(data)
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert({
          username: user?.username,
          id: ID
        },{ returning: 'minimal' })

      if(insertError) {
        throw insertError
      }

      return insertData;
    }
  })
}

const login = async ({email, password}: any) => {
  const { data, error } = await supabase.auth.signIn({
    email, 
    password
  })

  console.log(data);

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export function useLogin({ email, password }: any) {
  return useMutation('login', () => login({email, password}))
}


export function useProfileImage(path:any) {
  return useQuery(['userImage', {path}], () => downloadImage(path))
}

export function useUser() {
  const user = supabase?.auth?.user();
  return useQuery('user', () => findUserProfile(user))
}

export function useProfiles() {
  return useQuery('profiles', () => findProfiles())
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if(error) {
    throw error
  }
}

export function useSettingsUpdate(options = {}) {
  const queryClient = useQueryClient();
  return useMutation<any, any, any>(settings => updateSettings(settings), {
    onSuccess: () => {
      queryClient.invalidateQueries('profiles')
      queryClient.invalidateQueries("user"); 
    },
    ...options
  });
}

// export function useLivePostUpdate() {
//   const queryClient = useQueryClient()
//   const update = (user: any, live_post: any) => {updateProfile(user, live_post)}
//   return useMutation<any, any, any>((u: any, post: any) => update(u, post), {
//     onSuccess: () => {
//       queryClient.invalidateQueries('profiles')
//       queryClient.invalidateQueries('user')
//     }
//   })
// }

export function useLogOut() {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}
