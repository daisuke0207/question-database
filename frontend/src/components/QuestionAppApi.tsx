import React, {useState, useEffect} from 'react'
import axios from 'axios'

const QuestionAppAPI: React.FC = () => {

  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/question/questions/')
      .then(res => {setQuestions(res.data)})
    
    axios.get('http://127.0.0.1:8000/question/answers/')
      .then(res => {setAnswers(res.data)})
  }, [])

  return (
    <>
      <div>
        <h2>質問一覧</h2>
        <ul>
          {
            questions.map(question => <li key={question.id}>{question.id}:{question.text}-{question.create_at}</li>)
          }
        </ul>
        <h2>回答一覧</h2>
        <ul>
          {
            answers.map(answer => <li key={answer.id}>{answer.id}:{answer.text}-{answer.create_at}</li>)
          }
        </ul>
      </div>
    </>
  )
}

export default QuestionAppAPI
