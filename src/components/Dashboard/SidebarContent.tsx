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
      { name: 'Recipes', icon: TbChefHat, to: paths.dash.recipes.list },
      {
        name: 'Categories',
        icon: TbCarrot,
        to: paths.dash.categories.list,
      },
      {
        name: 'Ingredients',
        icon: TbCategory,
        to: paths.dash.ingredients.list,
      },
      {
        name: 'Exercises',
        icon: TbBarbell,
        to: paths.dash.exercises.list,
      },
      {
        name: 'Workouts',
        icon: TbStretching,
        to: paths.dash.workouts.list,
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
