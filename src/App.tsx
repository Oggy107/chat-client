import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'

import { UserProvider } from './context/user'
import Login from './pages/auth/Login'

import { API_KEY } from './constants'

const client = StreamChat.getInstance(API_KEY)

const token = localStorage.getItem('token')
// console.log(token)

const App = () => {
    return (
        <UserProvider>
            {!token ?
                <Login /> : 
                <Chat client={client}>
                    <h1>hey there</h1>
                </Chat>
            }
        </UserProvider>
    )
}

export default App
