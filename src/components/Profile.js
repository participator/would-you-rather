import React from 'react'

const Profile = (props) => {
    const { avatarURL, name } = props

    return (
        <div>
            <img src={avatarURL} alt="User that asked this question" />
            <div>{name}</div>
        </div>
    )
}

export default Profile