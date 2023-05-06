/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  data?: unknown;
  link?: string;
  editLink?: string;
  onClick?: () => void;
};

export default function DashListItem({ link, editLink, data, onClick }: Props) {
  const title =
    data && typeof data === 'object' && 'title' in data && data.title
      ? (data.title as string)
      : data && typeof data === 'object' && 'name' in data && data.name
      ? (data.name as string)
      : '';

  const image =
    data && typeof data === 'object' && 'image' in data
      ? (data.image as string)
      : null;

  const categories =
    data && typeof data === 'object' && 'categories' in data
      ? (data.categories as any[]).map((c) => c.name)
      : [];

  const categoriesString = categories && categories.join(', ');

  return (
    <LinkBox
      w="full"
      bg="gray.800"
      py={3}
      px={4}
      rounded="lg"
      onClick={onClick}
    >
      <HStack alignItems="center" spacing={4}>
        {image && (
          <Image
            boxSize="60px"
            rounded="full"
            objectFit="cover"
            src={image}
            alt="recipe image"
          />
        )}
        <VStack flex={1} align="stretch" spacing={0}>
          <LinkOverlay as={RouterLink} to={link}>
            <Text>{title}</Text>
          </LinkOverlay>
          <Text fontSize="xs" color="gray.500">
            {categoriesString}
          </Text>
        </VStack>
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
