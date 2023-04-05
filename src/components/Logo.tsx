import { HStack, StackProps, Text } from '@chakra-ui/react';

export default function Logo(props: StackProps) {
  return (
    <HStack spacing={0} {...props}>
      <Text fontSize="3xl" fontWeight="normal">
        be
      </Text>
      <Text fontSize="3xl" fontWeight="black" color="green.300">
        Fit
      </Text>
    </HStack>
  );
}
