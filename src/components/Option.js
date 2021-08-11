import React from 'react'
import { FiSquare, FiCheckSquare } from 'react-icons/fi'
import './Option.css'

const Option = (props) => {
    const {
        optionId,
        voteAmount,
        votePercentage,
        text,
        selected,
        statsShow,
        onClick } = props

    const handleClick = (event) => {
        event.stopPropagation()
        props.onClick(optionId)
    }

    return (
        <div
            className='Option'
            id={optionId}
            onClick={onClick}>
            <div
                className='Option-option'
                onClick={handleClick}>
                {
                    selected === true ?
                        <FiCheckSquare /> :
                        <FiSquare />
                }
                <span
                    onClick={handleClick}>
                        {text}
                    </span>
            </div>
            {
                statsShow === true ?
                    <div className='Option-stats'>
                        <p>Number of Votes: {voteAmount}</p>
                        <p>Percentage of Votes: {votePercentage}%</p>
                    </div> :
                    null
            }
        </div>
    )
}

export default Option