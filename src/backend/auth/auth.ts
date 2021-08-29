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

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if(error) {
    throw error
  }
}

export const login = async ({email, password}: any) => {
  const { data, error } = await supabase.auth.signIn({
    email, 
    password
  })

  if(error) {
    throw new Error(error?.message)
  }
  return data
}

export const createUser = async (user: any) => {
  // Check if username exists
  const { data: userWithUsername, error: existError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', user?.username)
    .single()

  if(userWithUsername) {
    throw new Error('Toto uživatelské jméno je zabrané')
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