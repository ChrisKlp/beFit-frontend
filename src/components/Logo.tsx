import { HStack, StackProps, Text } from '@chakra-ui/react';

type Props = {
  isBig?: boolean;
  isError?: boolean;
} & StackProps;

export default function Logo({ isBig, isError, ...props }: Props) {
  const fontSize = isBig ? '5xl' : '3xl';
  const fontColor = isError ? 'red.500' : 'green.300';
  return (
    <HStack spacing={0} {...props}>
      <Text fontSize={fontSize} fontWeight="normal">
        be
      </Text>
      <Text fontSize={fontSize} fontWeight="black" color={fontColor}>
        Fit
      </Text>
    </HStack>
  );
}
