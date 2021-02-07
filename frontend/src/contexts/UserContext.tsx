import { createContext } from 'react'

interface USER_PROFILE {
  id: number;
  username: string;
  email: string;
  questions: [{id: number; question_text: string; owner: number; owner_name: string; created_at: number; updated_at: number;}]
}

export const UserContext = createContext<USER_PROFILE | null>({id: 0, username: '', email: '', questions: [{id: 0, question_text: '', owner: 0, owner_name: '', created_at: 0, updated_at: 0}]})