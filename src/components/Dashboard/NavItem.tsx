/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: string | number;
}
export default function NavItem({ icon, to, children, ...rest }: NavItemProps) {
  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'green.500',
          color: 'white',
          transition: 'background-color 0.2s ease-in-out',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
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
