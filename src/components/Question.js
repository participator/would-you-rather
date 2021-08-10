import React, { useState } from 'react'
import { connect } from 'react-redux'
import { _saveQuestionAnswer } from '../utils/_DATA'
import { saveQuestionAnswer } from '../actions/questions'
import { saveUserQuestionAnswer } from '../actions/users'
import Title from './Title'
import Profile from './Profile'
import Option from './Option'

const Question = (props) => {
    const [selected, setSelected] = useState(false)

    const [optionOneId, optionTwoId] = ['optionOne', 'optionTwo']

    const {
        authedUser,
        authedUserVoted,
        id,
        dispatch,
        author = {},
        optionOne = {},
        optionTwo = {},
    } = props

    const { avatarURL, name } = author

    const handleClick = (event) => {
        if (authedUserVoted === false) {
            switch (event.target.id) {
                case optionOneId:
                    setSelected(optionOneId)
                    break;

                case optionTwoId:
                    setSelected(optionTwoId)
                    break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('Submit question response for', authedUser)

        const answer = selected === optionOneId ?
            optionOneId :
            selected === optionTwoId &&
            optionTwoId

        // todo: call api
        // todo: Update UI: dispatch answerQuestion action
        _saveQuestionAnswer({ authedUser, qid: id, answer}).then(() => {
            console.log('authedUser', authedUser, 'id', id, 'answer', answer)
            const questionId = id
            dispatch(saveQuestionAnswer(authedUser, questionId, answer))
            dispatch(saveUserQuestionAnswer(authedUser, questionId, answer))
        })
    }

    return (
        <div>
            <Title tag='h1'>Would You Rather</Title>
            <div>
                {/* Question creator */}
                <Profile
                    avatarURL={avatarURL}
                    name={name} />
                <form name="question" onSubmit={(event) => handleSubmit(event)} >
                    <Option
                        optionId={optionOneId}
                        voteAmount={optionOne.voteAmount}
                        votePercentage={optionOne.votePercentage}
                        text={optionOne.text}
                        selected={optionOne.selected === optionTwo.selected ?
                            selected === optionOneId :
                            optionOne.selected
                        }
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    <Option
                        optionId={optionTwoId}
                        voteAmount={optionTwo.voteAmount}
                        votePercentage={optionTwo.votePercentage}
                        text={optionTwo.text}
                        selected={optionTwo.selected === optionOne.selected ?
                            selected === optionTwoId :
                            optionTwo.selected
                        }
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    {!authedUserVoted && <button
                        type="submit"
                        disabled={selected === false}
                        onSubmit={event => { handleSubmit(event) }}>Submit</button>}
                </form>
            </div>
        </div >
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { match }) => {
    const id = match.params.question_id.replace(':', '')
    const question = questions[id]

    // check that question exist
    if (question === undefined || users === undefined) return {}

    const { author, optionOne, optionTwo } = question
    const { avatarURL, name } = users[author]
    const optionOneVotes = optionOne.votes
    const optionTwoVotes = optionTwo.votes
    const totalVotes = optionOneVotes.length + optionTwoVotes.length
    const optionOneSelected = optionOneVotes.includes(authedUser)
    const optionTwoSelected = optionTwoVotes.includes(authedUser)
    const authedUserVoted = optionOneSelected || optionTwoSelected

    return {
        authedUser,
        authedUserVoted,
        id,
        author: {
            avatarURL,
            name
        },
        optionOne: {
            selected: optionOneSelected,
            text: optionOne.text,
            voteAmount: optionOneVotes.length,
            votePercentage: (optionOneVotes.length / totalVotes) * 100
        },
        optionTwo: {
            selected: optionTwoSelected,
            text: optionTwo.text,
            voteAmount: optionTwoVotes.length,
            votePercentage: (optionTwoVotes.length / totalVotes) * 100
        }
    }
}

export default connect(mapStateToProps)(Question)