import React, { useState, useEffect } from 'react'
import { asyncCreateQuestion, asyncGetQuestions } from '../api/QuestionAPI'

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [questionText, setQuestionText] = useState("")

  const getQuestions = async () => {
    const result = await asyncGetQuestions()
    setQuestions(result)
   }

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncCreateQuestion({question_text: questionText})
    setQuestionText("")
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      <h3>Question</h3>
      <h4>質問フォーム</h4>
      <form onSubmit={postQuestion}>
        <div>
          <label>質問文: </label>
          <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
        </div>
        <button type="submit">投稿</button>
      </form>
      <h4>質問一覧</h4>
      <ul>
        {
          questions.map(question => <li key={question.id}>{question.owner_name}: {question.question_text} ({question.created_at})</li>)
        }
      </ul>
    </div>
  )
}

export default Question
