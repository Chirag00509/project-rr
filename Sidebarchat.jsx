import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';

const Sidebarchat = ({id, name , addNewChat}) => {
    
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');



    useEffect(()=>{
       
        setSeed(Math.floor(Math.random() * 500))
    },[])

    useEffect(()=>{
        if(id){
        db.collection('rooms').
        doc(id).
        collection('messages')
        .orderBy('time','desc').
        onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(
                (doc)=>
                doc.data()
            ))
        ))
        }
    },[id]);

    const CreateChat = () => {
        const roomname = prompt('Please Enter the name of the chat room');

        if(roomname){
            db.collection('rooms').add({
                name:roomname,
            })
        }
    }


    return !addNewChat ? (
        <>
           <Link to = {`/rooms/${id}`}>
           <div className="sidebar-chat">
               <Avatar className='avtar' src= { `https://avatars.dicebear.com/api/human/${seed}.svg`} />
               <div className="sidebarchat-info">
                   <h2> {name} </h2>
                   <p>
                       {messages[0]?.message}
                   </p>
               </div>
           </div> 
           </Link>
        </>
    ) : (
        <div className='sidebar-chat' onClick={CreateChat}>
            <h2 className='mx-5'>Add New Chat</h2>
        </div>
    )
}

export default Sidebarchat
