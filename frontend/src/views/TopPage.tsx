import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import Question from '../components/Question';
import { UserContext } from '../contexts/UserContext'
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';

// const StyledButton = styled(Button)`
//   background-color: #6772e5;
//   color: #fff;
//   box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
//   padding: 7px 14px;
//   &:hover {
//     background-color: #5469d4;
//   }
// `;

// const TopPageHeader = styled.header`
//   backgroud-color: #000
//   color: #fff
// `

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
          <header>
            {profile !== undefined ? <div>{profile.id} : {profile.username}</div> : "未ログイン"}
            { profile !== null ?
            <button onClick={logout}>ログアウト</button> :
            <button onClick={() => history.push("/")}>ログイン</button>
            }
          </header>
          <Question />
        </div>
      </>
  )
}


export default MainPage