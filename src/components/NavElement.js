import React from 'react'

const NavElement = ({ label, url }) => {
    const handleClick = (event) => {
        const { id } = event.target

        // todo: Route to page
        console.log('[NavElement clicked]', 'Route to', id)
    }

    return (
        <li id={label} className="nav-element" onClick={(event) => handleClick(event)} >
            {label}
        </li>
    )
}

export default NavElement