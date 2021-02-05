import React, { useState } from 'react'
import { asyncCreateQuestion } from '../api/QuestionAPI'

const Question: React.FC = () => {
  const [questionText, setQuestionText] = useState("")

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncCreateQuestion({question_text: questionText})
    setQuestionText("")
  }

  return (
    <div>
      <h3>Question</h3>
      <form onSubmit={postQuestion}>
        <div>
          <label>質問文: </label>
          <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
        </div>
        <button type="submit">投稿</button>
      </form>

    </div>
  )
}

export default Question
