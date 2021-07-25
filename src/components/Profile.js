import React from 'react'

const Profile = (props) => {
    const { avatarURL, name } = props

    return (
        <div>
            <img src={avatarURL} alt="Current User" />
            {name}
        </div>
    )
}

export default Profile