import React, { useState } from 'react'
import Title from "./Title"
import Questions from './Questions'
import "./App.css"

const Home = () => {
    const [showAnswered, setShowAnswered] = useState(true)

    const handleClick = (event) => {
        const { innerHTML: value } = event.target

        setShowAnswered(value === 'Answered')
    }

    return (
        <div>
            <Title tag="h1">Home</Title>
            <div>
                <button
                    className={showAnswered === true ? "selected" : null}
                    onClick={(event) => handleClick(event)}>
                    Answered
                </button>
                <button
                    className={showAnswered === false ? "selected" : null}
                    onClick={(event) => handleClick(event)}>
                    Unanswered
                </button>
                <Questions showAnswered={showAnswered} />
            </div>

        </div>
    )
}

export default Home