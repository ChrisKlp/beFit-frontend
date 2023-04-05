import { LinkBox, HStack, LinkOverlay, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { TRecipeRes } from '@/types/Recipe';

type Props = {
  data?: TRecipeRes;
  link: string;
};

export default function ListItem({ link, data }: Props) {
  return (
    <LinkBox w="full" bg="gray.800" py={3} px={4} rounded="lg">
      <HStack justifyContent="space-between" alignItems="center">
        <LinkOverlay as={RouterLink} to={link}>
          <Text>{data?.title}</Text>
        </LinkOverlay>
        <Button colorScheme="green" variant="outline" size="sm">
          Edit
        </Button>
      </HStack>
    </LinkBox>
  );
}
