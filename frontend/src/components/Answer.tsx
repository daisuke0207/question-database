import React, { useState, useEffect } from 'react'
import { asyncGetAnswers } from '../api/AnswerAPI'

const Answer: React.FC = () => {
  interface ANSWER {
    id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  const [answers, setAnswers] = useState<ANSWER[]>([])

  const getAnswers = async () => {
    const result = await asyncGetAnswers()
    setAnswers(result)
  }

  useEffect(() => {
    getAnswers()
  }, [])

  return (
    <div>
      <h3>Answer</h3>
      <h4>回答一覧</h4>
      { answers.map(answer => <li key={answer.id}>回答: {answer.answer_text}({answer.owner_name})</li>)}
    </div>
  )
}

export default Answer
