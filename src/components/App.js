import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login';
import './App.css';
import Nav from './Nav';
import Create from './Create';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div>
        <Login />
        <Create />
      </div>
    )
  }
}

const mapStateToProps = ({authedUser, users, questions}) => {
  
  return {
    authedUser: authedUser,
    users: users,
    questions: questions
  }
}

export default connect(mapStateToProps)(App);