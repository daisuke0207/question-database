import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Auth from './components/Auth'
import MainPage from './components/MainPage'
import { asyncGetProfile } from './api/UserAPI'
import { UserContext }  from './contexts/UserContext'


const App: React.FC = () => {
  interface USER_PROFILE {
    id: number;
    username: string;
    email: string;
    questions: [{id: number; question_text: string; owner: number; owner_name: string; created_at: number; updated_at: number;}]
  }

  const [profile, setProfile] = useState<USER_PROFILE>()

  const userProfile = async () => {
    const result: USER_PROFILE = await asyncGetProfile()
    setProfile(result)
  }

  useEffect(() => {
    userProfile()
  }, [])

  return (
    <UserContext.Provider value={profile ? profile : null}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/question" component={MainPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  )
}


export default App;