import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { asyncGetProfile } from '../api/UserAPI';
import axios from '../const/axios'


const MainPage: React.FC = () => {

  type PROFILE = {
    id: number;
    username: string;
    email: string;
  }

  const history = useHistory()
  const [profile, setProfile] = useState<PROFILE>()
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])

  const logout = () => {
    localStorage.removeItem("token")
    history.push("/")
  }

  const userProfile = async () => {
    const result = await asyncGetProfile()
    setProfile(result)
  }

  useEffect(() => {
    userProfile()
    axios.get('/question/questions/')
      .then(res => {setQuestions(res.data)})
    
    axios.get('/question/answers/')
      .then(res => {setAnswers(res.data)})
  }, [])

  return (
    <>
      <div>
        {profile !== undefined ? <div>{profile.id} : {profile.username}</div> : "未ログイン"}
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
        { profile !== undefined ?
          <button onClick={logout}>ログアウト</button> :
          <button onClick={() => history.push("/")}>ログイン</button>
        }
      </div>
    </>
  )
}

export default MainPage
