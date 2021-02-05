import axios from '../const/axios'


export const asyncGetQuestions = async () => {
  const res = await axios.get('/question/questions/')
  return res.data
}

export const asyncCreateQuestion = async (question: any) => {
  const res = await axios.post('/question/questions/', question, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return res.data
}