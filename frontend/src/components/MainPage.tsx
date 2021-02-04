import React, {useState, useEffect} from 'react'
import axios from '../const/axios'


const MainPage: React.FC = () => {

  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])

  const Logout = () => {
    localStorage.removeItem("token")
  }

  useEffect(() => {
    axios.get('/question/questions/')
      .then(res => {setQuestions(res.data)})
    
    axios.get('/question/answers/')
      .then(res => {setAnswers(res.data)})
  }, [])

  return (
    <>
      <div>
        <h2>質問一覧</h2>
        <ul>
          {
            questions.map(question => <li key={question.id}>{question.id}: {question.question_text} ({question.created_at})</li>)
          }
        </ul>
        <h2>回答一覧</h2>
        <ul>
          {
            answers.map(answer => <li key={answer.id}>{answer.id}: {answer.answer_text} ({answer.created_at})</li>)
          }
        </ul>
        <button onClick={Logout}>ログアウト</button>
      </div>
    </>
  )
}

export default MainPage
