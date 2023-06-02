import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Message = ({message}: any) => {
  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <Button variant="outlined" color="warning">{message}</Button>
    </Box>
  )
}
export default Message