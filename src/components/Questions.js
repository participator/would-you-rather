import React from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'

const Questions = (props) => {
    const { questionList } = props

    const handleClick = (event, id) => {
        // Route to Details view
        // questions/:question_id
    }

    return (
        <div>
            {
                questionList && questionList.map(({ author, id, time, optionOne, optionTwo }) => {
                    const { avatarURL, name } = author

                    return (
                        <div key={id} onClick={(event, id) => handleClick(event, id)}>
                            Would You Rather
                            <Profile
                                avatarURL={avatarURL}
                                name={name} />
                            <span>Date Asked: {time}</span>
                            <span>A: {optionOne.text}</span>
                            <span>B: {optionTwo.text}</span>
                        </div>
                    )

                })
            }
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { showAnswered }) => {
    console.log('questions', questions, 'showAnswered', showAnswered)
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

    console.log('questionList', questionList)

    return {
        questionList
    }
}

export default connect(mapStateToProps)(Questions)