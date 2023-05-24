import {
  Avatar,
  Box,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Logo from './Logo';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';

export default function Layout() {
  const { isAdmin, isUser, username } = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  return (
    <Container maxWidth="container.lg">
      <HStack justifyContent="space-between" alignItems="center" mt={2} mb={4}>
        <Logo />
        <Box>
          <Menu>
            <MenuButton transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size="sm" name={username} bg="green.400" />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {isAdmin ? 'Admin' : isUser ? 'User' : 'Guest'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="gray.700" borderColor="gray.700">
              <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <Outlet />
    </Container>
  );
}
