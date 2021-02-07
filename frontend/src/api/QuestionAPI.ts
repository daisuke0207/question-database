import axios from '../const/axios'


export const asyncGetQuestions = async () => {
  const res = await axios.get('/question/questions/')
  return res.data
}

export const asyncCreateQuestion = async (question: {question_text: string}) => {
  const res = await axios.post('/question/questions/', question, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return res.data
}

export const asyncPatchQuestion = async (question: {id:  number, question_text: string}) => {
  const res = await axios.patch(`/question/questions/${question.id}/`, question, {
    headers: {
      Authorization: `token ${localStorage.token}`
    }
  })
  return res.data
}