import React, { useState, useEffect } from 'react'
import { asyncGetAnswers, asyncPatchAnswer } from '../api/AnswerAPI'
import { asyncGetProfile } from '../api/UserAPI'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';


const Answer: React.FC = () => {
  interface ANSWER {
    id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  interface USER_PROFILE {
    id: number;
    username: string;
    email: string;
    answers: [{id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;}]
  }

  const [answers, setAnswers] = useState<ANSWER[]>([])
  const [myAnswers, setMyAnswers] = useState<USER_PROFILE | null>()
  const [editAnswer, setEditAnswer] = useState('')
  const [editId, setEditId] = useState(0)

  const getAnswers = async () => {
    const result = await asyncGetAnswers()
    setAnswers(result)
  }

  const getMyAnswers = async () => {
    const result = await asyncGetProfile()
    setMyAnswers(result)
  }

  const updateAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchAnswer({id: editId ,answer_text: editAnswer})
    setEditId(0)
    setEditAnswer('')
  }

  useEffect(() => {
    getAnswers()
    getMyAnswers()
  }, [editId])

  return (
    <div>
      <h3>Answer</h3>
      <h4>回答一覧</h4>
      { answers.map(answer => <li key={answer.id}>回答: {answer.answer_text}({answer.owner_name})</li>)}
      <h4>投稿</h4>
      {
        myAnswers !== null ?
        <div>
          {myAnswers?.answers.map(answer=>
            <ul key={answer.id}>
              {editId === answer.id ?
                <form onSubmit={updateAnswer} key={editId}>
                  <div>
                    <input type="text" value={editAnswer} onChange={(e) => setEditAnswer(e.target.value)} />
                  </div>
                  <button type="submit">更新</button>
                </form>
                :  <li key={answer.id}>{answer.answer_text}</li>
              }
              <li><EditOutlinedIcon onClick={() => {setEditId(answer.id); setEditAnswer(answer.answer_text);}}/></li>
            </ul>
          )}
        </div> : "まだ投稿はありません。"
      }

    </div>
  )
}

export default Answer
