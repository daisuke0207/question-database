import React from 'react'
import Login from './components/Login'
import QuestionAppAPI from './components/QuestionAppApi'

const App: React.FC = () => {
  return (
    <div>
      <QuestionAppAPI />
      <Login />
    </div>
  )
}


export default App;