import React, { useState, useEffect, useContext } from 'react'
import { asyncGetAnswers, asyncPatchAnswer, asyncDeleteAnswer, asyncCreateAnswer } from '../api/AnswerAPI'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../contexts/UserContext'



const Answer: React.FC = () => {
  interface ANSWER {
    id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  const profile = useContext(UserContext)
  const [answers, setAnswers] = useState<ANSWER[]>([])
  const [myAnswers, setMyAnswers] = useState<ANSWER[]>([])
  const [editAnswer, setEditAnswer] = useState('')
  const [editId, setEditId] = useState(0)
  const [deleteId, setDeleteId] = useState(0)


  const getAnswers = async () => {
    const result: ANSWER[] = await asyncGetAnswers()
    const tmp: ANSWER[] = result.filter(q => q.id === profile?.id)
    setAnswers(result)
    setMyAnswers(tmp)
  }

  const updateAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchAnswer({id: editId ,answer_text: editAnswer})
    setEditId(0)
    setEditAnswer('')
  }

  const deleteAnswer = async (id: number) => {
    await asyncDeleteAnswer(id)
    setDeleteId(id)
  }

  useEffect(() => {
    getAnswers()
  }, [editId, deleteId, profile])

  return (
    <div>
      <h3>Answer</h3>
      <h4>回答一覧</h4>
      { answers.map(answer => <li key={answer.id}>回答: {answer.answer_text}({answer.owner_name})</li>)}
      <h4>投稿</h4>
      {
        myAnswers !== undefined ?
        <div>
          {myAnswers.map(answer=>
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
              <li><DeleteIcon onClick={() => deleteAnswer(answer.id)}/></li>

            </ul>
          )}
        </div> : "まだ投稿はありません。"
      }

    </div>
  )
}

export default Answer
