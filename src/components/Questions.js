import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Profile from './Profile'

const Questions = (props) => {
    const { questions } = props

    return (
        <div>
            {
                questions && questions.map(({ author, id, time, optionOne, optionTwo }) => {
                    const { avatarURL, name } = author

                    return (
                        <Link key={id} to={{
                            pathname: `questions/:${id}`,
                            state: { id: `${id}` }
                        }}>
                            Would You Rather
                            <Profile
                                avatarURL={avatarURL}
                                name={name} />
                            <span>Date Asked: {time}</span>
                            <span>A: {optionOne.text}</span>
                            <span>B: {optionTwo.text}</span>
                        </Link>
                    )

                })
            }
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { showAnswered }) => {
    if (!questions) return {}

    const questionList = Object.values(questions).filter(({ optionOne, optionTwo }) => {
        if (showAnswered) {
            return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
        }
        return !optionOne.votes.includes(authedUser) && !optionTwo.votes.includes(authedUser)
    }).map(({ id, author, timestamp, optionOne, optionTwo }) => {
        const { avatarURL, name } = users[author]

        return {
            id,
            author: {
                avatarURL,
                name
            },
            time: new Date(timestamp).toLocaleDateString(),
            optionOne,
            optionTwo
        }
    })

    return {
        questions: questionList
    }
}

export default connect(mapStateToProps)(Questions)