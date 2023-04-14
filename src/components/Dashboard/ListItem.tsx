import { Button, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  data?: unknown;
  link?: string;
  editLink?: string;
  onClick?: () => void;
};

export default function ListItem({ link, editLink, data, onClick }: Props) {
  const title =
    data && typeof data === 'object' && 'title' in data && data.title
      ? (data.title as string)
      : data && typeof data === 'object' && 'name' in data && data.name
      ? (data.name as string)
      : '';

  return (
    <LinkBox
      w="full"
      bg="gray.800"
      py={3}
      px={4}
      rounded="lg"
      onClick={onClick}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <LinkOverlay as={RouterLink} to={link}>
          <Text>{title}</Text>
        </LinkOverlay>
        <HStack>
          <Button
            as={RouterLink}
            to={editLink}
            colorScheme="green"
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
        </HStack>
      </HStack>
    </LinkBox>
  );
}
