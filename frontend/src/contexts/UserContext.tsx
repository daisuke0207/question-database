import { createContext } from 'react'

interface USER_PROFILE {
  id: number;
  username: string;
  email: string;
}

export const UserContext = createContext<USER_PROFILE | null>({id: 0, username: '', email: ''})