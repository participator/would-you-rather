import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavElement from './NavElement'
import Profile from './Profile'

class Nav extends Component {
    render() {
        const { name, avatarURL } = this.props

        return (
            <div>
                <ul>
                    <NavElement label="Home" />
                    <NavElement label="Leaderboard" />
                    <NavElement label="Create" />
                </ul>
                {
                    (name && avatarURL) &&
                    <Profile name={name} avatarURL={avatarURL} />
                }
            </div>
        )
    }
}

const mapStatetoProps = ({ authedUser, users }) => {
    if (!users || !users[authedUser]) return {}

    const user = users[authedUser]
    const { name, avatarURL } = user

    return {
        name,
        avatarURL: avatarURL.replace('{username}', name)
    }
}

export default connect(mapStatetoProps)(Nav)