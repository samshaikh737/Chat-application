import React from 'react'

function CreateUser({ onCreateUser , value , onChange }) {
    return (
        <div className="username-container">
            <form style={{ display: "inline-block" }} onSubmit={onCreateUser} >
                <h4 className="username-label" >Enter Username</h4>
                <input type="text" value={value} onChange={onChange} className="input" />
            </form>
        </div>
    )
}

export default CreateUser
