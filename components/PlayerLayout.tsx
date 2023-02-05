import React from 'react'
import { Box } from "@chakra-ui/layout";
import Sidebar from './Sidebar';
import Player from './Player';

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vm" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" bottom="0" left="0" height="100px">
        <Player />
      </Box>
    </Box>
  )
}

export default PlayerLayout