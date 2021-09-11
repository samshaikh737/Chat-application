import React from 'react'
import sendIcon from "../img/send.png";
import attachment from "../img/paper-clip.png";

function Message({ sendMessage, onChange, value, groupMessage, sortNames, username, reciver }) {
    const messages = groupMessage && groupMessage[sortNames(username, reciver)];
    return (
        <div>
            <div className="online-user-header">
                <div style={{ marginLeft: "10px" }} >Online User</div>
            </div>
            <div className="message-area">
                <ul>
                    {
                        messages && messages.length > 0 && messages.map((msg, index) => {
                            return <li key={index} >
                                <div className="user-pic" >
                                    <img src={require(`../users_img/${msg.avatar !== "0.png" ? msg.avatar : "0.png"}`).default} alt="user-img" />
                                </div>
                                <div className="message-text">{msg.message}</div>
                            </li>
                        })
                    }

                </ul>
            </div>
            <form className="message-control" onSubmit={sendMessage} >
                <textarea placeholder="Type something...." value={value} onChange={onChange} />
                <div className="file-input-container" >
                    <input type="file" hidden id="hidden-file" />
                    <label for="hidden-file" >
                        <img width="20" src={attachment} alt="attachment" />
                    </label>
                </div>
                <button>
                    <img src={sendIcon} alt="send-icon" />
                    <span style={{ display: "inline-block" }} >Send</span>
                </button>
            </form>

        </div>
    )
}

export default Message
