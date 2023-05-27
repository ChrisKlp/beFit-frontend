import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useSendLogoutMutation } from '@/features/auth/authApiSlice';
import Logo from '../Logo';
import paths from '@/routes/paths';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export default function DashMobileNav({ onOpen, ...rest }: MobileProps) {
  const { username } = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      bg="gray.800"
      borderBottomColor="gray.700"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Logo display={{ base: 'flex', md: 'none' }} />

      <HStack spacing={{ base: '0', md: '6' }}>
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
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="gray.700" borderColor="gray.700">
              <MenuItem onClick={() => navigate(paths.home)}>Home</MenuItem>
              <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  );
}
