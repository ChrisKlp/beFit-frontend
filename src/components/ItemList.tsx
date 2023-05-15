/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Link as RouterLink } from 'react-router-dom';

type ListItemProps = {
  data?: unknown;
  link?: string;
};

function ListItem({ data, link }: ListItemProps) {
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

  return (
    <LinkBox w="full" bg="gray.800" py={3} px={4} rounded="lg">
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
            {categories?.join(', ')}
          </Text>
        </VStack>
      </HStack>
    </LinkBox>
  );
}

export default function ItemList({
  data,
  category,
}: {
  data: EntityState<unknown>;
  category: string;
}) {
  return (
    <VStack spacing={2}>
      {data.ids.map((id) => (
        <ListItem
          key={id}
          data={data.entities[id]}
          link={`${category}/${id}`}
        />
      ))}
    </VStack>
  );
}
