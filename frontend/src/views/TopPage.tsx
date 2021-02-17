import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import Question from '../components/Question';
import { UserContext } from '../contexts/UserContext'
import styled from 'styled-components'


const TopPageHeader = styled.header`
  background-color: #323232;
  color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Username = styled.div`
  color: #fff;
  padding: 10px;
  margin-right: 100px;
`

const LogoutButton = styled.div`
  color: #fff;
  padding: 10px;
  margin-left: 100px;
`

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
          <TopPageHeader>
            {profile !== undefined ? <Username>{profile.username}</Username> : "未ログイン"}
            <h1>QA Database</h1>
            { profile !== null ?
            <LogoutButton onClick={logout}>ログアウト</LogoutButton> :
            <button onClick={() => history.push("/")}>ログイン</button>
            }
          </TopPageHeader>
          <Question />
        </div>
      </>
  )
}


export default MainPage