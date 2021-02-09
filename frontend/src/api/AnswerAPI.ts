import axios from '../const/axios'


export const asyncGetAnswers = async () => {
  const res = await axios.get('/question/answers/')
  return res.data
}

export const asyncCreateAnswer = async (answer: {answer_text: string}) => {
  const res = await axios.post('/question/answers/', answer, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return res.data
}

export const asyncPatchAnswer = async (answer: {id:  number, answer_text: string}) => {
  const res = await axios.patch(`/question/answers/${answer.id}/`, answer, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return res.data
}

export const asyncDeleteAnswer = async (id :number) => {
  await axios.delete(`/question/answers/${id}/`, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return id
}