import "./Css/App.css";
import logo from "./img/chat.png";
import { useEffect, useRef, useState } from "react";

//components
import CreateUser from "./components/CreateUser";
import OnlineUser from "./components/OnlineUser";
import Message from "./components/Message";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const App = () => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState({});
    const [reciver, setReciver] = useState("");
    const [media, setMedia] = useState("");
    const [avatar, setAvatar] = useState("");
    const [message, setMessage] = useState("");
    const [groupMessage, setGroupMessage] = useState([]);

    const reciverRef = useRef(null);

    const onCreateUser = () => {
        socket.emit("add_user", username);
        const a = Math.floor(Math.random() * 8) + ".png";
        setAvatar(a)
        setStep((prevStep) => prevStep + 1);
    };

    const onUserSelect = (username) => {
        setReciver(username);
        reciverRef.current = username;
        setStep((prevStep) => prevStep + 1);
    };


    const sortNames = (name1,name2)=>{
        return [name1,name2].join("_");
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const data = {
            sender : username,
            reciver,
            message,
            media,
            avatar
        };
        socket.emit("send_message",data);

        const key = sortNames(username,reciver);
        if(key in groupMessage){
            groupMessage[key].push(data);
        }else {
            groupMessage[key] = [data];
        }
        setMessage(groupMessage);
    }


    useEffect(() => {
        socket.on("all_users", (all_users) => {
            setUsers(all_users);
        });

        socket.on("new_message", (data) => {
            setGroupMessage(old=> {
                const mess = old;
                const key = sortNames(data.sender,data.reciver);

                if(key in mess){
                    mess[key].push(data);
                }else{
                    mess[key] = [data];
                }
                console.log([...mess]);
                return[ ...mess]
            })
        });

    }, []);

    console.log(groupMessage);

    return (
        <div className="App">
            <header className="app-header">
                <img src={logo} alt="" />
                <div className="app-name b-500 primaryColor">My Chat</div>
            </header>

            <div className="chat-system">
                <div className="chat-box">
                    {/* step1:  ask username ro email */}
                    {step === 0 ? (
                        <CreateUser
                            onCreateUser={onCreateUser}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    ) : null}
                    {/* Step2: show all available users */}
                    {step === 1 ? (
                        <OnlineUser
                            onUserSelect={onUserSelect}
                            users={users}
                            username={username}
                        />
                    ) : null}
                    {/* Step3: select user and switch to chat window */}
                    {step === 2 ? (
                        <Message
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sendMessage={sendMessage}
                            groupMessage={groupMessage}
                            sortNames={sortNames}
                            username={username}
                            reciver={reciver}
                        />
                    ) : null}
                </div>

            </div>
                <button onClick={()=>setStep(1)} >c</button>
        </div>
    )
};


export default App;