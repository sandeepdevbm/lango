import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { mentorReducer } from '../../Redux/mentorSlice/mentorSlice';
import chatRequests from "../../API/chatRequests"
import mentorAPI from '../../API/mentorAPI';
import ChatBox from '../chatBox/ChatBox';
import { io } from 'socket.io-client'

interface Person {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const ChatComponent: React.FC<any> = (props) => {
  const { user } = props
  console.log(user, "////////");

  // const user = useSelector(mentorReducer)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chats, setChat] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const { userChats } = chatRequests();
  const { getAMentor } = mentorAPI()
  const [userData, setUserData] = useState<Person[]>([])
  const [onlineUsers, setOnlineUsers] = useState<any>([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const [userOnline, setUserOnline] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
  const socket: React.MutableRefObject<any> = useRef()

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit("new-user-add", user._id)
    socket.current.on('get-users', (users: any) => {
      setOnlineUsers(users)
    })
  }, [user])

  //receive message from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data: any) => {
      setReceiveMessage(data)
    })
  }, [])


// Send typing status to the server
useEffect(() => {
  console.log("lslslslsls");
  
  socket.current.on('typing-status', ({ isTyping, senderId }: { isTyping: boolean, senderId: string })   => {
    console.log(senderId,'senderId');
    
    if (senderId === selectedPerson?._id) {
      setIsTyping(isTyping);
    }
  });
}, [selectedPerson]);

console.log(isTyping,"isTyping");

  useEffect(() => {
    const getChat = async () => {
      try {
        const data = await userChats(user._id)
        console.log(data, "333");
        setChat(data)
        for (const chat of data) {
          const userId = chat.members.find((id: string) => id !== user._id) as string;
          console.log(userId, "777777");

          const details = await getAMentor(userId);
          console.log(details, "_-_-_-_-_-_");

          setUserData((prevUserData) => [...prevUserData, details]);

        }
        console.log(userData, "121212");

      } catch (error) {
        console.log(error);
      }
    }
    getChat()
  }, [])
  console.log(userData, "5555555");


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPeople = userData.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonClick = (person: Person, index: number) => {
    setSelectedPerson(person);
    setCurrentChat(chats[index]);
  };

   // Function to emit typing status to the server
const sendTypingStatus = (isTyping: boolean) => {
  socket.current.emit('typing-status', { isTyping, receiverId: selectedPerson?._id , senderId : user._id });
};

  // const checkOnlineStatus = async (chats: any) => {
  //     for(const chat of chats){
  //       const chatMember = await chat.members.find((member: any) => member !== user._id)
  //       console.log(chatMember,"chatMember");
  //       console.log(onlineUsers,"onlineUsers");

  //       const online = await onlineUsers.find((user: any) => user.userId === chatMember)
  //       console.log(onlineUsers,"onliness");
  //       if(online) setUserOnline(true)
  //         else setUserOnline(false) 
  //     }
  //   }
  // checkOnlineStatus(chats)
  
  
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box p={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
          {/* <>
            {chats.map((chat)=>(
                <div onClick={()=>setCurrentChat(chat)}>
                <Conversation data = {chat} currentUserId = {user._id}/>
                </div>
            ))}
            </> */}
          <List>
            {filteredPeople.map((person, index) => (
              <List>
                <ListItem
                  key={person._id}
                  button
                  selected={selectedPerson?._id === person._id}
                  onClick={() => handlePersonClick(person, index)}
                >
                  <ListItemAvatar>
                    <div style={{ position: 'relative' }} >
                      {userOnline && 
                      <>
                      <div
                        style={{
                          backgroundColor: 'greenyellow',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '0rem',
                          left: '2rem',
                          width: '0.8rem',
                          height: '0.8rem',
                          zIndex: 1,
                        }}
                      />
                      </>
                      }
                      <Avatar
                        sx={{ height: '2.5rem', width: '2.5rem' }}
                        src={person.profilePicture}
                        />
                    </div>
                  </ListItemAvatar>
                  <div style={{ justifyItems: 'center' }}>
                    <Typography sx={{ mt: 1.5 }}>
                      {person.firstName} {person.lastName}
                    </Typography>
                    <p style={{ marginTop: '0rem', color: 'grey' }}>online</p>
                  </div>
                </ListItem>
              </List>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box p={2}>
          {selectedPerson ? (
            <div>
              <ChatBox chat={currentChat} selectedPerson={selectedPerson} currentUser={user._id} setSendMessage={setSendMessage}
                receiveMessage={receiveMessage} sendTypingStatus={sendTypingStatus} isTyping = {isTyping} 
              />
              {/* <ChatBox chat={currentChat} selectedPerson={selectedPerson} currentUser={user._id} setSendMessage={setSendMessage}
                receiveMessage={receiveMessage} setIsTyping={setIsTyping} isTyping={isTyping} sendTypingStatus={sendTypingStatus}
              /> */}
            </div>
          ) : (
            <Typography variant="h5" align='center' mt={5}>Tap on a Chat to start a Conversation...</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatComponent;
