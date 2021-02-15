import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Auth from './views/Auth'
import TopPage from './views/TopPage'
import { asyncGetProfile } from './api/UserAPI'
import { UserContext }  from './contexts/UserContext'


const App: React.FC = () => {
  interface USER_PROFILE {
    id: number;
    username: string;
    email: string;
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
    <UserContext.Provider value={profile ? profile : undefined}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/question" component={TopPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  )
}


export default App;