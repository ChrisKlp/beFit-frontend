import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: string | number;
}
export default function NavItem({ icon, to, children, ...rest }: NavItemProps) {
  const { pathname } = useLocation();

  function getActivePath() {
    const path = pathname.split('/');
    path.shift();
    return capitalizeFirstLetter(path[0]);
  }

  const isActive = getActivePath() === children;

  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      pointerEvents={isActive ? 'none' : 'auto'}
    >
      <Flex
        align="center"
        p={3}
        mx={4}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'green.500' : 'transparent'}
        _hover={{
          bg: 'gray.700',
          color: 'white',
          transition: 'background-color 0.1s ease-in-out',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="21"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
