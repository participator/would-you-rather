import React, { Component } from 'react'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        const { name, avatarURL } = this.props

        return (
            <div>
                <ul>
                    <li>Home</li>
                    <li>Leaderboard</li>
                    <li>New</li>
                    <li>
                        <img src={avatarURL} alt="Current User" />
                        {name}
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStatetoProps = ({ authedUser, users }) => {
    const user = users.length ? users[authedUser] : null

    if (user) {
        const { avatarURL, name } = user
    
        return {
            name,
            avatarURL
        }
    }

    return {}
}

export default connect(mapStatetoProps)(Nav)