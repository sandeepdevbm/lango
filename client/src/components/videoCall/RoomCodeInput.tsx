import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button
} from '@mui/material';
import Input from '@mui/joy/Input';
function RoomCodeInput() {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  const handleJoinRoom = useCallback(()=>{
    navigate(`/room/${value}`)
  },[navigate,value])
  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 300,
        }}
      >
        <Input type='text' placeholder="Type in here…" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button variant="contained" onClick={handleJoinRoom} >Join</Button>
      </Box>
    </div>
  )
}

export default RoomCodeInput