import React, { useState } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Option from './Option'

const Question = (props) => {
    const [selected, setSelected] = useState()

    const [optionOneId, optionTwoId] = [1, 2]

    const {
        authedUser,
        authedUserVoted,
        author = {},
        optionOne = {},
        optionTwo = {},
    } = props

    const { avatarURL, name } = author

    const handleClick = (event) => {
        if (authedUserVoted === false) {
            setSelected(false)

            switch (Number(event.target.id)) {
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

        console.log('submit question response')

        // todo: call api
        // add authedUser to votes for appropriate option
        // update authedUser.answers
    }

    return (
        <div>
            Would You Rather
            <div>
                {/* Question creator */}
                <Profile
                    avatarURL={avatarURL}
                    name={name} />
                <form name="question" onSubmit={(event) => handleSubmit(event)} >
                    <Option
                        optionNumber={optionOneId}
                        voteAmount={optionOne.voteAmount}
                        votePercentage={optionOne.votePercentage}
                        text={optionOne.text}
                        selected={optionOne.selected ?? selected === optionOneId}
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    <Option
                        optionNumber={optionTwoId}
                        voteAmount={optionOne.voteAmount}
                        votePercentage={optionOne.votePercentage}
                        text={optionTwo.text}
                        selected={optionTwo.selected ?? selected === optionTwoId}
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    {!authedUserVoted && <button type="submit">Submit</button>}
                </form>
            </div>
        </div >
    )
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => {
    console.log('id', id)
    const question = questions[id]
    console.log('questions', questions, 'question', question)

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
        author: {
            avatarURL,
            name
        },
        optionOne: {
            selected: optionOneSelected,
            text: optionOne.text,
            voteAmount: optionOneVotes.length,
            votePercentage: optionOneVotes.length / totalVotes
        },
        optionTwo: {
            selected: optionTwoSelected,
            text: optionTwo.text,
            voteAmount: optionTwoVotes.length,
            votePercentage: optionTwoVotes.length / totalVotes
        }
    }
}

export default connect(mapStateToProps)(Question)