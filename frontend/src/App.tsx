import React from 'react'
import Login from './components/Login'
import QuestionAppAPI from './components/QuestionAppApi'

const App: React.FC = () => {

  const Logout = () => {
    localStorage.removeItem("token")
  }

  return (
    <div>
      <QuestionAppAPI />
      <Login />
      <button onClick={Logout}>ログアウト</button>
    </div>
  )
}


export default App;