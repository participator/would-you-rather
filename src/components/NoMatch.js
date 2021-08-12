import React from 'react'
import { Link } from 'react-router-dom'
import './NoMatch.css'

const NoMatch = () => {
    return (
        <div>
            <img
            className='NoMatch-logo'
            src='../logo.png'
            alt='logo' />
            <p className='NoMatch-description'>
                <span className='NoMatch-error'>404</span> Wow! You have done the impossible and reached a page that does not exist.
                To return to the land of the known, select a link in the navigation menu or <Link to='/'>Click to return to the Home page</Link>
            </p>
        </div>
    )
}

export default NoMatch