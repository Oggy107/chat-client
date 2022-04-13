import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'

import React from 'react'

import UserContext, { UserProvider } from './context/user'
import Login from './pages/auth/Login'

import { API_KEY } from './constants'

const client = StreamChat.getInstance(API_KEY)

// const token = localStorage.getItem('token')
// console.log(token)
// const localUser = localStorage.getItem('user')

const App = () => {
    const userContext = React.useContext(UserContext)

    return (
        <UserProvider>
            {!userContext.user ?
                <Login /> : 
                <Chat client={client}>
                    <h1>hey there</h1>
                </Chat>
            }
        </UserProvider>
    )
}

export default App
