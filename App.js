import React, { useState } from 'react'
import './App.css'
import Sidebar from './Componet/Sidebar'
import Chat from './Componet/Chat'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Componet/Login'
import { useStateValue } from './StateProvider'



const App = () => {

    const [{ user }, dispatch] = useStateValue();

    return (
        <>
            <div className="app">
                {(!user) ? (
                    <Login />
                ) : (
                    <div className="app-body">
                        <Router>
                            <Sidebar />
                            <Switch>
                                <Route exact path='/' component={Chat} />
                                <Route exact path='/rooms/:roomId' >
                                    <Chat />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )}
            </div>
        </>
    )
}

export default App;