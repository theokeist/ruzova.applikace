import { useMutation, useQuery, useQueryClient } from "react-query"
import supabase from "../_supabase"

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
      console.log(data)
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert({
          username: user?.username,
          id: data?.id
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

const getUser = async (user: any) => {
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

export function useUser() {
  const user = supabase?.auth?.user();

  const data = useQuery('user', () => getUser(user))
  return data;
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if(error) {
    throw error
  }
}

export function useLogOut() {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}
