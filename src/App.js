import React from 'react'
import './App.scss'
import {Route, Switch} from 'react-router-dom'
import Header from './Components/Header/Header'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Form from './Components/Form/Form'

const App = () => {
  return (
    <div className='app'>
      <Header/>
      <Switch>
        <Route path='/form' component={Form}/>
        <Route path='/dash' component={Dash}/>
        <Route path='/' exact component={Auth}/>
      </Switch>
    </div>
  )
}

export default App