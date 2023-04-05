/* eslint-disable no-console */
import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Center as="main" alignContent="center" h="100vh">
      <VStack spacing={4}>
        <Heading size="2xl">Oops!</Heading>
        <Text>Sorry, an unexpected error has occurred.</Text>
        {isRouteErrorResponse(error) && (
          <>
            <Heading size="lg">{error.status}</Heading>
            <Text>{error.statusText}</Text>
            {error.data?.message && <Text>{error.data.message}</Text>}
          </>
        )}
        {error instanceof Response && (
          <>
            <Heading size="lg">{error.status}</Heading>
            <Text>{error.statusText}</Text>
          </>
        )}
        {error instanceof Error && <Text>{error.message}</Text>}
      </VStack>
    </Center>
  );
}
