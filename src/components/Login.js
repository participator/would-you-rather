import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            selected: event.target.value
        })

    }

    handleSubmit(event) {
        event.preventDefault()

        const { selected } = this.state

        // set AuthedUser state in store
        const { dispatch } = this.props
        dispatch(handleSetAuthedUser(selected))

    }

    render() {
        const { usersIdName } = this.props
        const { selected } = this.state

        return (
            <div className='Login-page'>
                <img 
                    src='../logo.png'
                    alt='Would You Rather'
                    className='Login-logo' />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <select
                        required
                        name="users"
                        defaultValue={selected}
                        onChange={(event) => this.handleChange(event)}>
                        <option value="" disabled>Select a User to Login</option>
                        {usersIdName && usersIdName.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <button type="submit" disabled={selected === ''}>Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    const usersIdName = Object.keys(users).map(userId => ({
        id: users[userId].id,
        name: users[userId].name
    })).sort((a, b) => {
        if (a.name < b.name) return -1
        else return 1
    })

    return {
        authedUser,
        usersIdName
    }
}

export default connect(mapStateToProps)(Login)