import { Box, Heading } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Box p={3}>
        <Link to="/">
          <Heading size="md">beFit</Heading>
        </Link>
      </Box>
      <Outlet />
    </div>
  );
}
