import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Nav.css'
import NavElement from './NavElement'
import Profile from './Profile'

class Nav extends Component {
    render() {
        const { name, avatarURL } = this.props

        return (
            <header className='Nav'>
                <img 
                    src='../logo.png'
                    alt='Would You Rather'
                    className='Nav-logo' />
                <ul className='Nav-menu'>
                    <NavElement label="Home" url='/' />
                    <NavElement label="Leaderboard" url='/leaderboard' />
                    <NavElement label="Create" url='/add' />
                    <NavElement label="SignOut" url='/' />
                </ul>
                {
                    (name && avatarURL) &&
                    <Profile name={name} avatarURL={avatarURL} />
                }
            </header>
        )
    }
}

const mapStatetoProps = ({ authedUser, users }) => {
    if (!users || !users[authedUser]) return {}

    const user = users[authedUser]
    const { name, avatarURL } = user

    return {
        name,
        avatarURL: avatarURL.replace('{username}', name)
    }
}

export default connect(mapStatetoProps)(Nav)