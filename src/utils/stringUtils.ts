import { intlFormat } from 'date-fns';

/* eslint-disable import/prefer-default-export */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertSecondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export function formatCreatedAt(createdAt: string) {
  return capitalizeFirstLetter(
    intlFormat(
      new Date(createdAt),
      {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      {
        locale: 'pl-PL',
      }
    )
  );
}
