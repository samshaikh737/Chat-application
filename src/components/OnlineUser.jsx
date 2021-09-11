import React from 'react'

function OnlineUser({ onUserSelect, users, username }) {
    return (
        <div>
            <div className="online-users-header">
                <div style={{ marginLeft: "10px" }} >Online User</div>
            </div>

            <ul className="users-list">
                {
                    users ? Object.keys(users).map((user) => {
                        if (user !== username) {
                            return <li key={user} onClick={()=>onUserSelect(user)} >
                                <span>{user}</span>
                                <span className="new-message-count">3</span>
                            </li>
                        }
                    }) : <span>No User Found</span>
                }
            </ul>
        </div>
    )
}

export default OnlineUser
