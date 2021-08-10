import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { handleUnsetAuthedUser } from '../actions/authedUser'
import './NavElement.css'

const NavElement = ({ label, signOut, url }) => {
    const history = useHistory()

    const handleClick = (event) => {
        const { id } = event.target

        switch (id) {
            case 'Home':
            case 'Leaderboard':
            case 'Create':
                history.push(`${url}`)
                break
            case 'SignOut':
                history.push(`${url}`)
                signOut()
                break
            default:
                break;
        }
    }

    return (
        <li id={label} className="Nav-element" onClick={(event) => handleClick(event)} >
            {label}
        </li>
    )
}

const mapStateToProps = ({ authedUser }) => ({ authedUser })

const mapDispatchToProps = (dispatch) => ({

    signOut: () => dispatch(handleUnsetAuthedUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavElement)
