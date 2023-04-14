import { Container, HStack, Button, VStack } from '@chakra-ui/react';
import { EntityState, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ErrorStatus from '../ErrorStatus';
import LoadingIndicator from '../LoadingIndicator';
import ListItem from './ListItem';

type Props = {
  data?: EntityState<unknown>;
  isError?: boolean;
  isLoading?: boolean;
  error?: FetchBaseQueryError | SerializedError;
};

export default function ListView({ data, isError, isLoading, error }: Props) {
  const { pathname } = useLocation();
  return (
    <Container maxWidth="container.lg">
      <HStack>
        <Button
          as={RouterLink}
          to={`${pathname}/add`}
          colorScheme="orange"
          size="sm"
          variant="outline"
          mt={2}
          mb={6}
        >
          Add New
        </Button>
      </HStack>
      {data ? (
        <VStack spacing={2}>
          {data.ids.map((id) => (
            <ListItem
              key={id}
              data={data.entities[id]}
              link={`${pathname}/${id}`}
              editLink={`${pathname}/edit/${id}`}
            />
          ))}
        </VStack>
      ) : isError ? (
        <ErrorStatus error={error} />
      ) : isLoading ? (
        <LoadingIndicator />
      ) : null}
    </Container>
  );
}
