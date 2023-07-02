import React, { useState } from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentIcon from '@mui/icons-material/Attachment';

interface Person {
  id: number;
  name: string;
  profilePicture: string;
}

const ChatPage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: 'John Doe', profilePicture: 'profile1.jpg' },
    { id: 2, name: 'Jane Smith', profilePicture: 'profile2.jpg' },
    { id: 3, name: 'Mike Johnson', profilePicture: 'profile3.jpg' },
    // Add more people here
  ]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleChatMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Send message logic here
    console.log('Sending message:', chatMessage);
    setChatMessage('');
  };

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
          <List>
            {filteredPeople.map((person) => (
              <ListItem
                key={person.id}
                button
                selected={selectedPerson?.id === person.id}
                onClick={() => handlePersonClick(person)}
              >
                <ListItemAvatar>
                  <Avatar src={person.profilePicture} />
                </ListItemAvatar>
                <ListItem primary={person.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box p={2}>
          {selectedPerson ? (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={selectedPerson.profilePicture} />
                <Typography variant="h5" ml={2}>
                  {selectedPerson.name}
                </Typography>
              </Box>
              {/* Chat messages */}
              <Box minHeight={200} border="1px solid lightgrey" p={2} mb={2}>
                {/* Render chat messages here */}
                <Typography variant="body1">Chat messages</Typography>
              </Box>
              {/* Chat input */}
              <Box display="flex">
                <TextField
                  variant="outlined"
                  value={chatMessage}
                  onChange={handleChatMessageChange}
                  fullWidth
                  placeholder="Type a message..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton edge="end">
                          <AttachmentIcon />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <FormControl>
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
                        </FormControl>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton edge="end" onClick={handleSendMessage}>
                  Send
                </IconButton>
              </Box>
            </Paper>
          ) : (
            <Typography variant="h5">No person selected</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
