/* eslint-disable react/jsx-props-no-spreading */
import { Box, BoxProps, CloseButton, Flex } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  TbBarbell,
  TbCarrot,
  TbCategory,
  TbChefHat,
  TbStretching,
} from 'react-icons/tb';

import Logo from '../Logo';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Recipes', icon: TbChefHat, to: '/recipes' },
  { name: 'Categories', icon: TbCarrot, to: '/categories' },
  { name: 'Ingredients', icon: TbCategory, to: '/ingredients' },
  { name: 'Exercises', icon: TbBarbell, to: '/exercises' },
  { name: 'Workouts', icon: TbStretching, to: '/workouts' },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      bg="gray.800"
      borderRightColor="gray.700"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
