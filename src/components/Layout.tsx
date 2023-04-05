import { Box, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Box p={3}>
        <Heading size="md">beFit</Heading>
      </Box>
      <Outlet />
    </div>
  );
}
