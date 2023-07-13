import React, { useEffect, useRef, useState } from 'react'
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Paper,
    Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InputEmoji from "react-input-emoji"
import MessageBubble from './MessageBubble';
import messageRequests from '../../API/messageRequests'

interface ChatBoxProps {
    chat: any;
    selectedPerson: any;
    currentUser: string;
    setSendMessage: any;
    receiveMessage: any;
    sendTypingStatus: any;
    isTyping: boolean
}

interface MessageProps {
    _id: string;
    text: string;
    senderId: string
    createdAt: any
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
    const { chat, selectedPerson, currentUser, setSendMessage, receiveMessage, sendTypingStatus, isTyping } = props
    if (!chat)  return <Typography variant="h5">No chat available</Typography>;
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef<HTMLDivElement>()
    const { getMessages, addMessage } = messageRequests()

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    const handleSend = async (e: any) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }
        // sent message to database
        try {
            const data = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
        // sent message to socket server
        const receiverId = chat.members.find((id: string) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    };
    // always scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages(chat._id)
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage: string) => {
        setNewMessage(newMessage);
        if (newMessage !== '') {
            sendTypingStatus(true);
        } else {
            sendTypingStatus(false);
        }
    };

    return (
        <div>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={selectedPerson.profilePicture} />
                    <Typography variant="h5" ml={2}>
                        {selectedPerson.firstName} {selectedPerson.lastName}
                    </Typography>
                </Box>
                <Box minHeight={200} border="1px solid lightgrey" p={2} mb={2}>
                    <Paper sx={{ height: '55vh', overflow: 'auto' }}>
                        <>
                            {messages.map((msg) => (
                                <Box m={2} ref={scroll}>
                                    <MessageBubble key={msg._id} message={{
                                        id: msg._id,
                                        content: msg.text,
                                        sender: msg.senderId,
                                        currentUser: currentUser,
                                        createdAt: msg.createdAt
                                    }} />
                                </Box>
                            ))}
                        </>
                    </Paper>
                </Box>
                {isTyping && selectedPerson && (
                    <Typography variant="body2" color="textSecondary">
                        {selectedPerson?.firstName} is typing...
                    </Typography>
                )}
                <Box display="flex">
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <Divider orientation="vertical" sx={{ mr: 2 }} flexItem />
                    <div>
                    </div>
                    <IconButton onClick={handleSend}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </div>
    )
}

export default ChatBox