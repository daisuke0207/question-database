import React, { useState, useEffect, useContext } from 'react'
import { asyncCreateQuestion, asyncGetQuestions, asyncPatchQuestion, asyncDeleteQuestion } from '../api/QuestionAPI'
import { UserContext }  from '../contexts/UserContext'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

const Question: React.FC = () => {
  interface QUESTION {
    id: number; question_text: string; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  const profile = useContext(UserContext)
  const [questions, setQuestions] = useState<QUESTION[]>([])
  const [questionText, setQuestionText] = useState("")
  const [editQuestion, setEditQuestion] = useState("")
  const [getId, setGetId] = useState(0)

  const getQuestions = async () => {
    const result = await asyncGetQuestions()
    setQuestions(result)
   }

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncCreateQuestion({question_text: questionText})
    setQuestionText("")
  }

  const updateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchQuestion({id: getId ,question_text: editQuestion})
    setEditQuestion("")
    setGetId(0)
  }

  const deleteQuestion = async (id: number) => {
    await asyncDeleteQuestion(id)
  }

  useEffect(() => {
    getQuestions()
  }, [getId])

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
      <h4>投稿</h4>
      {
        profile !== null ?
        <div>
          {profile.questions.map(question=>
            <ul key={question.id}>
              {getId === question.id ?
                <form onSubmit={updateQuestion} key={getId}>
                  <div>
                    <input type="text" value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
                  </div>
                  <button type="submit">更新</button>
                </form>
                :  <li key={question.id}>{question.question_text}</li>
              }
              <li><EditOutlinedIcon onClick={() => {setGetId(question.id); setEditQuestion(question.question_text);}}/></li>
              <li><DeleteIcon onClick={() => deleteQuestion(question.id)}/></li>
            </ul>
          )}
        </div> : "まだ投稿はありません。"
      }
    </div>
  )
}

export default Question