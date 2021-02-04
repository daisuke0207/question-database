import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Auth from './components/Auth'
import MainPage from './components/MainPage'


const App: React.FC = () => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/question" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}


export default App;