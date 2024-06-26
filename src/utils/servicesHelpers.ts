/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export function isErrorWithDataAndStatus(
  error: unknown
): error is { data: { message: string }; status: number } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    'status' in error &&
    typeof (error as any).data === 'object' &&
    error.data != null &&
    'message' in (error as any).data &&
    typeof (error as any).data.message === 'string' &&
    typeof (error as any).status === 'number'
  );
}

export function handleError(
  isError: boolean,
  error?: FetchBaseQueryError | SerializedError
) {
  if (isError) {
    if (isFetchBaseQueryError(error)) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      throw new Response(errMsg, {
        status: typeof error.status === 'number' ? error.status : 500,
        statusText: typeof error.status === 'string' ? error.status : 'Error',
      });
    } else if (isErrorWithMessage(error)) {
      throw new Error(error.message);
    }
  }
}
