import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import Question from '../components/Question';
import { UserContext } from '../contexts/UserContext'

const MainPage: React.FC = () => {

  const profile = useContext(UserContext)
  const history = useHistory()

  const logout = () => {
    localStorage.removeItem("token")
    history.push("/")
  }

  return (
      <>
        <div>
          {profile !== null ? <div>{profile.id} : {profile.username}</div> : "未ログイン"}
          <Question />
          { profile !== null ?
            <button onClick={logout}>ログアウト</button> :
            <button onClick={() => history.push("/")}>ログイン</button>
          }
        </div>
      </>
  )
}


export default MainPage