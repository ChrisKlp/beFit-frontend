import { Box, BoxProps, CloseButton, Flex, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  TbBarbell,
  TbCarrot,
  TbCategory,
  TbChefHat,
  TbStretching,
} from 'react-icons/tb';
import { useMemo } from 'react';
import Logo from '../Logo';
import NavItem from './NavItem';
import { paths } from '@/router';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  const LinkItems: Array<LinkItemProps> = useMemo(
    () => [
      { name: 'Recipes', icon: TbChefHat, to: paths.dashboard.recipes.list },
      {
        name: 'Categories',
        icon: TbCarrot,
        to: paths.dashboard.categories.list,
      },
      {
        name: 'Ingredients',
        icon: TbCategory,
        to: paths.dashboard.ingredients.list,
      },
      {
        name: 'Exercises',
        icon: TbBarbell,
        to: paths.dashboard.exercises.list,
      },
      {
        name: 'Workouts',
        icon: TbStretching,
        to: paths.dashboard.workouts.list,
      },
    ],
    []
  );

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
      <VStack spacing={2} align="stretch">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
}
