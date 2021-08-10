import React from 'react'

const Profile = (props) => {
    const { avatarURL, avatarAltText, className, name } = props

    return (
        <div className={className}>
            <img src={avatarURL} alt={avatarAltText || ''} />
            <div>{name}</div>
        </div>
    )
}

export default Profile