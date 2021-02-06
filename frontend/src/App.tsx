import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Auth from './components/Auth'
import MainPage from './components/MainPage'
import { asyncGetProfile } from './api/UserAPI'
import { UserContext }  from './contexts/UserContext'


const App: React.FC = () => {
  const [profile, setProfile] = useState<any>()

  const userProfile = async () => {
    const result = await asyncGetProfile()
    setProfile(result)
  }

  useEffect(() => {
    userProfile()
  }, [])

  return (
    <UserContext.Provider value={profile}>
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