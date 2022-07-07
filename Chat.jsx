import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useEffect } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';


const Chat = () => {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

     useEffect(() => {

         if (roomId) {
             db.collection('rooms').doc(roomId).
                 onSnapshot(snapshot =>
                     setRoomName(snapshot.data().name))

             db.collection('rooms').doc(roomId).
                 collection('messages').orderBy('time', 'asc').
                 onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                 ))
         }
        }, [roomId]);


    useEffect(() => {

        setSeed(Math.floor(Math.random() * 500))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed : ', input);

        db.collection('rooms').doc(roomId)
        .collection('messages').add({
            message : input,
            name:user.displayName,
            time : firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }




    return (
        <>
            <div className="chat">
                <div className="chat_header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="chat_hederinfo">
                        <h3> {roomName} </h3>
                        <p>
                            Last seen{" "}
                            {
                                new Date(
                                    messages[messages.length - 1]?.time?.toDate()
                                ).toUTCString()
                            }
                        </p>
                    </div>
                    <div className="chat_hederright">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>


                <div className="chat_body">

                    {messages.map((message) => (
                        <p className={`chat_meassage ${message.name === user.displayName && 'chat_reciver'}`}>
                            <span className="chat_name"> {message.name} </span>
                            {message.message}
                            <span className="chat_time"> 
                              { new Date(message.time ?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))}

                </div>

                <div className="chat_footer">
                    <IconButton>
                        <InsertEmoticonIcon />
                    </IconButton>
                    <form>
                        <input type="text"
                            placeholder='Type a meassage.. '
                            value={input}
                            onChange={(e) => { setInput(e.target.value) }}
                        />
                        <Button
                            type="submit"
                            onClick={sendMessage}> <SendIcon /> </Button>
                    </form>
                    <IconButton>
                        <MicNoneIcon />
                    </IconButton>

                </div>
            </div>
        </>
    )
}

export default Chat


