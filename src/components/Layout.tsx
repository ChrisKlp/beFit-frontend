import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { TbCarrot, TbChefHat, TbShoppingCart } from 'react-icons/tb';
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import paths from '@/routes/paths';
import useAuth from '@/hooks/useAuth';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import { selectMenuEditMode, setMenuEditMode } from '@/features/app/appSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Logo from './Logo';
import MobileNavigation from './MobileNavigation';

export default function Layout() {
  const { isAdmin, isUser, username } = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const menuEditMode = useAppSelector(selectMenuEditMode);
  const isMenu = /menu$/i.test(pathname);
  const isRecipes = /recipes$/i.test(pathname);
  const isEditAvailable = isMenu;

  const handleEditClick = () => {
    dispatch(setMenuEditMode(!menuEditMode));
  };

  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  const navList = useMemo(() => {
    return [
      {
        label: 'Menu',
        isActive: isMenu,
        Icon: TbChefHat,
        to: paths.home,
      },
      {
        label: 'Przepisy',
        isActive: isRecipes,
        Icon: TbCarrot,
        to: paths.recipes.list,
      },
      {
        label: 'Zakupy',
        isActive: isRecipes,
        Icon: TbShoppingCart,
        to: paths.shoppingList,
      },
    ];
  }, [isMenu, isRecipes]);

  return (
    <>
      <MobileNavigation navList={navList} />
      <Container maxWidth="container.lg" pb={{ base: 24, md: 6 }}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={4}
        >
          <HStack spacing={{ base: 0, md: 8 }}>
            <Logo />
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              {navList.map(({ label, isActive, to }) => (
                <Link
                  as={RouterLink}
                  to={to}
                  key={label}
                  color={isActive ? 'green.300' : 'white'}
                >
                  {label}
                </Link>
              ))}
            </HStack>
          </HStack>
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
            <Box>
              <Menu>
                <MenuButton
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}
                >
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
            </Box>
          </HStack>
        </HStack>
        <Outlet />
      </Container>
    </>
  );
}
