/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: string | number;
  isActive?: boolean;
  onClick?: () => void;
}
export default function NavItem({
  icon,
  to,
  isActive,
  onClick,
  children,
  ...rest
}: NavItemProps) {
  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={onClick}
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
