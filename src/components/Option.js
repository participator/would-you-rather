import React from 'react'
import { FiSquare, FiCheckSquare } from 'react-icons/fi'

const Option = (props) => {
    const {
        optionNumber,
        voteAmount,
        votePercentage,
        text,
        selected,
        statsShow,
        onClick } = props

    return (
        <div id={optionNumber} onClick={onClick}>
            {
                selected === true ?
                    <FiCheckSquare /> :
                    <FiSquare />
            }
            {text}
            {
                statsShow === true ?
                    <div>
                        <p>Number of Votes: {voteAmount}</p>
                        <p>Percentage of Votes: {votePercentage}</p>
                    </div> :
                    null
            }
        </div>
    )
}

export default Option