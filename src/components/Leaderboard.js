import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'

const Leaderboard = (props) => {
    const { users } = props

    console.log('users', users)

    return (
        <div>
            {
                users ?
                    users.map(({ answered, asked, avatarURL, id, name }) => (
                        <div key={id}>
                            <Profile
                                avatarURL={avatarURL}
                                name={name} />
                            <div>
                                <span>Asked: {asked}</span>
                                <span>Answered: {answered}</span>
                            </div>
                            <div>{asked + answered}</div>
                        </div>
                    )) :
                    null
            }
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    if (users === undefined) return {}

    users = Object.values(users).map(({ answers, avatarURL, id, name, questions }) => ({
        answered: Object.keys(answers).length,
        asked: questions.length,
        avatarURL,
        id,
        name
    }))

    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)