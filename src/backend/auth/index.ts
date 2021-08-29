import { useMutation, useQuery, useQueryClient } from "react-query"
import supabase from "../_supabase"
import { login, logout, createUser} from "./auth"

interface User {
  fullName?: string;
  email: string;
  username: string;
  password: string;
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

export function useLogin() {
  return useMutation(({ email, password }: any) => login({email, password}))
}

export function useLogOut() {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    }
  })
}
