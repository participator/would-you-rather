import React from 'react'
import { connect } from 'react-redux'
import Title from './Title'
import Profile from './Profile'
import './Leaderboard.css'

const Leaderboard = (props) => {
    const { users } = props

    return (
        <div>
            <Title tag='h1'>Leaderboard</Title>
            {
                users ?
                    users.map(({ answered, asked, avatarURL, id, name }) => (
                        <div className='Leaderboard-user' key={id}>
                            <Profile
                            className='Leaderboard-profile'
                                avatarURL={avatarURL}
                                name={name} />
                            <div className='Leaderboard-user-stats'>
                                <span>Asked: {asked}</span>
                                <span>Answered: {answered}</span>
                            </div>
                            <div className='Leaderboard-user-score'>{asked + answered}</div>
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
    })).sort((a, b) => {
        const aScore = a.answered + a.asked
        const bScore = b.answered + b.asked
        if (aScore > bScore) return -1
        else return 1
    })

    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)