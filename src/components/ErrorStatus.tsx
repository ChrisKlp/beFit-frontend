import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from '@chakra-ui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { isErrorWithDataAndStatus } from '@/utils/servicesHelpers';

type Props = {
  error?: FetchBaseQueryError | SerializedError;
} & AlertProps;

export default function ErrorStatus({ error, ...props }: Props) {
  return (
    <Alert status="error" {...props}>
      <AlertIcon />
      <AlertTitle>Error:</AlertTitle>
      <AlertDescription>
        {isErrorWithDataAndStatus(error) && error.data.message}
      </AlertDescription>
    </Alert>
  );
}
