import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login';
import Home from './Home';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div>
        <Login />
        <Home />
      </div>
    )
  }
}

const mapStatetoProps = ({authedUser, users, questions}) => {
  
  return {
    authedUser: authedUser,
    users: users,
    questions: questions
  }
}

export default connect(mapStatetoProps)(App);