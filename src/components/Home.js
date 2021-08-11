import React, { useState } from 'react'
import Title from './Title'
import Questions from './Questions'
import './Home.css'

const Home = () => {
    const [showAnswered, setShowAnswered] = useState(true)

    const handleClick = (event) => {
        const { innerHTML: value } = event.target

        setShowAnswered(value === 'Answered')
    }

    return (
        <div className='Home'>
            <Title tag="h1">Home</Title>
            <div className='Home-categories'>
                <button
                    className={`Home-category ${showAnswered === true ? 'Home-category-selected' : null}`}
                    onClick={(event) => handleClick(event)}>
                    Answered
                </button>
                <button
                    className={`Home-category ${showAnswered === false ? 'Home-category-selected' : null}`}
                    onClick={(event) => handleClick(event)}>
                    Unanswered
                </button>
            </div>
            Would You Rather
            <Questions showAnswered={showAnswered} />
        </div>
    )
}

export default Home