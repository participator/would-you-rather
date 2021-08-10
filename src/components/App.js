import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import './App.css'
import Nav from './Nav'
import Create from './Create'
import Home from './Home'
import Leaderboard from './Leaderboard'
import Question from './Question'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {
    const {
      authedUser
    } = this.props

    return (
      <Router>
        {
          authedUser === '' ?
            null :
            <Nav />
        }
        {
          authedUser === '' ?
            <Login /> :
            <Switch>
              <Route exact path='/' >
                < Home />
              </Route>
              <Route path='/add'>
                <Create />
              </Route>
              <Route path='/leaderboard'>
                <Leaderboard />
              </Route>
              <Route path='/questions/:question_id'
              component={Question} />
            </Switch>
        }

      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }) => {

  return {
    authedUser: authedUser,
    users: users,
    questions: questions
  }
}

export default connect(mapStateToProps)(App);