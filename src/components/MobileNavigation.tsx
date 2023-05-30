import { HStack, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  isActive: boolean;
  Icon: IconType;
  to: string;
};

function MobileNavButton({ label, isActive, Icon, to }: Props) {
  return (
    <VStack
      as={Link}
      spacing={1}
      color={isActive ? 'green.300' : 'white'}
      to={to}
    >
      <Icon fontSize={21} />
      <Text as="span" fontSize="sm">
        {label}
      </Text>
    </VStack>
  );
}

type NavProps = {
  navList: {
    label: string;
    isActive: boolean;
    Icon: IconType;
    to: string;
  }[];
};

export default function MobileNavigation({ navList }: NavProps) {
  return (
    <HStack
      align="stretch"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      zIndex={100}
      bottom={0}
      left={0}
      right={0}
      height="64px"
      spacing={8}
      bgColor="gray.800"
      sx={{ boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.5)' }}
      display={{ base: 'flex', md: 'none' }}
    >
      {navList.map((navItem) => (
        <MobileNavButton key={navItem.to} {...navItem} />
      ))}
    </HStack>
  );
}
