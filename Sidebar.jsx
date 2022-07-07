import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import './Style.css';
import Sidebarchat from './Sidebarchat';
import db from './firebase';
import { useStateValue } from '../StateProvider';




const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(()=>{
        db.collection('rooms').onSnapshot((snapshot)=>
            setRooms(
                snapshot.docs.map((docs)=> ({
                    id: docs.id,
                    data : docs.data(),
                }))
            )
        )
    })
    return (
        <>
                <div className='sidebar'>
                    <div className='sidebar_hedder'>
                        <Avatar src={user?.photoURL} />
                        <div className='sidebar_right'>
                           <IconButton>
                            <DonutLargeIcon />
                            </IconButton>
                            <IconButton>
                            <MessageIcon />
                            </IconButton>
                            <IconButton>
                            <MoreVertIcon />
                            </IconButton>
                        </div>
                    </div>
                
                 <div className="sidebar_search">
                   <div className='sidebar_SearchContainer'>
                    <SearchIcon />
                    <input type="text" 
                        placeholder='Search or start new chat'
                    />
                </div> 
                </div>

                <div className='sidebar_chats'>
                   <Sidebarchat addNewChat />
                   {
                       rooms.map(room => (
                           <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
                       ))
                   }
                </div>
                </div>
        </>
    )
}

export default Sidebar
