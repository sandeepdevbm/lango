import React, { useEffect, useRef, useState } from 'react'
import {
    Grid,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    TextField,
    IconButton,
    Paper,
    InputBase,
    Divider,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InputEmoji from "react-input-emoji"
import MessageBubble from './MessageBubble';
import messageRequests from '../../API/messageRequests'
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentIcon from '@mui/icons-material/Attachment';


interface ChatBoxProps {
    chat: any;
    selectedPerson: any;
    currentUser: string;
    setSendMessage:any;
    receiveMessage: any;
}

interface MessageProps {
    _id: string;
    text: string;
    senderId: string
    createdAt: any
}

const ChatBox: React.FC<ChatBoxProps> = (props) => {
    const { chat, selectedPerson, currentUser ,setSendMessage , receiveMessage } = props
    if (!chat) {
        return <Typography variant="h5">No chat available</Typography>;
    }
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef<HTMLDivElement>()
    const { getMessages ,addMessage } = messageRequests()

    console.log(chat, "999999");

    // const handleChatMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setMessages(event.target.value);
    // };

    useEffect(()=>{
        if(receiveMessage !== null && receiveMessage.chatId === chat._id){
            setMessages([...messages, receiveMessage])
        }
    },[receiveMessage])

    const handleSend = async (e:any) => {
        e.preventDefault()
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId : chat._id
        }
        // sent message to database
        try {
            const data = await addMessage(message)
            setMessages([...messages,data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
            
        }

        // sent message to socket server
        const receiverId = chat.members.find((id : string)=>id !== currentUser)
        setSendMessage({...message, receiverId})
    };

    // always scroll to last message
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior :'smooth'})
    },[messages])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getMessages(chat._id)
                console.log(data, "dadadada");

                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage: string) => {
        setNewMessage(newMessage)
    }

    return (
        <div>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={selectedPerson.profilePicture} />
                    <Typography variant="h5" ml={2}>
                        {selectedPerson.firstName} {selectedPerson.lastName}
                    </Typography>
                </Box>
                {/* Chat messages */}

                <Box minHeight={200} border="1px solid lightgrey" p={2} mb={2}>
                    {/* Render chat messages here */}
                    <Paper sx={{ height: '55vh', overflow: 'auto' }}>
                        <>
                            {messages.map((msg) => (
                                <Box m={2} ref = {scroll}>
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
                {/* Chat input */}
                <Box display="flex">
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        sx={{ width: '100%' }}
                    />
                    <Divider orientation="vertical" sx={{ mr: 2 }} flexItem />
                    {/* <FormControl variant='standard' >
                          <Select
                            value=""
                            displayEmpty
                            renderValue={() => (
                              <IconButton edge="end">
                                <AttachmentIcon />
                              </IconButton>
                            )}
                            
                          >
                            <MenuItem value="">Send Image</MenuItem>
                            <MenuItem value="">Send PDF</MenuItem>
                            <MenuItem value="">Send Video</MenuItem>
                          </Select>
                        </FormControl> */}
                    <IconButton onClick={handleSend}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </div>
    )
}

export default ChatBox
