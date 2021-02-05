import axios from '../const/axios'


export const asyncRegister = async (auth: any) => {
  const res = await axios.post('/question/users/', auth)
  return res.data
}

export const asyncLogin = async (auth: any) => {
  const res = await axios.post('/auth/', auth)
  return res.data
}

export const asyncGetProfile = async () => {
  const res = await axios.get('/question/profile/', {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  .then(res => { return res.data })
  .catch(err => { return undefined })
  return res
}