import axios from '../const/axios'


export const asyncRegister = async (auth: any) => {
  const res = await axios.post('/question/users/', auth)
  return res.data.token
}

export const asyncLogin = async (auth: any) => {
  const res = await axios.post('/auth/', auth)
  return res.data
}