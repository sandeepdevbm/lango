import React, { useState, useEffect } from 'react'
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
import mentorAPI from '../../API/mentorAPI';


interface Person {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface ConversationProps {
    data: any;
    currentUserId: string;
}


const Conversation: React.FC<ConversationProps> = (props) => {
    const { data, currentUserId } = props

    const [userData, setUserData] = useState<Person>()
    const [people, setPeople] = useState<Person>()
    const [searchTerm, setSearchTerm] = useState('');

    const { getAMentor } = mentorAPI()


    useEffect(() => {
        const fetchData = async () => {
            const userId: string | undefined = data.members.find((id: string) => id !== currentUserId) as string | undefined;

            const getUserData = async () => {
                try {
                    const userDetail = await getAMentor(userId)
                    setUserData(userDetail)

                } catch (error) {
                    console.log(error);
                }
            };
            if (userId) {
                await getUserData();
            }
        };
        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
        <div>
          <List>
            <ListItem
              key={userData?.id}
              button
            >
              <ListItemAvatar>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      backgroundColor: 'greenyellow',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '0rem',
                      left: '2rem',
                      width: '1rem',
                      height: '1rem',
                      zIndex: 1,
                    }}
                  />
                  <Avatar
                    sx={{ height: '2.5rem', width: '2.5rem' }}
                    src={userData?.profilePicture}
                  />
                </div>
              </ListItemAvatar>
              <Typography>
                {userData?.firstName} {userData?.lastName}
              </Typography>
            </ListItem>
          </List>
        </div>
        <hr />
      </>      
    )
}

export default Conversation
