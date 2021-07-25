import React, { useState } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Option from './Option'

const Question = (props) => {
    const {
        authedUser,
        authedUserVoted,
        author,
        optionOne,
        optionTwo,
     } = props
     const { avatarURL, name } = author

    const [oneSelected, setOneSelected] = useState(false)
    const [twoSelected, setTwoSelected] = useState(false)

    const [optionOneId, optionTwoId] = [1, 2]

    const handleClick = (event) => {
        if (authedUserVoted === false) {
            setOneSelected(false)
            setTwoSelected(false)

            switch (Number(event.target.id)) {
                case optionOneId:
                    setOneSelected(true)
                    break;

                case optionTwoId:
                    setTwoSelected(true)
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
                        selected={optionOne.selected ?? oneSelected}
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    <Option
                        optionNumber={optionTwoId}
                        voteAmount={optionOne.voteAmount}
                        votePercentage={optionOne.votePercentage}
                        text={optionTwo.text}
                        selected={optionTwo.selected ?? twoSelected}
                        statsShow={authedUserVoted}
                        onClick={(event) => handleClick(event)} />
                    <button type="submit" disabled={authedUserVoted}>Submit</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }, id) => {
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