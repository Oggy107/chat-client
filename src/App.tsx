import React from 'react'
import { Container, Box, CssBaseline, CircularProgress } from '@mui/material'
import { StreamChat } from 'stream-chat'
import { Chat, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react'

import '@stream-io/stream-chat-css/dist/css/index.css'

import { UserContextI } from './types/auth'
import UserContext, { UserProvider } from './context/user'
import Auth from './pages/auth/Auth'

import { API_KEY } from './constants'

const client = StreamChat.getInstance(API_KEY)

const App = () => {
    const userContext = React.useContext(UserContext)

    return (
        <UserProvider>
            {!userContext.user ?
                <Auth /> : 
                <AppWrapper userContext={userContext} />
            }
        </UserProvider>
    )
}

interface AppWrapperProps {
    userContext: UserContextI
}

const AppWrapper = ({
    userContext
}: AppWrapperProps): JSX.Element => {
    const [clientReady, setClientReady] = React.useState<boolean>(false)

    React.useEffect(() => {
        const setupClient = async () => {
            const {
                username,
                email,
                hashedPassword,
                id,
                token
            } = userContext.user!!

            try {
                await client.connectUser({
                    name: username,
                    id,
                    hashedPassword,
                    email,
                }, token)

                // await client.channel('messaging', {
                //     members: [id, 'urmalveer']
                // }).create()

                client.getChannelById('messaging', 'test', {members: [id, 'urmalveer']})

                setClientReady(true)
            } catch (error) {
                console.log(error)
            }
        }
        
        setupClient()
    }, [])

    if (!clientReady) {
        return (
            <Container>
                <CssBaseline />
                <Box
                    sx={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </Container>
        )
    }

    return (
        <Chat client={client}>
            <ChannelList />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </Chat>
    )
}

export default App
