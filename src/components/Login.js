import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authedUser: '',
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
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select name="users" required defaultValue={selected} onChange={(event) => this.handleChange(event)}>
                    <option value="" disabled>Select a User to Login</option>
                    {usersIdName && usersIdName.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={ selected === ''}>Login</button>
            </form>
        )
    }
}

const mapStatetoProps = ({ users }) => {
    const usersIdName = Object.keys(users).map(userId => ({
        id: users[userId].id,
        name: users[userId].name
    })).sort((a, b) => {
        if (a.name < b.name) return -1
        else return 1
    })

    return {
        usersIdName
    }
}

export default connect(mapStatetoProps)(Login)