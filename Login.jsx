import { Button } from '@material-ui/core'
import React from 'react'
import { actionType } from '../reducer'
import { useStateValue } from '../StateProvider'
import { auth, provider } from './firebase'

const Login = () => {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).
        then((result)=> {
            dispatch({
                type:actionType.SET_USER,
                user : result.user,
            })
        }).
        catch((error)=>alert(error.massage));
    }
    return (
        <>
           <div className="login">
               <div className="login_container">
                   <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" 
                   alt="WhatsApp Logo" />
                   <div className="login_text">
                       <h1>Sign in the WhatsApp</h1>
                   </div>
                   <Button onClick={signIn}>SIGN IN WITH GOOGLE</Button>
               </div>
           </div> 
        </>
    )
}

export default Login
