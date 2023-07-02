import React from 'react';
import { Box, Typography } from '@mui/material';
import {format} from "timeago.js"

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender: string;
    currentUser:string
    createdAt:any;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = (props) => {
    const {message}= props
  const isSentByMe = message.sender === message.currentUser;

  return (
    <Box
      display="flex"
      flexDirection={isSentByMe ? 'row-reverse' : 'row'}
      alignItems="flex-end"
      mb={2}
    >
      <Box
        bgcolor={isSentByMe ? '#dcf8c6' : '#ffffff'}
        color={isSentByMe ? '#000000' : '#000000'}
        py={1.5}
        px={2}
        borderRadius={5}
        boxShadow={1}
      >
        <div style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
  <Typography>{message.content}</Typography>
  <span style={{ fontSize: '0.65rem', textAlign:'end', color:'gray' }}>{format(message.createdAt)}</span>
</div>
      </Box>
    </Box>
  );
};

export default MessageBubble;
