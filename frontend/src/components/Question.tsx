import React, { useState, useEffect, useContext } from 'react'
import { asyncCreateQuestion, asyncGetQuestions, asyncPatchQuestion, asyncDeleteQuestion } from '../api/QuestionAPI'
import { asyncGetAnswers, asyncDeleteAnswer, asyncPatchAnswer } from '../api/AnswerAPI'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../contexts/UserContext'


const Question: React.FC = () => {
  interface QUESTION {
    id: number; question_text: string; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  interface ANSWER {
    id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  const profile = useContext(UserContext)
  const [questions, setQuestions] = useState<QUESTION[]>([])
  const [myQuestions, setMyQuestions] = useState<QUESTION[]>([])
  const [questionText, setQuestionText] = useState("")
  const [editQuestion, setEditQuestion] = useState("")
  const [questionEditId, setQuestionEditId] = useState(0)
  const [questionDeleteId, setQuestionDeleteId] = useState(0)

  const [answers, setAnswers] = useState<ANSWER[]>([])
  const [editAnswer, setEditAnswer] = useState("")
  const [answerText, setAnswerText] = useState("")
  const [answerEditId, setAnswerEditId] = useState(0)
  const [answerDeleteId, setAnswerDeleteId] = useState(0)

  const getQuestions = async () => {
    const result: QUESTION[] = await asyncGetQuestions()
    const tmp: QUESTION[] = result.filter(q => q.owner === profile?.id)
    setQuestions(result)
    setMyQuestions(tmp)
   }

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncCreateQuestion({question_text: questionText})
    setQuestionText("")
  }

  const updateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchQuestion({id: questionEditId, question_text: editQuestion})
    setEditQuestion("")
    setQuestionEditId(0)
  }

  const deleteQuestion = async (id: number) => {
    await asyncDeleteQuestion(id)
    setQuestionDeleteId(id)
  }


  const getAnswers = async () => {
    const result: ANSWER[] = await asyncGetAnswers()
    setAnswers(result)
  }

  const check_match_qa_id = (questionId: number, answerId: number) => {
    if (questionId === answerId){
      return true
    }
    return false
  }

  const updateAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchAnswer({id: answerEditId, answer_text: editAnswer})
    setEditAnswer("")
    setAnswerEditId(0)
  }

  const deleteAnswer = async (id: number) => {
    await asyncDeleteAnswer(id)
    setAnswerDeleteId(id)
  }

  useEffect(() => {
    getQuestions()
    getAnswers()
  }, [questionEditId, questionDeleteId, questionText, profile, answerDeleteId, answerEditId, answerText])

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
      <div>
        {
          questions.map(question =>
          <ul key={question.id}>
            <li key={question.id}>{question.owner_name}: {question.question_text} ({question.created_at})</li>
            <div>
              {answers.map(answer => 
                check_match_qa_id(question.id, answer.question) ?
                <div key={answer.id}>
                  {answerEditId === answer.id ?
                    <form onSubmit={updateAnswer} key={answerEditId}>
                      <div>
                        <input type="text" value={editAnswer} onChange={(e) => setEditAnswer(e.target.value)} />
                      </div>
                      <button type="submit">更新</button>
                    </form>
                    : <li key={answer.id}>回答 : {answer.owner_name}: {answer.answer_text}</li>
                  }
                  <li>
                    {answer.owner === profile?.id ?
                      <div>
                        <EditOutlinedIcon onClick={() => {setAnswerEditId(answer.id); setEditAnswer(answer.answer_text);}}/>
                        <DeleteIcon onClick={() => deleteAnswer(answer.id)}/>
                      </div>
                      : null
                    }
                  </li>
                </div>
                : null
              )}
            </div>
          </ul>
          )
        }
      </div>
      <h4>投稿</h4>
      {
        myQuestions !== null ?
        <div>
          {myQuestions.map(question=>
            <ul key={question.id}>
              {questionEditId === question.id ?
                <form onSubmit={updateQuestion} key={questionEditId}>
                  <div>
                    <input type="text" value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
                  </div>
                  <button type="submit">更新</button>
                </form>
                :  <li key={question.id}>{question.question_text}</li>
              }
              <li><EditOutlinedIcon onClick={() => {setQuestionEditId(question.id); setEditQuestion(question.question_text);}}/></li>
              <li><DeleteIcon onClick={() => deleteQuestion(question.id)}/></li>
            </ul>
          )}
        </div> : "まだ投稿はありません。"
      }
    </div>
  )
}

export default Question