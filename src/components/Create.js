import React, { useState } from 'react'
import { connect } from 'react-redux'

const Create = (props) => {
    const [aOption, setAOption] = useState('')
    const [aError, setAError] = useState(false)

    const [bOption, setBOption] = useState('')
    const [bError, setBError] = useState(false)

    const { authedUser } = props

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!aOption) {
            setAError(true)
            return
        }

        if (!bOption) {
            setBError(true)
            return
        }

        // Save question
        // add questionId to user's asked 
        // add question to questions
    }

    const handleChange = (event, option) => {
        const { value } = event.target

        switch (option) {
            case 'a':
                setAOption(value)
                setAError(false)
                break;

            case 'b':
                setBOption(value)
                setBError(false)
                break;
        }
    }

    return (
        <div>
            <form onSubmit={(event) => { handleSubmit(event) }} >
                <div>
                    <label htmlFor='a'>A</label>
                    <input
                        id='a'
                        type='text'
                        value={aOption}
                        placeholder='Enter an option'
                        onChange={(event) => handleChange(event, 'a')} />
                    <span style={{ display: aError === false ? 'none' : 'block' }}>Submit an option for A</span>
                </div>
                <div>
                    <label htmlFor='b'>B</label>
                    <input
                        id='b'
                        type='text'
                        value={bOption}
                        placeholder='Enter an option'
                        onChange={(event) => handleChange(event, 'b')} />
                    <span style={{ display: bError === false ? 'none' : 'block' }}>Submit an option for B</span>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Create)