import { createContext } from 'react'

interface USER_PROFILE {
  id: number;
  username: string;
  email: string;
}

export const UserContext = createContext<USER_PROFILE | undefined>({id: 0, username: '', email: ''})