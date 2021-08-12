import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import './Questions.css'

const Questions = (props) => {
    const { questions } = props

    return (
        <div>
            {
                questions && questions.map(({ author, id, time, optionOne, optionTwo }) => {
                    const { avatarURL, name } = author

                    return (
                        <Link className='Questions-question' key={id} to={{
                            pathname: `questions/${id}`,
                            state: { id: `${id}` }
                        }}>
                            <Profile
                                className='Questions-question-profile'
                                avatarAltText='User who asked question'
                                avatarURL={avatarURL}
                                name={name} />
                            <div className='Questions-question-details'>
                                <span>Date Asked: {time}</span>
                                <span className='Questions-question-option'>A {optionOne.text}</span>
                                <span className='Questions-question-option'>B {optionTwo.text}</span>
                            </div>
                        </Link>
                    )

                })
            }
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { showAnswered }) => {
    if (!questions) return {}

    const questionList = Object.values(questions)
    .filter(({ optionOne, optionTwo }) => {
        if (showAnswered) {
            return optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
        }
        return !optionOne.votes.includes(authedUser) && !optionTwo.votes.includes(authedUser)
    })
    .sort((a, b) => { 
        if (a.timestamp > b.timestamp) return -1
        else return 1
    })
    .map(({ id, author, timestamp, optionOne, optionTwo }) => {
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