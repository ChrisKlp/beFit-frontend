import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { BiCheck } from 'react-icons/bi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEdit, AiFillCheckCircle } from 'react-icons/ai';
import useAuth from '@/hooks/useAuth';
import Logo from './Logo';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import paths from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectMenuEditMode, setMenuEditMode } from '@/features/app/appSlice';

export default function Layout() {
  const { isAdmin, isUser, username } = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const menuEditMode = useAppSelector(selectMenuEditMode);
  const isEditAvailable = /menu$/i.test(pathname);

  const handleEditClick = () => {
    dispatch(setMenuEditMode(!menuEditMode));
  };

  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  return (
    <>
      {/* <HStack
        align="stretch"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        zIndex={100}
        bottom={0}
        left={0}
        right={0}
        height={20}
        bgColor="gray.800"
        sx={{ boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.5)' }}
      >
        <Text>asd</Text>
        <Text>asd</Text>
        <Text>asd</Text>
      </HStack> */}
      <Container maxWidth="container.lg" pb={20}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={4}
        >
          <Logo />
          <HStack spacing={4}>
            {isEditAvailable && (
              <Button
                colorScheme={menuEditMode ? 'orange' : 'green'}
                size="sm"
                variant="outline"
                leftIcon={menuEditMode ? <AiFillCheckCircle /> : <AiFillEdit />}
                onClick={handleEditClick}
              >
                {menuEditMode ? 'Zapisz' : 'Edytuj'}
              </Button>
            )}
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
                {isAdmin && (
                  <MenuItem onClick={() => navigate(paths.dash.recipes.list)}>
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        <Outlet />
      </Container>
    </>
  );
}
