import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { _saveQuestion } from '../utils/_DATA'
import { saveQuestion } from '../actions/questions'
import { saveUserQuestionAsked } from '../actions/users'
import Title from './Title'
import './Create.css'

const Create = (props) => {
    const history = useHistory()
    const [optionOne, setOptionOne] = useState('')
    const [errorOne, setErrorOne] = useState(false)

    const [optionTwo, setOptionTwo] = useState('')
    const [errorTwo, setErrorTwo] = useState(false)

    const { authedUser, dispatch, questions } = props

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!optionOne && !optionTwo) {
            setErrorOne(true)
            setErrorTwo(true)
            return
        }

        if (!optionOne) {
            setErrorOne(true)
            return
        }

        if (!optionTwo) {
            setErrorTwo(true)
            return
        }

        const question = {
            author: authedUser,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        }

        // Save question on DB and UI
        _saveQuestion(question).then(question => {
            const { id: questionId } = question
            dispatch(saveQuestion(authedUser, question, questions))
            dispatch(saveUserQuestionAsked(authedUser, questionId))
            history.push('/')
        }).catch(error => console.log('[Error]:', error))
    }

    const handleChange = (event, option) => {
        const { value } = event.target

        switch (option) {
            case 'a':
                setOptionOne(value)
                setErrorOne(false)
                break;

            case 'b':
                setOptionTwo(value)
                setErrorTwo(false)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Title tag='h1'>Create</Title>
            <div className='Create'>
                <Title tag='h2' className='Create-subtitle'>Would You Rather</Title>
                <form onSubmit={(event) => { handleSubmit(event) }} >
                    <div className='Create-option'>
                        <label className='Create-option-label' htmlFor='a'>A</label>
                        <input
                            id='a'
                            type='text'
                            value={optionOne}
                            placeholder='Enter an option'
                            onChange={(event) => handleChange(event, 'a')} />
                        <span style={{ display: errorOne === false ? 'none' : 'block' }}>Submit an option for A</span>
                    </div>
                    <div className='Create-option'>
                        <label className='Create-option-label' htmlFor='b'>B</label>
                        <input
                            id='b'
                            type='text'
                            value={optionTwo}
                            placeholder='Enter an option'
                            onChange={(event) => handleChange(event, 'b')} />
                        <span style={{ display: errorTwo === false ? 'none' : 'block' }}>Submit an option for B</span>
                    </div>
                    <button
                        className='Create-submit'
                        type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        authedUser,
        questions
    }
}

export default connect(mapStateToProps)(Create)