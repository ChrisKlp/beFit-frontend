import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  isActive: boolean;
  Icon: IconType;
  to: string;
};

export default function MobileNavButton({ label, isActive, Icon, to }: Props) {
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
